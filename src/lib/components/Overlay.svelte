<script>
  export let href;
  let tag = href ? 'a' : 'div';
</script>

<svelte:element this="{tag}" class="kit-overlay-container" {href}>
  <slot name="background" />
  <div class="kit-overlay-fg">
    <slot />
  </div>
</svelte:element>

<style lang="scss">

  a {
    display: block;
  }

  .kit-overlay-container {
    display: block;
    width: 100%;
    position: relative;
  }

  .kit-overlay-fg {
    position: absolute;
    top: 0;
    width:100%;
    height: 100%;
  }

</style>