<script>
    export let data;
</script>
{#each data.updates as update}
    {update.title}<br>
{/each}