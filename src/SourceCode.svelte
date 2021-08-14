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
    on:input={textInput}
    spellcheck="false"
    wrap="off"
    on:scroll={updateScrollPosition}
    style="padding-left: { lnWidth + leftPadding }px"
    ># Live Demo

diagram: Foo
author: Alice
version: 0.1

# First section
sequence: Hello
foo.title: Foo

@foo: Say Hello
foo -> bar: helloworld => Hi
  @foo ~ baz: |
    lorem ipsum
  for: each item
    bar -> baz: Hello()

# Second section
sequence: Bye

foo -> bar: Bye() => See U there
  if: baz is there
    bar -> baz: Bye()</textarea>
</div>
<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { colorize } from './highlight.js' 
  import { zeroPad } from './helpers.js'
  const dispatch = createEventDispatcher()

  let pre
  let num
  let textarea
  let typingTimer
  let lnCount
  let lnDigits
  let lnWidth
  let leftPadding = 4
  let monospaceMassure
  const lineHeight = 20
  const doneTypingInterval = 1000

  function monospaceMassureInit(element) {
    monospaceMassure = element
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
  
  function calculateTextareaLines() {
    const height = textarea.scrollHeight 
    const charWidth = monospaceMassure.clientWidth
    lnCount =  Math.floor(height/lineHeight) + 3
    lnDigits = lnCount.toString().length
    lnWidth = lnDigits * charWidth + 12
  }

  function textChanged() {
    let text = textarea.value
    localStorage.setItem("editorText", text)
    dispatch('change', {
      text: text
    })
  }

  function textInput() {
    calculateTextareaLines()
    updateScrollPosition()
    clearTimeout(typingTimer)
    highlight()
    typingTimer = setTimeout(textChanged, doneTypingInterval)
  }
  
  function highlight() {
    colorize(pre, textarea);
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
