<script>
  export let key; 
  export let from = "right"
</script>

<button class="stl-trigger" data-stl={key} data-from={from}>
  <slot>
    {key}
  </slot>
</button>

<style lang='scss'>
  button {
    display: block;
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    outline: inherit;
    cursor: pointer;
  }
</style>
