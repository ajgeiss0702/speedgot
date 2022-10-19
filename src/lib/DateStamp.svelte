<script>
    import {onDestroy, onMount} from "svelte";
    import {shortMonths, dateString} from "$lib/utils";

    export let epochSeconds;

    let date = new Date(epochSeconds * 1000);

    let secondsAgo;
    function updateSecondsAgo() {
        secondsAgo = (new Date().getTime() / 1000) - epochSeconds;
    }
    updateSecondsAgo();

    let updateInterval;
    onMount(() => {
        updateSecondsAgo();
        if(secondsAgo < 60 * 60) {
            updateInterval = setInterval(() => {
                updateSecondsAgo();
            }, 15e3);
        }
    });

    onDestroy(() => {
        clearInterval(updateInterval);
    })
</script>
<style>
    div {
        display: inline-block;
    }
</style>
<div title="{shortMonths[date.getMonth()]} {date.getDate()}, {date.getFullYear()} at {dateString(date, false)}">
    {#if secondsAgo < 60 * 60}
        {Math.round(secondsAgo / 60)} mins ago
    {:else}
        {shortMonths[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
    {/if}
</div>