import {error} from "@sveltejs/kit";


export async function GET({ url }) {
    if(!url.searchParams.get("url")) {
        throw error(400, "no url");
    }
    const fetchingUrl: string = url.searchParams.get("url");

    const imageResponse = await fetch(fetchingUrl);

    const blob = await imageResponse.blob();


    const response = new Response(blob);

    response.headers.set("original-content-type", imageResponse.headers.get("content-type") || "")

    return response;

    /*return new Response({
        status: 200,
        headers: {
            "Content-type" : response.headers.get("content-type")
        },
        body: blob
    });*/
}