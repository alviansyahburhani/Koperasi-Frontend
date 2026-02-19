<script setup lang="ts">
useHead({
  title: 'Daftar Koperasi - Koperasi Merah Putih',
  meta: [
    { name: 'description', content: 'Daftarkan koperasi Anda ke platform digital Koperasi Merah Putih' }
  ]
})

const form = reactive({
  nama: '',
  email: '',
  telepon: '',
  alamat: '',
  jumlahAnggota: ''
})

const isLoading = ref(false)

async function handleSubmit() {
  isLoading.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  console.log('Form submitted:', form)
  isLoading.value = false
  
  // TODO: Implement actual API call
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-2xl mx-auto">
        
        <!-- Header -->
        <div class="text-center mb-10">
          <h1 class="text-4xl font-bold text-slate-900 mb-4">
            Daftar Koperasi Baru
          </h1>
          <p class="text-lg text-slate-600">
            Bergabunglah dengan platform digital Koperasi Merah Putih
          </p>
        </div>

        <!-- Form Card -->
        <UCard>
          <template #header>
            <h2 class="text-xl font-bold text-slate-800">Informasi Koperasi</h2>
          </template>

          <form class="space-y-6" @submit.prevent="handleSubmit">
            
            <!-- Nama Koperasi -->
            <div>
              <label for="nama" class="block text-sm font-medium text-slate-700 mb-2">
                Nama Koperasi <span class="text-red-500">*</span>
              </label>
              <UInput 
                id="nama"
                v-model="form.nama"
                placeholder="Contoh: Koperasi Sejahtera Bersama" 
                icon="i-heroicons-building-office"
                size="lg"
                required
              />
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-slate-700 mb-2">
                Email <span class="text-red-500">*</span>
              </label>
              <UInput 
                id="email"
                v-model="form.email"
                type="email"
                placeholder="email@koperasi.com" 
                icon="i-heroicons-envelope"
                size="lg"
                required
              />
            </div>

            <!-- No. Telepon -->
            <div>
              <label for="telepon" class="block text-sm font-medium text-slate-700 mb-2">
                No. Telepon <span class="text-red-500">*</span>
              </label>
              <UInput 
                id="telepon"
                v-model="form.telepon"
                type="tel"
                placeholder="08123456789" 
                icon="i-heroicons-phone"
                size="lg"
                required
              />
            </div>

            <!-- Alamat -->
            <div>
              <label for="alamat" class="block text-sm font-medium text-slate-700 mb-2">
                Alamat <span class="text-red-500">*</span>
              </label>
              <UTextarea 
                id="alamat"
                v-model="form.alamat"
                placeholder="Alamat lengkap koperasi"
                :rows="3"
                size="lg"
                required
              />
            </div>

            <!-- Jumlah Anggota -->
            <div>
              <label for="jumlahAnggota" class="block text-sm font-medium text-slate-700 mb-2">
                Jumlah Anggota (estimasi)
              </label>
              <UInput 
                id="jumlahAnggota"
                v-model="form.jumlahAnggota"
                type="number"
                placeholder="50" 
                icon="i-heroicons-users"
                size="lg"
              />
            </div>

            <div class="flex gap-4 pt-4">
              <UButton 
                color="red" 
                size="lg" 
                block
                type="submit"
                :loading="isLoading"
                :disabled="isLoading"
              >
                {{ isLoading ? 'Memproses...' : 'Daftar Sekarang' }}
              </UButton>
              
              <UButton 
                color="gray" 
                variant="outline" 
                size="lg"
                to="/"
                :disabled="isLoading"
              >
                Batal
              </UButton>
            </div>

          </form>
        </UCard>

        <!-- Info -->
        <div class="mt-8 text-center">
          <p class="text-sm text-slate-600">
            Sudah punya akun? 
            <NuxtLink to="/login" class="text-red-600 hover:text-red-700 font-medium">
              Login di sini
            </NuxtLink>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>