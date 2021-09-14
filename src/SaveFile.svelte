<Tool 
 icon="download" 
 title="Download"
 on:click={downloadFile}
 />

<script>
  import Tool from './Tool.svelte';
  import { pureFilename } from './helpers.js';

  export let getFileInfo;
  
  function downloadFile() {
    const [content, filename] = getFileInfo();
    const url = URL.createObjectURL(new Blob([content]));
    const link = document.createElement('a');
    link.style = "display: none";
    link.href = url;
    link.setAttribute('download', pureFilename(filename));
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
  }
</script>
