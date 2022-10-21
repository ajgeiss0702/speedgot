import {error} from "@sveltejs/kit";
import type {LoadEvent} from "@sveltejs/kit"

export async function load({params}: LoadEvent) {
    const givenInfo: string = params.updateId || "";
    const givenResourceInfo: string = params.resourceInfo || "";

    let resourceId: number;
    let updateId: number;

    if(!givenResourceInfo.includes(".")) {
        resourceId = Number(givenResourceInfo);
    } else {
        resourceId = Number(givenResourceInfo.substring(givenResourceInfo.lastIndexOf(".")+1));
    }

    if(!givenInfo.includes(".")) {
        updateId = Number(givenInfo);
    } else {
        updateId = Number(givenInfo.substring(givenInfo.lastIndexOf(".")+1));
    }

    if(isNaN(updateId)) {
        throw error(400, "Invalid update id");
    }

    const updateInfoResponse: Response = await fetch("https://api.spiget.org/v2/resources/" + resourceId + "/updates/" + updateId);
    let updateInfo;
    try {
        updateInfo = await updateInfoResponse.json();
    } catch(e) {
        if(!updateInfoResponse.ok) {
            updateInfo = {};
        } else {
            throw e;
        }
    }
    if(!updateInfoResponse.ok) {
        let errorText = "From spiget: " + updateInfoResponse.statusText;
        if(updateInfo && updateInfo.error) {
            errorText = updateInfo.error;
        }
        throw error(updateInfoResponse.status, errorText);
    }


    return updateInfo;
}