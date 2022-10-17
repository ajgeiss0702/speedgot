<svelte:head>
    <title>{data.name} - Speedgot</title>
</svelte:head>
<script>
    import '$lib/bbStyles.css';
    import DownloadButton from "$lib/resource/DownloadButton.svelte";
    import {onMount} from "svelte";

    export let data;

    function fromBinary(encoded) {
        const binary = atob(encoded);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < bytes.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return String.fromCharCode(...new Uint16Array(bytes.buffer));
    }

    onMount(() => {
        window.history.replaceState({}, "", "/resources/" + data.file.url.split("/")[1]);
    });
</script>
<style>

    div.boxes {
        max-width: 99vw;

        margin-left: auto;
        margin-right: auto;

        text-align: left;
    }

    div.leftBox {
        align-items: center;

        overflow-x: hidden;
        max-width: 100%;
        margin: 0 0 1em 0;
    }

    div.header {
        align-items: center;
        overflow-x: hidden;
        width: 100%;
    }

    .innerBox {
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 10px;
        width: 90%;
    }

    .title-container {
        max-width: 77%;
    }

    .title-container > h2 {
        margin-top: 0.25em;
        margin-bottom: -0.05em;
        width: 100%;
        display: inline-block;
    }

    .title-container > h2 >  .latest-version {
        color: #7f7f7f;
        font-weight: normal;
    }

    .title-overflow-prevention {
        display: inline-block;
        max-width: 75%;
        white-space: nowrap;
        overflow-x: hidden;
        margin-bottom: -0.2em;
    }

    @media (orientation: landscape) {
        div.header {
            display: inline-flex;
        }
        div.boxes {
            width: 1200px;
            display: flex;
            align-items: stretch;
        }
        div.leftBox {
            width: 75%;
            margin-right: 1em;
        }
        div.rightBox {
            width: 25%
        }
        div.title-container {
            padding-left: 1em
        }
        .right {
            margin-left: auto;
            justify-self: right;
        }
    }
</style>
<br>
<div class="boxes">
    <div class="leftBox shadowBox">
        <div class="header">
            {#if data.icon && data.icon.url}
                <img src={"data:image/png;base64," + data.icon.data} alt="{data.name} icon" height="64" width="64">
            {/if}
            <div class="title-container">
                <h2>
                    <span class="title-overflow-prevention">
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
        <br>
        <br>
        <div class="description">
            {@html atob(data.description).replaceAll("â", "").replace(/"\/\/proxy\.spigotmc\.org\/([^\s].*?)\?url=(.*?)"/g, "/proxy/image?url=$2")}
        </div>
    </div>
    <div class="rightBox">
        <div class="innerBox shadowBox">
            Stuff<br>
            and<br>
            things<br>
        </div>
    </div>
</div>
