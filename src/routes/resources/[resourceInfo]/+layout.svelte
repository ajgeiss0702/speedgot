<svelte:head>
    <title>{data.name} - Speedgot</title>
</svelte:head>
<script>
    import '$lib/css/bbStyles.css';
    import {onMount, setContext} from "svelte";
    import {Button, Icon, Nav, NavItem, NavLink} from "sveltestrap";
    import ResourceInfo from "$lib/resource/ResourceInfo.svelte";
    import VersionInfo from "$lib/resource/VersionInfo.svelte";
    import ResourceHeader from "$lib/resource/ResourceHeader.svelte";
    import {page} from "$app/stores";
    import LoadingText from "$lib/LoadingText.svelte";

    export let data;

    setContext("resourceId", data.id);

    let setAuthor = () => {console.warn("premature setAuthor!")};
    let rejectAuthor = () => {console.warn("premature rejectAuthor!")};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let author = new Promise((resolve, reject) => {
        setAuthor = resolve;
        rejectAuthor = reject;
    });
    setContext("author", {
        getAuthor: () => author,
        setAuthor: a => setAuthor(a),
        rejectAuthor: e => rejectAuthor(e)
    });

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
        .sticky-info {
            position: -webkit-sticky;
            position: sticky;
            top: 0.5em;
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
            {#if data.documentation}
                <NavItem>
                    <NavLink href="/resources/{slug}/documentation" active={$page.url.pathname.endsWith("documentation")}>Documentation</NavLink>
                </NavItem>
            {/if}
            <NavItem>
                <NavLink href="/resources/{slug}/updates" active={$page.url.pathname.endsWith("updates") || ($page.url.pathname.includes("updates") && $page.params.updateId)}>
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
                <NavLink href={"https://spigotmc.org/" + data.links.discussion} target="_blank">Discussion <Icon name="box-arrow-up-right"/></NavLink>
            </NavItem>
        </Nav>
        <div class="description">
            <slot/>
        </div>
    </div>
    <div class="rightBox">
        <div class="sticky-info">
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

            {#if data.links.alternativeSupport}
                <div class="innerBox center">
                    <Button small class="innerBox" outline color="info" href="{data.links.alternativeSupport}" target="_blank">Ask Questions / Get Support</Button>
                </div>
            {/if}
        </div>
    </div>
</div>
