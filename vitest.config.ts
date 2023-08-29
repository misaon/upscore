/* eslint-disable unicorn/prefer-module */
import path from 'node:path';
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

const baseDirectory = path.resolve(__dirname);
const nuxtTypes = path.resolve(__dirname, 'node_modules/nuxt/dist/app/index.d.ts');

export default defineConfig({
  // @ts-ignore
  plugins: [vue()],
  resolve: {
    alias: {
      '@': baseDirectory,
      '~': baseDirectory,
      '#imports': path.resolve(__dirname, './.nuxt/imports.d.ts'),
      '#app': nuxtTypes,
      '#head': nuxtTypes,
    },
  },
  test: {
    coverage: {
      all: true,
      provider: 'istanbul',
      include: ['composables/*', 'server/*', 'pages/*'],
    },
  },
});
