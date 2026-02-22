<script setup lang="ts">
import { reactive, ref } from 'vue'

const step = ref<'request' | 'success'>('request')
const loading = ref(false)

const form = reactive({
  email: '',
})

const handleSubmit = async () => {
  loading.value = true

  try {
    // ✅ Panggil API
    const _response = await $fetch('/api/auth/forgot-password.post', {
      method: 'POST',
      body: { email: form.email },
    })

    step.value = 'success'
  } catch (error: unknown) {
    // Handle error
    const errData = error as { data?: { message?: string } }
    alert(errData.data?.message || 'Terjadi kesalahan')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <!-- STEP 1: Request Email -->
      <div v-if="step === 'request'">
        <div class="text-center mb-6">
          <div
            class="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4"
          >
            <UIcon name="i-lucide-lock-keyhole" class="w-8 h-8 text-red-600" />
          </div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Lupa Kata Sandi?</h1>
          <p class="text-sm text-gray-600">
            Masukkan email yang terdaftar, kami akan mengirimkan link untuk mengatur ulang kata
            sandi Anda.
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">
              Email <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.email"
              type="email"
              required
              placeholder="nama@email.com"
              class="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full px-6 py-2.5 bg-red-700 text-white text-sm font-semibold rounded-md hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <UIcon v-if="!loading" name="i-lucide-mail" class="w-4 h-4" />
            <span>{{ loading ? 'Mengirim...' : 'Kirim Link Reset' }}</span>
          </button>

          <div class="text-center mt-4">
            <NuxtLink to="/auth/login" class="text-xs text-gray-600 hover:text-red-700">
              <UIcon name="i-lucide-arrow-left" class="w-3 h-3 inline" />
              Kembali ke halaman login
            </NuxtLink>
          </div>
        </form>
      </div>

      <!-- STEP 2: Success Message -->
      <div v-if="step === 'success'" class="text-center">
        <div
          class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
        >
          <UIcon name="i-lucide-mail-check" class="w-8 h-8 text-green-600" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Cek Email Anda</h1>
        <p class="text-sm text-gray-600 mb-6">
          Kami telah mengirimkan link untuk mengatur ulang kata sandi ke
          <strong class="text-gray-900">{{ form.email }}</strong>
        </p>

        <div class="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
          <div class="flex gap-3">
            <UIcon name="i-lucide-info" class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div class="text-left">
              <p class="text-xs text-blue-900 font-medium mb-1">Tidak menerima email?</p>
              <ul class="text-xs text-blue-800 space-y-1">
                <li>• Periksa folder spam/junk</li>
                <li>• Link berlaku selama 1 jam</li>
                <li>• Pastikan email yang dimasukkan benar</li>
              </ul>
            </div>
          </div>
        </div>

        <button @click="step = 'request'" class="text-sm text-red-700 hover:underline font-medium">
          Kirim ulang email
        </button>

        <div class="mt-6 pt-6 border-t border-gray-200">
          <NuxtLink to="/login" class="text-xs text-gray-600 hover:text-red-700">
            <UIcon name="i-lucide-arrow-left" class="w-3 h-3 inline" />
            Kembali ke halaman login
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
