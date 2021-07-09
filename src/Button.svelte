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
  float: left
  height: 32px
  width: 32px
  line-height: 18px
  vertical-align: middle
  svg
    display: block
    float: left
    margin-top: -1px
    width: 18px
    height: 18px
  span
    margin-left: $gutter

</style> 
<button class={cls} {id} {style} on:click={click}>
  <svg><use xlink:href={"#icon-" + icon}></use></svg>
  {#if title}
    <span>{title}</span>
  {/if}
</button>
