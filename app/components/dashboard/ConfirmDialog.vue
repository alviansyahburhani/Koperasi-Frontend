<script setup lang="ts">
interface Props {
  isOpen: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  type?: 'danger' | 'warning' | 'info'
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  confirmLabel: 'Konfirmasi',
  cancelLabel: 'Batal',
  type: 'info',
  loading: false,
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const iconName = computed(() => {
  const icons = {
    danger: 'i-lucide-alert-circle',
    warning: 'i-lucide-alert-triangle',
    info: 'i-lucide-info',
  }
  return icons[props.type]
})

const iconColor = computed(() => {
  const colors = {
    danger: 'bg-red-100 text-red-600',
    warning: 'bg-yellow-100 text-yellow-600',
    info: 'bg-blue-100 text-blue-600',
  }
  return colors[props.type]
})

const buttonColor = computed(() => {
  const colors = {
    danger: 'bg-red-600 hover:bg-red-700',
    warning: 'bg-yellow-600 hover:bg-yellow-700',
    info: 'bg-blue-600 hover:bg-blue-700',
  }
  return colors[props.type]
})
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" @click.self="emit('cancel')">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
      <div
        class="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75"
        @click="emit('cancel')"
      />

      <div
        class="relative inline-block w-full max-w-lg px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:p-6"
      >
        <div
          class="flex items-center justify-center w-12 h-12 mx-auto rounded-full mb-4"
          :class="iconColor"
        >
          <UIcon :name="iconName" class="w-6 h-6" />
        </div>

        <div class="text-center mb-5">
          <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
          <p class="mt-2 text-sm text-gray-600">{{ message }}</p>
        </div>

        <div class="flex items-center gap-3 mt-6">
          <button
            :disabled="loading"
            class="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            @click="emit('cancel')"
          >
            {{ cancelLabel }}
          </button>
          <button
            :disabled="loading"
            :class="[
              'flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
              buttonColor,
            ]"
            @click="emit('confirm')"
          >
            {{ loading ? 'Memproses...' : confirmLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
