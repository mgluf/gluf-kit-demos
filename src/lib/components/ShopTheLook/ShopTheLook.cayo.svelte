<script>
  import Image from '$lib/components/Image.svelte';
  import Close from '$lib/components/ShopTheLook/CloseIcon.svelte';
  import LoadingIcon from '$lib/components/ShopTheLook/LoadingIcon.svelte';
  import { fly, fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { getProductData, setProductData} from '$lib/modules/shopTheLook';

  export let apiURL
  export { clazz as class };


  let productData = null;
  let from = "right";
  let fromValue;
  let open = false;
  let loaded
  let modalLoaderClass = "modal-loader"
  let clazz;
  

  if(from === "right") {
    fromValue = 50;
  } else if (from ==="left") {
    fromValue = -50;
  }

  // Handler function for when user clicks outside STL modal when it's open
  function handleClickOutside(event) {
    if (open === true && event.target.classList.contains('stl-modal-container') || open === true && event.target.classList.contains('stl-modal-close')) {
        // close
        modalLoaderClass = "modal-loader"
        productData = null
        open = false;
        setProductData();
        event.stopPropagation();
        event.preventDefault();
    }
  }


  // following svelte await block example: https://svelte.dev/examples/await-blocks
  async function awaitProductData(data, key) {
    const finalData = await data
    if(finalData[key]) {
      modalLoaderClass = ""
      return finalData[key]
    } else {
      console.log("Key not found in final productData:", key)
    }
  }
  // following svelte await block example: https://svelte.dev/examples/await-blocks
  function handleOpen(data, key) {
    loaded = awaitProductData(data, key)
  }

  onMount(() => {
    // listeners for clicking on the stl trigger buttons
    const triggers = document.querySelectorAll(".stl-trigger")

    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        // open modal
        const key = trigger.dataset.stl
        // pass from prop from ShopTheLookTrigger to the modal being opened
        from = trigger.dataset.from
        if(from === "right") {
          fromValue = 50;
        } else if (from ==="left") {
          fromValue = -50;
        }
        // open front-end
        open = true
        // request product data
        productData = handleOpen(getProductData(undefined, apiURL, key), key)
      })
    });

    // listener for clicking outside the modal to close it
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    }
  });

</script>

