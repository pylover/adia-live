<Toolbar>
  <SaveFile value={value}
            defaultName={'diagram'}/>
  <Copy value={value} />
  <Tool 
   icon="zoom-in" 
   title="Zoom In"
   enabled={maxFontSize <= fontSize}
   on:click={() => fontSize < maxFontSize && fontSize++}
   />
  <Tool 
   icon="zoom-reset" 
   title="Reset Zoom"
   enabled={defaultFontSize == fontSize}
   on:click={() => fontSize = defaultFontSize}
   />
  <Tool 
   icon="zoom-out" 
   title="Zoom Out"
   enabled={minFontSize >= fontSize}
   on:click={() => fontSize > minFontSize && fontSize--}
   />
   <slot></slot>
</Toolbar>
<textarea 
  spellcheck="false"
  wrap="off"
  class="pad1"
  bind:this={textarea}
  bind:value
  style="font-size: {fontSize? fontSize + 'px': 'inherit'}"
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
import { onMount } from 'svelte';
import Toolbar from './Toolbar.svelte';
import Copy from './Copy.svelte';
import Tool from './Tool.svelte';
import SaveFile from './SaveFile.svelte';

/* Properties */
export let value;

/* Private */
const maxFontSize = 30;
const minFontSize = 4;
let textarea;
let fontSize; 
let defaultFontSize; 

onMount(function() {
  defaultFontSize = fontSize = parseInt(
    window.getComputedStyle(textarea).getPropertyValue('font-size')
  );
});
</script>
