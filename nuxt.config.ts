export default defineNuxtConfig({
  css: ['~/assets/styles/main.scss'],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'MEDIA - Movie Discovery',
      titleTemplate: '%s | MEDIA',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Discover and explore movies from around the world' }
      ]
    }
  },

  runtimeConfig: {
    public: {
      omdbApiKey: '' // Will be automatically loaded from NUXT_PUBLIC_OMDB_API_KEY env variable
    }
  },

  modules: ['@nuxt/image']
})