// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  
  devtools: { enabled: true },

  // Future compatibility
  future: {
    compatibilityVersion: 4
  },

  // App configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Koperasi Merah Putih - Digitalisasi 16 Buku Wajib Koperasi',
      meta: [
        { name: 'description', content: 'Platform digital untuk mengelola 16 Buku Wajib Koperasi secara transparan dan efisien' },
        { name: 'theme-color', content: '#DC2626' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // Modules
  modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxtjs/color-mode', '@nuxt/image'],

  // CSS
  css: ['~/assets/css/main.css'],

  // ✅ TAMBAHKAN INI - Component Auto Import
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  // Color mode
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: ''
  },

  // TypeScript
  typescript: {
    strict: true,
    typeCheck: true
  },

  // Runtime config
  runtimeConfig: {
    // Private keys (server-side only)
    apiSecret: process.env.NUXT_API_SECRET || '',
    
    // Public keys (exposed to client)
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3002',
      appName: 'Koperasi Merah Putih',
      appVersion: '1.0.0'
    }
  },

  // Build
  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }
  }
})