<span 
  class="monospace-massure"
  use:monospaceMassureInit
  >X</span>
<div id="sourceParent">
  <pre
    class="highlight"
    style="padding-left: { lnWidth + leftPadding }px"
    use:preInit>
  </pre>
  <div 
    class="numbers" 
    style="width: { lnWidth }px"
    use:numInit>
    {#each [...Array(lnCount).keys()] as l}
      <span>{ zeroPad(l, lnDigits) }</span>
    {/each}
  </div>
  <textarea
    use:textareaInit
    spellcheck="false"
    wrap="off"
    style="padding-left: { lnWidth + leftPadding }px"
    on:input={textInput}
    on:scroll={updateScrollPosition}
    ><slot></slot></textarea>
</div>
<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { colorize } from './highlight.js' 
  import { zeroPad } from './helpers.js'
  const dispatch = createEventDispatcher()
  
  /* Elements */
  let pre
  let num
  let textarea

  /* Typing Timer */
  const doneTypingInterval = 1000
  let typingTimer

  /* Line Numbering */
  const lineHeight = 20
  let leftPadding = 4
  let charWidth = 11
  let scrollHeight = lineHeight
  $: lnCount =  Math.floor(scrollHeight/lineHeight) + 3
  $: lnDigits = lnCount.toString().length
  $: lnWidth = lnDigits * charWidth + 12

  function updateScrollHeight() {
    scrollHeight = textarea.scrollHeight 
  }
 
  function monospaceMassureInit(element) {
    charWidth = element.clientWidth
  }

  function updateScrollPosition() {
    pre.scrollLeft = textarea.scrollLeft
    pre.scrollTop = textarea.scrollTop
    num.scrollTop = textarea.scrollTop
  }

  function textareaInit(element) {
    textarea = element
  }

  function preInit(element) {
    pre = element
  }

  function numInit(element) {
    num = element
  }

  onMount(function() {
    let localText = localStorage.getItem("editorText")
    if (localText != null && localText.trim().length > 0) {
      textarea.value = localText
    }
    textInput()
  })
  
  function textChanged() {
    const text = textarea.value
    localStorage.setItem("editorText", text)
    dispatch('change', {
      text: text
    })
  }

  function textInput() {
    clearTimeout(typingTimer)
    updateScrollHeight()
    updateScrollPosition()
    colorize(pre, textarea)
    typingTimer = setTimeout(textChanged, doneTypingInterval)
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
