export function commas(x: number) {
    if(typeof x == "undefined") return undefined;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getHostname(link: string) {
    return new URL(link).hostname;
}

export function decodeBase64Content(d: string) {
    return atob(d).replaceAll("â", "").replaceAll("Â", "").replace(/"\/\/proxy\.spigotmc\.org\/([^\s].*?)\?url=(.*?)"/g, "/proxy/image?url=$2")
}