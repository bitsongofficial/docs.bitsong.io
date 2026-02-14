import { defineNuxtModule, extendPages } from '@nuxt/kit'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/icon',
    '@nuxt/fonts',
    // Inline module to remove Docus's landing route.
    // Must be a module (not a config hook) so it runs AFTER
    // Docus's routing module has added the lang-index route.
    defineNuxtModule({
      meta: { name: 'fix-landing-route' },
      setup() {
        extendPages((pages) => {
          const landingIndex = pages.findIndex(p => p.name === 'lang-index')
          if (landingIndex !== -1) {
            pages.splice(landingIndex, 1)
          }
        })
      },
    }),
  ],

  i18n: {
    defaultLocale: 'en',
    locales: [{
      code: 'en',
      name: 'English',
    }, {
      code: 'fr',
      name: 'Français',
    }],
  },
})
