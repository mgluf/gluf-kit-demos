<script>
  import WistiaDependency from './WistiaDependency.svelte';

  // Custom CSS class
  export let className = '';
  // The ID of the Wistia Media
  export let id = '';
  // The aspect ratio of the Wistia Media (required to appropriately size the video element)
  export let aspectRatio = '';
  // Alternative way to set id and aspect ratio for a responsive video that has separate desktop and mobile
  // If this prop is passed, the id and aspectRatio standalone props are not used
  export let responsiveMedia = false;
  // Use the Popover style embed
  export let popover = false;
  // Include the main Wistia embed script
  // If you are embedding multiple videos, you can manually include 
  // WistiaDependency once and set this to false for all instances of this component
  export let includeDependency = true;

  let padding = [];

  // Derive responsive padding for video embed based on the aspect ratio. Wistia embeds' markup 
  // uses a padding hack to responsivey render the videos at the correct aspect ratio
  const getResponsivePadding = (aspectRatio) => {
    let values = aspectRatio.split(":");
    let result = values[1] / values[0];
    // Two decimal places matches how Wistia does it, which helps reduce issue 
    // where there is sometimes a gap of a few pixels at the bottom of the video
    return parseFloat(result * 100).toFixed(2);
  }  

  if (responsiveMedia) {
    padding.push(getResponsivePadding(responsiveMedia.desktop.aspectRatio));
    padding.push(getResponsivePadding(responsiveMedia.mobile.aspectRatio));
  } else {
    padding.push(getResponsivePadding(aspectRatio));
  }

  const classList = (newClass) => {
    if (className !== '') {
      return newClass;
    } else {
      return className + ' ' + newClass;
    }
  }

  // Create embed objects to render the embed markup
  let embed = {};
  if (responsiveMedia) {
    embed = [
      { 
        id: responsiveMedia.desktop.id,
        padding: padding[0],
        classList: className + ' desktop',
      },
      { 
        id: responsiveMedia.mobile.id,
        padding: padding[1],
        classList: className + ' mobile',
      },
    ]
  } else {
    embed = [
      { 
        id,
        padding: padding[0],
        classList: className,
      },
    ]
  }
</script>

{#if includeDependency}
  <WistiaDependency/>
{/if}

{#each embed as { id, padding, classList }}
  <script src="https://fast.wistia.com/embed/medias/{id}.jsonp" async></script>
  <div class="wistia_responsive_padding {classList}" style="padding:{padding}% 0 0 0;position:relative;">
    <div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;">
      <div class="wistia_embed wistia_async_{id} seo=true videoFoam=true" style="height:100%;position:relative;width:100%">
        <div class="wistia_swatch" style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;">
          <img src="https://fast.wistia.com/embed/medias/{id}/swatch" style="filter:blur(5px);height:100%;object-fit:contain;width:100%;" alt="" aria-hidden="true" onload="this.parentNode.style.opacity=1;" />
        </div>
      </div>
    </div>
  </div>
{/each}

{#if popover}
  {#each embed as { id, padding, classList }}
    <script src="https://fast.wistia.com/embed/medias/{id}.jsonp" async></script>
    <div class="wistia_responsive_padding {classList}" style="padding:{padding[0]}% 0 0 0;position:relative;">
      <div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;">
        <span class="wistia_embed wistia_async_{id} popover=true videoFoam=true" style="display:inline-block;height:100%;position:relative;width:100%">&nbsp;</span>
      </div>
    </div>
  {/each}
{/if}

<style lang="scss">
  .desktop {
    @include bp(lg, down) {
      display: none;
    }
  }
  .mobile {
    @include bp(lg, up) {
      display: none;
    }
  }
</style>
