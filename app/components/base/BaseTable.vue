<script setup lang="ts">
defineProps<{
  columns: { key: string; label: string; sortable?: boolean }[]
  loading?: boolean
}>()

defineEmits<{
  sort: [key: string]
}>()
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full text-sm text-left">
      <thead class="bg-gray-50 text-gray-700">
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            class="px-4 py-3 font-medium"
            :class="col.sortable ? 'cursor-pointer hover:bg-gray-100' : ''"
            @click="col.sortable && $emit('sort', col.key)"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td :colspan="columns.length" class="px-4 py-8 text-center text-gray-500">
            Memuat data...
          </td>
        </tr>
        <slot v-else />
      </tbody>
    </table>
  </div>
</template>
