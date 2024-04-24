
<script>
	export let options
	export let hideAbove
	export let hideBelow

  let clazz;
  export { clazz as class };

  if(options) {
    options = JSON.stringify(options)
  }
	
</script>

<div 
  class={`${clazz || ''}`}
  data-kit-slick-options={options} 
  data-kit-carousel-hide-above={hideAbove} 
  data-kit-carousel-hide-below={hideBelow}
  >
  <slot/>
</div>

<style lang='scss'>
  :global(.destroyed) {
    display: none;
  }
</style>


