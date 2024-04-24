<script>
  import Variant from "$lib/components/Variant.svelte";
  import { Entry } from 'cayo';
</script>

<Entry src="variant.js"/>

<div class="main">
  <p>kit-test-default</p>
  <ul>
    <Variant control>
      <li>
        <code>CONTROL</code>
      </li>
    </Variant>
    <Variant id="B">
      <li>
        <code>VARIANT B</code>
      </li>
    </Variant>
  </ul>
  
  <p>test-2</p>
  <ul>
    <Variant test="test-2" control>
      <li>
        <code>CONTROL</code>
      </li>
    </Variant>
    <Variant test="test-2" id="B">
      <li>
        <code>VARIANT B</code>
      </li>
    </Variant>
  </ul>
</div>


<style lang='scss'>
  .main {
    padding: 20px;
  }

  p {
    font-weight: 700;
  }

  ul {
    margin: 0;
    margin-bottom: 50px;
    padding: 0 20px;
  }
</style>


