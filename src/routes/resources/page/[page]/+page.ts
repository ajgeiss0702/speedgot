export async function load({fetch, params, url}) {
    return {
        resources: await fetch("https://api.spiget.org/v2/resources?size=30&fields=name,tag,likes,links,rating,icon.url,author,category,downloads,updateDate&sort=-" + (url.searchParams.get('sort') || "updateDate") + "&page=" + params.page)
            .then(r => r.json())
            .then(r => r.map(resource => ({
                ...resource,
                links: resource.links ? Object.fromEntries(Object.entries(resource.links)
                    .filter(([linkName]) => linkName === "discussion")
                ) : resource.links,
            })))
            .then(r => {console.log(r); return r;})
    };
}