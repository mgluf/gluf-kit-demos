<script>
  import data from '$lib/data';
  import Carousel from '$lib/components/Carousel/Carousel.svelte';
  import Slides from "$lib/components/Carousel/Slides.svelte";
  import Next from "$lib/components/Carousel/Next.svelte";
  import Prev from "$lib/components/Carousel/Prev.svelte";
  import Dots from "$lib/components/Carousel/Dots.svelte";
  import { Entry } from 'cayo';
</script>

<Entry src="carousel-entry.js"/>

<Carousel class="carousel-layout">
  <Slides slides={data.carousel.slides}/>
  <Dots color="#000" class="my-dots"/>
</Carousel>

<style lang='scss'>

  :global(.carousel-layout) {
    margin: 0 auto;
    width: 30% !important;
    height: fit-content;
  }

  :global(.my-dots li:not(:first-of-type)) {
    padding: 0 5px;
  }

  :global(.my-dots button) {
    width: 10px !important;
    height: 10px !important;
  }

</style>