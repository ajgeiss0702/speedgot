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
        resources: await fetch("https://api.spiget.org/v2/authors/" + userId + "/resources?size=10000&sort=-updateDate").then(r => r.json())
    };
}