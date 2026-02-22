<script setup lang="ts">
defineProps<{
  applications?: { id: string; name: string; status: string; createdAt: string }[]
  loading?: boolean
}>()

defineEmits<{
  view: [id: string]
  approve: [id: string]
  reject: [id: string]
}>()
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full text-sm text-left">
      <thead class="bg-gray-50 text-gray-700">
        <tr>
          <th class="px-4 py-3 font-medium">Nama Koperasi</th>
          <th class="px-4 py-3 font-medium">Status</th>
          <th class="px-4 py-3 font-medium">Tanggal</th>
          <th class="px-4 py-3 font-medium">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="4" class="px-4 py-8 text-center text-gray-500">Memuat data...</td>
        </tr>
        <tr
          v-for="app in applications"
          v-else
          :key="app.id"
          class="border-b hover:bg-gray-50"
        >
          <td class="px-4 py-3">{{ app.name }}</td>
          <td class="px-4 py-3">{{ app.status }}</td>
          <td class="px-4 py-3">{{ app.createdAt }}</td>
          <td class="px-4 py-3 space-x-2">
            <button class="text-blue-600 hover:underline text-xs" @click="$emit('view', app.id)">Detail</button>
            <button class="text-green-600 hover:underline text-xs" @click="$emit('approve', app.id)">Setujui</button>
            <button class="text-red-600 hover:underline text-xs" @click="$emit('reject', app.id)">Tolak</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
