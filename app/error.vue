<script setup lang="ts">
import type { NuxtError } from 'nuxt/app'

const props = defineProps<{
  error: NuxtError
}>()

const config = useRuntimeConfig()
const isDev = config.public.debugMode

// ✅ FIX: Safely access statusCode with default value
const statusCode = computed(() => props.error.statusCode || 500)

// Error type detection
const isNotFound = computed(() => statusCode.value === 404)
const isServerError = computed(() => statusCode.value >= 500)
const isAuthError = computed(() => statusCode.value === 401 || statusCode.value === 403)

// Error details
const errorTitle = computed(() => {
  if (isNotFound.value) return 'Halaman Tidak Ditemukan'
  if (isAuthError.value) return 'Akses Ditolak'
  if (isServerError.value) return 'Terjadi Kesalahan Server'
  return 'Terjadi Kesalahan'
})

const errorDescription = computed(() => {
  if (isNotFound.value) {
    return 'Halaman yang Anda cari tidak ditemukan atau telah dipindahkan.'
  }
  if (isAuthError.value) {
    return 'Anda tidak memiliki akses ke halaman ini. Silakan login dengan akun yang sesuai.'
  }
  if (isServerError.value) {
    return 'Server sedang mengalami masalah. Tim kami sedang menangani masalah ini.'
  }
  return props.error.message || 'Terjadi kesalahan yang tidak terduga.'
})

const errorIcon = computed(() => {
  if (isNotFound.value) return 'i-lucide-search-x'
  if (isAuthError.value) return 'i-lucide-shield-alert'
  if (isServerError.value) return 'i-lucide-server-crash'
  return 'i-lucide-alert-triangle'
})

const iconColor = computed(() => {
  if (isNotFound.value) return 'text-blue-600'
  if (isAuthError.value) return 'text-orange-600'
  return 'text-red-600'
})

// ✅ FIX: Get current URL from window (since error.url might not exist)
const currentUrl = computed(() => {
  if (import.meta.client) {
    return window.location.href
  }
  return ''
})

// Actions
const handleClearError = () => {
  clearError({ redirect: '/' })
}

const router = useRouter()
const handleGoBack = () => {
  router.back()
}

const handleLogin = () => {
  clearError({ redirect: '/auth/login' })
}

// Copy error untuk debugging
const copyErrorToClipboard = async () => {
  const errorText = `
Error Code: ${statusCode.value}
Message: ${props.error.message || 'Unknown error'}
URL: ${currentUrl.value}
Stack: ${props.error.stack || 'No stack trace'}
  `.trim()

  try {
    await navigator.clipboard.writeText(errorText)
    const toast = useToast()
    toast.add({
      title: 'Error details copied',
      description: 'Error information has been copied to clipboard',
      color: 'green',
    })
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center px-4 py-12"
  >
    <div class="max-w-2xl w-full">
      <!-- Error Icon & Code -->
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-lg mb-6 border border-slate-100"
        >
          <UIcon :name="errorIcon" :class="['w-12 h-12', iconColor]" />
        </div>

        <div
          class="inline-block px-4 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-mono mb-4"
        >
          Error {{ statusCode }}
        </div>
      </div>

      <!-- Error Message -->
      <div class="text-center mb-10">
        <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          {{ errorTitle }}
        </h1>

        <p class="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg mx-auto">
          {{ errorDescription }}
        </p>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <UButton @click="handleClearError" color="red" size="lg" class="px-8">
          <UIcon name="i-lucide-home" class="w-5 h-5" />
          Kembali ke Beranda
        </UButton>

        <UButton
          v-if="!isNotFound"
          @click="handleGoBack"
          variant="outline"
          color="gray"
          size="lg"
          class="px-8"
        >
          <UIcon name="i-lucide-arrow-left" class="w-5 h-5" />
          Halaman Sebelumnya
        </UButton>

        <UButton v-if="isAuthError" @click="handleLogin" color="blue" size="lg" class="px-8">
          <UIcon name="i-lucide-log-in" class="w-5 h-5" />
          Login
        </UButton>
      </div>

      <!-- Debug Info (Development Only) -->
      <div v-if="isDev" class="mt-12 p-6 bg-red-50 border border-red-200 rounded-xl">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-bold text-red-900 flex items-center gap-2">
            <UIcon name="i-lucide-bug" class="w-4 h-4" />
            Debug Information
          </h3>
          <UButton @click="copyErrorToClipboard" size="xs" variant="outline" color="red">
            <UIcon name="i-lucide-copy" class="w-3 h-3" />
            Copy
          </UButton>
        </div>

        <div class="space-y-3 text-xs">
          <div>
            <span class="font-semibold text-red-900">Status Code:</span>
            <span class="text-red-700 ml-2 font-mono">{{ statusCode }}</span>
          </div>

          <div>
            <span class="font-semibold text-red-900">Message:</span>
            <p class="text-red-700 mt-1 font-mono break-words">
              {{ error.message || 'No message' }}
            </p>
          </div>

          <div>
            <span class="font-semibold text-red-900">URL:</span>
            <p class="text-red-700 mt-1 font-mono break-all">{{ currentUrl }}</p>
          </div>

          <div v-if="error.stack">
            <span class="font-semibold text-red-900">Stack Trace:</span>
            <pre
              class="text-red-700 mt-2 p-3 bg-white rounded border border-red-200 overflow-x-auto text-[10px] leading-tight"
              >{{ error.stack }}</pre
            >
          </div>
        </div>
      </div>

      <!-- Help Text -->
      <div class="mt-8 text-center">
        <p class="text-sm text-slate-500">
          Jika masalah berlanjut, hubungi
          <a href="mailto:support@koperasi.com" class="text-red-600 hover:text-red-700 font-medium">
            support@koperasi.com
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
