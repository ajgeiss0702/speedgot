<svelte:head>
    <title>{data.name} - Speedgot</title>
</svelte:head>
<script>
    import '$lib/bbStyles.css';
    import DownloadButton from "$lib/resource/DownloadButton.svelte";
    import {onMount} from "svelte";
    import {Button} from "sveltestrap";
    import {commas} from "$lib/utils";
    import LoadingText from "$lib/LoadingText.svelte";
    import Stars from "$lib/Stars.svelte";

    export let data;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let authorInfoPromise = new Promise(() => {});

    let description = atob(data.description).replaceAll("â", "").replace(/"\/\/proxy\.spigotmc\.org\/([^\s].*?)\?url=(.*?)"/g, "/proxy/image?url=$2");

    const slug = data.file.url.split("/")[1];
    onMount(() => {
        if(slug.includes(".")) {
            window.history.replaceState({}, "", "/resources/" + slug);
        } else {
            console.warn("Slug (" + slug + ") does not contain a dot! Might be invalid");
        }

        for (let spoilerButton of document.getElementsByClassName("bbCodeSpoilerButton")) {
            spoilerButton.onclick = () => {
                spoilerButton.nextElementSibling.classList.toggle("bbCodeSpoilerText");
            }
        }

        authorInfoPromise = fetch("https://api.spiget.org/v2/authors/" + data.author.id).then(r => r.json());

        //import bbCodeParser from 'js-bbcode-parser';
        /*let url = "https://api.spigotmc.org/simple/0.2/index.php?action=getResource&id=" + data.id;
        console.log(url)
        fetch("/proxy/image?url=" + encodeURIComponent(url))
            .then(r => r.json())
            .then(resource => {
                if(!resource.description) {
                    console.dir(resource);
                    throw new Error("No description from spigot api response!");
                }
                description = bbCodeParser.parse(resource.description);
            })
            .catch(e => {
                console.error(e);
            })*/

    });
</script>
<style>

    div.center {
        text-align: center;
    }
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
        overflow: hidden;
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
    .withTitle {
        padding: 0;
    }
    .withTitle > .content {
        padding: 0.25em 1em 0.5em;
        font-size: 13px;
    }
    .withTitle > .title {
        background-color: rgba(var(--bs-warning-rgb), 1);
        color: black;
    }

    .left-text {
        text-align: left;
    }

    .key-values {
        display: flex;
    }
    .key-values > .value {
        margin-left: auto;
        justify-self: right;
    }

    .key-values > .value > div {
        text-align: right;
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
        .title-container {
            max-width: 77%;
        }
        .title-overflow-prevention {
            display: inline-block;
            max-width: 75%;
            white-space: nowrap;
            overflow-x: hidden;
            margin-bottom: -0.2em;
        }
    }
</style>
<div class="boxes">
    <div class="leftBox shadowBox">
        <div class="header">
            {#if data.icon && data.icon.url}
                <img src={"data:image/png;base64," + data.icon.data} alt="{data.name} icon" height="64" width="64">
            {:else}
                <img src="/img/resource_icon.png" alt="{data.name} icon" height="64" width="64"/>
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
            {@html description}
        </div>
    </div>
    <div class="rightBox">
        <div class="innerBox center">
            <Button small class="innerBox" outline color="warning" href="https://spigotmc.org/resources/{slug}" target="_blank">View on SpigotMC</Button>
        </div>
        <div class="innerBox shadowBox center withTitle">
            <div class="title">
                Resource Information
            </div>
            <div class="content left-text">
                <div class="key-values">
                    <span class="key">Author:</span>
                    <div class="value">
                        {#await authorInfoPromise}
                            <LoadingText/>
                        {:then author}
                            {author.name}
                        {/await}
                    </div>
                </div>
                <div class="key-values">
                    <span class="key">Total Downloads:</span>
                    <span class="value">{commas(data.downloads)}</span>
                </div>
                <div class="key-values">
                    <span class="key">First Release:</span>
                    <span class="value">{data.releaseDate}</span>
                </div>
                <div class="key-values">
                    <span class="key">Last Update:</span>
                    <span class="value">{data.updateDate}</span>
                </div>
                <div class="key-values">
                    <span class="key">Category:</span>
                    <span class="value">{data.category}</span>
                </div>
                <div class="key-values">
                    <span class="key">All-Time Rating:</span>
                    <div class="value">
                        <Stars rating={data.rating.average}/>
                        <div>{data.rating.count} ratings</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="innerBox shadowBox center withTitle">
            <div class="title">
                Version {data.latestResourceVersion.name}
            </div>
            <div class="content left-text">
                <div class="key-values">
                    <span class="key">Released:</span>
                    <span class="value">{data.latestResourceVersion.releaseDate}</span>
                </div>
                <div class="key-values">
                    <span class="key">Downloads:</span>
                    <span class="value">{commas(data.latestResourceVersion.downloads)}</span>
                </div>
                <div class="key-values">
                    <span class="key">Version Rating:</span>
                    <div class="value">
                        <Stars rating={data.latestResourceVersion.rating.average}/>
                        <div>{data.latestResourceVersion.rating.count} ratings</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
