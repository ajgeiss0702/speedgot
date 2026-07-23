import {error, type Handle} from "@sveltejs/kit";
import {dev} from "$app/environment";
import {commas, retryD1} from "$lib/utils";

const lastLocalBotRequest: {[key: string]: number} = {};

// yandex is the reason I made this because it was spamming the crap out of the site, but I added the others for safety since the system already existed
const bots = {
    "yandex.com/bots": "yandex",
    "claude": "claude",
    "Claude": "claude",
    "MJ12": "mj12",
    "SERanking": "SERanking",
    "DotBot": "DotBot",
    "asn:132203": "Tencent"
}

export const handle: Handle = async ({ event, resolve }) => {
    const ua = event.request.headers.get("user-agent");
    async function limit(bot: string) {
        if(lastLocalBotRequest[bot] === undefined) lastLocalBotRequest[bot] = 0;
        // check local before d1 to save d1 reads for when its being super spammy
        if(Date.now() - lastLocalBotRequest[bot] < 59e3) {
            throw error(429, "You are sending too many requests! Please respect the crawl-delay")
        }
        const db = event.platform?.env?.DB;
        const lastD1BotRequest = (db && await retryD1(() =>
            db.prepare("select lastRequest from bots where bot = ?")
                .bind(bot)
                .first<number>("lastRequest")
        )) ?? 0;
        const lastBotRequest = Math.max(lastLocalBotRequest[bot], lastD1BotRequest);
        if(Date.now() - lastBotRequest < 59e3) {
            if(lastBotRequest > lastLocalBotRequest[bot]) lastLocalBotRequest[bot] = lastBotRequest; // set local from d1
            console.debug(commas(Date.now() - lastBotRequest) + `ms since the last ${bot} request (from d1), blocking`)
            throw error(429, "You are sending too many requests! Please respect the crawl-delay")
        } else {
            lastLocalBotRequest[bot] = Date.now();
            console.debug(commas(Date.now() - lastBotRequest) + `ms since the last ${bot} request (from d1), allowing`)
            if(db) event.platform?.context?.waitUntil(retryD1(() =>
                db.prepare("insert into bots (bot, lastRequest) values (?, ?) " +
                    "on conflict do " +
                    "update set lastRequest = COALESCE(" +
                    "MAX(excluded.lastRequest, bots.lastRequest), " +
                    "excluded.lastRequest, " +
                    "bots.lastRequest" +
                    ")"
                )
                    .bind(
                        bot,
                        lastLocalBotRequest[bot]
                    )
                    .run()
            ))
        }
    }
    const asn: number | undefined = event.platform?.cf.asn;
    for (const [c, bot] of Object.entries(bots)) {
        if(c.startsWith("asn:")) {
            if(asn) {
                const list = c.substring("asn:".length)
                    .split(",")
                    .map(asn => Number(asn));

                if(list.includes(asn)) {
                    await limit(bot);
                    break;
                }
            }


        } else if(ua?.includes(c)) {
            await limit(bot);
            break;
        }
    }

    const response = await resolve(event);

    const pagesRequests = event.platform?.env?.PAGES_REQUESTS;
    // only records requests with the host header to be sure theyre not internal requests
    if(pagesRequests && event.request.headers.has("host")) pagesRequests.writeDataPoint({
        blobs: [
            "speedgot",
            event.url.pathname,
            ua,
            response.status + "",
            event.route.id,
            event.request.headers.get("host")
        ],
        doubles: [],
        indexes: ["speedgot"]
    });
    if(!pagesRequests && !dev) console.warn("Missing pages requests object!")

    return response;
}
