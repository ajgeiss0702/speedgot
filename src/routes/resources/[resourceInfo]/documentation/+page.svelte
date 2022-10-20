<script>
    import {decodeBase64Content} from "$lib/utils";

    export let data;
</script>
<div class="bb-content">
    {@html decodeBase64Content(data.documentation)}
</div>