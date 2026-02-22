<script setup lang="ts">
import type { Permission } from '~/types'

interface Props {
  permission?: Permission | Permission[]
  fallback?: boolean // Show fallback message instead of hiding
}

const props = withDefaults(defineProps<Props>(), {
  fallback: false,
})

const { can, canAny } = usePermission()

const hasAccess = computed(() => {
  if (!props.permission) return true

  if (typeof props.permission === 'string') {
    return can(props.permission)
  }

  if (Array.isArray(props.permission)) {
    return canAny(props.permission)
  }

  return false
})
</script>

<template>
  <div v-if="hasAccess">
    <slot />
  </div>
  <div v-else-if="fallback" class="text-center py-8 text-gray-500">
    <UIcon name="i-lucide-shield-alert" class="w-12 h-12 mx-auto mb-3 text-gray-400" />
    <p class="text-sm font-medium">Akses Terbatas</p>
    <p class="text-xs mt-1">Anda tidak memiliki akses ke fitur ini</p>
  </div>
</template>
