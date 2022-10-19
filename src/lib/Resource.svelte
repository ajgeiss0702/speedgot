<script>
    import {commas} from "$lib/utils";
    import {Icon} from "sveltestrap";

    import 'bootstrap-icons/font/bootstrap-icons.css';
    import ResourceIcon from "$lib/resource/ResourceIcon.svelte";

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
    .resource-icon {
        border-radius: 10px;
    }
    @media (orientation: landscape) {
        a {
            max-width: 60vw;
        }
    }
    @media (prefers-color-scheme: dark) {
        .no-icon {
            background-color: rgba(255, 255, 255, 0.5);
        }
    }
</style>
<a href="/resources/{resource.id}">
    <div class="shadowBox header">
        <ResourceIcon {resource}/>
        <div class="title-container">
            <h2>
            <span class="title-overflow-prevention">
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
        <div class="downloadCount right">
            <Icon name="download"/> {commas(resource.downloads)}
        </div>
    </div>
</a>