// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  // Mendaftarkan modul Nuxt UI (yang membawa Tailwind CSS) dan Pinia
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt'
  ],

  // Memaksa tema warna ke mode Terang agar sesuai desain
  colorMode: {
    preference: 'light'
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3002', 
    }
  }
})