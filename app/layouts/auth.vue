<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

useHead({
  title: 'Login - Koperasi Merah Putih',
  meta: [
    { name: 'description', content: 'Login ke platform Koperasi Merah Putih' }
  ]
})

const { login } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')
const remember = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  if (!email.value || !password.value) {
    errorMessage.value = 'Email dan password harus diisi'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const result = await login({
      email: email.value,
      password: password.value,
      remember: remember.value
    })

    if (result.success && result.user) {
      // Redirect based on role
      const { dashboardRoute } = RoleConfig[result.user.role]
      await router.push(dashboardRoute)
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'Terjadi kesalahan saat login'
  } finally {
    isLoading.value = false
  }
}

// Import RoleConfig for redirect
import { RoleConfig } from '~/utils/roles'
</script>

<template>
  <div class="bg-white shadow-xl rounded-2xl p-8">
    <!-- Header -->
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-gray-900">Login Sistem</h2>
      <p class="text-sm text-gray-600 mt-2">Masuk ke akun Anda</p>
    </div>

    <!-- Demo Accounts Info -->
    <div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <p class="text-xs font-semibold text-blue-900 mb-2">🧪 Demo Accounts:</p>
      <div class="text-xs text-blue-800 space-y-1">
        <p><strong>Superadmin:</strong> superadmin@koperasi.com</p>
        <p><strong>Ketua:</strong> ketua@koperasi.com</p>
        <p><strong>Bendahara:</strong> bendahara@koperasi.com</p>
        <p><strong>Sekretaris:</strong> sekretaris@koperasi.com</p>
        <p><strong>Pengawas:</strong> pengawas@koperasi.com</p>
        <p><strong>Anggota:</strong> anggota@koperasi.com</p>
        <p class="mt-2 text-blue-600">Password: <strong>password</strong> (semua akun)</p>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
      <div class="flex items-start gap-3">
        <UIcon name="i-lucide-alert-circle" class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <p class="text-sm text-red-800">{{ errorMessage }}</p>
      </div>
    </div>

    <!-- Form -->
    <form class="space-y-5" @submit.prevent="handleLogin">
      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
          Email <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UIcon name="i-lucide-mail" class="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            :disabled="isLoading"
            placeholder="email@example.com"
            class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100"
          />
        </div>
      </div>

      <!-- Password -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
          Password <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UIcon name="i-lucide-lock" class="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            :disabled="isLoading"
            placeholder="••••••••"
            class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100"
          />
        </div>
      </div>

      <!-- Remember & Forgot -->
      <div class="flex items-center justify-between">
        <label class="flex items-center">
          <input
            v-model="remember"
            type="checkbox"
            :disabled="isLoading"
            class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
          />
          <span class="ml-2 text-sm text-gray-700">Ingat saya</span>
        </label>
        <NuxtLink to="/auth/lupa-password" class="text-sm text-red-600 hover:text-red-700 font-medium">
          Lupa password?
        </NuxtLink>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isLoading"
        class="w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span v-if="!isLoading">Masuk</span>
        <span v-else class="flex items-center justify-center gap-2">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          Memproses...
        </span>
      </button>
    </form>

    <!-- Divider -->
    <div class="relative my-6">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-300"></div>
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-2 bg-white text-gray-500">Atau</span>
      </div>
    </div>

    <!-- Register Link -->
    <div class="text-center">
      <p class="text-sm text-gray-600">
        Belum punya akun?
        <NuxtLink to="/pendaftaran/koperasi" class="text-red-600 hover:text-red-700 font-medium">
          Daftar Sekarang
        </NuxtLink>
      </p>
    </div>
  </div>
</template>