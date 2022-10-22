<script>
    import {decodeBase64Content} from "$lib/utils";

    export let data;
</script>
<svelte:head>
    <meta name="description" content={data.tag}>
</svelte:head>
<div class="bb-content">
    {@html decodeBase64Content(data.description)}
</div>