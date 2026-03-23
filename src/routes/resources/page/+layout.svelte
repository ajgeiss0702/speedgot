<script lang="ts">
    import { run } from 'svelte/legacy';

    import { page } from '$app/stores';
    import Paginator from "$lib/Paginator.svelte";
    import {Input, Label} from "@sveltestrap/sveltestrap";
    import {goto} from "$app/navigation";
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();

    let pageNumber = $state(Number($page.params.page));
    run(() => {
        pageNumber = Number($page.params.page);
    });

    let sort = $state($page.url.searchParams.get("sort") || "updateDate");
</script>
<style>
    .paginator-wrapper {
        display: flex;
    }
    .sortBy {
        display: inline-block;
        margin-left: auto
    }

    @media (orientation: landscape) {
        .paginator-wrapper {
            max-width: 60vw;
            margin-left: auto;
            margin-right: auto;
        }
    }
</style>
{#if !isNaN(pageNumber)}
    <h1>Resources</h1>
    <br>
    <div class="paginator-wrapper">
        <Paginator {pageNumber}/>
        {#if pageNumber === 1}
            <div class="sortBy">
                <Label for="sortSelect">Sort by:</Label>
                <Input type="select" name="sortSelect" id="sortSelect" class="form-select-sm inline" bind:value={sort} on:change={e => {
            goto(pageNumber + "?sort=" + e.target.value)
        }}>
                    <option value="updateDate">Update Date</option>
                    <option value="releaseDate">Release Date</option>
                    <option value="downloads">Downloads</option>
                </Input>
            </div>
        {/if}
    </div>
{/if}
{@render children?.()}
{#if !isNaN(pageNumber)}

    <div class="paginator-wrapper">
        <Paginator {pageNumber}/>
    </div>
{/if}