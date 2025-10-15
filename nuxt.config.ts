export default defineNuxtConfig({
  css: ['~/assets/styles/main.scss'],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  runtimeConfig: {
    public: {
      omdbApiKey: '' // Will be automatically loaded from NUXT_PUBLIC_OMDB_API_KEY env variable
    }
  },

  modules: ['@nuxt/image']
})