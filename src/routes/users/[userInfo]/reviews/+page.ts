import type {LoadEvent} from "@sveltejs/kit";

export async function load({params}: LoadEvent) {
    const givenInfo: string = params.userInfo || "";

    let userId: number;

    if(!givenInfo.includes(".")) {
        userId = Number(givenInfo);
    } else {
        userId = Number(givenInfo.substring(givenInfo.lastIndexOf(".")+1));
    }

    // we don't have to worry about malformed slug here, it was already checked by the layout

    return {
        reviews: await fetch("https://api.spiget.org/v2/authors/" + userId + "/reviews?size=10000&sort=-date").then(r => r.json())
    }
}