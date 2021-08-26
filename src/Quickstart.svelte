<div class="sm0 md0 lg1 xg1"></div>
<div id="quickstart" class="sm10 md10 lg8 xg8">
  {#each sections as section}
    <h2 class="all10">
      {section.title}
      <hr />
    </h2>
    <div class="adia all10">
      <ADia 
         key={section.title}
         persistent={false} 
         sourceAreaWidth="50" 
         defaultSource={section.source}
         bind:loading
         bind:busy
         showResetButton={true}
         />
    </div>
  {/each}
  <h2 class="all10">
    Future reading
    <hr />
  </h2>
  <p class="all10">
    <a href="basePath/docs/latest/html/">
      Documentation
    </a>
  </p>
</div>
<div class="sm0 md0 lg1 xg1"></div>

<style type="text/sass" scoped>
  @import 'styles/grid'
  
  .adia
    height: 400px

</style>
<script>
import ADia from './ADia.svelte';

/* Properties */
export let busy = true;
export let loading = true;

const sections = [
  {
    title: 'Call Subject and Return Value',
    source: `diagram:
sequence:

foo -> bar: baz() => qux
foo -> foo: quux() => thud
`
  },
  {
    title: 'Call Stack',
    source: `diagram:
sequence:

foo -> bar
  bar -> baz
  bar -> bar
`
  },
  {
    title: 'Condition',
    source: `diagram:
sequence:

if: a > 0
  foo -> bar
elif: a < 0
  foo -> baz
else:
  foo -> qux
`
  },
  {
    title: 'For Loop',
    source: `diagram:
sequence:

for: every item
  foo -> bar
`
  },
  {
    title: 'While Loop',
    source: `diagram: 
sequence:

while: true
  foo -> bar
`
  },
  {
    title: 'Note',
    source: `diagram: 
sequence:

@foo: Lorem Ipsum
@foo ~ bar: Lorem Ipsum
foo -> bar
  bar -> baz 
    @baz: Lorem Ipsum
  @bar: Lorem Ipsum
`
  },
  {
    title: 'Comments',
    source: `diagram: 

# This is a commented line
`
  },
  {
    title: 'Metadata',
    source: `diagram: 

version: 1.2.3a4
author: Alice
`
  },
  {
    title: 'Module\'s Title',
    source: `diagram: 
sequence:

foo.title: Foo Client
bar.title: Bar API

foo -> bar
`
  }
];
</script>
