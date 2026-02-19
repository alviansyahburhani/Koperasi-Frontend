<script setup lang="ts">
/**
 * FloatingCard Component
 * Animated floating card with icon and stats
 * 
 * @example
 * <FloatingCard
 *   icon="i-heroicons-shield-check"
 *   iconColor="green"
 *   label="Buku 1-16"
 *   value="100% Sinkron"
 * />
 */

interface Props {
  icon: string
  iconColor?: 'red' | 'green' | 'blue' | 'orange' | 'purple'
  label: string
  value: string
  position?: 'bottom-left' | 'top-right'
  delay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  iconColor: 'green',
  position: 'bottom-left',
  delay: false
})

const iconBgClasses = {
  red: 'bg-red-100 text-red-600',
  green: 'bg-green-100 text-green-600',
  blue: 'bg-blue-100 text-blue-600',
  orange: 'bg-orange-100 text-orange-600',
  purple: 'bg-purple-100 text-purple-600'
}

const positionClasses = {
  'bottom-left': '-bottom-8 -left-4 sm:-left-8',
  'top-right': '-top-8 -right-4 sm:-right-8'
}
</script>

<template>
  <div 
    :class="[
      'absolute bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20',
      positionClasses[position],
      delay ? 'animate-float-delay' : 'animate-float'
    ]"
  >
    <div class="flex items-center gap-4">
      <div :class="['p-3 rounded-full', iconBgClasses[iconColor]]">
        <UIcon :name="icon" class="w-6 h-6" />
      </div>
      <div>
        <p class="text-xs text-slate-500 font-medium">{{ label }}</p>
        <p class="font-bold text-slate-800" :class="position === 'top-right' ? 'text-lg' : ''">
          {{ value }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

.animate-float-delay {
  animation: float 4s ease-in-out infinite;
  animation-delay: 2s;
}
</style>