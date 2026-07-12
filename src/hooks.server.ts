import {error, type Handle} from "@sveltejs/kit";
import {dev} from "$app/environment";
import {retryD1} from "$lib/utils";

let lastLocalYandexRequest = 0;

const bots = {
    "yandex.com/bots": "yandex",
    "claude": "claude",
    "Claude": "claude",
}

export const handle: Handle = async ({ event, resolve }) => {
    const ua = event.request.headers.get("user-agent");
    for (const [c, bot] of Object.entries(bots)) {
        if(ua?.includes(c)) {
            // check local before d1 to save d1 reads for when its being super spammy
            if(Date.now() - lastLocalYandexRequest < 55e3) {
                throw error(429, "You are sending too many requests! Please respect the crawl-delay")
            }
            const db = event.platform?.env?.DB;
            const lastD1YandexRequest = (db && await retryD1(() =>
                db.prepare("select lastRequest from bots where bot = ?")
                    .bind(bot)
                    .first<number>("lastRequest")
            )) ?? 0;
            const lastYandexRequest = Math.max(lastLocalYandexRequest, lastD1YandexRequest);
            if(Date.now() - lastYandexRequest < 55e3) {
                if(lastYandexRequest > lastLocalYandexRequest) lastLocalYandexRequest = lastYandexRequest; // set local from d1
                throw error(429, "You are sending too many requests! Please respect the crawl-delay")
            } else {
                lastLocalYandexRequest = Date.now();
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
                            lastLocalYandexRequest
                        )
                        .run()
                ))
            }
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
