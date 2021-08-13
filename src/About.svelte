
<div class="main-wrapper" >
<nav>
  <slot></slot>
  <NavItem icon="paint" 
           style="float: right"
           target="/" />
</nav>

<div id="about" class="sm10 md10 lg8 xg6">
   <h4 class="all10">
    About
    <hr />
  </h4>
  <p class="all10">
  ADia live demo page <i>version: appVersion</i> using javascript and 
    <a href="https://brython.info">Brython</a>.
  </p>
  <p class="all10">
    <a href="https://github.com/pylover/adia">ADia</a> 
    <i>version: { adiaVer }<i>
  </p>
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
  <div class="sm10 md3 lg3 xg3">
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
  <div class="sm10 md7 lg7 xg7">
  <h5>Brython Module</h5>
  <ul class="all10">
  {#each jsDists as v, i}
    <li>
      <a href="{baseUrl}/jsdist/{v}/adia-{v}.js">
        adia-{v}.js
      </a>
      <a href="{baseUrl}/jsdist/{v}/adia-{v}.js">
        adia.lib-{v}.js
      </a>
      {#if i == 0}
        <i> (latest) </i>
      {/if}
    </li>
  {/each}
  </ul>
  </div>
  <h4 class="all10">
    Source Codes
    <hr />
  </h4>
  <div class="all10">
    <ul>
      {#each repos as repo}
        <li>
          <a href="{repo}">{repo}</a>
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
</div>

<style type="text/sass" scoped>
  @import 'styles/grid'

</style>
<script>
import NavItem from './NavItem.svelte'
import { onMount } from 'svelte';

const repos = [
  'https://github.com/pylover/adia',
  'https://github.com/pylover/adia-live',
];
let loadingError;
let jsDists = [];
let docDists = [];
const baseUrl = basePath;
let adiaVer = 'loading...';

function getADiaVersion(ev) {
  if (window.adiaVersion == undefined) {
    setTimeout(function() { getADiaVersion(ev); }, 200);
    return;
  }
  adiaVer = window.adiaVersion 
  console.log(adiaVer)
}

onMount(async () => {
  getADiaVersion()
  try {
    let [js, doc] = await Promise.all([
      fetch(`${basePath}/jsdist/index.json?count=10`).then(resp => resp.json()),
      fetch(`${basePath}/docs/index.json?count=9`).then(resp => resp.json()),
    ]);
    jsDists = js;
    docDists = doc;
  }
  catch (err) {
    loadingError = `Index loading error: ${err}`
  }
});

</script>
