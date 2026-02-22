<script setup lang="ts">
/**
 * Badge Component
 * Displays small status/label badges with icons
 *
 * @example
 * <Badge variant="primary" icon="i-heroicons-rocket-launch" :pulse="true">
 *   Platform Digital
 * </Badge>
 */

interface Props {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  pulse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  pulse: false,
})

const variantClasses = {
  primary: 'bg-red-50 border-red-100 text-red-600',
  success: 'bg-green-50 border-green-100 text-green-600',
  warning: 'bg-amber-50 border-amber-100 text-amber-600',
  danger: 'bg-red-100 border-red-200 text-red-700',
  info: 'bg-blue-50 border-blue-100 text-blue-600',
}

const sizeClasses = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-3 text-base',
}
</script>

<template>
  <div
    :class="[
      'inline-flex items-center gap-2 rounded-full border font-bold shadow-sm',
      variantClasses[variant],
      sizeClasses[size],
    ]"
  >
    <UIcon v-if="icon" :name="icon" class="w-4 h-4" :class="{ 'animate-pulse': pulse }" />
    <slot />
  </div>
</template>
