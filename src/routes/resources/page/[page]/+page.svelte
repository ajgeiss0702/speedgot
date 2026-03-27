<svelte:head>
    <title>Resources - Speedgot</title>
</svelte:head>
<script lang="ts">
    import Resource from "$lib/Resource.svelte";

    let { data } = $props();
</script>
{#each data.resources as resource (resource.id)}
    <Resource {resource}/>
{/each}