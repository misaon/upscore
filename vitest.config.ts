/* eslint-disable unicorn/prefer-module */
import path from 'node:path';
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // @ts-ignore
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '~': path.resolve(__dirname, './'),
      '#imports': path.resolve(__dirname, './.nuxt/imports.d.ts'),
      '#app': path.resolve(__dirname, './node_modules/nuxt/dist/app/index.d.ts'),
      '#head': path.resolve(__dirname, './node_modules/nuxt/dist/app/index.d.ts'),
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
