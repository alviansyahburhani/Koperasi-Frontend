<script setup lang="ts">
/**
 * AppHeader Component
 * Reusable header untuk semua layout
 */

interface Props {
  transparent?: boolean
  sticky?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  transparent: false,
  sticky: true
})

const { navItems } = useNavigation()
const route = useRoute()

const isActive = (path: string) => {
  return route.path === path
}
</script>

<template>
  <header 
    :class="[
      'border-b shadow-sm z-50',
      sticky ? 'sticky top-0' : '',
      transparent ? 'bg-transparent' : 'bg-white'
    ]"
  >
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <div class="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          <span class="text-white font-bold text-lg">KMP</span>
        </div>
        <h1 class="font-bold text-red-600 text-xl hidden sm:block">Koperasi Merah Putih</h1>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-6">
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.to"
          :to="item.to"
          :class="[
            'font-medium transition-colors relative group',
            isActive(item.to) 
              ? 'text-red-600' 
              : 'text-slate-600 hover:text-red-600'
          ]"
        >
          {{ item.label }}
          <span 
            :class="[
              'absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-300',
              isActive(item.to) ? 'w-full' : 'w-0 group-hover:w-full'
            ]"
          />
        </NuxtLink>
      </nav>

      <!-- Mobile Menu Button -->
      <button class="md:hidden text-slate-600 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors">
        <UIcon name="i-heroicons-bars-3" class="w-6 h-6" />
      </button>
    </div>
  </header>
</template>