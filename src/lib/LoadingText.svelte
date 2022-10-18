<script>
    export let length = 10;
    let add = "";
    while(length > ("Loading" + add).length) {
        add += "-";
    }
</script>
<style>
    @keyframes placeHolderShimmer {
        0% {
            background-position: -800px 0
        }
        100% {
            background-position: 800px 0
        }
    }

    .animated-background {
        animation-duration: 2s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: placeHolderShimmer;
        animation-timing-function: linear;
        background: rgba(0, 0, 0, 0.08) linear-gradient(to right, #eeeeee00 8%, #ffffff5f 18%, #eeeeee00 33%);
        background-size: 800px 104px;
        height: 70px;
        color: rgba(0, 0, 0, 0);
        position: relative;
    }
</style>
<span class="animated-background">Loading{add}</span>
