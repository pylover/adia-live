<nav>
  <slot></slot>
</nav>


<h1>ADia</h1>

{#if loadingError}
  <div>
    <i>{ loadingError }</i>
  </div>
{/if}

<h2>Documentation</h2>
<ul>
{#each docDists as v}
  <li>
    <a href="{baseUrl}/docs/{v}/html/}">v{v}</a>
  </li>
{/each}
</ul>
<h2>Releases</h2>
<h3>Javadcript Releases</h3>
<ul>
{#each jsDists as v}
  <li>
    <a href="{baseUrl}/docs/{v}/html/}">v{v}</a>
  </li>
{/each}
</ul>

<script>

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
