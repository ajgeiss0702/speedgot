<script>
    import ResourceReview from "$lib/resource/ResourceReview.svelte";

    export let data;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const emptyPromise = new Promise(() => {})
</script>
<br/>
{#each data.reviews as review}
    <ResourceReview {review} resource={data}/>
    <hr/>
{/each}