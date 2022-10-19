<script>
    import DownloadButton from "$lib/resource/DownloadButton.svelte";

    export let data;
</script>
<style>
    .container {
        align-items: center;
        overflow-x: hidden;
        width: 100%;
    }

    .latest-version {
        color: #7f7f7f;
        font-weight: normal;
    }

    @media (orientation: landscape) {
        .container {
            display: inline-flex;
        }
        .title-container {
            padding-left: 1em
        }
        .right {
            margin-left: auto;
            justify-self: right;
        }
        .title-container {
            max-width: 77%;
        }
        .title-overflow-prevention {
            display: inline-block;
            max-width: 86%;
            white-space: nowrap;
            overflow-x: hidden;
            margin-bottom: -0.2em;
        }
    }
    @media (orientation: portrait) {
        .container {
            text-align: center;
        }
    }
</style>
<div class="container">
    {#if data.icon && data.icon.url}
        <img src={"data:image/png;base64," + data.icon.data} alt="{data.name} icon" height="64" width="64">
    {:else}
        <img src="/img/resource_icon.png" alt="{data.name} icon" height="64" width="64"/>
    {/if}
    <div class="title-container">
        <h2>
        <span class="title-overflow-prevention text-truncate">
            {data.name}
        </span>
            <span class="latest-version">
            {data.latestResourceVersion.name}
        </span>
        </h2>
        <span class="tag">
        {data.tag}
    </span>
    </div>
    <br>
    <div class="right">
        <DownloadButton resource={data}/>
    </div>
</div>