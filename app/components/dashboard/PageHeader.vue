<script setup lang="ts">
interface Props {
  title: string
  description?: string
  backTo?: string
}

defineProps<Props>()
</script>

<template>
  <div class="mb-6">
    <div class="flex items-center gap-4 mb-2">
      <NuxtLink
        v-if="backTo"
        :to="backTo"
        class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <UIcon name="i-lucide-arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div class="flex-1">
        <h1 class="text-2xl font-bold text-gray-900">{{ title }}</h1>
        <p v-if="description" class="text-sm text-gray-600 mt-1">{{ description }}</p>
      </div>
      <div v-if="$slots.actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
