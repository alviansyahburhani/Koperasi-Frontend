<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

interface Cooperative {
  id: number
  name: string
  subdomain: string
  skAhu: string
  province: string
  city: string
  picName: string
  picEmail: string
  picPhone: string
  totalMembers: number
  joinedAt: string
  lastActive: string
  status: 'ACTIVE' | 'SUSPENDED' | 'INACTIVE'
  subscriptionExpiry?: string
}

const cooperatives = ref<Cooperative[]>([
  {
    id: 1,
    name: 'Koperasi Sejahtera Mandiri',
    subdomain: 'sejahtera-mandiri',
    skAhu: 'AHU-0012340-KOP-2025',
    province: 'Jawa Barat',
    city: 'Bandung',
    picName: 'Ahmad Fauzi',
    picEmail: 'ahmad@sejahtera.com',
    picPhone: '081234567890',
    totalMembers: 156,
    joinedAt: '2025-08-15',
    lastActive: '2026-02-20 09:30',
    status: 'ACTIVE',
    subscriptionExpiry: '2027-08-15',
  },
  {
    id: 2,
    name: 'Koperasi Unit Desa Makmur',
    subdomain: 'kud-makmur',
    skAhu: 'AHU-0012341-KOP-2025',
    province: 'Jawa Tengah',
    city: 'Semarang',
    picName: 'Siti Rahayu',
    picEmail: 'siti@kudmakmur.com',
    picPhone: '082345678901',
    totalMembers: 203,
    joinedAt: '2025-09-20',
    lastActive: '2026-02-19 15:22',
    status: 'ACTIVE',
    subscriptionExpiry: '2027-09-20',
  },
  {
    id: 3,
    name: 'Koperasi Simpan Pinjam Bersama',
    subdomain: 'ksp-bersama',
    skAhu: 'AHU-0012342-KOP-2025',
    province: 'Jawa Timur',
    city: 'Surabaya',
    picName: 'Budi Hartono',
    picEmail: 'budi@kspbersama.com',
    picPhone: '083456789012',
    totalMembers: 89,
    joinedAt: '2025-10-05',
    lastActive: '2026-02-15 11:05',
    status: 'SUSPENDED',
    subscriptionExpiry: '2026-02-10',
  },
])

const searchQuery = ref('')
const filterStatus = ref<'ALL' | 'ACTIVE' | 'SUSPENDED' | 'INACTIVE'>('ALL')
const sortBy = ref<'name' | 'members' | 'joined'>('joined')
const sortOrder = ref<'asc' | 'desc'>('desc')

const filteredCooperatives = computed(() => {
  let filtered = [...cooperatives.value]

  // Filter by status
  if (filterStatus.value !== 'ALL') {
    filtered = filtered.filter((coop) => coop.status === filterStatus.value)
  }

  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (coop) =>
        coop.name.toLowerCase().includes(query) ||
        coop.subdomain.toLowerCase().includes(query) ||
        coop.city.toLowerCase().includes(query)
    )
  }

  // Sort
  filtered.sort((a, b) => {
    let comparison = 0

    switch (sortBy.value) {
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
      case 'members':
        comparison = a.totalMembers - b.totalMembers
        break
      case 'joined':
        comparison = new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime()
        break
    }

    return sortOrder.value === 'asc' ? comparison : -comparison
  })

  return filtered
})

const statusCounts = computed(() => ({
  all: cooperatives.value.length,
  active: cooperatives.value.filter((c) => c.status === 'ACTIVE').length,
  suspended: cooperatives.value.filter((c) => c.status === 'SUSPENDED').length,
  inactive: cooperatives.value.filter((c) => c.status === 'INACTIVE').length,
}))

const totalMembers = computed(() =>
  cooperatives.value.reduce((sum, coop) => sum + coop.totalMembers, 0)
)

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return { class: 'bg-green-100 text-green-800', icon: 'i-lucide-check-circle', label: 'Aktif' }
    case 'SUSPENDED':
      return { class: 'bg-red-100 text-red-800', icon: 'i-lucide-pause-circle', label: 'Disuspen' }
    case 'INACTIVE':
      return { class: 'bg-gray-100 text-gray-800', icon: 'i-lucide-circle', label: 'Tidak Aktif' }
    default:
      return { class: 'bg-gray-100 text-gray-800', icon: 'i-lucide-circle', label: status }
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const getLastActiveColor = (lastActive: string) => {
  const diff = Date.now() - new Date(lastActive).getTime()
  const days = diff / (1000 * 60 * 60 * 24)

  if (days < 1) return 'text-green-600'
  if (days < 7) return 'text-yellow-600'
  return 'text-red-600'
}

