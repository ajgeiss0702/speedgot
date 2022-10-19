
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function load({ parent }) {
    const resource = await parent();
    const reviews = await fetch("https://api.spiget.org/v2/resources/" + resource.id + "/reviews?size=100000&fields=id&sort=-date").then(r => r.json());

    return {
        ...resource,
        reviews: reviews
    }
}