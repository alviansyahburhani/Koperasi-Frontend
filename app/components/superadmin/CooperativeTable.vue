<script setup lang="ts">
defineProps<{
  cooperatives?: { id: string; name: string; subdomain: string; status: string }[]
  loading?: boolean
}>()

defineEmits<{
  view: [id: string]
  suspend: [id: string]
}>()
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full text-sm text-left">
      <thead class="bg-gray-50 text-gray-700">
        <tr>
          <th class="px-4 py-3 font-medium">Nama Koperasi</th>
          <th class="px-4 py-3 font-medium">Subdomain</th>
          <th class="px-4 py-3 font-medium">Status</th>
          <th class="px-4 py-3 font-medium">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="4" class="px-4 py-8 text-center text-gray-500">Memuat data...</td>
        </tr>
        <tr
          v-for="coop in cooperatives"
          v-else
          :key="coop.id"
          class="border-b hover:bg-gray-50"
        >
          <td class="px-4 py-3">{{ coop.name }}</td>
          <td class="px-4 py-3">{{ coop.subdomain }}</td>
          <td class="px-4 py-3">{{ coop.status }}</td>
          <td class="px-4 py-3 space-x-2">
            <button class="text-blue-600 hover:underline text-xs" @click="$emit('view', coop.id)">Detail</button>
            <button class="text-orange-600 hover:underline text-xs" @click="$emit('suspend', coop.id)">Suspend</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
