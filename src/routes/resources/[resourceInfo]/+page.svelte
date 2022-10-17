<script>
    import '$lib/bbStyles.css';

    export let data;

    function fromBinary(encoded) {
        const binary = atob(encoded);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < bytes.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return String.fromCharCode(...new Uint16Array(bytes.buffer));
    }
</script>
<style>

    div.boxes {
        max-width: 99vw;

        margin-left: auto;
        margin-right: auto;

        text-align: left;
    }

    div.leftBox {
        align-items: center;

        overflow-x: hidden;
        max-width: 100%;
        margin: 0 0 1em 0;
    }

    div.header {
        align-items: center;
        overflow-x: hidden;
        width: 100%;
    }

    .innerBox {
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 10px;
        width: 90%;
    }

    @media (orientation: landscape) {
        div.header {
            display: inline-flex;
        }
        div.boxes {
            width: 1200px;
            display: flex;
            align-items: stretch;
        }
        div.leftBox {
            width: 75%;
            margin-right: 1em;
        }
        div.rightBox {
            width: 25%
        }
    }
</style>
{data.name} {data.latestResourceVersion.name}
<br>
<div class="boxes">
    <div class="leftBox shadowBox">
        <div class="header">
            {#if data.icon && data.icon.url}
                <img src={"data:image/png;base64," + data.icon.data} alt="{data.name} icon" height="64" width="64">
            {/if}
            <div class="title-container">
                <h2>{data.name}</h2>
                {data.tag}
            </div>
            <br>
            <div class="right">
                <div class="downloadButton">
                    Download
                </div>
            </div>
        </div>
        <div class="description">
            {@html atob(data.description).replaceAll("â", "").replace(/"\/\/proxy\.spigotmc\.org\/([^\s].*?)\?url=(.*?)"/g, "/proxy/image?url=$2")}
        </div>
    </div>
    <div class="rightBox">
        <div class="innerBox shadowBox">
            Stuff<br>
            and<br>
            things<br>
        </div>
    </div>
</div>
