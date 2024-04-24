<script>
  export let sticky = false;
</script>

<div id="kit-nav" class:kit-nav-sticky={sticky}>
  <ul>
    <li><span>base:</span> <code>{process.env.KIT_BASE}</code></li>
    <li><span>site:</span> <code>{process.env.KIT_SITE}</code></li>
    <li><span>mode:</span> <code>{process.env.KIT_ENV}</code></li>
    <li><span>kit:</span> <code>{process.env.KIT_VERSION}</code></li>
  </ul>
</div>

<style lang="scss">
  #kit-nav {
    display: flex;
    flex-direction: column;
    height: 171px;
    z-index: 1000;
    width: 100%;
    background-color: #F5F5F5;
    color: black;
    transition: 200ms ease-out;
  }
  .kit-nav-sticky {
    position: sticky;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    margin: 0;
    padding: sp(20);
  }

  li {
    span {
      display: inline-block;
      font-weight: 500;
      min-width: 50px;
    }
  }

  code {
    color: #D71A71;
  }
</style>