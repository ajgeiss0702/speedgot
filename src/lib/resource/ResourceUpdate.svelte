<script>
    import {decodeBase64Content} from "$lib/utils";
    import {getContext} from "svelte";
    import LoadingText from "$lib/LoadingText.svelte";
    import DateStamp from "$lib/DateStamp.svelte";

    export let update;
    export let inline = false;
    export let link = false;

    let authorPromise = getContext("author").getAuthor();
</script>
<style>
    .title {
        font-size: 1.25em;
        border-bottom: 1px lightgray solid;
    }

    .description {
        padding-bottom: 0.5em;
        overflow-y: scroll;
    }

    .limited {
        max-height: 50vh;
    }

    .meta {
        font-size: 0.75em;
        color: gray;
    }

    @media (prefers-color-scheme: dark) {
        .title {
            border-color: dimgray;
        }
    }
</style>
<div class="fw-bold title">
    {#if link}
        <a class="stealthLink" href="updates/{update.id}">
            {update.title}
        </a>
    {:else}
        {update.title}
    {/if}
</div>
<div class="bb-content description" class:limited={inline}>
    {@html decodeBase64Content(update.description)}
</div>
<div class="meta">
    {#await authorPromise}
        <LoadingText length={10}/>,
    {:then author}
        <a href="/users/{author.id}" class="stealthLink">{author.name}</a>,
    {/await}
    <a class="stealthLink" href="/resources/{update.resource}/updates/{update.id}">
        <DateStamp epochSeconds={update.date}/>
    </a>
</div>