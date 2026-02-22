<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

interface Application {
  id: number
  cooperativeName: string
  subdomain: string
  skAhu: string
  province: string
  city: string
  district: string
  village: string
  picName: string
  picEmail: string
  picPhone: string
  submittedAt: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
}

const applications = ref<Application[]>([
  {
    id: 1,
    cooperativeName: 'Koperasi Unit Desa Sejahtera',
    subdomain: 'kud-sejahtera',
    skAhu: 'AHU-0012345-KOP-2026',
    province: 'Jawa Barat',
    city: 'Bandung',
    district: 'Cimahi Selatan',
    village: 'Cipageran',
    picName: 'Budi Santoso',
    picEmail: 'budi@kudsejahtera.com',
    picPhone: '081234567890',
    submittedAt: '2026-02-19 14:30',
    status: 'PENDING',
  },
  {
    id: 2,
    cooperativeName: 'Koperasi Simpan Pinjam Maju Bersama',
    subdomain: 'ksp-maju-bersama',
    skAhu: 'AHU-0012346-KOP-2026',
    province: 'Jawa Tengah',
    city: 'Semarang',
    district: 'Banyumanik',
    village: 'Srondol',
    picName: 'Siti Aminah',
    picEmail: 'siti@majubersama.com',
    picPhone: '082345678901',
    submittedAt: '2026-02-18 09:15',
    status: 'PENDING',
  },
  {
    id: 3,
    cooperativeName: 'Koperasi Konsumen Berkah',
    subdomain: 'koperasi-berkah',
    skAhu: 'AHU-0012347-KOP-2026',
    province: 'Jawa Timur',
    city: 'Surabaya',
    district: 'Gubeng',
    village: 'Airlangga',
    picName: 'Ahmad Fauzi',
    picEmail: 'ahmad@berkah.com',
    picPhone: '083456789012',
    submittedAt: '2026-02-17 16:45',
    status: 'PENDING',
  },
])

const filterStatus = ref<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING')
const searchQuery = ref('')

const filteredApplications = computed(() => {
  let filtered = applications.value

  // Filter by status
  if (filterStatus.value !== 'ALL') {
    filtered = filtered.filter((app) => app.status === filterStatus.value)
  }

  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (app) =>
        app.cooperativeName.toLowerCase().includes(query) ||
        app.subdomain.toLowerCase().includes(query) ||
        app.picName.toLowerCase().includes(query)
    )
  }

  return filtered
})

const statusCounts = computed(() => ({
  all: applications.value.length,
  pending: applications.value.filter((a) => a.status === 'PENDING').length,
  approved: applications.value.filter((a) => a.status === 'APPROVED').length,
  rejected: applications.value.filter((a) => a.status === 'REJECTED').length,
}))

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800'
    case 'APPROVED':
      return 'bg-green-100 text-green-800'
    case 'REJECTED':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Permohonan Pendaftaran</h1>
        <p class="text-sm text-gray-600 mt-1">Kelola dan verifikasi pendaftaran koperasi baru</p>
      </div>
      <div class="mt-4 sm:mt-0">
        <span
          class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"
        >
          <UIcon name="i-lucide-alert-circle" class="w-4 h-4 mr-1.5" />
          {{ statusCounts.pending }} Menunggu Verifikasi
        </span>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="bg-white shadow rounded-lg">
      <div class="border-b border-gray-200">
        <nav class="flex -mb-px overflow-x-auto">
          <button
            :class="[
              filterStatus === 'ALL'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors',
            ]"
            @click="filterStatus = 'ALL'"
          >
            Semua ({{ statusCounts.all }})
          </button>
          <button
            :class="[
              filterStatus === 'PENDING'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors',
            ]"
            @click="filterStatus = 'PENDING'"
          >
            Pending ({{ statusCounts.pending }})
          </button>
          <button
            :class="[
              filterStatus === 'APPROVED'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors',
            ]"
            @click="filterStatus = 'APPROVED'"
          >
            Disetujui ({{ statusCounts.approved }})
          </button>
          <button
            :class="[
              filterStatus === 'REJECTED'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors',
            ]"
            @click="filterStatus = 'REJECTED'"
          >
            Ditolak ({{ statusCounts.rejected }})
          </button>
        </nav>
      </div>

      <!-- Search Bar -->
      <div class="p-4 border-b border-gray-200">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UIcon name="i-lucide-search" class="h-5 w-5 text-gray-400" />
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama koperasi, subdomain, atau PIC..."
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Koperasi
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Lokasi
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                PIC
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tanggal
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="app in filteredApplications"
              :key="app.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="flex-shrink-0 h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center"
                  >
                    <UIcon name="i-lucide-building-2" class="h-5 w-5 text-red-600" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ app.cooperativeName }}</div>
                    <div class="text-xs text-gray-500">{{ app.subdomain }}.koperasi.com</div>
                    <div class="text-xs text-gray-400 mt-0.5">{{ app.skAhu }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ app.city }}, {{ app.province }}</div>
                <div class="text-xs text-gray-500">{{ app.district }}, {{ app.village }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ app.picName }}</div>
                <div class="text-xs text-gray-500">{{ app.picEmail }}</div>
                <div class="text-xs text-gray-500">{{ app.picPhone }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ app.submittedAt }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getStatusBadge(app.status),
                  ]"
                >
                  {{ app.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <NuxtLink
                  :to="`/admin/permohonan/${app.id}`"
                  class="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                >
                  <UIcon name="i-lucide-eye" class="w-4 h-4" />
                  Review
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="filteredApplications.length === 0" class="text-center py-12">
          <UIcon name="i-lucide-inbox" class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-2 text-sm font-medium text-gray-900">Tidak ada permohonan</h3>
          <p class="mt-1 text-sm text-gray-500">
            {{
              searchQuery
                ? 'Tidak ditemukan hasil pencarian'
                : 'Belum ada permohonan dengan status ini'
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
