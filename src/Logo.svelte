<script>
import { getContext } from 'svelte';

const { navigate } = getContext('nav');

export let spin = true;

</script>
<button on:click={() => navigate('/')}>
  <svg 
   class="{ spin? 'start': 'stop'}"
   >
    <use xlink:href="#icon-pacman"></use>
  </svg>
  <h4>ADia</h4>
</button>
<style lang="sass" scoped>

button
  height: $navheight
  line-height: $navheight 
  vertical-align: middle
  overflow: hidden
  > *
    float: left
    line-height: $navheight 
  svg
    width: $navheight
    margin-top: $navheight * .10
    height: $navheight * .7
    
    /* Animation */
    animation-name: go
    animation-duration: 500ms
    animation-fill-mode: forwards
    animation-iteration-count: infinite
    animation-direction: reverse
    &.stop
      animation-iteration-count: 1

@keyframes go
  to      
    transform: rotate(0deg)
  from    
    transform: rotate(360deg)


</style> 
