<script>
    import LoadingText from "$lib/LoadingText.svelte";
    import {decodeBase64Content} from "$lib/utils";
    import Stars from "$lib/Stars.svelte";
    import {getContext, onMount} from "svelte";
    import LazyLoad from "@dimfeld/svelte-lazyload";
    import AuthorIcon from "$lib/author/AuthorIcon.svelte";

    export let review;

    export let resource;

    let resourceAuthor = getContext("author").getAuthor();

    let i;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let authorDetails = new Promise(() => {});

    function fetchAuthorDetails() {
        authorDetails = fetch("https://api.spiget.org/v2/authors/" + review.author.id).then(r => r.json());
    }

</script>
<style>
    .container {
        display: inline-flex;
        align-items: center;
    }
    .icon {
        height: 64px;
        width: 64px;
        min-width: 64px;
        border-radius: 50%;
        overflow: hidden;
    }
    h5 {
        height: 1em;
        display: inline;
    }
    .message {
        font-size: 0.85em;
    }
    .right-part {
        margin-left: 0.5em;
    }
    .version {
        font-size: 0.9em;
    }
    .icon {
        margin-bottom: auto;
    }
</style>
<LazyLoad height="0" on:visible={fetchAuthorDetails}/>
<div class="container">
    <div class="icon">
        {#await authorDetails}
            <LoadingText circle/>
        {:then author}
            <AuthorIcon {author}/>
        {/await}
    </div>
    <div class="right-part">
        <h5>
            {#await authorDetails}
                <LoadingText length={10}/>
            {:then author}
                {author.name}
            {/await}
        </h5>
        <Stars rating={review.rating.average}/>
        <span class="version text-secondary">
            Version: {review.version}
        </span>
        <br>
        <div class="bb-content message">
            {@html decodeBase64Content(review.message)}
        </div>
        {#if review.responseMessage}
            <br>
            <div class="container">
                <div class="icon">
                    {#await resourceAuthor}
                        <LoadingText circle/>
                    {:then author}
                        <AuthorIcon {author}/>
                    {/await}
                </div>
                <div class="right-part">
                    <span class="author-response-header text-secondary">
                        Author's response
                    </span>
                    <br>
                    <div class="bb-content message">
                        {@html decodeBase64Content(review.responseMessage)}
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>

