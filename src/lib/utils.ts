import sanitizeHtml from 'sanitize-html';

export function commas(x: number) {
    if(typeof x == "undefined") return undefined;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getHostname(link: string) {
    return new URL(link).hostname;
}

export function decodeBase64Content(d: string) {
    return sanitizeHtml(
        atob(d)
            .replaceAll("â", "")
            .replaceAll("Â", "")
            .replace(/"\/\/proxy\.spigotmc\.org\/([^\s].*?)\?url=(.*?)"/g, "/proxy/image?url=$2"),
        {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'iframe', 'button', 'span' ]),
            allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                "*": ['style', 'class'],
                'iframe': ['src', 'allowfullscreen', 'width', 'height', 'frameborder'],
            },
            allowedIframeDomains: ['youtube.com']
        }
    )
}