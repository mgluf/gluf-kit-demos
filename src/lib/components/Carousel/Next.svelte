<script>
  let clazz;
  export { clazz as class };
</script>

<button 
  aria-label="next" type="button" 
  class={`${clazz || ''}`}>
  <slot/>
</button>

<style lang='scss'>
  button {
    border: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
  }
</style>