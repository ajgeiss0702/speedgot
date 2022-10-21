<script>
    import Stars from "$lib/Stars.svelte";
    import {onDestroy, onMount} from "svelte";

    let positions = [];

    for (let i = 0; i < 5; i += 0.1) {
        positions.push(i);
    }

    let holding = false;

    function keyDown() {
        holding = true;
    }

    function keyUp() {
        holding = false;
    }

    onMount(() => {
        document.body.addEventListener("keydown", keyDown)
        document.body.addEventListener("keyup", keyUp)
    });

    onDestroy(() => {
        if(typeof document !== "undefined") {
            document.body.removeEventListener("keydown", keyDown)
            document.body.removeEventListener("keyup", keyUp)
        }
    })
</script>
<style>
    div {
        font-size: 2em;
    }
    .overview {
        font-size: 1.01vh;
    }
</style>
<div on:keydown={keyDown} on:keyup={keyUp} class:overview={holding}>
    <Stars rating={0}/><br>
    <Stars rating={1}/><br>
    <Stars rating={2}/><br>
    <Stars rating={3}/><br>
    <Stars rating={4}/><br>
    <Stars rating={5}/><br>
    <br>
    {#each positions as position}
        <Stars rating={position}/>
        <br>
    {/each}
</div>