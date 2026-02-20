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
      'border-b border-red-800 shadow-md z-50',
      sticky ? 'sticky top-0' : '',
      transparent ? 'bg-transparent' : 'bg-gradient-to-r from-red-700 to-red-800'
    ]"
  >
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
          <span class="text-red-700 font-bold text-lg">KMP</span>
        </div>
        <h1 class="font-bold text-white text-xl hidden sm:block tracking-wide">Koperasi Merah Putih</h1>
      </NuxtLink>

      <nav class="hidden md:flex items-center space-x-6">
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.to"
          :to="item.to"
          :class="[
            'font-medium transition-colors relative group',
            isActive(item.to) 
              ? 'text-white' 
              : 'text-red-200 hover:text-white'
          ]"
        >
          {{ item.label }}
          <span 
            :class="[
              'absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300',
              isActive(item.to) ? 'w-full' : 'w-0 group-hover:w-full'
            ]"
          />
        </NuxtLink>
      </nav>

      <button class="md:hidden text-white hover:bg-red-900/50 p-2 rounded-lg transition-colors">
        <UIcon name="i-heroicons-bars-3" class="w-6 h-6" />
      </button>
    </div>
  </header>
</template>