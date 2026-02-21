// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { 
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/ui',
    '@pinia/nuxt'
  ],

 // Runtime Config (Load dari .env)
  runtimeConfig: {
    // Public keys (exposed to client)
    public: {
      // API Config
      apiBase: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3002',
      apiTimeout: parseInt(process.env.NUXT_PUBLIC_API_TIMEOUT || '30000'),

      // App URL
      appUrl: process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:3000',

      // Domain Config
      mainDomain: process.env.NUXT_PUBLIC_MAIN_DOMAIN || 'localhost',
      useHttps: process.env.NUXT_PUBLIC_USE_HTTPS === 'true',

      // Debug Mode
      debugMode: process.env.NUXT_PUBLIC_DEBUG_MODE === 'true',
    }
  },

  // Auto-imports
  imports: {
    dirs: [
      'stores',
      'services'
    ]
  },

  // Dev Server Config
  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },

  // TypeScript Config
  typescript: {
    strict: true,
    typeCheck: false  // Disable untuk development (faster)
  },
})