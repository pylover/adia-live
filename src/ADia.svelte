<svelte:window bind:innerWidth />
<div class="main" class:fullscreen >
  <div
    bind:this={left}
    bind:clientWidth={leftWidth}
    style="--left-size: {sourceAreaWidth}%"
    class="left">
    <SourceCode 
      bind:this={sourceArea} 
      bind:value={source} 
      defaultValue={defaultSource}
      showResetButton={showResetButton}
      showOpenButton={showOpenButton}
    />
  </div>
  
  <div
    class="separator"
    on:mousedown={resizeStart}
    on:mouseup={resizeStop}
  />
  
  <div
    bind:this={right}
    style="--right-size: {diagramAreaWidth}%"
    class="right"
  >
  <Diagram value={diagram}>
    <Tool 
     far="false"
     icon={fullscreen? 'shrink': 'enlarge'}
     title="{fullscreen? 'Exit ': ''}Fullscreen Mode"
     on:click={() => fullscreen = !fullscreen}
     />
  </Diagram>
  </div>
</div>

<style lang="sass" scoped>

.main
  display: inline-flex
  height: calc(100% - #{$gutter})
  width: 100%

.separator
  cursor: col-resize
  height: 100%
  width: $gutter
  z-index: 1

.left
  width: var(--left-size)
  min-width: 100px
  height: 100%

.right
  width: var(--right-size)
  min-width: 100px
  height: 100%
  background-color: $bg-light
  overflow-y: auto
  overflow-x: hidden

.fullscreen
  position: fixed
  top: 0px
  left: 0px
  right: 0px
  height: 100%
  bottom: 0px
  z-index: 50
  background-color: $bg-light
</style>

<script>
  import SourceCode from './SourceCode.svelte';
  import Diagram from './Diagram.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { ADiaWorker } from './adiaworker.js';
  import Tool from './Tool.svelte';

  /* Properties */
  export let key = 'adia-main';
  export let busy = true;
  export let loading = true;
  export let persistent = true;
  export let showResetButton = false;
  export let showOpenButton = true;
  export let fullscreen = false;
  
  export let sourceAreaWidth = localGet('sourceAreaWidth') ? 
    localGet('sourceAreaWidth') : 30;

  $: diagramAreaWidth = 100 - sourceAreaWidth; 

  /* Elements */
  let sourceArea;
  let left;
  let right;
  
  /* Private variables */
  let lastSeparatorLocation;
  let innerWidth;
  let leftWidth;

  /* ADia Worker */
  let diagram = '';
  let source;
  export let defaultSource = `# Live Demo

diagram: Foo
author: Alice
version: 0.1

# First section
sequence: Hello
foo.title: Foo

@foo: Say Hello
foo -> bar: helloworld => Hi
  @foo ~ baz: |
    lorem ipsum
  for: each item
    bar -> baz: Hello()

# Second section
sequence: Bye

foo -> bar: Bye() => See U there
  if: baz is there
    bar -> baz: Bye()`;

  function localStore(name, value) {
    if (persistent) {
      localStorage.setItem(`${key}-${name}`, value);
    }
  }

  function localGet(name) {
    if (persistent) {
      return localStorage.getItem(`${key}-${name}`);
    }
    return null;
  }

  function resizeStart(e) {
    lastSeparatorLocation = {
      e,
      leftWidth: left.offsetWidth,
      rightWidth: right.offsetWidth,
    };
    window.addEventListener('mousemove', resize);
  }
  
  function resize (e) {
    if (e.clientX !== lastSeparatorLocation.e.clientX) {
      let delta = e.clientX - lastSeparatorLocation.e.clientX;
      delta = Math.min(Math.max(delta, -lastSeparatorLocation.leftWidth),
        lastSeparatorLocation.rightWidth);
      left.style.width = lastSeparatorLocation.leftWidth + delta + 'px';
      right.style.width = lastSeparatorLocation.rightWidth - delta + 'px';
    }
  }

  function resizeStop () {
    localStore('sourceAreaWidth', 
      Math.round(leftWidth / (innerWidth - 14) * 100));
    window.removeEventListener('mousemove', resize);
  }

  $: if (source != undefined) {
    aDia.go();
  }
  
  /* ADia configuration */
  const aDia = new ADiaWorker(key);
  aDia.delay = 300;
  aDia.oninit = () => {
    loading = false;
  };
  aDia.onstatus = (aDia, state) => {
    busy = state != 'idle';
  };
  aDia.input = () => {
    localStore('editorText', source);
    return source;
  };
  aDia.onresult = () => diagram = '',
  aDia.onerror = (aDia, err) => diagram = err;
  aDia.onsuccess = (aDia, dia) => diagram = dia;

  onMount(async function() {
    let localText = localGet('editorText');
    if (localText != null && localText.trim().length > 0) {
      source = localText;
    }
    else {
      source = defaultSource;
    }
  });

  onDestroy(async function() {
    aDia.cleanup();
  });
</script>

