export function load({params, url}) {
    console.log(url.searchParams.get('sort'))
    return fetch("https://api.spiget.org/v2/resources?size=50&sort=-" + (url.searchParams.get('sort') || "updateDate") + "&page=" + params.page).then(r => r.json());
}