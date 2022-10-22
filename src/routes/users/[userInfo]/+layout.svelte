<svelte:head>
    <title>{data.user.name} - Speedgot</title>
</svelte:head>
<script>
    import {Nav, NavItem, NavLink} from "sveltestrap";
    import {page} from "$app/stores";
    import {getContext, onMount, setContext} from "svelte";
    import AuthorIcon from "$lib/author/AuthorIcon.svelte";
    import LoadingText from "$lib/LoadingText.svelte";

    export let data;

    let resourceCount = new Promise(() => {});

    setContext("user", {
        getUser: () => data.user
    });

    const slug = data.user.name.replace(/[^a-zA-Z0-9-_]/g, '') + "." + data.user.id;
    onMount(() => {
        if(slug.includes(".")) {
            if($page.url.pathname.split("/").length === 3) {
                window.history.replaceState({}, "", "/users/" + slug);
            }
        } else {
            console.warn("Slug (" + slug + ") does not contain a dot! Might be invalid");
        }

        resourceCount = fetch("/proxy/image?url=" + encodeURIComponent("https://api.spigotmc.org/simple/0.2/index.php?action=getAuthor&id=" + data.user.id)).then(r => r.json());
    })
</script>
<style>

    .name {
        font-size: 2em;
        line-height: 2em;
        padding-left: 0.5em;
    }

    .box {
        max-width: 99vw;

        margin-left: auto;
        margin-right: auto;

        text-align: left;
    }

    .icon {
        display: inline-block;
        border-radius: 12px;
        overflow: hidden;
    }

    .header {
        display: flex;
        vertical-align: center;
    }

    @media (orientation: landscape) {
        .box {
            width: 1200px;
            max-width: 99vw;
        }
    }
</style>
<div class="shadowBox box">
    <div class="header">
        <span class="icon"><AuthorIcon author={data.user}/></span>
        <span class="name">{data.user.name}</span>
    </div>

    <br>

    <Nav tabs>
        <NavItem>
            <NavLink href="/users/{slug}" active={$page.url.pathname.split("/").length === 3}>Identities</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="/users/{slug}/resources" active={$page.url.pathname.endsWith("resources")}>
                Resources
                {#await resourceCount}
                    (<LoadingText length={2}/>)
                {:then count}
                    ({count.resource_count})
                {/await}
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="/users/{slug}/reviews" active={$page.url.pathname.endsWith("reviews")}>Reviews</NavLink>
        </NavItem>
    </Nav>
    <slot {slug}/>
</div>