const exportData = () => {
  // TODO: Implement CSV export
  alert('Export to CSV functionality')
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Koperasi Aktif</h1>
        <p class="text-sm text-gray-600 mt-1">Kelola koperasi yang sudah terdaftar dalam sistem</p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button
          @click="exportData"
          class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <UIcon name="i-lucide-download" class="w-4 h-4" />
          Export Data
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div class="bg-white shadow rounded-lg p-5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Koperasi</p>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ statusCounts.all }}</p>
          </div>
          <div class="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <UIcon name="i-lucide-building-2" class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Koperasi Aktif</p>
            <p class="text-2xl font-bold text-green-600 mt-1">{{ statusCounts.active }}</p>
          </div>
          <div class="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
            <UIcon name="i-lucide-check-circle" class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Anggota</p>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ totalMembers.toLocaleString() }}</p>
          </div>
          <div class="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <UIcon name="i-lucide-users" class="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Disuspen</p>
            <p class="text-2xl font-bold text-red-600 mt-1">{{ statusCounts.suspended }}</p>
          </div>
          <div class="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
            <UIcon name="i-lucide-pause-circle" class="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Filters & Search -->
    <div class="bg-white shadow rounded-lg">
      <div class="p-4 border-b border-gray-200">
        <div class="flex flex-col sm:flex-row gap-4">
          <!-- Search -->
          <div class="flex-1">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UIcon name="i-lucide-search" class="h-5 w-5 text-gray-400" />
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari nama koperasi, subdomain, atau kota..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          <!-- Status Filter -->
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-700 whitespace-nowrap">Status:</label>
            <select
              v-model="filterStatus"
              class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="ALL">Semua</option>
              <option value="ACTIVE">Aktif</option>
              <option value="SUSPENDED">Disuspen</option>
              <option value="INACTIVE">Tidak Aktif</option>
            </select>
          </div>

          <!-- Sort -->
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-700 whitespace-nowrap">Urutkan:</label>
            <select
              v-model="sortBy"
              class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="joined">Tanggal Gabung</option>
              <option value="name">Nama</option>
              <option value="members">Jumlah Anggota</option>
            </select>
            <button
              @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
              class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <UIcon
                :name="sortOrder === 'asc' ? 'i-lucide-arrow-up' : 'i-lucide-arrow-down'"
                class="w-4 h-4 text-gray-600"
              />
            </button>
          </div>
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
                Anggota
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Aktivitas Terakhir
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
              v-for="coop in filteredCooperatives"
              :key="coop.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div
                    class="flex-shrink-0 h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center"
                  >
                    <UIcon name="i-lucide-building-2" class="h-5 w-5 text-red-600" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ coop.name }}</div>
                    <div class="text-xs text-gray-500">{{ coop.subdomain }}.koperasi.com</div>
                    <div class="text-xs text-gray-400 mt-0.5">
                      Gabung {{ formatDate(coop.joinedAt) }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ coop.city }}</div>
                <div class="text-xs text-gray-500">{{ coop.province }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ coop.picName }}</div>
                <div class="text-xs text-gray-500">{{ coop.picEmail }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-semibold text-gray-900">{{ coop.totalMembers }}</div>
                <div class="text-xs text-gray-500">anggota</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-xs" :class="getLastActiveColor(coop.lastActive)">
                  {{ coop.lastActive }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getStatusBadge(coop.status).class,
                  ]"
                >
                  <UIcon :name="getStatusBadge(coop.status).icon" class="w-3 h-3" />
                  {{ getStatusBadge(coop.status).label }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <NuxtLink
                  :to="`/admin/koperasi/${coop.id}`"
                  class="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                >
                  <UIcon name="i-lucide-eye" class="w-4 h-4" />
                  Detail
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="filteredCooperatives.length === 0" class="text-center py-12">
          <UIcon name="i-lucide-building-2" class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-2 text-sm font-medium text-gray-900">Tidak ada koperasi</h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ searchQuery ? 'Tidak ditemukan hasil pencarian' : 'Belum ada koperasi terdaftar' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
