<svelte:head>
    <title>{data.name} - Speedgot</title>
</svelte:head>
<script>
    import '$lib/bbStyles.css';
    import DownloadButton from "$lib/resource/DownloadButton.svelte";
    import {onMount} from "svelte";

    export let data;

    let description = atob(data.description).replaceAll("â", "").replace(/"\/\/proxy\.spigotmc\.org\/([^\s].*?)\?url=(.*?)"/g, "/proxy/image?url=$2");

    onMount(() => {
        const slug = data.file.url.split("/")[1];
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
<br>
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
        <div class="innerBox shadowBox">
            Stuff<br>
            and<br>
            things<br>
        </div>
    </div>
</div>
