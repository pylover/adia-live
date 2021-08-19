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

let spin = true
let busy = true;
let processing = true;
let loading = true;
let route
export let title

$: spin = busy || processing;

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

/* ADia configuration */
aDia.delay = 300
aDia.addHook('init', () => loading = false);
aDia.addHook('status', (aDia, state) => {
  processing = state == 'processing'
});

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

.loading
  position: absolute
  top: $navheight
  left: 0px
  width: 100%
  height: calc(100% - #{$navheight + $gutter})
  z-index: 80
  background: #000000
  text-align: center
  padding-top: $navheight * 3
  font-size: 2em

</style>

<Icons />

<!-- Initialization Overlay -->
{#if loading}
  <div class="loading all10">
    <p>Loading, please wait ... </p>
  </div>
{/if}

<!-- Content -->
  <svelte:component  
  this={route.component}
  bind:busy
  >
  <Logo bind:spin />
  <NavItem icon="github" 
           style="float: right"
           target="https://github.com/pylover/adia" />
</svelte:component>

