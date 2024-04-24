<script>
import ShopTheLookTrigger from "$lib/components/ShopTheLook/ShopTheLookTrigger.svelte";
import Bag from '$lib/components/ShopTheLook/BagIcon.svelte';
import Image from "$lib/components/Image.svelte"
export let caption = '';
export let color = 'white';
export let img = '';
export let icon = "bottom right";
export let iconSize = "30px";
export let key;
export let from = "right"
export let customCaption = false
</script>

<ShopTheLookTrigger key="{key}" from={from}>
    <div class="stl-image">
      <Image src={img} alt="" picture={false}/>
      <div class="stl-overlay">
        {#if customCaption && caption}
          <span class="custom-caption" style="color:{color}">{caption}</span>
        {/if}
        <div class="bag-button {icon}">
          <div style="width:{iconSize}">
            <Bag color={color}/>
          </div>
          {#if caption && !customCaption}
            <span class="stl-caption" style="color:{color}">{caption}</span>
          {/if}
        </div>
        <div class="overlay-bg"/>
      </div>
    </div>
</ShopTheLookTrigger>

<style lang='scss'>
  $anim: 250ms;

  .stl-image {
    position: relative;
  }

  .stl-overlay {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;

    &:hover {
      cursor: pointer;
      & > .overlay-bg {
        opacity: 1;
      }
    }

    &.disable {
      display: none;
    }
  }

  .bag-button {
    position: absolute;
    padding: 10px;
    z-index: 2;
    display: flex;
    color: white;
    font-weight: 500;
    text-align: left;
    place-items: center;

    span {
      margin-left: 7px;
    }

    &:focus {
      outline: none;
    }

    &.bottom {
      bottom: 0;
    }
    &.left {
      left: 0;
    }
    &.right {
      right: 0;
    }
    &.top {
      top: 0;
    }

    :global(svg) {
      max-width: 27.5px;
    }
    @include bp(lg, down) {
      max-width: 27.5%;
    }

  }

  .overlay-bg {
    position: absolute;
    width: 100%;
    height: 20%;
    bottom: 0;
    background: linear-gradient(transparent, transparent 10%, rgba(#000, 0.75) 100%);
    transition: $anim ease-in-out;
    z-index: 1;
    opacity: 0;
  }

  .custom-caption {
    position: absolute;
    background-color: transparent;
    border: none;
    padding: 10px;
    padding-bottom: 5px;
    z-index: 2;
    display: flex;
    color: white;
    font-weight: 700;
    text-align: left;
    place-items: center;
    bottom: 0;
    font-family: $font-mencken;
    font-size: minmax(992, 1920, 18, 22);
  }

  .stl-caption {
    @include bp(lg, down) {
      display: none;
      transform: $anim ease-in-out;
    }
  }
</style>