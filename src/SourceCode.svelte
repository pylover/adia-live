    <textarea
      on:input={textInput}
      class="pad1"
      spellcheck="false"
      bind:value={text}></textarea>

<script>
	import { onMount, createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
  let typingTimer
  let text = `
diagram: foo

sequence:
foo -> bar: helloworld()!`;
  const doneTypingInterval = 1000;

  onMount(function() {
    let localText = localStorage.getItem("editorText")
    if (localText != null && localText.trim().length > 0) {
      text = localText;
    }
    textChanged();
	})
 
	function textChanged() {
    localStorage.setItem("editorText", text)
		dispatch('change', {
			text: text
		});
  }

	function textInput() {
    clearTimeout(typingTimer)
    typingTimer = setTimeout(textChanged, doneTypingInterval)
	}
</script>

<style type="text/sass" scoped>
textarea
  display: block
  width: 100%
  height: 100%
  background: $bg-dark
  border: none
  outline: 1px solid $bg-dark
  color: $fg
  resize: none
</style>
