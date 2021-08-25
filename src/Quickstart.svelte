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
         />
    </div>
  {/each}
</div>
<div class="sm0 md0 lg1 xg1"></div>

<style type="text/sass" scoped>
  @import 'styles/grid'
  
  .adia
    height: 500px

</style>
<script>
import { onMount } from 'svelte'
import ADia from './ADia.svelte'

/* Properties */
export let busy = true
export let loading = true

const sections = [
  {
    title: 'Call Subject and Return Value',
    source: `diagram: Call stack
sequence:

foo -> bar: baz() => qux
`
  },
  {
    title: 'Call Stack',
    source: `diagram: Call stack
sequence:

foo -> bar
  bar -> baz
  bar -> baz
`
  },
  {
    title: 'Condition',
    source: `diagram: Condition
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
    title: 'Loop',
    source: `diagram: Loop
sequence:

for: every item
  foo -> bar
`
  }

]
</script>
