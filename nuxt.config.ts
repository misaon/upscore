// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxtjs/eslint-module',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    'nuxt-icon'
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.json'
      }
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'en'
  },
  colorMode: {
    preference: 'light',
    dataValue: 'theme',
    classSuffix: ''
  },
  googleFonts: {
    prefetch: true,
    preconnect: true,
    preload: true,
    families: {
      'Open Sans': [300, 400, 600]
    }
  }
})
