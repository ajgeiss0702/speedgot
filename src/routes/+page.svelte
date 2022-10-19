<script>
    import Resource from "$lib/Resource.svelte";
    import {Button} from "sveltestrap";

    export let data;
</script>
<h1>Welcome!</h1>
<br>

This website was made in order to not have to deal with the annoying "Checking your browser" message that spigot has on.<br>
<br>
Most data is fetched using SpiGet, so it might be a few minutes behind.
<br>
<br>
<br>
<h2>Popular resources</h2>
{#each data.popular as resource (resource.id)}
    <Resource {resource}/>
{/each}
<Button href="/resources?sort=downloads" color="secondary">More</Button>
<br>
<br>
<h2>Recently updated</h2>
{#each data.lastUpdated as resource (resource.id)}
    <Resource {resource}/>
{/each}
<Button href="/resources" color="secondary">More</Button>
<br>
<br>