<script>
  import asset from '$lib/helpers/asset';
  import * as path from '$lib/helpers/path';
  export let className;
  export let src;
  export let alt;
  export let title;
  export let width;
  export let height;
  export let loading;
  export let srcset;
  export let picture = true;
  export let processSrc = true;

  const options = {
    formats: [],
    breakpoints: [720, 1200], // for example; we'd prob just have one: 992
    densities: [],
  }

  function generatePicture(src) {  
    // Parse the original src to get string fragments to build new values with
    const _src = path.parse(src);
    // Build an object representing a picture element and its children
    let { dir, name, ext, rest } = _src;

    let mobileImage = `${dir}${name}-m${ext}${rest}`;
    let desktopImage = `${dir}${name}${ext}${rest}`;

    const _picture = {
      sources: [
        {
          srcset: desktopImage,
          media: `(min-width: 992px)`,
        }
      ],
      img: {
        src: mobileImage,
      },
    }

    return _picture;
  }

  let pictureData;
  $: {
    if (processSrc) {
      src = asset(src);
    }
    pictureData = generatePicture(src);
  }
</script>

{#if picture && !srcset}
  <picture>
    {#each pictureData.sources as source}
      <source {...source}>
    {/each}
    <img {...pictureData.img} class={className} {alt} {title} {width} {height} {loading}>
  </picture>
{:else}
  <img src={src} class={className} {alt} {title} {width} {height} {loading} {srcset}>
{/if}

<style>
  img {
    display: block;
    width: 100%;
  }
</style>