import {error} from "@sveltejs/kit";

export async function GET({ url, request }) {

    const fetchingUrl = url.searchParams.get("url");
    if(!fetchingUrl) {
        throw error(400, "no url");
    }

    const imageResponse = await fetch(new URL(fetchingUrl, "https://www.spigotmc.org/"), {
        headers: {
            "User-Agent": "Mozilla/5.0 (compatible; Speedgot-image-proxy/1.0.0; +https://speedgot.ajg0702.us) CFNetwork"
        }
    });

    if(fetchingUrl.startsWith("https://media.discordapp.net") && !request.headers.has("Referer")) {
        throw error(400, "This is not a discord image proxy!");
    }

    if(!imageResponse.headers.get("content-type")?.startsWith("image/")) {
        console.warn("Non-image requested:", fetchingUrl, imageResponse.headers.get("content-type")+"", imageResponse.status, imageResponse.statusText);
        imageResponse.body?.cancel();
        throw error(400, "Not an image!");
    }

    const blob = await imageResponse.blob();


    const response = new Response(blob);

    response.headers.set("original-content-type", imageResponse.headers.get("content-type") || "")
    if(imageResponse.ok) {
        response.headers.set("cache-control", "public, immutable, max-age=31536000");
    }

    return response;

    /*return new Response({
        status: 200,
        headers: {
            "Content-type" : response.headers.get("content-type")
        },
        body: blob
    });*/
}