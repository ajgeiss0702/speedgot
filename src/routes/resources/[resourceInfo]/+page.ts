import {error} from "@sveltejs/kit";


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function load({fetch, params}) {
    const givenInfo: string = params.resourceInfo;

    let resourceId: number;

    if(!givenInfo.includes(".")) {
        resourceId = Number(givenInfo);
    } else {
        resourceId = Number(givenInfo.substring(givenInfo.lastIndexOf(".")+1));
    }

    if(isNaN(resourceId)) {
        throw error(400, "Invalid project slug");
    }

    const resourceInfoResponse: Response = await fetch("https://api.spiget.org/v2/resources/" + resourceId);
    let resourceInfo;
    try {
        resourceInfo = await resourceInfoResponse.json();
    } catch(e) {
        if(!resourceInfoResponse.ok) {
            resourceInfo = {};
        } else {
            throw e;
        }
    }
    if(!resourceInfoResponse.ok) {
        let errorText = "From spiget: " + resourceInfoResponse.statusText;
        if(resourceInfo && resourceInfo.error) {
            errorText = resourceInfo.error;
        }
        throw error(resourceInfoResponse.status, errorText);
    }

    const latestResourceVersion = await (fetch("https://api.spiget.org/v2/resources/" + resourceId + "/versions/latest").then((response: Response) => response.json()));

    return {
        ...resourceInfo,
        latestResourceVersion
    };
}