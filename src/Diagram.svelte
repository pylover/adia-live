<Toolbar>
  <Copy value={value} />
</Toolbar>
<textarea 
  spellcheck="false"
  wrap="off"
  class="pad1"
  bind:value
  disabled></textarea>

<style type="text/sass">
  
textarea
  display: block
  width: 100%
  height: 100%
  background: $bg-dark
  border: none
  outline: 1px solid $bg-dark
  color: $fg
  resize: none
  height: calc(100% - #{$toolheight})

</style>
<script>
import Toolbar from './Toolbar.svelte'
import Copy from './Copy.svelte'

/* Properties */
export let value
</script>
