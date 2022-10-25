<svelte:head>
    <title>Resource Search - Speedgot</title>
</svelte:head>
<script>
    import Resource from "$lib/Resource.svelte";
    import {Input} from "sveltestrap";
    import {page} from "$app/stores";
    import {onMount} from "svelte";

    let query;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let results = new Promise(() => {});

    $: if(!query) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        results = new Promise(() => {});
    }

    let timeout;

    function keyDown() {
        clearTimeout(timeout);
    }
    function keyUp() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            search()
        }, 400);
    }

    function search() {
        results = fetch("https://api.spiget.org/v2/search/resources/" + encodeURIComponent(query) + "?field=name&size=20&sort=-downloads").then(r => r.json())
        if(query) {
            window.history.replaceState({}, "", "/resources/search?q=" + query);
        } else {
            window.history.replaceState({}, "", "/resources/search");
        }
    }

    onMount(() => {
        $page.url.searchParams.get("q")
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