import type { Handle } from "@sveltejs/kit";
import {dev} from "$app/environment";

export const handle: Handle = async ({ event, resolve }) => {
    const ua = event.request.headers.get("user-agent");

    const response = await resolve(event);

    const pagesRequests = event.platform?.env?.PAGES_REQUESTS;
    // only records requests with the host header to be sure theyre not internal requests
    if(pagesRequests && event.request.headers.has("host")) pagesRequests.writeDataPoint({
        blobs: [
            "speedgot",
            event.url.pathname,
            ua,
            response.status + ""
        ],
        doubles: [],
        indexes: ["speedgot"]
    });
    if(!pagesRequests && !dev) console.warn("Missing pages requests object!")

    return response;
}
