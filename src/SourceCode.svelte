<div id="sourceParent">
  <pre
    class="highlight"
    use:preInit>
  </pre>
  <div class="numbers" use:numInit>
    {#each [...Array(lineCount).keys()] as l}
      <span>{ zeroPad(l, 3) }</span>
    {/each}
  </div>
  <textarea
    use:textareaInit
    on:input={textInput}
    spellcheck="false"
    wrap="off"
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
  import { onMount, createEventDispatcher } from 'svelte'
  import { colorize } from './highlight.js' 
  import { zeroPad } from './helpers.js'
  const dispatch = createEventDispatcher()

  let pre
  let num
  let textarea
  let typingTimer
  let lineCount
  const lineHeight = 20;
  const doneTypingInterval = 1000
  
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
    var height = textarea.scrollHeight 
    lineCount =  Math.floor(height/lineHeight) + 3
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
  border: none
  padding-left: 36px
  line-height: $line-height
  font-size: 16px
  vertical-align: baseline

.numbers
  overflow-x: auto
  position: absolute
  top: 0px
  left: 0px
  height: 100%
  width: 32px 
  font-size: 14px
  background: $bg-light
  line-height: $line-height
  vertical-align: baseline
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
    //box-shadow: inset 0 0 1px #0f0; 
</style>
