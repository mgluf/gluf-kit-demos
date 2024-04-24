<!-- <!DOCTYPE html> -->
<script>
  import GlobalStyles from '$lib/components/dev/GlobalStyles.svelte';
  import Slick from '$lib/components/dev/SlickDependency.svelte';
</script>
{#if process.env.KIT_ENV === 'development'}
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛠️</text></svg>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <GlobalStyles />
    <Slick />
    <title>{process.env.KIT_TITLE} &ndash; {process.env.KIT_SITE} &ndash; {process.env.KIT_BASE}</title>
    %cayo.title%
    %cayo.css%    
    %cayo.head%
  </head>
  <body>
    %cayo.body%
    %cayo.script%
  </body>
</html>
{:else}
%cayo.css%    
%cayo.head%
%cayo.body%
%cayo.script%
{/if}