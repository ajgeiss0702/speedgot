<script>
    import {Pagination, PaginationItem, PaginationLink} from "sveltestrap";

    export let pageNumber;
</script>
<Pagination class="pagesNav">
    <PaginationItem disabled={pageNumber === 1}>
        <PaginationLink first href="1"/>
    </PaginationItem>
    <PaginationItem disabled={pageNumber === 1}>
        <PaginationLink previous href={String(Math.max(pageNumber - 1, 1))}/>
    </PaginationItem>
    {#if pageNumber > 1}
        {#if pageNumber > 2}
            <PaginationItem>
                <PaginationLink href={String(Math.max(pageNumber - 2, 1))}>{Math.max(pageNumber - 2, 1)}</PaginationLink>
            </PaginationItem>
        {/if}
        <PaginationItem>
            <PaginationLink href={String(Math.max(pageNumber - 1, 1))}>{Math.max(pageNumber - 1, 1)}</PaginationLink>
        </PaginationItem>
    {/if}
    <PaginationItem active>
        <PaginationLink href={String(pageNumber)}>{pageNumber}</PaginationLink>
    </PaginationItem>
    <PaginationItem>
        <PaginationLink href={String(pageNumber + 1)}>{pageNumber + 1}</PaginationLink>
    </PaginationItem>
    <PaginationItem>
        <PaginationLink href={String(pageNumber + 2)}>{pageNumber + 2}</PaginationLink>
    </PaginationItem>
    <PaginationItem>
        <PaginationLink next href={String(pageNumber + 1)}/>
    </PaginationItem>
</Pagination>