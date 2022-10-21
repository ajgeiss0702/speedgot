<script>
    import ResourceReview from "$lib/resource/ResourceReview.svelte";

    export let data;
</script>
<br>
{#each data.reviews as review (review.id)}
    <ResourceReview {review} resourceName={true} userLink={false}/>
    <hr>
{/each}