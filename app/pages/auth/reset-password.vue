<script setup lang="ts">
import { reactive, ref } from 'vue'

const route = useRoute()
const router = useRouter()

const token = ref((route.query.token as string) || '')
const loading = ref(false)
const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const step = ref<'form' | 'success' | 'invalid'>('form')

const form = reactive({
  password: '',
  passwordConfirm: '',
})

const passwordStrength = computed(() => {
  const pass = form.password
  if (pass.length === 0) return { label: '', color: '', width: '0%' }
  if (pass.length < 6) return { label: 'Lemah', color: 'bg-red-500', width: '25%' }
  if (pass.length < 8) return { label: 'Sedang', color: 'bg-yellow-500', width: '50%' }
  if (pass.length < 12) return { label: 'Kuat', color: 'bg-green-500', width: '75%' }
  return { label: 'Sangat Kuat', color: 'bg-green-600', width: '100%' }
})

const isValid = computed(() => {
  return form.password.length >= 8 && form.password === form.passwordConfirm
})

// Validasi token saat mount
onMounted(async () => {
  if (!token.value) {
    step.value = 'invalid'
    return
  }

  // Validasi token ke backend
  // try {
  //   await $fetch('/api/auth/validate-reset-token', {
  //     method: 'POST',
  //     body: { token: token.value }
  //   })
  // } catch {
  //   step.value = 'invalid'
  // }
})

const handleSubmit = async () => {
  if (!isValid.value) return

  loading.value = true

  try {
    // Call API untuk reset password
    // await $fetch('/api/auth/reset-password', {
    //   method: 'POST',
    //   body: {
    //     token: token.value,
    //     password: form.password
    //   }
    // })

    setTimeout(() => {
      loading.value = false
      step.value = 'success'

      // Redirect ke login setelah 3 detik
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    }, 1500)
  } catch (_error) {
    loading.value = false
    // Handle _error
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <!-- FORM: Reset Password -->
      <div v-if="step === 'form'">
        <div class="text-center mb-6">
          <div
            class="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4"
          >
            <UIcon name="i-lucide-key-round" class="w-8 h-8 text-red-600" />
          </div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Buat Kata Sandi Baru</h1>
          <p class="text-sm text-gray-600">
            Kata sandi baru harus berbeda dari kata sandi sebelumnya.
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Password Baru -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">
              Kata Sandi Baru <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="Minimal 8 karakter"
                class="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <UIcon :name="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'" class="w-4 h-4" />
              </button>
            </div>

            <!-- Password Strength Indicator -->
            <div v-if="form.password" class="mt-2">
              <div class="flex items-center gap-2">
                <div class="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    class="h-full transition-all duration-300"
                    :class="passwordStrength.color"
                    :style="{ width: passwordStrength.width }"
                  ></div>
                </div>
                <span
                  class="text-xs font-medium"
                  :class="`text-${passwordStrength.color.replace('bg-', '')}`"
                >
                  {{ passwordStrength.label }}
                </span>
              </div>
            </div>
          </div>

          <!-- Konfirmasi Password -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">
              Konfirmasi Kata Sandi <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                v-model="form.passwordConfirm"
                :type="showPasswordConfirm ? 'text' : 'password'"
                required
                placeholder="Ketik ulang kata sandi"
                class="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              <button
                type="button"
                @click="showPasswordConfirm = !showPasswordConfirm"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <UIcon
                  :name="showPasswordConfirm ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  class="w-4 h-4"
                />
              </button>
            </div>

            <!-- Password Match Indicator -->
            <p
              v-if="form.passwordConfirm && form.password !== form.passwordConfirm"
              class="text-xs text-red-600 mt-1"
            >
              <UIcon name="i-lucide-x-circle" class="w-3 h-3 inline" />
              Kata sandi tidak cocok
            </p>
            <p
              v-if="form.passwordConfirm && form.password === form.passwordConfirm"
              class="text-xs text-green-600 mt-1"
            >
              <UIcon name="i-lucide-check-circle" class="w-3 h-3 inline" />
              Kata sandi cocok
            </p>
          </div>

          <!-- Requirements -->
          <div class="bg-gray-50 border border-gray-200 rounded-md p-3">
            <p class="text-xs font-medium text-gray-700 mb-2">Kata sandi harus:</p>
            <ul class="text-xs text-gray-600 space-y-1">
              <li class="flex items-center gap-1">
                <UIcon
                  :name="form.password.length >= 8 ? 'i-lucide-check' : 'i-lucide-minus'"
                  :class="form.password.length >= 8 ? 'text-green-600' : 'text-gray-400'"
                  class="w-3 h-3"
                />
                Minimal 8 karakter
              </li>
              <li class="flex items-center gap-1">
                <UIcon
                  :name="/[A-Z]/.test(form.password) ? 'i-lucide-check' : 'i-lucide-minus'"
                  :class="/[A-Z]/.test(form.password) ? 'text-green-600' : 'text-gray-400'"
                  class="w-3 h-3"
                />
                Mengandung huruf besar
              </li>
              <li class="flex items-center gap-1">
                <UIcon
                  :name="/[0-9]/.test(form.password) ? 'i-lucide-check' : 'i-lucide-minus'"
                  :class="/[0-9]/.test(form.password) ? 'text-green-600' : 'text-gray-400'"
                  class="w-3 h-3"
                />
                Mengandung angka
              </li>
            </ul>
          </div>

          <button
            type="submit"
            :disabled="loading || !isValid"
            class="w-full px-6 py-2.5 bg-red-700 text-white text-sm font-semibold rounded-md hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {{ loading ? 'Memproses...' : 'Atur Ulang Kata Sandi' }}
          </button>
        </form>
      </div>

      <!-- SUCCESS -->
      <div v-if="step === 'success'" class="text-center">
        <div
          class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
        >
          <UIcon name="i-lucide-check-circle-2" class="w-8 h-8 text-green-600" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Berhasil!</h1>
        <p class="text-sm text-gray-600 mb-6">
          Kata sandi Anda telah berhasil diatur ulang. Anda akan dialihkan ke halaman login...
        </p>
        <div class="flex justify-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </div>

      <!-- INVALID TOKEN -->
      <div v-if="step === 'invalid'" class="text-center">
        <div
          class="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4"
        >
          <UIcon name="i-lucide-alert-circle" class="w-8 h-8 text-red-600" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Link Tidak Valid</h1>
        <p class="text-sm text-gray-600 mb-6">
          Link reset password sudah kadaluarsa atau tidak valid. Silakan minta link baru.
        </p>
        <NuxtLink
          to="/lupa-password"
          class="inline-block px-6 py-2.5 bg-red-700 text-white text-sm font-semibold rounded-md hover:bg-red-800 transition-colors"
        >
          Minta Link Baru
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
