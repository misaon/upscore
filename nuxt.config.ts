import { isTest } from 'std-env';
import rollupPluginTs from '@rollup/plugin-typescript';
import istanbul from 'vite-plugin-istanbul';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  nitro: {
    experimental: {
      // Open http://localhost:3000/_nitro/swagger
      openAPI: true,
    },
    rollupConfig: {
      // @ts-ignore
      plugins: [
        rollupPluginTs({
          include: ['server/entity/**/*.ts', 'server/dto/**/*.ts'],
          tsconfig: 'server/tsconfig.json',
        }),
      ],
    },
  },
  vite: {
    plugins: [
      ...(isTest
        ? [
            istanbul({
              include: ['*'],
              exclude: ['node_modules'],
              extension: ['.js', '.ts', '.vue'],
              requireEnv: false,
            }),
          ]
        : []),
    ],
  },
  modules: [
    '@nuxtjs/eslint-module',
    'nuxt-lodash',
    'nuxt-icon',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@formkit/nuxt',
    '@pinia/nuxt',
  ],
  imports: {
    dirs: ['./stores', './locales'],
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  hooks: {
    'nitro:build:before': (nitro) => {
      nitro.options.moduleSideEffects.push('reflect-metadata');
    },
  },
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate', 'storeToRefs'],
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    exposeConfig: false,
    viewer: true,
  },
  i18n: {
    vueI18n: './i18n.config.ts',
  },
  colorMode: {
    preference: 'light',
    dataValue: 'theme',
    classSuffix: '',
  },
  googleFonts: {
    prefetch: true,
    preconnect: true,
    display: 'swap',
    families: {
      'Open Sans': [300, 400, 600],
    },
  },
  eslint: {
    lintOnStart: false,
  },
});
