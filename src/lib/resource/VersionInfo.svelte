<script>
    import {commas} from "$lib/utils";
    import Stars from "$lib/Stars.svelte";
    import DateStamp from "$lib/DateStamp.svelte";
    import {getContext} from "svelte";
    import LoadingText from "$lib/LoadingText.svelte";

    export let data;

    let latestVersion = getContext("latestVersion");
</script>

<div class="key-values">
    <span class="key">Released:</span>
    <span class="value">
        {#await latestVersion}
            <LoadingText length={20}/>
        {:then version}
            <DateStamp epochSeconds={version.releaseDate}/>
        {/await}
    </span>
</div>
<div class="key-values">
    <span class="key">Downloads:</span>
    <span class="value">
        {#await latestVersion}
            <LoadingText length={6}/>
        {:then version}
            {commas(version.downloads)}
        {/await}
    </span>
</div>
<div class="key-values">
    <span class="key">Version Rating:</span>
    <div class="value">
        {#await latestVersion}
            <LoadingText length={22}/>
            <div><LoadingText length={2}/> ratings</div>
        {:then version}
            <Stars rating={version.rating.average} size="1.5em"/>
            <div>{version.rating.count} ratings</div>
        {/await}

    </div>
</div>