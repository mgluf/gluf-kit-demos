<script>
	import Image from '$lib/components/Image.svelte';
	export let slides = []
	export let imgOptions
	
</script>

<!-- Will pass options from parent component in carousel.js -->
<div class="slick-kit-entry">
	{#if slides.length > 1}
		 {#each slides as slide}
			 {#if slide.href}
				 <a href={slide.href}>
					 <Image src={slide.img} {...imgOptions}/>
				 </a>
				 {:else}
				 <div>
					 <Image src={slide.img} {...imgOptions}/>
				 </div>
			 {/if}
		 {/each}
	{:else}
		 <slot/>
	{/if}
</div>

<style lang='scss'>
	:global(.destroyed) {
		display: none;
	}
</style>
