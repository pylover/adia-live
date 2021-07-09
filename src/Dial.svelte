<script>
import { onMount } from 'svelte';
import Button from './Button.svelte';

</script>

<div id="dial" class="row all10">
  <nav class="all10 p1">
    <Button icon="pacman" />
  </nav>
  <div class="all2 pl1 full">
    <textarea id="source"></textarea>
  </div>
  <div class="all8 pl1 pr1 full">
    <textarea id="dia"></textarea>
  </div>
</div>
<style type="text/sass">

#dial
  position: absolute
  top: 0
  bottom: 0
  > div
    height: 100%

textarea
  background: $bg-dark
  color: $fg
  border: none
  outline: none
  width: 100%
  height: 100%
  &:hover
    border: none
    outline: none
  &:focus
    outline: none
    border: none
  &:focus-visible
    outline: none
    border: none
  &:active
    outline: none
    border: none


</style>


