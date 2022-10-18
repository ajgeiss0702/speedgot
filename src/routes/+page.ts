export const prerender = true;

export async function load() {
    return {
        popular: await fetch("https://api.spiget.org/v2/resources?size=5&sort=-downloads").then(r => r.json()),
        lastUpdated: await fetch("https://api.spiget.org/v2/resources?size=5&page=1&sort=-updateDate").then(r => r.json())
    }
}