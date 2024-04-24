<script>
  import { Cayo } from 'cayo';
  import PLPStyles from '$lib/components/dev/PLPStyles.svelte';
  import KitNav from './KitNav.svelte';

  // TODO: site flag
  export let layout = '';
  export let nav = true;
  export let navOptions = {
    sticky: false,
  }
  export let plpOptions = {
    fill: 6,
    filterOpen: false,
  }
</script>

{#if process.env.KIT_ENV === 'development'}
  <div class="kit-site-container">
    {#if nav}
      <KitNav {...navOptions} />
    {/if}
    {#if layout === "home"}
      <slot name="hero"/>
      <div class="container">
        <div class="content-track pm-homepage">
          <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 order-1 order-sm-1 order-md-1 order-lg-1 order-xl-1 d-block d-sm-block d-md-block d-lg-block d-xl-block">
            <slot />
          </div>
        </div>
      </div>
    {:else if layout === "plp"}
      <PLPStyles />
      <slot name="plp-hero" />
      <!-- Breadcrumbs -->
      <div class="container custom-container px-md-0" class:nav-spacer={nav}>
        <div class="row">
          <div class="col-12">
            <div class="plp-breadcrumbs">
              <div class="row">
                <div class="col" role="navigation" aria-label="Breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="#category-1">Category</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="#category-2">Category</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="#category-3" aria-current="page">Category</a>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END Breadcrumbs -->
      <!-- PLP Main Content -->
      <div class="container custom-container search-results px-md-0">
        <div class="row">
          <div class="tab-content col-12">
            <div class="container p-0" id="product-search-results">
              <!-- START PLP Hero -->
              <div class="plp-header-text category-text-main">
                <div class="category-text-header">
                  <h1 class="category-text-header__title">
                    PLP Header
                  </h1>
                  <p class="category-text-header__description">
                    Lightweight, versatile men’s jackets for whatever conditions
                    come your way.
                  </p>
                </div>
              </div>
              <!-- END PLP Hero -->
              <!-- Note: Sticky filter bar omitted -->
              <!-- PLP Grid -->
              <div class="row producttile-row padding-space">
                <div class="kit-refinements-sidebar refinements-sidebar animate" class:col-md-0={plpOptions.filterOpen === false} class:col-md-3={plpOptions.filterOpen === true}/>
                <div class="view-filter" class:col-12={plpOptions.filterOpen === false} class:col-md-9={plpOptions.filterOpen === true}>
                  <div class="row product-grid mr-sm-0">
                    <div class="plp-content-tiles pr-0 grid-list col-sm-4 col-md-4 col-6">
                      <slot name="plp-content-tile">
                        <div class="kit-plp-tile-fill">
                          <div class="kit-plp-tile-img" />
                          <div class="kit-plp-tile-text">Content Tile</div>
                        </div>
                      </slot>
                    </div>
                    {#if plpOptions.fill > 0}
                      {#each { length: plpOptions.fill } as _, i}
                        <div class="col-6 col-sm-4 col-md-4 pr-0 grid-list">
                          <div class="kit-plp-tile-fill">
                            <div class="kit-plp-tile-img" />
                            <div class="kit-plp-tile-text">Product Tile {i + 1}</div>
                          </div>
                        </div>
                      {/each}
                    {/if}
                  </div>
                </div>
              </div>
              <!-- END PLP Grid -->
            </div>
          </div>
        </div>
      </div>
      <!-- END PLP Main Content -->
    {:else}
      <slot name="hero"/>
      <slot name="plp-hero"/>
      <slot name="plp-content-tile"/>
      <slot />
    {/if}
  </div>
{:else}
  <slot name="hero"/>
  <slot name="plp-hero"/>
  <slot name="plp-content-tile"/>
  <slot />
{/if}

<style lang="scss">

  .kit-site-container {
    min-height: 120vh;
  }

  .kit-plp-tile-fill {
    padding-bottom: 2.5rem;
  }

  .kit-plp-tile-text {
    padding-top: .5625rem;
  }

  .kit-plp-tile-img {
    background-color: $gray;
    aspect-ratio: 1260 / 1460;
  }
  .kit-refinements-sidebar {
    background-color: gray;
    width: 100%;
  }
  
</style>
