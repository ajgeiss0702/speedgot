
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function load({ parent }) {
    const resource = await parent();
    const updates = await fetch("https://api.spiget.org/v2/resources/" + resource.id + "/updates?size=100000&sort=-date").then(r => r.json());

    return {
        ...resource,
        updates: updates
    }
}