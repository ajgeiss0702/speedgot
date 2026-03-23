<script lang="ts">
    import Resource from "$lib/Resource.svelte";

    let { data } = $props();
</script>
<br>
{#each data.resources as resource (resource.id)}
    <Resource {resource}/>
{/each}