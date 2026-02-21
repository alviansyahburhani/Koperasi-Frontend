<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Daftar Koperasi - Koperasi Merah Putih',
  meta: [
    { name: 'description', content: 'Daftarkan koperasi Anda ke platform digital Koperasi Merah Putih' }
  ]
})

interface RegistrationForm {
  namaKoperasi: string
  email: string
  telepon: string
  alamat: string
  provinsi: string
  kabupaten: string
  kecamatan: string
  kelurahan: string
  kodePos: string
  jumlahAnggota: string
  nomorBadanHukum: string
  tanggalBadanHukum: string
  namaKetua: string
  emailKetua: string
  teleponKetua: string
}

const router = useRouter()
const loading = ref(false)

const form = reactive<RegistrationForm>({
  namaKoperasi: '',
  email: '',
  telepon: '',
  alamat: '',
  provinsi: '',
  kabupaten: '',
  kecamatan: '',
  kelurahan: '',
  kodePos: '',
  jumlahAnggota: '',
  nomorBadanHukum: '',
  tanggalBadanHukum: '',
  namaKetua: '',
  emailKetua: '',
  teleponKetua: ''
})

const handleSubmit = async () => {
  loading.value = true
  
  // TODO: Implementasi API call
  setTimeout(() => {
    loading.value = false
    alert('Permohonan pendaftaran berhasil dikirim! Tim kami akan menghubungi Anda segera.')
    router.push('/')
  }, 1500)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-3xl mx-auto">
      
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-red-800 mb-3">Daftar Koperasi Baru</h1>
        <p class="text-sm text-gray-600">
          Bergabunglah dengan platform digital Koperasi Merah Putih untuk transformasi pengelolaan koperasi modern
        </p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-lg shadow-md p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          
          <!-- Section 1: Data Koperasi -->
          <div>
            <h2 class="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">Data Koperasi</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Nama Koperasi -->
              <div class="md:col-span-2">
                <label class="block text-xs text-gray-700 mb-1">
                  Nama Koperasi <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.namaKoperasi"
                  type="text"
                  required
                  placeholder="Contoh: Koperasi Sejahtera Bersama"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <!-- Email Koperasi -->
              <div>
                <label class="block text-xs text-gray-700 mb-1">
                  Email Koperasi <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="email@koperasi.com"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <!-- Telepon Koperasi -->
              <div>
                <label class="block text-xs text-gray-700 mb-1">
                  No. Telepon <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.telepon"
                  type="tel"
                  required
                  placeholder="08123456789"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <!-- Jumlah Anggota -->
              <div>
                <label class="block text-xs text-gray-700 mb-1">
                  Jumlah Anggota <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.jumlahAnggota"
                  type="number"
                  required
                  placeholder="Contoh: 50"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <!-- Nomor Badan Hukum -->
              <div>
                <label class="block text-xs text-gray-700 mb-1">
                  Nomor Badan Hukum <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.nomorBadanHukum"
                  type="text"
                  required
                  placeholder="Contoh: 123/BH/XXI/2024"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <!-- Tanggal Badan Hukum -->
              <div>
                <label class="block text-xs text-gray-700 mb-1">
                  Tanggal Badan Hukum <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.tanggalBadanHukum"
                  type="date"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
          </div>

          <!-- Section 2: Alamat Koperasi -->
          <div>
            <h2 class="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">Alamat Koperasi</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Alamat Lengkap -->
              <div class="md:col-span-2">
                <label class="block text-xs text-gray-700 mb-1">
                  Alamat Lengkap <span class="text-red-500">*</span>
                </label>
                <textarea 
                  v-model="form.alamat"
                  rows="3"
                  required
                  placeholder="Jalan, nomor, RT/RW, dll"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                ></textarea>
              </div>

              <!-- Provinsi -->
              <div>
                <label class="block text-xs text-gray-700 mb-1">
                  Provinsi <span class="text-red-500">*</span>
                </label>
                <select 
                  v-model="form.provinsi"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">-- Pilih Provinsi --</option>
                  <option value="jawa-barat">Jawa Barat</option>
                  <option value="jawa-tengah">Jawa Tengah</option>
                  <option value="jawa-timur">Jawa Timur</option>
                  <option value="dki-jakarta">DKI Jakarta</option>
                  <!-- TODO: Load from API -->
                </select>
              </div>

              <!-- Kabupaten/Kota -->
              <div>
                <label class="block text-xs text-gray-700 mb-1">
                  Kabupaten/Kota <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.kabupaten"
                  type="text"
                  required
                  placeholder="Contoh: Bandung"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <!-- Kecamatan -->
              <div>
                <label class="block text-xs text-gray-700 mb-1">
                  Kecamatan <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.kecamatan"
                  type="text"
                  required
                  placeholder="Contoh: Coblong"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <!-- Kelurahan/Desa -->
              <div>
                <label class="block text-xs text-gray-700 mb-1">
                  Kelurahan/Desa <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.kelurahan"
                  type="text"
                  required
                  placeholder="Contoh: Lebak Gede"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <!-- Kode Pos -->
              <div>
                <label class="block text-xs text-gray-700 mb-1">
                  Kode Pos <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.kodePos"
                  type="text"
                  required
                  maxlength="5"
                  placeholder="40132"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
          </div>

          <!-- Section 3: Data Ketua Koperasi -->
          <div>
            <h2 class="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">Data Ketua Koperasi</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Nama Ketua -->
              <div class="md:col-span-2">
                <label class="block text-xs text-gray-700 mb-1">
                  Nama Lengkap Ketua <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.namaKetua"
                  type="text"
                  required
                  placeholder="Nama lengkap sesuai KTP"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <!-- Email Ketua -->
              <div>
                <label class="block text-xs text-gray-700 mb-1">
                  Email Ketua <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.emailKetua"
                  type="email"
                  required
                  placeholder="email.ketua@example.com"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <!-- Telepon Ketua -->
              <div>
                <label class="block text-xs text-gray-700 mb-1">
                  No. Telepon Ketua <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.teleponKetua"
                  type="tel"
                  required
                  placeholder="08123456789"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
          </div>

          <!-- Info -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-information-circle" class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div class="text-xs text-blue-800">
                <p class="font-semibold mb-1">Informasi Penting:</p>
                <ul class="list-disc list-inside space-y-1 text-blue-700">
                  <li>Pastikan data yang Anda masukkan sudah benar</li>
                  <li>Tim kami akan memverifikasi data dalam 1-3 hari kerja</li>
                  <li>Anda akan menerima email notifikasi setelah verifikasi selesai</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex gap-3">
            <NuxtLink 
              to="/"
              class="flex-1 px-6 py-2.5 border border-gray-300 text-gray-700 text-sm font-semibold rounded-md hover:bg-gray-50 transition-colors text-center"
            >
              Batal
            </NuxtLink>
            <button 
              type="submit"
              :disabled="loading"
              class="flex-1 px-6 py-2.5 bg-red-700 text-white text-sm font-semibold rounded-md hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {{ loading ? 'Mengirim...' : 'Kirim Permohonan' }}
            </button>
          </div>

          <!-- Footer Link -->
          <div class="text-center pt-4">
            <p class="text-xs text-gray-600">
              Sudah punya akun? 
              <NuxtLink to="/auth/login" class="text-red-700 hover:underline font-medium">
                Login di sini
              </NuxtLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>