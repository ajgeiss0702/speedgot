<script lang="ts">
    import ResourceReview from "$lib/resource/ResourceReview.svelte";

    let { data } = $props();
</script>
<svelte:head>
    <meta name="canonical" content="https://speedgot.ajg0702.us/users/{data.user.id}/reviews">
</svelte:head>
<br>
{#each data.reviews as review (review.id)}
    <ResourceReview {review} resourceName={true} userLink={false}/>
    <hr>
{/each}