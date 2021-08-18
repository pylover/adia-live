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
    {#each [...Array(lineCount).keys()] as l}
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
  let lineCount = 1
  $: lnDigits = lineCount.toString().length
  $: lnWidth = lnDigits * charWidth + 12

  function monospaceMassureInit(element) {
    charWidth = element.clientWidth
  }

  function updateScrollPosition() {
    pre.scrollLeft = textarea.scrollLeft
    pre.scrollTop = textarea.scrollTop
    num.scrollTop = textarea.scrollTop
  }

  $: if (textarea) {
    /* Tokenize */
    const {tokens, lines} = tokenize(value)
    updateScrollPosition()
    lineCount = lines
    colorize(pre, textarea, tokens)
  }
</script>

<style type="text/sass">
$line-height: 20px
$font-size: 15px

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

pre
  &::-webkit-scrollbar
    display: none
 
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
  line-height: $line-height
  font-size: $font-size
  vertical-align: baseline

.numbers
  overflow-x: auto
  position: absolute
  top: 0px
  left: 0px
  height: 100%
  z-index: 10
  font-size: $font-size - 2
  background: $bg-light
  color: $mangool
  line-height: $line-height
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
  line-height: $line-height
  font-size: $font-size
  font-family: monospace
</style>
