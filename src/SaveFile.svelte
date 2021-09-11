<Tool 
 icon="save" 
 title="Download file"
 on:click={() => modalChangeState()}
 />

{#if isOpen}
<div class="modal">
  <div class="backdrop"/>

  <div class="content-wrapper">
    <span>Enter File Name :</span>

    <div class="content">
      <input
        type="text"
        bind:value={fileName}
        on:keydown={e => e.which === 13 && onDownload()} />
    </div>

    <slot name="footer">
      <div class="buttons">
        <button on:click={modalChangeState}>
          Cancel
        </button>

        <button on:click={onDownload}>
          Download
        </button>
      </div>
    </slot>
  </div>
</div>
{/if}

<style type="text/sass" scoped>
div.modal 
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100vh
  display: flex
  justify-content: center
  align-items: center
  z-index: 9

div.backdrop
  position: absolute
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.7)

div.content-wrapper
  z-index: 10;
  max-width: 100%
  border-radius: 0.3rem
  background-color: white
  overflow: hidden
  color: black
  padding: $gutter

input
  width: 20rem
  margin: $gutter 0

.buttons
  direction: rtl
  padding: $gutter 0 0 0
</style>

<script>
  import Tool from './Tool.svelte';
  
  export let value;
  export let defaultName;
  
  let isOpen = false;
  let fileName = defaultName;

  function modalChangeState() {
    console.log(defaultName)
    isOpen = !isOpen
  }
	
	function onDownload() {
    downloadFile()
		modalChangeState()
	}

  function downloadFile() {
    const url = URL.createObjectURL(new Blob([value]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute(
      'download',
      `${fileName === '' ? defaultName : fileName}.txt`
    )
    document.body.appendChild(link)
    link.click()
  }
</script>
