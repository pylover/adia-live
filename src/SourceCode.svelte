<div id="sourceParent">
  <pre
    class="pad1 highlight"
    use:preInit>
  </pre>
  <textarea
    use:textareaInit
    on:input={textInput}
    class="pad1"
    spellcheck="false"
    wrap="off"
    on:scroll={scroll}
    ># Live Demo

diagram: Foo
author: Alice
version: 0.1

# First section
sequence: Hello
foo.title: Foo

@foo: Say Hello
foo -> bar: helloworld -> Hi
  @foo ~ baz: |
    lorem ipsum
  for: each item
    bar -> baz: Hello()

# Second section
sequence: Bye

foo -> bar: Bye()
  if: baz is there
    bar -> baz: Bye()</textarea>
</div>
<script>
	import { onMount, createEventDispatcher } from 'svelte'
  import { colorize } from './highlight.js' 
	const dispatch = createEventDispatcher()

  let x;
  let pre
  let textarea
  let typingTimer
  const doneTypingInterval = 1000
  
  function scroll(ev) {
    pre.scrollLeft = ev.srcElement.scrollLeft;
  }

  function textareaInit(element) {
    textarea = element
  }

  function preInit(element) {
    pre = element
  }

  onMount(function() {
    let localText = localStorage.getItem("editorText")
    if (localText != null && localText.trim().length > 0) {
      textarea.value = localText
    }
    textInput()
	})
 
	function textChanged() {
    let text = textarea.value
    localStorage.setItem("editorText", text)
		dispatch('change', {
			text: text
		})
  }

	function textInput() {
    clearTimeout(typingTimer)
    highlight()
    typingTimer = setTimeout(textChanged, doneTypingInterval)
	}
  
  function highlight() {
    colorize(pre, textarea);
  }
</script>

<style type="text/sass">

#sourceParent
  width: 100%
  height: 100%
  background: $bg-dark

pre
  position: absolute
  top: 0px
  left: 0px
  width: 100%
  height: 100%
  overflow-x: auto

textarea
  position: absolute
  top: 0px
  left: 0px
  width: 100%
  height: 100%
  display: block
  border: none
  outline: 1px solid $bg-dark
  background: transparent
  cursor: text
  color: transparent
  caret-color: $fg
  resize: none
  
textarea,
pre
  font-size: 16px
</style>
