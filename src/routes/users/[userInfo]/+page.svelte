<script>
    import {toTitleCase} from "$lib/utils";

    export let data;

    let identities = [];

    for (let identitiesKey in data.user.identities) {
        identities.push({
            name: identitiesKey,
            value: data.user.identities[identitiesKey]
        });
    }
</script>
<style>
    div {
        text-align: center;
    }
    td {
        text-align: left;
        width: 50%;
    }
    td.key {
        text-align: right;
        font-weight: bold;
    }
    table {
        table-layout: fixed;
        margin-left: auto;
        margin-right: auto;
    }
</style>
<br>
<div>
    <h2>Identities</h2>
    <table>
        <tbody>
            {#each identities as identity (identity.name)}
                <tr>
                    <td class="key">{toTitleCase(identity.name)}: &nbsp;</td>
                    <td>{identity.value}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>