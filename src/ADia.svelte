<svelte:window bind:innerWidth />

<nav>
  <NavItem title="ADia" icon="pacman" target="/about" />
  <NavItem icon="github" style="float: right" />
</nav>

<div
  class="wrapper">
  <div
    bind:this={left}
    bind:clientWidth={leftWidth}
    style="--left-size: {leftSize}"
    class="left">
    <textarea
      on:click={saveText}
      on:keyup={stopTyping}
      on:keydown={startTyping}
      bind:value={text}></textarea>
  </div>

  <div
    class="separator"
    on:mousedown={resizeStart}
    on:mouseup={resizeStop}
  />

  <div
    bind:this={right}
    style="--right-size: {rightSize}"
    class="right">
  </div>
</div>

<script>
  import NavItem from './NavItem.svelte'
  import { onMount } from 'svelte'

  let lastSeparatorLocation,
      left,
      right,
      innerWidth,
      leftWidth,
      text,
      typingTimer,
      doneTypingInterval = 2000

  let leftSize = localStorage.getItem("leftSize") ? 
    `${localStorage.getItem("leftSize")}%` : '30%'
  let rightSize = localStorage.getItem("leftSize") ? 
    `${100 - Math.round(localStorage.getItem("leftSize"))}%` : '70%'

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

  function stopTyping () {
    clearTimeout(typingTimer)
    typingTimer = setTimeout(saveText, doneTypingInterval)
  }

  function startTyping () {
    clearTimeout(typingTimer)
  }

  function saveText () {
    localStorage.setItem("editorText", text)
  }

  onMount(() => {
    text = localStorage.getItem("editorText") !== 'null' ? 
      localStorage.getItem("editorText") : ''
	})
</script>

<style type="text/sass">

.wrapper
  width: 100%
  height: calc(100% - #{$navheight})
  display: inline-flex

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

</style>
