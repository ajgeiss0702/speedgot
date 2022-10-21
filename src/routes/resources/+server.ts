import {redirect} from "@sveltejs/kit";
import type {RequestEvent} from "@sveltejs/kit";


export async function GET({url}: RequestEvent) {
    throw redirect(301, "/resources/page/1" + url.search);
}