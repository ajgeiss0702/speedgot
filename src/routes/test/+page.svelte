<script>
    import Stars from "$lib/Stars.svelte";
    import {decodeBase64Content} from "$lib/utils";

    let positions = [];

    for (let i = 0; i < 5; i += 0.1) {
        positions.push(i);
    }
</script>
<style>
    div {
        font-size: 2em;
    }
</style>
<br>
{@html decodeBase64Content("PHNwYW4gc3R5bGU9ImNvbG9yOiMwMDAwMDAiPlRoaXMgaXMgYmxhY2s8L3NwYW4+")}
<hr>
{@html decodeBase64Content("PHNwYW4gc3R5bGU9ImZvbnQtc2l6ZToxNXB4Ij48c3BhbiBzdHlsZT0iZm9udC1zaXplOjE1cHgiPjxzcGFuIHN0eWxlPSJjb2xvcjpyZ2IoMCwgMCwgMCkiPkl0IGlzIG11Y2ggZWFzaWVyIChhbmQgdXN1YWxseSBmYXN0ZXIpIHRvIGNvbnRhY3QgbWUgZm9yIHN1cHBvcnQgaW4gb25lIG9mIHRoZSBhYm92ZSBhcmVhcy4gRGlzY29yZCBpcyB0aGUgZmFzdGVzdCB3YXkgdG8gZ2V0IHN1cHBvcnQgYmVjYXVzZSBJIGdldCBpbnN0YW50IG1vYmlsZSBub3RpZmljYXRpb25zLjxicj4gPHNwYW4gc3R5bGU9ImZvbnQtc2l6ZToxNXB4Ij48YnI+IDwvc3Bhbj48L3NwYW4+PC9zcGFuPjwvc3Bhbj4=")}
<hr>

<br>
<div>
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