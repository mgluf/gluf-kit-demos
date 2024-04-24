<!-- Include the PLP (aka Search page) styles from the SFCC site (for local development only) -->
<script>
  const site = process.env.KIT_SITE;
</script>

{#if site.startsWith('pm')}
  <link href="https://staging-na02-petermillar.demandware.net/on/demandware.static/Sites-PM-Site/-/en_US/v1679467441170/css/search.css" rel="stylesheet">
{:else if site.startsWith('g4')}
  <link href="https://staging-na02-petermillar.demandware.net/on/demandware.static/Sites-GF-US-Site/-/en_US/v1679461411172/css/search.css" rel="stylesheet">
{/if}