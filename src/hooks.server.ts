import {error, type Handle} from "@sveltejs/kit";
import {dev} from "$app/environment";

let lastYandexRequest = 0;

export const handle: Handle = async ({ event, resolve }) => {
    const ua = event.request.headers.get("user-agent");
    if(ua?.includes("yandex.com/bots")) {
        if(Date.now() - lastYandexRequest < 55e3) {
            throw error(429, "You are sending too many requests! Please respect the crawl-delay")
        } else {
            lastYandexRequest = Date.now();
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
