<script>
  let clazz;
  export { clazz as class };
  export let stripStyles = true
  export let color = "red"
</script>

<div
  class={`${clazz || ''} slick-dots-entry`}
  class:strip={stripStyles === true}
  style="--color:{color}"
/>

<style lang='scss'>
  :global(.strip ul) {
    margin: 0;
    padding: 0;
    display: flex;
  }
  :global(.strip li) {
    list-style: none;
  }

  :global(.strip button) {
    background-color: transparent !important;
    border: 2px solid var(--color) !important;
    border-radius: 50%;
    color: transparent;
    outline: 0 !important; // slick override
    font-size: 0; // slick override
    line-height: 0; // slick override
    padding: 0; // slick override
    height: 20px;
    width: 20px;
  }
  :global(.strip .slick-active button) {
    background-color: var(--color) !important;
    border: 2px solid var(--color) !important;
  }
</style>
