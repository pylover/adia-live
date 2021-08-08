<script>
import { createEventDispatcher } from 'svelte';
export let title = '';
export let target;
export let icon;
export let cssClass = '';
export let id = '';
export let style = '';
const dispatch = createEventDispatcher();

function click() {
	dispatch('click', {
		text: 'Hello!'
	});
}

</script>
<style lang="sass" type="text/sass">

a
  // Doozak
  height: $navheight
  line-height: $navheight 
  vertical-align: middle
  overflow: hidden
  > *
    float: left
  svg
    width: $navheight
    margin-top: $navheight * .2
    height: $navheight * .6
  span
    margin-right: $gutter

.lpad
  margin-left: $gutter

</style> 
<a class={cssClass} {id} {style} href={target} on:click={click}>
  {#if icon}
    <svg><use xlink:href={"#icon-" + icon}></use></svg>
  {/if}
  {#if title}
    <span class={icon == null ? 'lpad': ''}>{title}</span>
  {/if}
</a>
