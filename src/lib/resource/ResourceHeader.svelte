<script>
    import DownloadButton from "$lib/resource/DownloadButton.svelte";
    import ResourceIcon from "$lib/resource/ResourceIcon.svelte";
    import {getContext} from "svelte";
    import LoadingText from "$lib/LoadingText.svelte";

    export let data;

    let latestVersion = getContext("latestVersion");
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
    <ResourceIcon resource={data}/>
    <div class="title-container">
        <h2>
            <span class="title-overflow-prevention text-truncate" title={data.name}>
                {data.name}
            </span>
            <span class="latest-version">
                {#await latestVersion}
                    <LoadingText length={5}/>
                {:then version}
                    {version.name}
                {/await}
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