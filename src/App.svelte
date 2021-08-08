<script>
import Icons from './Icons.svelte';

import ADia from './ADia.svelte';
import About from './About.svelte';
import NotFound from './NotFound.svelte';

const routes = [
    { title: 'Adia',  component: ADia,  path: '/',    },
    { title: 'About', component: About, path: '/about'},
];

const notFound = {
  title: 'Not Found',
  component: NotFound,
}

let selectedIndex = routes.findIndex(e => e.path == window.location.pathname)
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

.body
  background-color: $bg-light
  height: 100%
</style>

<Icons />
<div class="all10 body" >
<!-- Content -->
<svelte:component this={selected.component}/>
</div>
