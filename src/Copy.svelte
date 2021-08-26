<Tool 
 icon="copy" 
 title="Copy to clipboard"
 enabled={value == oldValue}
 on:click={copy}
 />

<script>
  import Tool from './Tool.svelte'
  
  export let value
  
  let oldValue

  async function copy() {
    await navigator.clipboard.writeText(value);
    oldValue = value
  }
</script>
