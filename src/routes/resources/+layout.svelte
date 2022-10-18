<script>
    import { page } from '$app/stores';
    import Paginator from "$lib/Paginator.svelte";
    import {Input, Label} from "sveltestrap";
    import {goto} from "$app/navigation";

    let pageNumber = Number($page.params.page);
    $: pageNumber = Number($page.params.page);

    let sort = $page.url.searchParams.get("sort") || "updateDate";
</script>
{#if !isNaN(pageNumber)}

    {#if pageNumber === 1}
        <Label for="sortSelect">Sort by:</Label>
        <Input type="select" name="sortSelect" id="sortSelect" class="inline" bind:value={sort} on:change={e => {
            goto(pageNumber + "?sort=" + e.target.value)
        }}>
            <option value="updateDate">Update Date</option>
            <option value="releaseDate">Release Date</option>
            <option value="downloads">Downloads</option>
        </Input>
    {/if}
    <br>
    <Paginator {pageNumber}/>
{/if}
<slot/>
{#if !isNaN(pageNumber)}
    <Paginator {pageNumber}/>
{/if}