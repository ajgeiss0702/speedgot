<script>
    import {commas} from "$lib/utils";
    import Stars from "$lib/Stars.svelte";

    export let data;
</script>

<div class="key-values">
    <span class="key">Released:</span>
    <span class="value">{data.latestResourceVersion.releaseDate}</span>
</div>
<div class="key-values">
    <span class="key">Downloads:</span>
    <span class="value">{commas(data.latestResourceVersion.downloads)}</span>
</div>
<div class="key-values">
    <span class="key">Version Rating:</span>
    <div class="value">
        <Stars rating={data.latestResourceVersion.rating.average}/>
        <div>{data.latestResourceVersion.rating.count} ratings</div>
    </div>
</div>