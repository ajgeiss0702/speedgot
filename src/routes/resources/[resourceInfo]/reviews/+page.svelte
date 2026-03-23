<script lang="ts">
    import ResourceReview from "$lib/resource/ResourceReview.svelte";

    let { data } = $props();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const emptyPromise = new Promise(() => {})
</script>
<br/>
{#each data.reviews as review}
    <ResourceReview {review} resource={data}/>
    <hr/>
{/each}