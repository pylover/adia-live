<script>
export let title;
export let icon;
</script>

<style lang="sass">

.section
  border-bottom: 1px solid $fg
  svg 
    fill: $fg

.section
  display: inline-block
  margin-top: $gutter * 3
  margin-bottom: $gutter * 3
  line-height: $nav-icon-size
  padding-bottom: $gutter
  vertical-align: sub
  &:first-child
    margin-top: 0px
  svg
    height: $nav-icon-size
    width: $nav-icon-size
    margin-right: $gutter * 2
</style>

<h4 class="all10 section">
  <svg class="all1"><use xlink:href={"#icon-" + icon}></use></svg>
  {title}
</h4>
