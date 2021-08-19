<script>
import { getContext } from 'svelte';
export let title = '';
export let target;
export let icon;
export let cssClass = '';
export let id = '';
export let style = '';
let internal = false;

const { navigate } = getContext('nav')

function click() {
  navigate(target)
}

if (target != undefined && target.startsWith('/')) {
  internal = true;
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
    margin-top: $navheight * .25
    height: $navheight * .5
  span
    margin-right: $gutter

.lpad
  margin-left: $gutter

</style> 
<a 
  {id} 
  class={cssClass} 
  {style} 
  href={!internal? target: undefined} 
  on:click={internal? click: undefined}
  >
  {#if icon}
    <svg><use xlink:href={"#icon-" + icon}></use></svg>
  {/if}
  {#if title}
    <span class={icon == null ? 'lpad': ''}>{title}</span>
  {/if}
</a>
