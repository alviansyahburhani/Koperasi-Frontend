<script setup lang="ts">
import { reactive, ref } from 'vue'

definePageMeta({
  layout: 'default',
  middleware: 'guest',
})

useHead({
  title: 'Login - Sistem Koperasi',
  meta: [{ name: 'description', content: 'Login ke sistem koperasi' }],
})

interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

const authStore = useAuthStore()
const router = useRouter()
const config = useRuntimeConfig()

const loading = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')

const form = reactive<LoginForm>({
  email: '',
  password: '',
  rememberMe: false,
})

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    if (config.public.debugMode) {
      console.log('[Login] Attempting login with:', { email: form.email })
    }

    // Call auth store login
    const result = await authStore.login({
      email: form.email,
      password: form.password,
    })

    if (result.success) {
      if (config.public.debugMode) {
        console.log('[Login] Success! User:', {
          role: authStore.userRole,
          isSuperadmin: authStore.isSuperadmin,
          isAdmin: authStore.isAdmin,
          isAnggota: authStore.isAnggota,
        })
      }

      // ✅ Redirect based on role
      if (authStore.isSuperadmin) {
        await router.push('/superadmin')
      } else if (authStore.isAdmin) {
        await router.push('/admin')
      } else if (authStore.isAnggota) {
        await router.push('/anggota')
      } else {
        // Fallback
        await router.push('/')
      }
    } else {
      // Show error message
      errorMessage.value = result.message
    }
  } catch (error: unknown) {
    console.error('[Login] Unexpected error:', error)
    errorMessage.value = 'Terjadi kesalahan yang tidak terduga. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <!-- UI TETAP SAMA - TIDAK BERUBAH -->
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-red-800 mb-2">Masuk ke Sistem Koperasi</h1>
        <p class="text-sm text-gray-600">Silakan masuk menggunakan akun Anda</p>
      </div>

      <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
        <div class="flex items-start gap-2">
          <UIcon
            name="i-heroicons-exclamation-circle"
            class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
          />
          <div class="flex-1">
            <p class="text-sm text-red-800 font-medium">{{ errorMessage }}</p>
          </div>
          <button
            class="text-red-400 hover:text-red-600 transition-colors"
            @click="errorMessage = ''"
          >
            <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <div>
          <label class="block text-xs text-gray-700 mb-1">
            Email <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.email"
            type="email"
            required
            :disabled="loading"
            placeholder="nama@email.com"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
          >
        </div>

        <div>
          <label class="block text-xs text-gray-700 mb-1">
            Kata Sandi <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              required
              :disabled="loading"
              placeholder="Masukkan kata sandi"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
            <button
              type="button"
              :disabled="loading"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50 transition-colors"
              @click="showPassword = !showPassword"
            >
              <UIcon
                :name="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                class="w-4 h-4"
              />
            </button>
          </div>
        </div>

        <div class="flex items-center">
          <input
            id="remember"
            v-model="form.rememberMe"
            type="checkbox"
            :disabled="loading"
            class="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 disabled:opacity-50"
          >
          <label for="remember" class="ml-2 text-xs text-gray-700"> Ingat saya </label>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full px-6 py-2.5 bg-red-700 text-white text-sm font-semibold rounded-md hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span v-if="loading" class="flex items-center justify-center gap-2">
            <div
              class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
            />
            Memproses...
          </span>
          <span v-else>Masuk</span>
        </button>

        <div class="text-center space-y-2 mt-4">
          <p class="text-xs text-gray-600">
            Belum punya akun?
            <NuxtLink to="/pendaftaran/anggota" class="text-red-700 hover:underline font-medium">
              Daftar Menjadi Anggota
            </NuxtLink>
          </p>
          <p class="text-xs text-gray-600">
            <NuxtLink to="/auth/lupa-password" class="text-red-700 hover:underline">
              Lupa kata sandi?
            </NuxtLink>
          </p>
        </div>
      </form>

      <div
        v-if="config.public.debugMode"
        class="mt-6 p-3 bg-gray-800 text-green-400 rounded text-xs font-mono"
      >
        <p class="font-bold mb-2">🐛 Debug Mode</p>
        <p>API: {{ config.public.apiBase }}</p>
        <p>Auth: {{ authStore.isAuthenticated ? 'Yes' : 'No' }}</p>
        <p>Role: {{ authStore.userRole || 'N/A' }}</p>
        <p>Tenant: {{ authStore.user?.tenantId || 'N/A' }}</p>
      </div>
    </div>
  </div>
</template>
