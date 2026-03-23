<script lang="ts">
    import ResourceReview from "$lib/resource/ResourceReview.svelte";

    let { data } = $props();
</script>
<br>
{#each data.reviews as review (review.id)}
    <ResourceReview {review} resourceName={true} userLink={false}/>
    <hr>
{/each}