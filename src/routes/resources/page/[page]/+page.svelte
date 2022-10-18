<script>
    import Resource from "$lib/Resource.svelte";
    import {onMount} from "svelte";

    export let data;

    let sort = ""

    onMount(() => {
        console.log(data)
    })
</script>
{#each Object.keys(data) as resource (data[resource].id)}
    <Resource resource={data[resource]}/>
{/each}