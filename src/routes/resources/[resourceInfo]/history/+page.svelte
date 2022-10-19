<script>
    export let data;
</script>
{#each data.versions as version}
    {version.name}<br>
{/each}