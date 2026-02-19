<script setup lang="ts">
/**
 * Login Page
 */

import { useAuthStore } from '../stores/auth'

useHead({
  title: 'Login - Koperasi Merah Putih',
  meta: [
    { name: 'description', content: 'Login ke platform Koperasi Merah Putih' }
  ]
})

const authStore = useAuthStore()
const router = useRouter()

// Form state
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
    const result = await authStore.login({
      email: email.value,
      password: password.value,
      remember: remember.value
    })

    if (result.success) {
      // Redirect to admin dashboard
      await router.push('/admin')
    } else {
      errorMessage.value = result.message
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'Terjadi kesalahan saat login'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full">
      
      <UCard>
        <template #header>
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-2xl">KMP</span>
            </div>
            <h2 class="text-2xl font-bold text-slate-800">Login Sistem</h2>
            <p class="text-sm text-slate-600 mt-2">Masuk ke akun Anda</p>
          </div>
        </template>

        <!-- Error Message -->
        <UAlert 
          v-if="errorMessage"
          color="red" 
          variant="soft"
          :title="errorMessage"
          class="mb-6"
          :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link' }"
          @close="errorMessage = ''"
        />

        <form class="space-y-5" @submit.prevent="handleLogin">
          
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-slate-700 mb-2">
              Email <span class="text-red-500">*</span>
            </label>
            <UInput 
              id="email"
              v-model="email"
              type="email" 
              placeholder="admin@koperasimerahputih.com" 
              icon="i-heroicons-envelope"
              size="lg"
              :disabled="isLoading"
              required
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-slate-700 mb-2">
              Password <span class="text-red-500">*</span>
            </label>
            <UInput 
              id="password"
              v-model="password"
              type="password" 
              placeholder="••••••••" 
              icon="i-heroicons-lock-closed"
              size="lg"
              :disabled="isLoading"
              required
            />
          </div>

          <!-- Remember Me -->
          <div class="flex items-center justify-between text-sm">
            <UCheckbox 
              v-model="remember"
              label="Ingat saya" 
              name="remember"
              :disabled="isLoading"
            />
          </div>

          <!-- Submit Button -->
          <UButton 
            type="submit" 
            color="red" 
            block 
            size="lg" 
            class="mt-6"
            :loading="isLoading"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Memproses...' : 'Masuk' }}
          </UButton>
          
        </form>
      </UCard>

      <!-- Register Link -->
      <div class="mt-6 text-center">
        <p class="text-sm text-slate-600">
          Belum punya akun? 
          <NuxtLink to="/daftar-koperasi" class="text-red-600 hover:text-red-700 font-medium">
            Daftar di sini
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>