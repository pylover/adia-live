<script>
import { setContext } from 'svelte';
import Icons from './Icons.svelte';
import NavItem from './NavItem.svelte'
import Logo from './Logo.svelte'
import ADia from './ADia.svelte';
import About from './About.svelte';
import NotFound from './NotFound.svelte';


const routes = {
  '/':      {title: 'Live Demo',  component: ADia  },
  '/about': {title: 'About',      component: About },
};

const notFound = {
  title: 'Not Found',
  component: NotFound,
}

let loading = true;
let route
export let title

function navigate(target) {
  route = routes[target];

  /* 404 */
  if (route == undefined) {
    route = notFound;
  }

  window.history.pushState({}, 
    route.title, 
    `${window.location.origin}${target}`
  );

  /* Set the page title */
  document.title = `${title} -> ${route.title}`
}
setContext('nav', {navigate})

/* Match current route */
let currentPath = window.location.pathname.replace(/^basePath/, '')
navigate(currentPath)
</script>

<style lang="sass" type="text/sass" global>
body
  color: $fg
  font-family: monospace

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
<svelte:component  
  this={route.component}
  bind:loading={loading}
  >
  <Logo bind:loading={loading} />
  <NavItem icon="github" 
           style="float: right"
           target="https://github.com/pylover/adia" />
</svelte:component>
