<script>
  import data from '$lib/data';
  import Carousel from '$lib/components/Carousel/Carousel.svelte';
  import Slides from "$lib/components/Carousel/Slides.svelte";
  import Next from "$lib/components/Carousel/Next.svelte";
  import Prev from "$lib/components/Carousel/Prev.svelte";
  import Dots from "$lib/components/Carousel/Dots.svelte";
  import { Entry } from 'cayo';
</script>

<Entry src="carousel.js"/>

<Carousel class="carousel-layout" options={data.carousel.options} hideBelow={992}>
  <div>
    <h1>Carousel</h1>
    <p>Desktop Version</p>
  </div>
  <div class="carousel-container">
    <Prev>
      Previous
    </Prev>
    <div>
      <Slides slides={data.carousel.slides} imgOptions={{picture: false}}/>
    </div>
    <Next>
      Next
    </Next>
  </div>
  <div class="dots-container">
    <Dots class="my-dots"/>
  </div>
</Carousel>

<Carousel class="carousel-layout-2" options={data.carousel.options} hideAbove={992}>
  <div>
    <h1>Carousel</h1>
    <p>Mobile version</p>
    <Dots class="my-dots"/>
  </div>
  <div class="carousel-container">
    <Slides slides={data.carousel.slides} imgOptions={{picture: false}}>
    </Slides>
    <div class="arrows">
      <Prev>
        Previous
      </Prev>
      <Next>
        Next
      </Next>
    </div>
  </div>
</Carousel>

<style lang='scss'>

  :global(.carousel-layout) {
    .carousel-container {
      display: grid;
      grid-template-columns: 1fr 40% 1fr;
    }
  }

  :global(.carousel-layout .slick-arrow) {
    background-color: rgb(243, 243, 255);
  }

  :global(.carousel-layout .dots-container) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :global(.carousel-layout-2) {
    .carousel-container {
      width: 20%;
      height: fit-content;
      .arrows {
        margin-top: 15px;
        display: flex;
        column-gap: 10px;
      }
    }
  }

  :global(.carousel-layout-2 .slick-arrow) {
    background-color: $pm-navy !important;
    padding: 10px 0 !important;
    text-align: center;
    min-width: 100px;
    color: white;
    font-weight: 500;
  }

  :global(.my-dots) {
    padding: 10px 0;
  }

  :global(.my-dots ul) {
    display: flex;
    column-gap: 5px;
  }

  :global(.my-dots .slick-active button) {
    background-color: $pm-navy !important;
  }

  :global(.my-dots button) {
    background-color: #707070 !important;
    border-radius: 50%;
    color: transparent;
  }
</style>