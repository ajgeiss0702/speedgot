<script>
    import {commas} from "$lib/utils";
    import {Icon} from "sveltestrap";

    import ResourceIcon from "$lib/resource/ResourceIcon.svelte";
    import Stars from "$lib/Stars.svelte";
    import DateStamp from "$lib/DateStamp.svelte";

    export let resource;
</script>
<style>
    a {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    .shadowBox {
        margin-bottom: 1em;
    }
    a:link, a:visited {
        text-decoration: inherit;
        color: inherit;
    }
    div.header {
        display: flex;
        text-align: left;
    }
    div.title-container {
        padding-left: 1em
    }
    .right {
        margin-left: auto;
        justify-self: right;
        vertical-align: middle;
        text-align: right;
    }
    .title-container {
        max-width: 77%;
    }
    .title-overflow-prevention {
        display: inline-block;
        max-width: 100%;
        white-space: nowrap;
        overflow-x: hidden;
        margin-bottom: -0.2em;
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
        a {
            max-width: 60vw;
        }
    }
    @media (orientation: portrait) {
        .right {
            display: none;
        }
    }
</style>
<a href="/resources/{resource.id}">
    <div class="shadowBox header">
        <ResourceIcon {resource}/>
        <div class="title-container">
            <h2>
            <span class="title-overflow-prevention text-truncate" title={resource.name}>
                {resource.name}
            </span>
                <span class="latest-version">
                <!--{resource.latestResourceVersion.name} -->
                </span>
            </h2>
            <span class="tag">
            {resource.tag}
        </span>
        </div>
        <br>
        <div class="right">
            <Icon name="download"/> {commas(resource.downloads)}
            <br>
            <Stars rating={resource.rating.average}/>
            <span class="align-top">({resource.rating.count})</span>
            <br>
            <span class="text-secondary small-text">Updated: </span>
            <span class="small-text"><DateStamp epochSeconds={resource.updateDate}/></span>
        </div>
    </div>
</a>