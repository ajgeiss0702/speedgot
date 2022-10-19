<script>
    import LoadingText from "$lib/LoadingText.svelte";
    import {getContext, onMount} from "svelte";
    import {commas, getHostname} from "$lib/utils";
    import Stars from "$lib/Stars.svelte";
    import '$lib/keyvalue.css'

    export let data;

    let {setAuthor, rejectAuthor} = getContext("author");


    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let authorInfoPromise = new Promise(() => {});

    onMount(() => {
        authorInfoPromise = fetch("https://api.spiget.org/v2/authors/" + data.author.id).then(r => r.json())

        authorInfoPromise.then(r => {
            setAuthor(r)
        }).catch(e => {
            rejectAuthor(e);
        })
    })
</script>
<div class="key-values">
    <span class="key">Author:</span>
    <div class="value">
        {#await authorInfoPromise}
            <LoadingText length={10}/>
        {:then author}
            {author.name}
        {/await}
    </div>
</div>
<div class="key-values">
    <span class="key">Total Downloads:</span>
    <span class="value">{commas(data.downloads)}</span>
</div>
<div class="key-values">
    <span class="key">First Release:</span>
    <span class="value">{data.releaseDate}</span>
</div>
<div class="key-values">
    <span class="key">Last Update:</span>
    <span class="value">{data.updateDate}</span>
</div>
<div class="key-values">
    <span class="key">Category:</span>
    <span class="value">{data.category}</span>
</div>
<div class="key-values">
    <span class="key">All-Time Rating:</span>
    <div class="value">
        <Stars rating={data.rating.average}/>
        <div>{data.rating.count} ratings</div>
    </div>
</div>
{#if data.links.additionalInformation}
    <a class="stealthLink" href={data.links.additionalInformation} target="_blank">
        Find more info at {getHostname(data.links.additionalInformation)}
    </a>
{/if}