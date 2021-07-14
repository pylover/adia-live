<script>
import { onMount } from 'svelte';
import Button from './Button.svelte';

let leftsize = 300
let gutter = 10

let resizing = -1


function resizeStart(e) {
  resizing = e.pageX;
}

function resizeStop(e) {
  resizing = -1
}

function resize(e) {
  if (resizing >= 0) {
    var i = e.pageX - resizing
    leftsize += i 
    console.log(i)
    resizing = e.pageX;
  }
}

</script>
<div id="dial">
  <nav>
    <Button icon="pacman" />
    <input type="number" bind:value={leftsize}/>
  </nav>
  <div id="leftside" style="width: {leftsize}px">
    <textarea id="source"
       on:mousedown={resizeStart}
       on:mouseup={resizeStop}
      ></textarea>
  </div>
  <div id="handle" style="left: {leftsize}px" 
       on:mousedown={resizeStart}
       on:mouseup={resizeStop}
       on:mousemove={resize}>
  </div>
  <div id="rightside" style="left: {leftsize + gutter}px">
    <textarea id="dia" disabled
       on:mousedown={resizeStart}
       on:mouseup={resizeStop}
      ></textarea>
  </div>
</div>
<style type="text/sass">


#dial
  position: absolute
  top: 0px
  bottom: 0px
  left: 0px
  right: 0px

nav
  width: 100%
  height: $navheight
  float: left

#leftside
  position: absolute
  top: $navheight
  bottom: 0px
  left: 0px
  right: 0px
  padding: $gutter 0px $gutter $gutter

#handle
  position: absolute
  top: $navheight + $gutter
  bottom: $gutter
  width: $gutter
  cursor: col-resize

#rightside
  position: absolute
  float: left
  top: $navheight
  bottom: 0px
  right: 0px
  padding: $gutter $gutter $gutter 0px
  
textarea
  display: block
  width: 100%
  height: 100%
  background: $bg-dark 
  border: none
  outline: 1px solid $bg-dark
  color: $fg
  &:focus
    outline: 1px solid $border-color
    box-shadow: none
    border: none
  
</style>


