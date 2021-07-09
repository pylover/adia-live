<script>
import Icons from './Icons.svelte';
import Dial from './Dial.svelte';
import Button from './Button.svelte';

const routes = [
    { title: 'Dial', component: Dial, path: '/',     icon: 'pacman'     },
];

let selectedIndex = routes.findIndex(e => e.path == window.location.pathname)
let selected = routes[selectedIndex];

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

