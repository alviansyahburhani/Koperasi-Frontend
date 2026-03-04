<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  text: undefined,
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }
  return sizes[props.size]
})
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12">
    <div :class="['animate-spin rounded-full border-b-2 border-red-600', sizeClasses]"/>
    <p v-if="text" class="mt-4 text-sm text-gray-600">{{ text }}</p>
  </div>
</template>
