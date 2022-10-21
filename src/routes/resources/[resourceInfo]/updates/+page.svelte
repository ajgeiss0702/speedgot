<script>
    import ResourceUpdate from "$lib/resource/ResourceUpdate.svelte";

    export let data;
</script>
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