<script lang="ts">
    import {onDestroy, onMount} from "svelte";
    import {shortMonths, dateString, isSameDay, yesterday} from "$lib/utils";

    let { epochSeconds } = $props();

    let date = $state(new Date(epochSeconds * 1000));

    let secondsAgo = $state();
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
        } else if(isSameDay(new Date(), date) || isSameDay(yesterday(), date)) {
            updateInterval = setInterval(() => {
                date = date; // tell svelte to re-evaluate isSameDay ifs below
            }, 60 * 60e3);
        }
    });

    onDestroy(() => {
        clearInterval(updateInterval);
    })
</script>
<span title="{shortMonths[date.getMonth()]} {date.getDate()}, {date.getFullYear()} at {dateString(date, false)}">
    {#if secondsAgo < 60 * 60}
        {Math.round(secondsAgo / 60)} mins ago
    {:else if isSameDay(new Date(), date)}
        Today at {dateString(date, false)}
    {:else if isSameDay(yesterday(), date)}
        Yesterday at {dateString(date, false)}
    {:else}
        {shortMonths[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
    {/if}
</span>