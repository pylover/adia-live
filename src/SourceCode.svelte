<span 
  class="monospace-massure"
  bind:this={meassure}
  >X</span>
<div id="sourceParent">
  <Toolbar>
    <Tool 
     icon="numbers" 
     title="{showLineNumbers? 'Hide': 'Show'} Line numbering"
     enabled={showLineNumbers}
     on:click={() => showLineNumbers = !showLineNumbers}
     />
    {#if showResetButton}
      <Tool 
       icon="reset" 
       title="Reset"
       enabled={value == defaultValue}
       on:click={() => value = defaultValue}
       />
    {/if}

    <Tool 
      icon="open" 
      title="Open file"
      on:click={() => fileInput.click()}
      />
    <SaveFile 
      getFileInfo={() => [value, suggestFilename()]}
      />
    <Copy value={value} />
  </Toolbar>
  <pre
    class="highlight"
    style="padding-left: { leftPadding }px"
    bind:this={pre}
  >
  {#each codeInfo.tokens as token}
    <span 
     class={token.name}
    >{token.text}</span>
  {/each}
  </pre>
  {#if showLineNumbers}
    <div 
      class="numbers" 
      style="width: { lnWidth }px"
      bind:this={num}
    >
      {#each [...Array(codeInfo.lines).keys()] as l}
        <span
          class={(l >= codeInfo.selectionStartLine) && (l <=
          codeInfo.selectionEndLine)? 'selected': ''}
        >{ leftPad(l + 1, lnDigits, ' ') }</span>
      {/each}
    </div>
  {/if}
  <textarea
    spellcheck="false"
    wrap="off"
    style="padding-left: { leftPadding }px"
    bind:value={value}
    bind:this={textarea}
    on:scroll={updateScrollPosition}
    on:keyup={updateSelection}
    on:change={delayedUpdate}
    ></textarea>

  <input style="display: none"
    type="file"
    accept=".txt, .adia"
    on:change={onFileSelected}
    bind:this={fileInput} >
</div>
<script>
  import { onMount, onDestroy } from 'svelte';
  import { tokenize } from './highlight.js'; 
  import { leftPad } from './helpers.js';
  import Toolbar from './Toolbar.svelte';
  import Tool from './Tool.svelte';
  import Copy from './Copy.svelte';
  import SaveFile from './SaveFile.svelte';
  
  /* Properties */
  export let value = '';
  export let defaultValue = '';
  export let showLineNumbers = true;
  export let showResetButton = false;
  
  /* Elements */
  let meassure;
  let pre;
  let num;
  let textarea;
  let fileInput;

  /* Line Numbering */
  $: leftPadding = (showLineNumbers? lnWidth: 0) + 4;
  let charWidth = 11;
  
  /* Selection */
  let selectionStartChar = -1;
  let selectionEndChar = -1;

  $: codeInfo = tokenize(value, selectionStartChar, selectionEndChar);
  $: lnDigits = codeInfo.lines.toString().length;
  $: lnWidth = lnDigits * charWidth + 12;
  
  function updateSelection() {
    const activeElement = document.activeElement;
  
    // make sure this is your textarea
    if (activeElement === textarea) {
      selectionStartChar = textarea.selectionStart;
      selectionEndChar = textarea.selectionEnd;
    }
  }

  function delayedUpdate() {
    setTimeout(() => {
      codeInfo = tokenize(textarea.value, selectionStartChar, selectionEndChar);
    }, 100);
  }

  function updateScrollPosition() {
    pre.scrollLeft = textarea.scrollLeft;
    pre.scrollTop = textarea.scrollTop;
    num.scrollTop = textarea.scrollTop;
  }

  onMount(function() {
    charWidth = meassure.clientWidth;
    document.addEventListener('selectionchange', updateSelection);
  });

  onDestroy(function() {
    document.removeEventListener('selectionchange', updateSelection);
  });

  function onFileSelected (e) {
    let fileContent = e.target.files[0];
    let reader = new FileReader();
    reader.readAsText(fileContent);
    reader.onload = e => {
      if (confirm('Are you sure to discard the current source code?')) {
        value = e.target.result;
      }
    };
  }
  
  function suggestFilename() {
    let m = value.match(/diagram *: *(.+)(?=$)/mi);
    let filename = 'untitled';
    if (m) {
      let name = m[1].trim();
      if (name) {
        filename = name;
      }
    }
    
    return filename + '_src.txt';
  }
</script>

<style type="text/sass">

#sourceParent
  width: 100%
  height: 100%
  background: $bg-dark

textarea
  display: block
  outline: 1px solid $bg-dark
  background: transparent
  cursor: text
  color: transparent
  caret-color: $fg
  resize: none

textarea,
pre,
.numbers
  position: absolute
  top: $toolheight
  left: 0px
  height: calc(100% - #{$toolheight})
  overflow-x: auto
  line-height: $lineheight


textarea,
pre
  width: 100%
  z-index: 8
  border: none
  font-size: $fontsize
  vertical-align: baseline

pre
  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar-thumb,
  &::-webkit-scrollbar-corner
    background: none 
 
.numbers
  z-index: 10
  font-size: $fontsize - 2
  color: $mangool
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar
    display: none;
  span
    float: left 
    clear: both
    width: 100%
    text-align: right
    padding-right: 4px
    background: $bg-light
    box-shadow: inset 0 0 2px black
    vertical-align: baseline
    &.selected
      background: $jingool
      
.monospace-massure
  position: absolute
  top: -100px
  left: -100px
  line-height: $lineheight
  font-size: $fontsize
  font-family: monospace

</style>
