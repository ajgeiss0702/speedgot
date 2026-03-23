<svelte:head>
    <title>Resources - Speedgot</title>
</svelte:head>
<script lang="ts">
    import Resource from "$lib/Resource.svelte";

    let { data } = $props();
</script>
{#each Object.keys(data) as resource (data[resource].id)}
    <Resource resource={data[resource]}/>
{/each}