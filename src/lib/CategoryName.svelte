<script lang="ts">
    import {onMount} from "svelte";
    import LoadingText from "$lib/LoadingText.svelte";

    let { id } = $props();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let fetchingPromise = $state(new Promise(() => {}));

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