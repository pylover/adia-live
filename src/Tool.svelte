<button 
  on:click
  title={title}
  class={enabled? 'enabled': ''}
  >
  <svg><use xlink:href={"#icon-" + icon}></use></svg>
</button>
<script>
export let title;
export let icon;
export let enabled = false;

</script>
<style lang="sass" type="text/sass">

button
  float: left
  width: $toolheight
  height: $toolheight
  line-height: $toolheight 
  vertical-align: middle
  background: $bg-dark
  &.enabled
    svg
      fill: $mangool

  svg
    width: $toolheight - $gutter
    height: $toolheight - $gutter
    margin-top: $gutter / 2

</style> 

