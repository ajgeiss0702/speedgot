<script>
    export let rating = 5;
    export let size = "1em";
    import "$lib/css/star.css";

    rating = Math.round(rating * 1000) / 1000;

    let one = rating >= 1 || rating === 0 ? "" : css(rating);
    let two = rating >= 2 || rating <= 1 ? "" : css(rating - 1);
    let three = rating >= 3 || rating <= 2 ? "" : css(rating - 2);
    let four = rating >= 4 || rating <= 3 ? "" : css(rating - 3);
    let five = rating >= 5 || rating <= 4 ? "" : css(rating - 4);

    function css(rating) {
        return "--star-percent: " + rating + "ex"
        /*return "margin-left: calc(-" + rating + "ex + -1.13ex); " +
            "width: calc(" + rating + "ex + 0.333ex);"*/
    }
</script>
<style>
    div {
        display: inline-block;
        color: gold;
        min-width: 13ex;
    }
</style>
<div title={rating} style="font-size: {size};">
    <span class="star" class:custom={one} class:full={rating >= 1} style={one}></span>
    <span class="star" class:custom={two} class:full={rating >= 2} style={two}></span>
    <span class="star" class:custom={three} class:full={rating >= 3} style={three}></span>
    <span class="star" class:custom={four} class:full={rating >= 4} style={four}></span>
    <span class="star" class:custom={five} class:full={rating >= 5} style={five}></span>
</div>