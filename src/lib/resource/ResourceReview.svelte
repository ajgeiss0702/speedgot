<script>
    import LoadingText from "$lib/LoadingText.svelte";
    import {decodeBase64Content} from "$lib/utils";
    import Stars from "$lib/Stars.svelte";
    import {getContext, onMount} from "svelte";
    import LazyLoad from "@dimfeld/svelte-lazyload";
    import AuthorIcon from "$lib/author/AuthorIcon.svelte";
    import DateStamp from "$lib/DateStamp.svelte";

    export let review;

    export let userLink = true;

    export let resourceName = false;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let resource = new Promise(() => {});

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let resourceAuthor = getContext("author") ? getContext("author").getAuthor() : false;



    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let userDetails = getContext("user") ? getContext("user").getUser() : false;

    function fetchUserDetails() {
        if(userDetails) return;
        userDetails = fetch("https://api.spiget.org/v2/authors/" + review.author.id).then(r => r.json());
    }

    function fetchAuthorDetails() {
        if(resourceAuthor) return;
        resourceAuthor = fetch("https://api.spiget.org/v2/resources/" + review.resource + "/author").then(r => r.json());
    }

    function fetchResourceName() {
        if(!resourceName) return;
        resource = fetch("https://api.spiget.org/v2/resources/" + review.resource + "?fields=name").then(r => r.json())
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
    .date {
        color: var(--bs-secondary);
        font-size: 0.75em;
    }
    .date > a:hover {
        text-decoration: underline;
    }
    .resource-name {
        font-size: 0.75em;
    }
    .author-response {
        margin-top: 0.75em;
    }
</style>
<LazyLoad height="0" on:visible={fetchUserDetails}/>
<div class="container" id="review-{review.id}">
    <div class="icon">
        {#if userDetails}
            {#await userDetails}
                <LoadingText circle/>
            {:then author}
                <AuthorIcon {author}/>
            {/await}
        {:else}
            <LazyLoad on:visible={fetchUserDetails}/>
        {/if}
    </div>
    <div class="right-part">
        {#if resourceName}
            <div class="resource-name">
                For
                {#if review.resource}
                    {#await resource}
                        <LoadingText length={25}/>
                    {:then resource}
                        {#if resource && resource.name}
                            <a href="/resources/{resource.id}">
                                {resource.name}
                            </a>
                        {:else}
                            [deleted]
                        {/if}
                    {:catch e}
                        [unknown - error]
                    {/await}
                    <LazyLoad on:visible={fetchResourceName}/>
                {:else}
                    [deleted]
                {/if}
            </div>
        {/if}
        <h5>
            {#if userDetails}
                {#await userDetails}
                    <LoadingText length={10}/>
                {:then author}
                    {#if userLink}
                        <a class="stealthLink" href="/users/{author.id}">
                            {author.name}
                        </a>
                    {:else}
                        {author.name}
                    {/if}
                {/await}
            {/if}
        </h5>
        <Stars rating={review.rating.average}/>
        <span class="version text-secondary">
            Version: {review.version}
        </span>
        <br>
        <div class="bb-content message">
            {@html decodeBase64Content(review.message)}
        </div>
        <div class="date">
            {#if review.resource}
                <a class="stealthLink" href="/resources/{review.resource}/reviews#review-{review.id}">
                    <DateStamp epochSeconds={review.date}/>
                </a>
            {:else}
                <DateStamp epochSeconds={review.date}/>
            {/if}
        </div>
        {#if review.responseMessage}
            <div class="container author-response">
                <div class="icon">
                    {#if resourceAuthor}
                        {#await resourceAuthor}
                            <LoadingText circle/>
                        {:then author}
                            <AuthorIcon {author}/>
                        {:catch e}
                            <AuthorIcon author={null}/>
                        {/await}
                    {:else}
                        <LazyLoad on:visible={fetchAuthorDetails}/>
                    {/if}
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

