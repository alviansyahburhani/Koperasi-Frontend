<script setup lang="ts">
/**
 * AppFooter Component
 * Reusable footer untuk semua layout
 */

const { navItems, socialLinks } = useNavigation()
const currentYear = new Date().getFullYear()

const getColorClasses = (color: string) => {
  const colors = {
    green: {
      bg: 'from-green-500 to-green-600',
      hover: 'hover:bg-green-500/30 hover:text-green-300 hover:border-green-400/50'
    },
    blue: {
      bg: 'from-blue-500 to-blue-600',
      hover: 'hover:bg-blue-500/30 hover:text-blue-300 hover:border-blue-400/50'
    },
    pink: {
      bg: 'from-pink-500 to-pink-600',
      hover: 'hover:bg-pink-500/30 hover:text-pink-300 hover:border-pink-400/50'
    }
  }
  return colors[color as keyof typeof colors] || colors.green
}
</script>

<template>
  <footer class="bg-gradient-to-br from-red-900 via-red-800 to-red-900 text-white mt-auto relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px);" />
    </div>

    <div class="container mx-auto px-4 py-12 relative z-10">
      
      <!-- Main Footer Content -->
      <div class="grid md:grid-cols-3 gap-8 mb-8">
        
        <!-- Column 1: Company Info -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <span class="text-red-600 font-bold text-xl">KMP</span>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">Koperasi</h3>
              <p class="text-sm text-red-200">Merah Putih</p>
            </div>
          </div>
          <p class="text-red-50 text-sm leading-relaxed mb-4">
            Platform digital untuk transformasi pengelolaan koperasi modern dengan sistem 16 Buku Wajib yang terintegrasi dan transparan.
          </p>
          <div class="flex items-center gap-2 text-sm text-red-100">
            <UIcon name="i-heroicons-shield-check" class="w-4 h-4 text-green-300" />
            <span>Aman & Terpercaya</span>
          </div>
        </div>

        <!-- Column 2: Quick Links -->
        <div>
          <h4 class="font-bold mb-4 text-lg text-white">Menu Cepat</h4>
          <ul class="space-y-3">
            <li v-for="item in navItems" :key="item.to">
              <NuxtLink 
                :to="item.to"
                class="text-red-50 hover:text-white hover:translate-x-1 transition-all text-sm flex items-center gap-2 group"
              >
                <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 text-red-300 group-hover:text-white transition-transform" />
                {{ item.label }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/daftar-koperasi"
                class="text-red-50 hover:text-white hover:translate-x-1 transition-all text-sm flex items-center gap-2 group"
              >
                <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 text-red-300 group-hover:text-white transition-transform" />
                Daftar Koperasi
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Column 3: Customer Service -->
        <div>
          <h4 class="font-bold mb-4 text-lg text-white">Customer Service</h4>
          <p class="text-red-50 text-sm mb-4">
            Hubungi Super Admin untuk bantuan dan informasi lebih lanjut
          </p>
          
          <div class="space-y-3">
            <a 
              v-for="social in socialLinks.filter(s => s.name !== 'Instagram')"
              :key="social.name"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all group border border-white/20 backdrop-blur-sm"
              :class="getColorClasses(social.color).hover"
            >
              <div 
                class="w-10 h-10 bg-gradient-to-br rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg"
                :class="`bg-gradient-to-br ${getColorClasses(social.color).bg}`"
              >
                <UIcon :name="social.icon" class="w-5 h-5 text-white" />
              </div>
              <div class="flex-1">
                <p class="text-xs text-red-200 mb-0.5">{{ social.name }}</p>
                <p class="text-sm font-medium text-white">{{ social.label }}</p>
              </div>
              <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4 text-red-200 transition-colors" />
            </a>
          </div>
        </div>

      </div>

      <!-- Divider with Social Icons -->
      <div class="relative my-8">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-white/20" />
        </div>
        <div class="relative flex justify-center">
          <div class="bg-gradient-to-r from-red-900 via-red-800 to-red-900 px-4">
            <div class="flex gap-4">
              <a 
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/20 transition-all hover:scale-110 text-white backdrop-blur-sm"
                :class="getColorClasses(social.color).hover"
                :aria-label="social.name"
              >
                <UIcon :name="social.icon" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
        <!-- Copyright -->
        <div class="text-center md:text-left">
          <p class="text-sm text-red-50">
            &copy; {{ currentYear }} <span class="text-white font-semibold">Koperasi Merah Putih</span>. All rights reserved.
          </p>
          <p class="text-xs text-red-200 mt-1">
            Built for Indonesian Cooperatives
          </p>
        </div>

        <!-- Tech Stack Badge -->
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
            <span class="text-xs text-white font-medium">System Online</span>
          </div>
          <div class="px-3 py-1.5 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
            <span class="text-xs text-red-50">Powered by Nuxt 4</span>
          </div>
        </div>
      </div>

      <!-- Notice Banner -->
      <div class="mt-6 p-4 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm">
        <div class="flex items-start gap-3">
          <UIcon name="i-heroicons-information-circle" class="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" />
          <div>
            <p class="text-sm text-white font-medium mb-1">Informasi Penting</p>
            <p class="text-xs text-red-50">
              Untuk pertanyaan teknis, bantuan sistem, atau informasi lebih lanjut, silakan hubungi Super Admin melalui kontak Customer Service di atas. Kami siap membantu Anda 24/7.
            </p>
          </div>
        </div>
      </div>

    </div>
  </footer>
</template>