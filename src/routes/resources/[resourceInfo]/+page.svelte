<script>
    import {decodeBase64Content} from "$lib/utils";

    export let data;
</script>
{@html decodeBase64Content(data.description)}