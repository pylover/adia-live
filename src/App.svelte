<script>
import Icons from './Icons.svelte';
import NavItem from './NavItem.svelte'
import Logo from './Logo.svelte'
import ADia from './ADia.svelte';
import About from './About.svelte';
import NotFound from './NotFound.svelte';


const routes = [
  {title: 'Adia',  component: ADia,  path: `/`     },
  {title: 'About', component: About, path: '/about'},
];

const notFound = {
  title: 'Not Found',
  component: NotFound,
}

let selectedIndex = routes.findIndex(
  e => (basePath + e.path) == window.location.pathname
)
let selected = routes[selectedIndex];
if (selectedIndex < 0) {
  selected = notFound;
}
else {
  selected = routes[selectedIndex];
}

function changeComponent(event) {
  let i = event.srcElement.id;
  selected = routes[i];
  selectedIndex = i;
  window.history.pushState({}, 
    selected.title, 
    `${window.location.origin}${selected.path}`
  );
}

</script>

<style lang="sass" type="text/sass" global>
body
  color: $fg

a
  color: $fg
  cursor: pointer
  &:hover
    color: $mangool
    svg
      fill: $mangool

  svg
    fill: $fg

.main-wrapper
  background-color: $bg-light
  min-height: 100%
  width: 100%
  float: left

nav
  background-color: $bg-dark
  width: 100%
  display: block
  height: $navheight
  border-style: inset
  border-bottom: 1px solid black
  padding-right: $gutter

</style>

<Icons />
<!-- Content -->
<svelte:component this={selected.component}>
  <Logo target="/" />
  <NavItem icon="github" 
           style="float: right"
           target="https://github.com/pylover/adia" />
</svelte:component>
