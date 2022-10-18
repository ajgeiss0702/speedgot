<svelte:head>
    <title>Resources - Speedgot</title>
</svelte:head>
<script>
    import Resource from "$lib/Resource.svelte";

    export let data;
</script>
{#each Object.keys(data) as resource (data[resource].id)}
    <Resource resource={data[resource]}/>
{/each}