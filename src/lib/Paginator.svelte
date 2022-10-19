<script>
    import {Pagination, PaginationItem, PaginationLink} from "sveltestrap";
    import {page} from "$app/stores"

    export let pageNumber;
</script>
<Pagination class="pagesNav">
    <PaginationItem disabled={pageNumber === 1}>
        <PaginationLink first href="1{$page.url.search}"/>
    </PaginationItem>
    <PaginationItem disabled={pageNumber === 1}>
        <PaginationLink previous href={String(Math.max(pageNumber - 1, 1)) + $page.url.search}/>
    </PaginationItem>
    {#if pageNumber > 1}
        {#if pageNumber > 2}
            <PaginationItem>
                <PaginationLink href={String(Math.max(pageNumber - 2, 1)) + $page.url.search}>{Math.max(pageNumber - 2, 1)}</PaginationLink>
            </PaginationItem>
        {/if}
        <PaginationItem>
            <PaginationLink href={String(Math.max(pageNumber - 1, 1)) + $page.url.search}>{Math.max(pageNumber - 1, 1)}</PaginationLink>
        </PaginationItem>
    {/if}
    <PaginationItem active>
        <PaginationLink href={String(pageNumber) + $page.url.search}>{pageNumber}</PaginationLink>
    </PaginationItem>
    <PaginationItem>
        <PaginationLink href={String(pageNumber + 1) + $page.url.search}>{pageNumber + 1}</PaginationLink>
    </PaginationItem>
    <PaginationItem>
        <PaginationLink href={String(pageNumber + 2) + $page.url.search}>{pageNumber + 2}</PaginationLink>
    </PaginationItem>
    <PaginationItem>
        <PaginationLink next href={String(pageNumber + 1) + $page.url.search}/>
    </PaginationItem>
</Pagination>