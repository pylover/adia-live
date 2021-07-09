<script>
import Icons from './Icons.svelte';

import Dial from './Dial.svelte';
import NotFound from './NotFound.svelte';

const routes = [
    { title: 'Dial', component: Dial, path: '/',     icon: 'pacman'     },
];

const notFound = {
  title: 'Not Found',
  component: NotFound,
  icon: 'sad'
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

<style type="text/sass" global>
</style>


<Icons />
<!-- Content -->
<svelte:component this={selected.component}/>

