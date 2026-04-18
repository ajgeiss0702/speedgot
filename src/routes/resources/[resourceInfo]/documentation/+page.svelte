<script lang="ts">
    import {decodeBase64Content} from "$lib/utils";

    let { data } = $props();
</script>
<svelte:head>
    <link rel="canonical" href="https://speedgot.ajg0702.us/resources/{data.id}/documentation">
</svelte:head>
<div class="bb-content">
    {@html decodeBase64Content(data.documentation)}
</div>