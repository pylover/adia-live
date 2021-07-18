<div
  class="wrapper"
>
  <div
    bind:this={left}
    class="left">
    <textarea></textarea>
  </div>
  <div
    class="separator"
    on:mousedown={onMouseDown}
  />
  <div 
    bind:this={right}
    class="right">
  </div>
</div>

<script>
  import { onMount } from "svelte"
  let lastSeparatorLocation, left, right
  onMount(() => {
    window.addEventListener("resize", onMouseUp)
  })
  const onMouseDown = (e) => {
    lastSeparatorLocation = {
      e,
      leftWidth: left.offsetWidth,
      rightWidth: right.offsetWidth,
    }
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
  }
  const onMouseMove = (e) => {
    let delta = e.clientX - lastSeparatorLocation.e.clientX
    delta = Math.min(Math.max(delta, -lastSeparatorLocation.leftWidth), lastSeparatorLocation.rightWidth)
    left.style.width = lastSeparatorLocation.leftWidth + delta + "px"
    right.style.width = lastSeparatorLocation.rightWidth - delta + "px"
  }
  const onMouseUp = (e) => {
    window.removeEventListener("mousemove", onMouseMove)
    window.removeEventListener("mouseup", onMouseUp)
  }
</script>

<style>
  .wrapper {
    width: 100%;
    height: 100%;
    display: inline-flex;
  }
  .separator {
    cursor: col-resize;
    height: 100%;
    width: 5px;
    z-index: 1;
  }
  .left {
    width: 30%;
    min-width: 100px;
    height: 100%;
  }
  .right {
    width: 70%;
    min-width: 100px;
    height: 100%;
    background-color: #fff;
  }
  textarea {
    display: block;
    width: 100%;
    height: 100%;
    background: #000;
    border: none;
    outline: 1px solid #000;
    color: #fff;
  }
</style>
