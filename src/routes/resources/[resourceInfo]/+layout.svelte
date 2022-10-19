<svelte:head>
    <title>{data.name} - Speedgot</title>
</svelte:head>
<script>
    import '$lib/bbStyles.css';
    import {onMount} from "svelte";
    import {Button, Nav, NavItem, NavLink} from "sveltestrap";
    import ResourceInfo from "$lib/resource/ResourceInfo.svelte";
    import VersionInfo from "$lib/resource/VersionInfo.svelte";
    import ResourceHeader from "$lib/resource/ResourceHeader.svelte";
    import {page} from "$app/stores";
    import LoadingText from "$lib/LoadingText.svelte";

    export let data;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let updateCountPromise = new Promise(() => {});
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let reivewCountPromise = new Promise(() => {});

    const slug = data.file.url.split("/")[1];
    onMount(() => {
        if(slug.includes(".")) {
            if($page.url.pathname.split("/").length === 3) {
                window.history.replaceState({}, "", "/resources/" + slug);
            }
        } else {
            console.warn("Slug (" + slug + ") does not contain a dot! Might be invalid");
        }

        for (let spoilerButton of document.getElementsByClassName("bbCodeSpoilerButton")) {
            spoilerButton.onclick = () => {
                spoilerButton.nextElementSibling.classList.toggle("bbCodeSpoilerText");
            }
        }

        updateCountPromise = fetch("https://api.spiget.org/v2/resources/" + data.id + "/updates?size=100000&fields=id").then(r => r.json());
        reivewCountPromise = fetch("https://api.spiget.org/v2/resources/" + data.id + "/reviews?size=100000&fields=date").then(r => r.json());

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

    @media (orientation: landscape) {
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
    }

    :global(.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active) {
        background-color: rgba(0, 0, 0, 0);
        border-bottom: 1px solid rgb(247, 247, 247);
    }
    @media (prefers-color-scheme: dark) {
        :global(.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active) {
            color: white;
            border-bottom: 1px solid rgb(45, 45, 45);
        }
    }
</style>
<div class="boxes">
    <div class="leftBox shadowBox">
        <ResourceHeader {data}/>
        <br>
        <br>
        <Nav tabs>
            <NavItem>
                <NavLink href="/resources/{slug}" active={$page.url.pathname.split("/").length === 3}>Overview</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/resources/{slug}/updates" active={$page.url.pathname.endsWith("updates")}>
                    Updates
                    {#await updateCountPromise}
                        (<LoadingText length={2}/>)
                    {:then updates}
                        ({updates.length})
                    {:catch e}
                            &nbsp;
                    {/await}
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/resources/{slug}/reviews" active={$page.url.pathname.endsWith("reviews")}>
                    Reviews
                    {#await reivewCountPromise}
                        (<LoadingText length={3}/>)
                    {:then reviews}
                        ({reviews.length})
                    {:catch e}
                        &nbsp;
                    {/await}
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/resources/{slug}/history" active={$page.url.pathname.endsWith("history")}>Version History</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href={"https://spigotmc.org/" + data.links.discussion} target="_blank">Discussion</NavLink>
            </NavItem>
        </Nav>
        <div class="description">
            <slot/>
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
                <ResourceInfo {data}/>
            </div>
        </div>

        <div class="innerBox shadowBox center withTitle">
            <div class="title">
                Version {data.latestResourceVersion.name}
            </div>
            <div class="content left-text">
                <VersionInfo {data}/>
            </div>
        </div>
    </div>
</div>
