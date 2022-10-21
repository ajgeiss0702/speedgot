<script>
    import Resource from "$lib/Resource.svelte";

    export let data;
</script>
<br>
{#each data.resources as resource (resource.id)}
    <Resource {resource}/>
{/each}