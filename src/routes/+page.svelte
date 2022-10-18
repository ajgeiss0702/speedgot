<script>
    import Resource from "$lib/Resource.svelte";
    import {Button} from "sveltestrap";

    export let data;
</script>
<h1>Welcome!</h1>
<br>

Do the thing and be cool and stuff
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