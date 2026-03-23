<script lang="ts">
    import {decodeBase64Content} from "$lib/utils";

    let { data } = $props();
</script>
<svelte:head>
    <meta name="description" content={data.tag}>
</svelte:head>
<div class="bb-content">
    {@html decodeBase64Content(data.description)}
</div>