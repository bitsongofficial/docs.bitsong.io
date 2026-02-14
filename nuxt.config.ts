import { defineNuxtModule, extendPages } from '@nuxt/kit'

export default defineNuxtConfig({
  css: ['~/assets/main.css'],
  
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/icon',
    '@nuxt/fonts',
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
