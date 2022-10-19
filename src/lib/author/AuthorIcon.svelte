<script>
    export let author;
</script>
<style>
    @media (prefers-color-scheme: dark) {
        .no-icon {
            background-color: rgba(255, 255, 255, 0.5);
        }
    }
</style>
{#if author.icon && author.icon.data}
    <img src={"data:image/png;base64," + author.icon.data} alt="{author.name} icon" height="64" width="64">
{:else if !author.icon || !author.icon.url || author.icon.url.includes("avatar_male_l")}
    <img src="/img/avatar_male_l.png" class="no-icon" alt="{author.name} icon" height="64" width="64"/>
{:else}
    <img src="/proxy/image?url={encodeURIComponent(author.icon.url)}" alt="{author.name} icon" height="64" width="64"/>
{/if}