<script>
    export let rating;
    import "$lib/star.css";
</script>
<style>
    div {
        color: gold;
    }
</style>
<div title={rating}>
    <span class="full-star" class:empty-star={rating < 1}></span>
    <span class="full-star" class:empty-star={rating < 2}></span>
    <span class="full-star" class:empty-star={rating < 3}></span>
    <span class="full-star" class:empty-star={rating < 4}></span>
    <span class="full-star" class:empty-star={rating < 5}></span>
</div>