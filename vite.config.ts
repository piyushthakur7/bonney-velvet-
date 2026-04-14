import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { viteApiPlugin } from './vite-api-plugin';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), viteApiPlugin(env)],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      proxy: {
        '/wc-api': {
          target: env.VITE_WC_API_URL ? env.VITE_WC_API_URL.replace('/wp-json/wc/v3', '') : 'https://lightcyan-cat-798459.hostingersite.com',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/wc-api/, '/wp-json/wc/v3'),
          secure: true,
        },
      },
    },
  };
});
