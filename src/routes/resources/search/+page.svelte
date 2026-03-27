<svelte:head>
    <title>Resource Search - Speedgot</title>
</svelte:head>
<script>
    import { run } from 'svelte/legacy';

    import Resource from "$lib/Resource.svelte";
    import {Input} from "@sveltestrap/sveltestrap";
    import {page} from "$app/stores";
    import {onMount} from "svelte";

    let query = $state();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let results = $state(new Promise(() => {}));

    run(() => {
        if(!query) {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            results = new Promise(() => {});
        }
    });

    let timeout;

    function keyDown() {
        clearTimeout(timeout);
    }
    function keyUp() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            search()
        }, 250);
    }

    function search() {
        if(query) {
            results = fetch("https://api.spiget.org/v2/search/resources/" + encodeURIComponent(query) + "?fields=name,tag,likes,links,rating,icon.url,author,category,downloads,updateDate&size=20&sort=-downloads")
                .then(r => r.json())
            window.history.replaceState({}, "", "/resources/search?q=" + query);
        } else {
            results = Promise.resolve([]);
            window.history.replaceState({}, "", "/resources/search");
        }
    }

    onMount(() => {
        query = $page.url.searchParams.get("q")
        if(query) {
            search();
        }
    });

    //await fetch("https://api.spiget.org/v2/search/resources/" + encodeURIComponent(query) + "?field=name&size=100&sort=-downloads").then(r => r.json());
</script>
<style>

</style>
<Input type="search" class="searchbox" placeholder="Search for Resources" on:keyup={keyUp} on:keydown={keyDown} bind:value={query}/>
<br>
{#if query}
    {#await results}
        Loading..
    {:then resources}
        {#each resources as resource (resource.id)}
            <Resource {resource}/>
        {:else}
            No results
        {/each}
    {/await}
{:else}
    Search something!
{/if}