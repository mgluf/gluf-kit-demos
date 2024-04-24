import sveltePreprocess from 'svelte-preprocess';

export default {
  preprocess: [
    sveltePreprocess({
      scss: {
        includePaths: ['./src/styles/', './node_modules'],
        prependData: `@import './src/styles/_imports.scss';`
      },
    }),
  ],
}