export function load({params, url}) {
    console.log(url.searchParams.get('sort'))
    return fetch("https://api.spiget.org/v2/resources?size=30&fields=name,tag,likes,file,testedVersions,rating,icon,author,category,downloads&sort=-" + (url.searchParams.get('sort') || "updateDate") + "&page=" + params.page).then(r => r.json());
}