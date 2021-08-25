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
      <a href="basePath/docs/{i == 0? 'latest': v}/html/">
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
  <ul class="all10">
  {#each jsDists as v, i}
    <li>
      <a href="basePath/jsdist/adia-{v}.tar.gz">
        adia-{v}.tar.gz
        {#if i == 0}
          <i> (latest) </i>
        {/if}
      </a>
    </li>
  {/each}
  </ul>

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

<style type="text/sass" scoped>
  @import 'styles/grid'

</style>
<script>
import NavItem from './NavItem.svelte'
import { onMount } from 'svelte'
import { ADia } from './adia.js'

const repos = [
  'https://github.com/pylover/adia',
  'https://github.com/pylover/adia-live',
];

/* Properties */
export let busy = true
export let loading = true

let loadingError;
let jsDists = [];
let docDists = [];
let adiaVer = 'loading...';


onMount(async () => {
  try {
    let [js, doc] = await Promise.all([
      fetch('basePath/jsdist/index.json?count=11').then(resp => resp.json()),
      fetch('basePath/docs/index.json?count=19').then(resp => resp.json()),
    ]);
    jsDists = js;
    docDists = doc;
  }
  catch (err) {
    loadingError = `Index loading error: ${err}`
  }
  finally {
    loading = false
  }
});

/* ADia configuration */
(new ADia()).oninit = (adia) => {
  adiaVer = adia.__version__
  busy = false
}

</script>
