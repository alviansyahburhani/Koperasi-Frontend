<script setup lang="ts">
defineProps<{
  open: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}>()

defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/50" @click="$emit('close')" />
        <div class="relative bg-white rounded-lg shadow-xl w-full max-w-md">
          <div v-if="title" class="flex items-center justify-between px-6 py-4 border-b">
            <h3 class="text-lg font-semibold">{{ title }}</h3>
            <button class="text-gray-400 hover:text-gray-600" @click="$emit('close')">
              <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
            </button>
          </div>
          <div class="p-6">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
