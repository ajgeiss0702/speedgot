<script>
    export let resource;
</script>
<style>
    a {
        background-color: #3a6581;
        color: white;
        border-radius: 6px;
        display: block;
        padding: 3px 10px;
        text-align: center;

        font-size: 13px;
        font-weight: 600;
        font-family: droid sans,Arial,sans-serif;
    }
    a:link {
        text-decoration: none;
    }
    a:hover {
        background-color: #ed8106;
    }
    .small {
        font-size: 11px;
        font-weight: 400;
    }
</style>
<a href={"https://spigotmc.org/" + resource.file.url}>
    Download Now
    <br>
    <span class="small">
        {#if resource.file.type === "external"}
            Via external site
        {:else}
            {resource.file.size} {resource.file.sizeUnit} {resource.file.type}
        {/if}
    </span>
</a>