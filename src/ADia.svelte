<svelte:window bind:innerWidth />
<div class="main">
  <div
    bind:this={left}
    bind:clientWidth={leftWidth}
    style="--left-size: {leftSize}"
    class="left">
    <SourceCode 
      bind:this={sourceArea} 
      bind:value={source} 
    />
  </div>
  
  <div
    class="separator"
    on:mousedown={resizeStart}
    on:mouseup={resizeStop}
  />
  
  <div
    bind:this={right}
    style="--right-size: {rightSize}"
    class="right"
  >
    <textarea 
      spellcheck="false"
      wrap="off"
      class="pad1"
      bind:value={diagram}
      disabled></textarea>
  </div>
</div>

<script>
  import NavItem from './NavItem.svelte'
  import SourceCode from './SourceCode.svelte'
  import { onMount } from 'svelte'
  import { ADia } from './adia.js'

  /* Properties */
  export let busy = true
  export let loading = true

  /* Elements */
  let sourceArea
  let left
  let right

  let lastSeparatorLocation
  let innerWidth
  let leftWidth

  let leftSize = localStorage.getItem("leftSize") ? 
    `${localStorage.getItem("leftSize")}%` : '20%'
  let rightSize = localStorage.getItem("leftSize") ? 
    `${100 - Math.round(localStorage.getItem("leftSize"))}%` : '80%'
  
  /* ADia Worker */
  let diagram = ''
  let source
  let defaultSource = `# Live Demo

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
    bar -> baz: Bye()`

  function resizeStart(e) {
    lastSeparatorLocation = {
      e,
      leftWidth: left.offsetWidth,
      rightWidth: right.offsetWidth,
    }
    window.addEventListener("mousemove", resize)
  }

  function resize (e) {
    if (e.clientX !== lastSeparatorLocation.e.clientX) {
      let delta = e.clientX - lastSeparatorLocation.e.clientX
      delta = Math.min(Math.max(delta, -lastSeparatorLocation.leftWidth),
        lastSeparatorLocation.rightWidth)
      left.style.width = lastSeparatorLocation.leftWidth + delta + "px"
      right.style.width = lastSeparatorLocation.rightWidth - delta + "px"
    }
  }

  function resizeStop () {
    localStorage.setItem("leftSize", 
      Math.round(leftWidth / (innerWidth - 14) * 100)
    )
    window.removeEventListener("mousemove", resize)
  }

  $: if (source != undefined) {
    aDia.go()
  }

  /* ADia configuration */
  const aDia = new ADia()
  aDia.delay = 300
  aDia.oninit = () => {
    loading = false
  }
  aDia.onstatus = (aDia, state) => {
    busy = state != 'idle'
  };
  aDia.input = () => {
    localStorage.setItem("editorText", source)
    return source
  }
  aDia.onresult = () => diagram = '',
  aDia.onerror = (aDia, err) => diagram = err
  aDia.onsuccess = (aDia, dia) => diagram = dia

  onMount(async function() {
    let localText = localStorage.getItem("editorText")
    if (localText != null && localText.trim().length > 0) {
      source = localText
    }
    else {
      source = defaultSource
    }
  })
</script>

<style type="text/sass" scoped>

.main
  display: inline-flex
  height: calc(100% - #{$gutter})
  width: 100%

.separator
  cursor: col-resize
  height: 100%
  width: $gutter
  z-index: 1

.left
  width: var(--left-size)
  min-width: 100px
  height: 100%
  border-top: 1px solid black

.right
  width: var(--right-size)
  min-width: 100px
  height: 100%
  background-color: $bg-light
  overflow-y: auto
  overflow-x: hidden

nav
  background-color: $bg-dark
  width: 100%
  display: block
  height: $navheight
  border-style: inset
  border-bottom: 1px solid black
  padding-right: $gutter

textarea
  display: block
  width: 100%
  height: 100%
  background: $bg-dark
  border: none
  outline: 1px solid $bg-dark
  color: $fg
  resize: none
  font-size: 14px

</style>

