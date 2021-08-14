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
    bind:this={textarea}
    on:input={textInput}
    on:scroll={updateScrollPosition}
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
  import { onMount, createEventDispatcher, tick } from 'svelte'
  import { tokenize, colorize } from './highlight.js' 
  import { leftPad } from './helpers.js'
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

  onMount(async function() {
    let localText = localStorage.getItem("editorText")
    if (localText != null && localText.trim().length > 0) {
      textarea.value = localText
    }
    await textInput()
  })
  
  function textChanged() {
    const text = textarea.value
    localStorage.setItem("editorText", text)
    dispatch('change', {
      text: text
    })
  }

  async function textInput() {
    clearTimeout(typingTimer)
    
    /* Tokenize */
    const {tokens, lines} = tokenize(textarea.value)
    lineCount = lines

    updateScrollPosition()
    await tick()
    colorize(pre, textarea, tokens)
    await tick()
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
