<script lang="ts">
    import ResourceUpdate from "$lib/resource/ResourceUpdate.svelte";

    let { data } = $props();
</script>
<svelte:head>
    <link rel="canonical" href="https://speedgot.ajg0702.us/resources/{data.id}/updates">
</svelte:head>
<style>
    .container {
        border: 1px lightgray solid;
        border-radius: 12px;
    }
</style>
<br>
{#each data.updates as update}
    <div class="container">
        <ResourceUpdate update={update} inline={true} link={true}/>
    </div>
    <br>
{/each}