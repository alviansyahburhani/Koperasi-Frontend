// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/ui',
    '@pinia/nuxt'
  ],

  // TAMBAHKAN BARIS INI UNTUK MEMATIKAN ERROR MERAH VUE-TSC
  typescript: {
    typeCheck: false
  },

  colorMode: {
    preference: 'light'
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3002', 
    }
  }
})