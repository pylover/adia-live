<nav>
  <slot></slot>
  <NavItem icon="paint" 
           style="float: right"
           target="/" />
</nav>

<div id="about" class="sm10 md10 lg8 xg6">
  <h4 class="all10">
    Documentation
    <hr />
  </h4>
  <ul class="all10">
  {#each docDists as v, i}
    <li>
      <a href="{baseUrl}/docs/{v}/html/">
        v{v}
        {#if i == 0}
          <i> (latest) </i>
        {/if}
      </a>
    </li>
  {/each}
  </ul>

  <h4 class="all10">
    Javascript releases
    <hr />
  </h4>
  <div class="sm10 md5 lg5 xg5">
  <h5>Bundle</h5>
  <ul class="all10">
  {#each jsDists as v, i}
    <li>
      <a href="{baseUrl}/jsdist/{v}/adia.bundle-{v}.js">
        adia.bundle-{v}.js
        {#if i == 0}
          <i> (latest) </i>
        {/if}
      </a>
    </li>
  {/each}
  </ul>
  </div>
  <div class="sm10 md5 lg5 xg5">
  <h5>Brython Module</h5>
  <ul class="all10">
  {#each jsDists as v, i}
    <li>
      <a href="{baseUrl}/jsdist/{v}/adia-{v}.js">
        adia-{v}.js
        {#if i == 0}
          <i> (latest) </i>
        {/if}
      </a>
    </li>
  {/each}
  </ul>
  </div>
  <!--
  {#if loadingError}
    <div>
      <i>{ loadingError }</i>
    </div>
  {/if}
  -->
</div>

<style type="text/sass" scoped>
  @import 'styles/grid'

</style>
<script>
import NavItem from './NavItem.svelte'
import { onMount } from 'svelte';

let loadingError;
let jsDists = [];
let docDists = [];
const baseUrl = basePath;

onMount(async () => {
  try {
    let [js, doc] = await Promise.all([
        fetch(`${basePath}/jsdist/index.json`).then(resp => resp.json()),
        fetch(`${basePath}/docs/index.json`).then(resp => resp.json()),
      ]);
    jsDists = js;
    docDists = doc;
  }
  catch (err) {
    loadingError = `Index loading error: ${err}`
  }
});

</script>
