
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function load({ parent }) {
    const resource = await parent();
    const versions = await fetch("https://api.spiget.org/v2/resources/" + resource.id + "/versions?size=100000&fields=id&sort=-releaseDate").then(r => r.json());

    return {
        ...resource,
        versions: versions
    }
}