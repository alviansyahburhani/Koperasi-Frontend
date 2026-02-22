<script setup lang="ts">
const { user, logout } = useAuth()

const showMobileSidebar = ref(false)

const menuItems = [
  {
    label: 'Dashboard',
    icon: 'i-lucide-layout-dashboard',
    to: '/superadmin',
  },
  {
    label: 'Permohonan Pendaftaran',
    icon: 'i-lucide-inbox',
    to: '/superadmin/permohonan',
    badge: 5,
  },
  {
    label: 'Koperasi Aktif',
    icon: 'i-lucide-building-2',
    to: '/superadmin/koperasi',
  },
  {
    label: 'Monitoring',
    icon: 'i-lucide-activity',
    to: '/superadmin/monitoring/activity-log',
  },
  {
    label: 'Master Data',
    icon: 'i-lucide-database',
    children: [
      { label: 'Wilayah', to: '/superadmin/master-data/wilayah', icon: 'i-lucide-map' },
      {
        label: 'Email Template',
        to: '/superadmin/master-data/email-template',
        icon: 'i-lucide-mail',
      },
    ],
  },
]

const handleLogout = async () => {
  if (confirm('Apakah Anda yakin ingin keluar?')) {
    await logout()
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar Desktop -->
    <aside
      class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-gradient-to-b from-purple-900 to-purple-800"
    >
      <div class="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <!-- Logo -->
        <div class="flex items-center flex-shrink-0 px-4 mb-5">
          <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <span class="text-purple-900 font-bold text-lg">SA</span>
          </div>
          <div class="ml-3">
            <h1 class="text-lg font-bold text-white">Super Admin</h1>
            <p class="text-xs text-purple-200">Management Panel</p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-2 space-y-1">
          <template v-for="item in menuItems" :key="item.label">
            <!-- Menu with children -->
            <div v-if="item.children && item.children.length > 0">
              <div class="px-3 py-2 text-xs font-semibold text-purple-200 uppercase tracking-wider">
                {{ item.label }}
              </div>
              <div class="space-y-1">
                <NuxtLink
                  v-for="child in item.children"
                  :key="child.to"
                  :to="child.to"
                  class="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-purple-100 hover:bg-purple-700 transition-colors"
                  active-class="bg-purple-700 text-white"
                >
                  <UIcon :name="child.icon" class="mr-3 flex-shrink-0 h-5 w-5" />
                  {{ child.label }}
                </NuxtLink>
              </div>
            </div>

            <!-- Single menu -->
            <NuxtLink
              v-else
              :to="item.to"
              class="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-purple-100 hover:bg-purple-700 transition-colors relative"
              active-class="bg-purple-700 text-white"
            >
              <UIcon :name="item.icon" class="mr-3 flex-shrink-0 h-5 w-5" />
              {{ item.label }}
              <span
                v-if="item.badge"
                class="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-400 text-yellow-900"
              >
                {{ item.badge }}
              </span>
            </NuxtLink>
          </template>
        </nav>

        <!-- User Profile -->
        <div class="flex-shrink-0 flex border-t border-purple-700 p-4">
          <div class="flex items-center w-full">
            <div class="flex-shrink-0">
              <div
                class="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold ring-2 ring-purple-400"
              >
                {{ user?.name?.charAt(0) || 'S' }}
              </div>
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm font-medium text-white truncate">{{ user?.name }}</p>
              <p class="text-xs text-purple-200 truncate">{{ user?.email }}</p>
            </div>
            <button
              class="ml-2 text-purple-200 hover:text-white transition-colors"
              @click="handleLogout"
            >
              <UIcon name="i-lucide-log-out" class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </aside>

    <!-- Mobile Sidebar -->
    <div
      v-if="showMobileSidebar"
      class="lg:hidden fixed inset-0 z-40 bg-gray-900 bg-opacity-75"
      @click="showMobileSidebar = false"
    />

    <aside
      v-if="showMobileSidebar"
      class="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-purple-900 to-purple-800"
    >
      <div class="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div class="flex items-center justify-between px-4 mb-5">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span class="text-purple-900 font-bold text-lg">SA</span>
            </div>
            <div class="ml-3">
              <h1 class="text-lg font-bold text-white">Super Admin</h1>
              <p class="text-xs text-purple-200">Management Panel</p>
            </div>
          </div>
          <button class="text-purple-200 hover:text-white" @click="showMobileSidebar = false">
            <UIcon name="i-lucide-x" class="w-6 h-6" />
          </button>
        </div>

        <nav class="flex-1 px-2 space-y-1">
          <template v-for="item in menuItems" :key="item.label">
            <div v-if="item.children && item.children.length > 0">
              <div class="px-3 py-2 text-xs font-semibold text-purple-200 uppercase tracking-wider">
                {{ item.label }}
              </div>
              <div class="space-y-1">
                <NuxtLink
                  v-for="child in item.children"
                  :key="child.to"
                  :to="child.to"
                  class="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-purple-100 hover:bg-purple-700 transition-colors"
                  active-class="bg-purple-700 text-white"
                  @click="showMobileSidebar = false"
                >
                  <UIcon :name="child.icon" class="mr-3 flex-shrink-0 h-5 w-5" />
                  {{ child.label }}
                </NuxtLink>
              </div>
            </div>

            <NuxtLink
              v-else
              :to="item.to"
              class="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-purple-100 hover:bg-purple-700 transition-colors"
              active-class="bg-purple-700 text-white"
              @click="showMobileSidebar = false"
            >
              <UIcon :name="item.icon" class="mr-3 flex-shrink-0 h-5 w-5" />
              {{ item.label }}
              <span
                v-if="item.badge"
                class="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-400 text-yellow-900"
              >
                {{ item.badge }}
              </span>
            </NuxtLink>
          </template>
        </nav>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="lg:pl-64 flex flex-col flex-1">
      <!-- Top Bar -->
      <div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button
          class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none lg:hidden"
          @click="showMobileSidebar = true"
        >
          <UIcon name="i-lucide-menu" class="h-6 w-6" />
        </button>

        <div class="flex-1 px-4 flex justify-between items-center">
          <div class="flex items-center gap-2">
            <div class="h-2 w-2 rounded-full bg-green-500 animate-pulse"/>
            <span class="text-sm text-gray-600">System Online</span>
          </div>

          <div class="flex items-center gap-3">
            <!-- Quick Stats -->
            <div class="hidden md:flex items-center gap-4 text-sm">
              <div class="flex items-center gap-1 text-gray-600">
                <UIcon name="i-lucide-building-2" class="w-4 h-4" />
                <span class="font-medium">24</span>
                <span class="text-gray-400">Koperasi</span>
              </div>
              <div class="flex items-center gap-1 text-gray-600">
                <UIcon name="i-lucide-users" class="w-4 h-4" />
                <span class="font-medium">1,245</span>
                <span class="text-gray-400">Anggota</span>
              </div>
            </div>

            <!-- Notifications -->
            <button
              class="relative p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <UIcon name="i-lucide-bell" class="h-6 w-6" />
              <span
                class="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"
              />
            </button>

            <!-- Settings -->
            <button
              class="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <UIcon name="i-lucide-settings" class="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <slot />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
