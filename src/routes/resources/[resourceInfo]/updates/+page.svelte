<script>
    import {decodeBase64Content} from "$lib/utils";

    export let data;
</script>
<style>
    .container {
        border: 1px lightgray solid;
        border-radius: 12px;
    }
    .title {
        font-size: 1.25em;
        border-bottom: 1px lightgray solid;
    }

    .description {
        padding-bottom: 0.5em;
        max-height: 50vh;
        overflow-y: scroll;
    }

    @media (prefers-color-scheme: dark) {
        .container {
            border-color: dimgray;
        }
        .title {
            border-color: dimgray;
        }
    }
</style>
<br>
{#each data.updates as update}
    <div class="container">
        <div class="fw-bold title">
            {update.title}
        </div>
        <div class="bb-content description">
            {@html decodeBase64Content(update.description)}
        </div>
    </div>
    <br>
{/each}