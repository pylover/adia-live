<span 
  class="monospace-massure"
  bind:this={num}
  use:monospaceMassureInit
  >X</span>
<div id="sourceParent">
  <pre
    class="highlight"
    style="padding-left: { lnWidth + leftPadding }px"
    bind:this={pre}
  >
  </pre>
  <div 
    class="numbers" 
    style="width: { lnWidth }px"
    bind:this={num}
  >
    {#each [...Array(codeInfo.lines).keys()] as l}
      <span>{ leftPad(l + 1, lnDigits, ' ') }</span>
    {/each}
  </div>
  <textarea
    spellcheck="false"
    wrap="off"
    style="padding-left: { lnWidth + leftPadding }px"
    bind:value={value}
    bind:this={textarea}
    on:scroll={updateScrollPosition}
    ></textarea>
<!-- 
-->
</div>
<script>
  import { onMount } from 'svelte'
  import { tokenize, colorize } from './highlight.js' 
  import { leftPad } from './helpers.js'
  
  export let value = ''

  /* Elements */
  let pre
  let num
  let textarea

  /* Line Numbering */
  const lineHeight = 20
  let leftPadding = 4
  let charWidth = 11
  $: codeInfo = tokenize(value)
  $: lnDigits = codeInfo.lines.toString().length
  $: lnWidth = lnDigits * charWidth + 12

  $: if (textarea) {
    /* Scrollbars */
    updateScrollPosition()
    
    /* Colorize */
    colorize(pre, textarea, codeInfo.tokens)
  }

  function monospaceMassureInit(element) {
    charWidth = element.clientWidth
  }

  function updateScrollPosition() {
    pre.scrollLeft = textarea.scrollLeft
    pre.scrollTop = textarea.scrollTop
    num.scrollTop = textarea.scrollTop
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
pre
  overflow-x: auto
  position: absolute
  top: 0px
  left: 0px
  width: 100%
  height: 100%
  z-index: 8
  border: none
  line-height: $lineheight
  font-size: $fontsize
  vertical-align: baseline

pre
  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar-thumb,
  &::-webkit-scrollbar-corner
    background: none 
 
.numbers
  overflow-x: auto
  position: absolute
  top: 0px
  left: 0px
  height: 100%
  z-index: 10
  font-size: $fontsize - 2
  background: $bg-light
  color: $mangool
  line-height: $lineheight
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar
    display: none;
  span
    float: left 
    clear: both
    width: 100%
    text-align: right
    padding-right: 4px
    box-shadow: inset 0 0 2px black
    vertical-align: baseline

.monospace-massure
  position: absolute
  top: -100px
  left: -100px
  line-height: $lineheight
  font-size: $fontsize
  font-family: monospace
</style>
