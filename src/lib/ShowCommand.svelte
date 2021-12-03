<script>
    export let command
    let copied = false
    import Copy from "$lib/icons/Copy.svelte";
    function handleCopy() {
        navigator.clipboard.writeText(typeof command=='string'?command:JSON.stringify(command,null,4))
        copied = true
    }
</script>
<div class="bg-black text-white p-3 rounded-lg flex justify-between">
    <span class="block whitespace-pre">{typeof command=='string'?command:JSON.stringify(command,null,4)}</span>
    {#if copied}
        <span class="block text-xs" on:click={handleCopy}>
                Copied
        </span>
    {:else}
        <span class="block" on:click={handleCopy}>
                <Copy/>
        </span>
    {/if}
</div>
