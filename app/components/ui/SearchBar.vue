<script setup lang="ts">
/**
 * SearchBar Component
 * Styled search input with button
 * 
 * @example
 * <SearchBar 
 *   v-model="searchQuery"
 *   placeholder="Cari koperasi..."
 *   @search="handleSearch"
 * />
 */

interface Props {
  modelValue: string
  placeholder?: string
  buttonText?: string
  buttonColor?: string
  disabled?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'search', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Cari...',
  buttonText: 'Cari',
  buttonColor: 'red',
  disabled: false
})

const emit = defineEmits<Emits>()

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

function handleSearch() {
  emit('search', inputValue.value)
}

function handleKeyPress(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    handleSearch()
  }
}
</script>

<template>
  <div class="relative max-w-lg mx-auto lg:mx-0 group">
    <!-- Gradient background effect -->
    <div class="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500" />
    
    <!-- Search input container -->
    <div class="relative flex items-center bg-white border border-slate-200 rounded-full p-2 shadow-lg focus-within:ring-2 focus-within:ring-red-500 transition-all">
      <UIcon name="i-heroicons-magnifying-glass" class="w-6 h-6 text-slate-400 ml-4" />
      
      <input 
        v-model="inputValue"
        type="text" 
        :placeholder="placeholder"
        :disabled="disabled"
        class="flex-1 bg-transparent border-none focus:ring-0 px-4 py-2 text-slate-700 outline-none w-full disabled:opacity-50 disabled:cursor-not-allowed"
        @keypress="handleKeyPress"
      />
      
      <UButton 
        :color="buttonColor" 
        class="rounded-full px-6 py-3 font-bold hover:scale-105 transition-transform"
        :disabled="disabled"
        @click="handleSearch"
      >
        {{ buttonText }}
      </UButton>
    </div>
  </div>
</template>