<script lang="ts">
    import {decodeBase64Content} from "$lib/utils";
    import {getContext} from "svelte";
    import {error} from "@sveltejs/kit";
    import ResourceUpdate from "$lib/resource/ResourceUpdate.svelte";

    let { data } = $props();

    // for some reason, spiget can return updates from other plugins,
    // so we need to check that the resulting update is from the correct plugin
    if(getContext("resourceId") !== data.resource) {
        throw error(404, "Update not found");
    }
</script>
<svelte:head>
    <link rel="canonical" href="https://speedgot.ajg0702.us/resources/{data.resource}/updates/{data.id}">
</svelte:head>
<style>
    .container {
        padding-top: 0.5em;
    }
</style>
<div class="container">
    <ResourceUpdate update={data}/>
</div>