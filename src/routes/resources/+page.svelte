<script>
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";

    onMount(() => {
        goto("/resources/page/1" + location.search);
    });
</script>