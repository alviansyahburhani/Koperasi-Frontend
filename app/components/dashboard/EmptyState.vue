<script setup lang="ts">
interface Props {
  icon?: string
  title: string
  description?: string
  actionLabel?: string
  actionTo?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'i-lucide-inbox'
})

const emit = defineEmits<{
  action: []
}>()
</script>

<template>
  <div class="text-center py-12">
    <UIcon :name="icon" class="mx-auto h-12 w-12 text-gray-400" />
    <h3 class="mt-2 text-sm font-medium text-gray-900">{{ title }}</h3>
    <p v-if="description" class="mt-1 text-sm text-gray-500">{{ description }}</p>
    
    <div v-if="actionLabel" class="mt-6">
      <NuxtLink
        v-if="actionTo"
        :to="actionTo"
        class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none"
      >
        <UIcon name="i-lucide-plus" class="w-4 h-4 mr-2" />
        {{ actionLabel }}
      </NuxtLink>
      <button
        v-else
        @click="emit('action')"
        class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none"
      >
        <UIcon name="i-lucide-plus" class="w-4 h-4 mr-2" />
        {{ actionLabel }}
      </button>
    </div>
  </div>
</template>