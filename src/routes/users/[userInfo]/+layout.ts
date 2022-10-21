import type {LoadEvent} from "@sveltejs/kit";
import {error} from "@sveltejs/kit";

export async function load({params}: LoadEvent) {
    const givenInfo: string = params.userInfo || "";

    let userId: number;

    if(!givenInfo.includes(".")) {
        userId = Number(givenInfo);
    } else {
        userId = Number(givenInfo.substring(givenInfo.lastIndexOf(".")+1));
    }

    if(isNaN(userId)) {
        throw error(400, "Invalid user slug");
    }

    const userInfoResponse: Response = await fetch("https://api.spiget.org/v2/authors/" + userId);
    let userInfo;
    try {
        userInfo = await userInfoResponse.json();
    } catch(e) {
        if(!userInfoResponse.ok) {
            userInfo = {};
        } else {
            throw e;
        }
    }
    if(!userInfoResponse.ok) {
        let errorText = "From spiget: " + userInfoResponse.statusText;
        if(userInfo && userInfo.error) {
            errorText = userInfo.error;
        }
        throw error(userInfoResponse.status, errorText);
    }

    return {user: userInfo};
}