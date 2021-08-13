<svelte:window bind:innerWidth />

<div class="main-wrapper" >
<nav>
  <slot></slot>
  <NavItem icon="question" 
           style="float: right"
           target="/about" />
</nav>

<div
  class="wrapper">
  <div
    bind:this={left}
    bind:clientWidth={leftWidth}
    style="--left-size: {leftSize}"
    class="left">
    <SourceCode on:change={inputChanged} />
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
    <textarea 
      class="pad1"
      spellcheck="false"
      disabled>{ diagram }</textarea>
  </div>
</div>
</div>

<script>
  import NavItem from './NavItem.svelte'
  import SourceCode from './SourceCode.svelte'
  import { onMount } from 'svelte'

  let lastSeparatorLocation
  let left
  let right
  let innerWidth
  let leftWidth

  let leftSize = localStorage.getItem("leftSize") ? 
    `${localStorage.getItem("leftSize")}%` : '20%'
  let rightSize = localStorage.getItem("leftSize") ? 
    `${100 - Math.round(localStorage.getItem("leftSize"))}%` : '80%'
  let diagram = '';

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

  function inputChanged(ev) {
    if (window.adiaDiagram == undefined) {
      setTimeout(function() { inputChanged(ev); }, 200);
      return;
    }
    let text = ev.detail.text;
    if (text.trim().length <= 0) {
      diagram = '';
      return;
    }
    diagram = window.adiaDiagram(text)
  }
</script>

<style type="text/sass" scoped>

.main-wrapper
  height: 100% !important

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
  font-size: 14px
</style>
