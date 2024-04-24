import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import svelte from './svelte.config.js';
import kit from './kit.config.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  //  Preferences for kit
  publicDir: 'static',
  svelte,
  // Required for kit to work as expected
  vite: {
    rollupOptions: {
      plugins: [
        alias({
          entries: [
            { find: '$lib', replacement: path.resolve(__dirname, './src/lib') },
            { find: '$components', replacement: path.resolve(__dirname, './src/components') },
          ]
        }),
        replace({
          '__ASSETS__': kit.assets,
        }),
      ],
    },
    experimental: kit.mode === 'production' ? {
      // https://vitejs.dev/guide/build.html#advanced-base-options
      // renderBuiltUrl(filename: string, { hostId, hostType, type }: { hostId: string, hostType: 'js' | 'css' | 'html', type: 'public' | 'asset' }) {
      renderBuiltUrl(filename, { hostId, hostType, type }) {
        if (type === 'asset') {
          return `${process.env.KIT_ASSETS}${filename}?$staticlink$`;
        }
      }
    } : null,
  },
}