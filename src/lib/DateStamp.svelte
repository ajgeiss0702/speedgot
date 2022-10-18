<script>
    import {onDestroy, onMount} from "svelte";

    export let epochSeconds;

    let secondsAgo;
    function updateSecondsAgo() {
        secondsAgo = (new Date().getTime() / 1000) - epochSeconds;
    }
    updateSecondsAgo();

    let updateInterval;
    onMount(() => {
        updateInterval = setInterval(() => {
            updateSecondsAgo();
        }, 15e3);
    });

    onDestroy(() => {
        clearInterval(updateInterval);
    })
</script>
{#if secondsAgo < 60 * 60}
    {secondsAgo / 60} mins ago
{:else}
    {new Date(epochSeconds * 1000)}
{/if}