<div  class={`stl ${clazz || ''}`}>
  {#if open}
    <div class="stl-modal-container">
  
      <div class="stl-modal {from}" transition:fly={{x: fromValue}}>
        <div class="stl-modal-titlebar">
          <div class="stl-modal-heading">Shop The Look</div>
          <button class="stl-modal-close">
            <Close />
          </button>
        </div>
  
        <div class="stl-modal-products {modalLoaderClass}">
          {#await loaded}
            <LoadingIcon />
            {:then productData}
              {#each productData as product, i}
                <div class={"stl-modal-product" + ((i % 2 === 0) ? " product-left" : " product-right")} transition:fade={{duration:250 + (i+1 * 50)}}>
                  <a href={product.selectedProductURL} class={product.comingSoon ? "coming-soon" : ""}>
                    <Image 
                      src={product.images["plp-main-desktop"][0].url} 
                      alt={product.images["plp-main-desktop"][0].alt} 
                      picture={false} 
                      processSrc={false} />
                    <div class="product-name">
                      {@html product.comingSoon ? "Coming Soon" : product.shopSimilar ? "<span class='shop-similar'>Shop Similar: </span>" + product.name : product.name}

                      <div class="product-name-underline"></div>
                    </div>
                  </a>
                </div>
              {/each}
            {#if productData.length === 0}
              <p>Products out of stock.</p>
            {/if}

          {/await}
        </div>
  
      </div>
  
    </div>
  {/if}
  
</div>

<style lang="scss">
  $anim: 250ms;
  $padding-base: 1vw;
  $padding-page: calc($padding-base * 2);
  $padding-modal: calc($padding-base * 1.75);
  $padding-modal-mid: calc($padding-base * 4);
  $padding-inner: calc($padding-base / 1.5);
  $padding-inner-mid: calc($padding-base * 2.25);

.stl {
  position: relative;
  height: fit-content;
}

.stl-modal-container {
  position: fixed;
  // position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  padding: $padding-page;
  width: 100%;
  z-index: 10000;
  display: flex;
  align-items: center;
  // background-color: rgba(#000, 0.5);

  @include bp(lg, down) {
    position: fixed;
  }

  @include bp(lg, down) {
    padding: calc($padding-page * 1.75) calc($padding-page * 1.25) calc($padding-page * 1.75) calc($padding-page * 4.75);
    padding: 0 2vw;
  }
}

.stl-modal {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  background: radial-gradient(rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, .95));
  height: 80%;
  width: 40%;

  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.95);
  box-shadow: 0px 12.5px 25px 25px rgba(0, 0, 0, 0.075);

  max-width: 1000px;

  padding: $padding-modal;

  &.left {
    margin-right: auto;
  }
  &.right {
    margin-left: auto;
  }

  @include bp(1350px, down) {
    max-height: 1000px;
  }
  @include bp(1025px, down) {
    width: 60%;
  }
  @include bp(lg, down) {
    margin-top: 67.5px;
    width: 100%;
    height: 68%;
    border-radius: 4px;
    padding: $padding-modal-mid;
  }
  @include bp(600px, down) {
    max-height: 600px;
  }
}

.stl-caption {
  @include bp(lg, down) {
    display: none;
    transform: $anim ease-in-out;
  }
}

.stl-modal-titlebar {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 $padding-inner;
  padding-bottom: $padding-inner;
  margin-bottom: $padding-inner;
  border-bottom: 1px solid $gray;

  @include bp(lg, down) {
    padding: 0;
    padding-bottom: calc($padding-inner-mid * 1.5);
    margin-bottom: calc($padding-inner-mid * .5);
  }
  @include bp(600px, down) {
    margin-bottom: calc($padding-inner-mid * .65);
  }
}
.stl-modal-heading {
  text-transform: uppercase;
  font-weight: 500;
  font-size: 20px;

  @include bp(600px, down) {
    font-size: 15px;
  }
}
.stl-modal-close {
  margin-left: auto;
  width: 1vw;
  min-width: 14px;
  padding: 5px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  padding: 0;
}

.stl-modal-products {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  height: min-content;
  overflow: auto;
  }
  .modal-loader {
    height: 100%;
  }
  .stl-modal-product {
    width: 50%;
    height: max-content;
    margin: 0;

  a {
    color: $pm-navy;
    font-weight: 500;
    text-decoration: none;
    font-size: sp(12);
    

    &:hover {
      .product-name-underline {
        background: #071d49;
      }
    }
    .product-name {
      width: fit-content;
      margin-top: $padding-inner;

      font-size: 17px;

      @include bp(lg, down) {
        font-size: 15px;
        margin-top: $padding-inner-mid;
        margin-bottom: calc($padding-inner-mid * 1.15);
      }
    }

    .product-name-underline {
      margin-top: 3px;
      width: 100%;
      height: 2px;
      background: #071d4900;
      transition: all .225s;
      border-radius: 2px;

      @include bp(lg, down) {
        display: none;
      }
    }
  }

}
.product-left {
  padding: 0 calc($padding-inner * .6) calc($padding-inner * 1.5) 0;

  @include bp(lg, down) {
    padding: 0 calc($padding-inner-mid * .5) calc($padding-inner-mid * .75) 0;
  }
}
.product-right {
  padding: 0 0 calc($padding-inner * 1.5) calc($padding-inner * .6);

  @include bp(lg, down) {
    padding: 0 0 calc($padding-inner-mid * .75) calc($padding-inner-mid * .5);
  }
}
.coming-soon {
  pointer-events: none!important;
}
:global(.shop-similar) {
  margin-right: 5px!important;
  color: #545353!important;
  font-weight: 300!important;
}

</style>