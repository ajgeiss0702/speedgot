<script>
    import {onMount} from "svelte";
    import LoadingText from "$lib/LoadingText.svelte";

    export let id;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let fetchingPromise = new Promise(() => {});

    onMount(() => {
        fetchingPromise = fetch("https://api.spiget.org/v2/categories/" + id).then(r => r.json());
    });
</script>
{#await fetchingPromise}
    <LoadingText length={15}/>
{:then category}
    <span title="ID: {id}">{category.name}</span>
{:catch e}
    {@debug e}
    <span title="{e}">?</span>
{/await}