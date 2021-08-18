<script>
import { flip } from 'svelte/animate';

export let target
export let loading

if (target != undefined && target.startsWith('/')) {
  target = basePath + target
}
</script>
<a href={target}>
  <svg 
   class="{ loading? 'start': 'stop'}"
   >
    <use xlink:href="#icon-pacman"></use>
  </svg>
  <h1>ADia Live Demo</h1>
</a>
<style lang="sass" type="text/sass" scoped>

a
  height: $navheight
  line-height: $navheight 
  vertical-align: middle
  overflow: hidden
  > *
    float: left
  svg
    width: $navheight
    margin-top: $navheight * .15
    height: $navheight * .7

    animation-name: go
    animation-duration: 500ms
    animation-fill-mode: forwards
    animation-iteration-count: infinite
    animation-direction: reverse

.stop
  animation-iteration-count: 1


@keyframes go
    to      { transform: rotate(0deg); }
    from    { transform: rotate(360deg); }


</style> 
