<script>
    export let resource;
</script>
<style>
    img {
        border-radius: 10px;
    }
    @media (prefers-color-scheme: dark) {
        .no-icon {
            background-color: rgba(255, 255, 255, 0.5);
        }
    }
</style>
{#if resource.icon && resource.icon.url}
    <img src={"data:image/png;base64," + resource.icon.data} alt="{resource.name} icon" height="64" width="64">
{:else}
    <img src="/img/resource_icon.png" class="no-icon" alt="{resource.name} icon" height="64" width="64"/>
{/if}