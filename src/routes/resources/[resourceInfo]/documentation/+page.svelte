<script lang="ts">
    import {decodeBase64Content} from "$lib/utils";

    let { data } = $props();
</script>
<div class="bb-content">
    {@html decodeBase64Content(data.documentation)}
</div>