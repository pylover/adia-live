<script>
export let target;


if (target != undefined && target.startsWith('/')) {
  target = basePath + target
}
</script>
<style lang="sass" type="text/sass">

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
  span
    margin-right: $gutter

</style> 
<a href={target}>
  <svg><use xlink:href="#icon-pacman"></use></svg>
  <h1>ADia</h1>
</a>
