<script setup lang="ts">
const { user, role, logout } = useAuth()
const { menuItems } = useMenu()

const showMobileSidebar = ref(false)
const showUserMenu = ref(false)

const handleLogout = async () => {
  if (confirm('Apakah Anda yakin ingin keluar?')) {
    await logout()
  }
}

// Get role config for UI
import { RoleConfig } from '~/utils/roles'
const roleConfig = computed(() => role.value ? RoleConfig[role.value] : null)
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar Desktop -->
    <aside class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-white border-r border-gray-200">
      <div class="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <!-- Logo -->
        <div class="flex items-center flex-shrink-0 px-4 mb-5">
          <div class="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">KMP</span>
          </div>
          <div class="ml-3">
            <h1 class="text-lg font-bold text-gray-900">Koperasi</h1>
            <p class="text-xs text-gray-500">{{ roleConfig?.label }}</p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-2 space-y-1">
          <template v-for="item in menuItems" :key="item.label">
            <!-- Menu with children -->
            <div v-if="item.children && item.children.length > 0">
              <div class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {{ item.label }}
              </div>
              <div class="space-y-1">
                <NuxtLink
                  v-for="child in item.children"
                  :key="child.to"
                  :to="child.to || '#'"
                  class="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors"
                  active-class="bg-red-50 text-red-600"
                >
                  <UIcon :name="child.icon" class="mr-3 flex-shrink-0 h-5 w-5" />
                  {{ child.label }}
                </NuxtLink>
              </div>
            </div>

            <!-- Single menu -->
            <NuxtLink
              v-else
              :to="item.to || '#'"
              class="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors"
              active-class="bg-red-50 text-red-600"
            >
              <UIcon :name="item.icon" class="mr-3 flex-shrink-0 h-5 w-5" />
              {{ item.label }}
              <span v-if="item.badge" class="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {{ item.badge }}
              </span>
            </NuxtLink>
          </template>
        </nav>

        <!-- User Profile -->
        <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div class="flex items-center w-full">
            <div class="flex-shrink-0">
              <div class="h-10 w-10 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white font-bold">
                {{ user?.name?.charAt(0) || 'U' }}
              </div>
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm font-medium text-gray-900 truncate">{{ user?.name }}</p>
              <p class="text-xs text-gray-500 truncate">{{ user?.email }}</p>
            </div>
            <button @click="handleLogout" class="ml-2 text-gray-400 hover:text-red-600 transition-colors">
              <UIcon name="i-lucide-log-out" class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </aside>

    <!-- Mobile Sidebar Overlay -->
    <div
      v-if="showMobileSidebar"
      class="lg:hidden fixed inset-0 z-40 bg-gray-900 bg-opacity-75"
      @click="showMobileSidebar = false"
    ></div>

    <!-- Mobile Sidebar -->
    <aside
      v-if="showMobileSidebar"
      class="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200"
    >
      <!-- Same content as desktop sidebar -->
      <div class="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div class="flex items-center justify-between px-4 mb-5">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">KMP</span>
            </div>
            <div class="ml-3">
              <h1 class="text-lg font-bold text-gray-900">Koperasi</h1>
              <p class="text-xs text-gray-500">{{ roleConfig?.label }}</p>
            </div>
          </div>
          <button @click="showMobileSidebar = false" class="text-gray-500 hover:text-gray-700">
            <UIcon name="i-lucide-x" class="w-6 h-6" />
          </button>
        </div>

        <nav class="flex-1 px-2 space-y-1">
          <template v-for="item in menuItems" :key="item.label">
            <div v-if="item.children && item.children.length > 0">
              <div class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {{ item.label }}
              </div>
              <div class="space-y-1">
                <NuxtLink
                  v-for="child in item.children"
                  :key="child.to"
                  :to="child.to || '#'"
                  @click="showMobileSidebar = false"
                  class="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors"
                  active-class="bg-red-50 text-red-600"
                >
                  <UIcon :name="child.icon" class="mr-3 flex-shrink-0 h-5 w-5" />
                  {{ child.label }}
                </NuxtLink>
              </div>
            </div>

            <NuxtLink
              v-else
              :to="item.to || '#'"
              @click="showMobileSidebar = false"
              class="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors"
              active-class="bg-red-50 text-red-600"
            >
              <UIcon :name="item.icon" class="mr-3 flex-shrink-0 h-5 w-5" />
              {{ item.label }}
              <span v-if="item.badge" class="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
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
          @click="showMobileSidebar = true"
          class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none lg:hidden"
        >
          <UIcon name="i-lucide-menu" class="h-6 w-6" />
        </button>

        <div class="flex-1 px-4 flex justify-between items-center">
          <!-- Page Title (Optional - can be set via slot) -->
          <div class="flex-1">
            <!-- You can use provide/inject or slots here for dynamic title -->
          </div>

          <div class="ml-4 flex items-center gap-3">
            <!-- Notifications -->
            <button class="relative p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors">
              <UIcon name="i-lucide-bell" class="h-6 w-6" />
              <span class="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>

            <!-- User Avatar (Desktop) -->
            <div class="hidden sm:block">
              <div class="h-8 w-8 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white text-sm font-bold">
                {{ user?.name?.charAt(0) || 'U' }}
              </div>
            </div>
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