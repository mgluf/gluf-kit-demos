<script>
  let clazz;
  export { clazz as class };
  export let stripStyles = true
</script>

<div
  class={`${clazz || ''} slick-dots-entry`}
  class:strip={stripStyles === true}
/>

<style lang='scss'>
  :global(.strip ul) {
    margin: 0;
    padding: 0;
  }
  :global(.strip li) {
    list-style: none;
  }

  :global(.strip button) {
    background-color: transparent;
    border: none;
  }
</style>
