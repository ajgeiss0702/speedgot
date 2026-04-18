<script lang="ts">
    import Resource from "$lib/Resource.svelte";

    let { data } = $props();
</script>
<svelte:head>
    <link rel="canonical" href="https://speedgot.ajg0702.us/users/{data.user.id}/resources">
</svelte:head>
<br>
{#each data.resources as resource (resource.id)}
    <Resource {resource}/>
{/each}