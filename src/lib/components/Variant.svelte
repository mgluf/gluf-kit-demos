<script>
  export let test = "kit-default-test";
	export let id = "";
	export let control = false;
</script>

<div 
  class="kit-variant-container" 
  data-kit-variant="{id}" 
  data-kit-variant-control={control} 
  data-kit-variant-test={test}
  class:hide={!control}
  >
  <slot/>
</div>

<style>
.hide {
	display: none;
}
</style>