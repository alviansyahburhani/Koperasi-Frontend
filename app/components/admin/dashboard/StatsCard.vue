<script setup lang="ts">
interface Props {
  label: string
  value: string | number
  icon: string
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange'
  change?: string
  changeType?: 'increase' | 'decrease' | 'neutral'
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'blue',
  change: undefined,
  changeType: 'neutral',
  loading: false,
})

const colorClasses = computed(() => {
  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  }
  return colors[props.color]
})

const changeColorClass = computed(() => {
  if (props.changeType === 'increase') return 'text-green-600'
  if (props.changeType === 'decrease') return 'text-red-600'
  return 'text-gray-600'
})
</script>

<template>
  <div class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
    <div class="p-5">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <div :class="['rounded-md p-3', colorClasses]">
            <UIcon :name="icon" class="h-6 w-6" />
          </div>
        </div>
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt class="text-sm font-medium text-gray-500 truncate">{{ label }}</dt>
            <dd class="flex items-baseline">
              <div v-if="loading" class="h-8 w-24 bg-gray-200 animate-pulse rounded"/>
              <div v-else class="text-2xl font-semibold text-gray-900">{{ value }}</div>
              <div
                v-if="change && !loading"
                :class="['ml-2 flex items-baseline text-sm font-semibold', changeColorClass]"
              >
                <UIcon
                  v-if="changeType === 'increase'"
                  name="i-lucide-trending-up"
                  class="w-4 h-4 mr-0.5"
                />
                <UIcon
                  v-else-if="changeType === 'decrease'"
                  name="i-lucide-trending-down"
                  class="w-4 h-4 mr-0.5"
                />
                {{ change }}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
