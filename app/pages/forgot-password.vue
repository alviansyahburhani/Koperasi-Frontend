<script setup lang="ts">
useHead({
  title: 'Lupa Password - Koperasi Merah Putih',
  meta: [
    { name: 'description', content: 'Reset password akun Koperasi Merah Putih' }
  ]
})

const email = ref('')
const isLoading = ref(false)
const isSuccess = ref(false)

async function handleSubmit() {
  isLoading.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  isSuccess.value = true
  isLoading.value = false
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full">
      
      <UCard>
        <template #header>
          <div class="text-center">
            <h2 class="text-2xl font-bold text-slate-800">Lupa Password</h2>
            <p class="text-sm text-slate-600 mt-2">
              Masukkan email untuk reset password
            </p>
          </div>
        </template>

        <!-- Success Message -->
        <UAlert 
          v-if="isSuccess"
          color="green" 
          variant="soft"
          title="Email terkirim!"
          description="Silakan cek inbox email Anda untuk link reset password."
          class="mb-6"
        />

        <!-- Form -->
        <form v-if="!isSuccess" class="space-y-5" @submit.prevent="handleSubmit">
          
          <UFormGroup label="Email" name="email" required>
            <UInput 
              v-model="email"
              type="email" 
              placeholder="email@koperasi.com" 
              icon="i-heroicons-envelope"
              size="lg"
              :disabled="isLoading"
            />
          </UFormGroup>

          <UButton 
            type="submit" 
            color="red" 
            block 
            size="lg"
            :loading="isLoading"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Mengirim...' : 'Kirim Link Reset' }}
          </UButton>
          
        </form>

        <!-- Back to Login -->
        <div class="mt-6 text-center">
          <NuxtLink to="/login" class="text-sm text-red-600 hover:text-red-700 font-medium">
            ← Kembali ke Login
          </NuxtLink>
        </div>
      </UCard>
    </div>
  </div>
</template>