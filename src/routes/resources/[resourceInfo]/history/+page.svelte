<script>
    import DateStamp from "$lib/DateStamp.svelte";
    import {commas} from "$lib/utils";
    import Stars from "$lib/Stars.svelte";

    export let data;
</script>
<style>
    th.download {
        color: rgba(0, 0, 0, 0);
    }
</style>
<table class="table">
    <tbody>
    <tr>
        <th class="version">Version</th>
        <th class="releaseDate">Release Date</th>
        <th class="downloads">Downloads</th>
        <th class="rating">Average Rating</th>
        <th class="download">Download Link</th>
    </tr>
        {#each data.versions as version (version.id)}
            <tr>
                <td class="version">{version.name}</td>
                <td class="releaseDate"><DateStamp epochSeconds={version.releaseDate}/></td>
                <td class="downloads">{commas(version.downloads)}</td>
                <td class="rating"><Stars rating={version.rating.average}/> {version.rating.count} ratings</td>
                <td class="download"><a href="https://api.spiget.org/v2/resources/{version.resource}/versions/{version.id}/download">Download</a></td>
            </tr>
        {/each}
    </tbody>
</table>