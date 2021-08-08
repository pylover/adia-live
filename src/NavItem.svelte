<script>
import { createEventDispatcher } from 'svelte';
export let title = '';
export let icon;
export let cls = '';
export let id = '';
export let style = '';
const dispatch = createEventDispatcher();

function click() {
	dispatch('click', {
		text: 'Hello!'
	});
}

</script>
<style lang="sass" type="text/sass" global>

button
  // Bazak
  background-color: $bg-dark
  color: $fg
  cursor: pointer
  box-shadow: inset 0 0 1px $bg-dark
  svg
    fill: $fg
  &:hover
    box-shadow: inset 0 0 1px $mangool
    svg
      fill: $mangool
  &:focus
    box-shadow: inset 0 0 1px $fg
  &:active
    background-color: $bg-dark

  // Doozak
  float: left
  height: $navheight
  width: $navheight
  line-height: 18px
  vertical-align: middle
  overflow: hidden
  border: none
  outline: none
  border-radius: 3px
  svg
    display: block
    float: left
    width: 100%
    height: 100%
  span
    margin-left: $gutter

</style> 
<button class={cls} {id} {style} on:click={click}>
  <svg><use xlink:href={"#icon-" + icon}></use></svg>
  {#if title}
    <span>{title}</span>
  {/if}
</button>
