<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useHead({
  title: 'Dashboard - Super Admin'
})

const authStore = useAuthStore()
const router = useRouter()

// Protect route - only super admin
onMounted(() => {
  if (!authStore.isSuperadmin) {
    navigateTo('/auth/login')
  }
})

// Stats (mock data untuk sekarang)
const stats = ref({
  totalTenants: 0,
  activeTenants: 0,
  pendingTenants: 0,
  suspendedTenants: 0
})

// Sidebar menu items
const menuItems = [
  {
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    to: '/superadmin',
    badge: null
  },
  {
    label: 'Permohonan Koperasi',
    icon: 'i-heroicons-inbox',
    to: '/superadmin/permohonan',
    badge: stats.value.pendingTenants || null
  },
  {
    label: 'Daftar Koperasi',
    icon: 'i-heroicons-building-office-2',
    to: '/superadmin/koperasi',
    badge: null
  },
  {
    label: 'Pengaturan Platform',
    icon: 'i-heroicons-cog-6-tooth',
    to: '/superadmin/pengaturan',
    badge: null
  }
]

// Logout handler
const handleLogout = async () => {
  if (confirm('Yakin ingin logout?')) {
    await authStore.logout()
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white flex flex-col fixed h-full">
      <!-- Logo/Header -->
      <div class="p-6 bg-gray-800">
        <h1 class="text-xl font-bold">Super Admin</h1>
        <p class="text-xs text-gray-400 mt-1">Sistem Koperasi</p>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors hover:bg-gray-800"
          active-class="bg-gray-800 text-white"
          exact-active-class="bg-gray-800 text-white"
        >
          <UIcon :name="item.icon" class="w-5 h-5 mr-3 flex-shrink-0" />
          <span class="flex-1">{{ item.label }}</span>
          <span
            v-if="item.badge"
            class="px-2 py-0.5 text-xs font-semibold bg-red-600 rounded-full"
          >
            {{ item.badge }}
          </span>
        </NuxtLink>
      </nav>

      <!-- User Info & Logout -->
      <div class="p-4 border-t border-gray-800">
        <div class="flex items-center mb-3">
          <div class="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span class="text-lg font-bold">{{ authStore.user?.email?.charAt(0).toUpperCase() }}</span>
          </div>
          <div class="ml-3 flex-1 min-w-0">
            <p class="text-sm font-medium text-white truncate">{{ authStore.user?.email }}</p>
            <p class="text-xs text-gray-400">Super Administrator</p>
          </div>
        </div>
        
        <button
          @click="handleLogout"
          class="w-full flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm font-medium"
        >
          <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 ml-64">
      <!-- Top Bar -->
      <header class="bg-white shadow-sm sticky top-0 z-10">
        <div class="px-6 py-4">
          <h2 class="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        </div>
      </header>

      <!-- Content -->
      <main class="p-6">
        <!-- Welcome Banner -->
        <div class="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 mb-6 text-white">
          <h3 class="text-2xl font-bold mb-2">Selamat Datang, Super Admin! 👋</h3>
          <p class="text-purple-100">Kelola platform sistem koperasi dari sini.</p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <!-- Total Tenants -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 p-3 bg-blue-100 rounded-lg">
                <UIcon name="i-heroicons-building-office-2" class="w-8 h-8 text-blue-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Koperasi</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.totalTenants }}</p>
              </div>
            </div>
          </div>

          <!-- Active -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 p-3 bg-green-100 rounded-lg">
                <UIcon name="i-heroicons-check-circle" class="w-8 h-8 text-green-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Aktif</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.activeTenants }}</p>
              </div>
            </div>
          </div>

          <!-- Pending -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 p-3 bg-yellow-100 rounded-lg">
                <UIcon name="i-heroicons-clock" class="w-8 h-8 text-yellow-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Menunggu Approval</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.pendingTenants }}</p>
              </div>
            </div>
          </div>

          <!-- Suspended -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 p-3 bg-red-100 rounded-lg">
                <UIcon name="i-heroicons-x-circle" class="w-8 h-8 text-red-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Suspended</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.suspendedTenants }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Permohonan Terbaru -->
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900">Permohonan Koperasi Terbaru</h3>
            </div>
            <div class="p-6">
              <div class="text-center py-8">
                <UIcon name="i-heroicons-inbox" class="w-16 h-16 mx-auto mb-3 text-gray-400" />
                <p class="text-gray-600 mb-2">Belum ada permohonan pending</p>
                <NuxtLink 
                  to="/superadmin/permohonan" 
                  class="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Lihat semua permohonan →
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900">Aktivitas Terbaru</h3>
            </div>
            <div class="p-6">
              <div class="text-center py-8">
                <UIcon name="i-heroicons-clock" class="w-16 h-16 mx-auto mb-3 text-gray-400" />
                <p class="text-gray-600">Belum ada aktivitas</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>