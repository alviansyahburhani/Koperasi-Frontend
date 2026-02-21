<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Daftar Sebagai Anggota - Koperasi Merah Putih',
  meta: [
    { name: 'description', content: 'Daftar menjadi anggota koperasi pilihan Anda' }
  ]
})

interface AnggotaForm {
  koperasiId: string
  nik: string
  namaLengkap: string
  tempatLahir: string
  tanggalLahir: string
  jenisKelamin: string
  agama: string
  statusPerkawinan: string
  pekerjaan: string
  pendidikan: string
  alamatLengkap: string
  provinsi: string
  kabupaten: string
  kecamatan: string
  kelurahan: string
  kodePos: string
  noTelepon: string
  email: string
  noTeleponDarurat: string
  namaKontakDarurat: string
  hubunganKontakDarurat: string
}

const router = useRouter()
const loading = ref(false)
const loadingKoperasi = ref(false)

// List koperasi (TODO: load from API)
const koperasiList = ref([
  { id: '1', nama: 'Koperasi Sejahtera Bersama', kota: 'Bandung' },
  { id: '2', nama: 'Koperasi Maju Bersama', kota: 'Jakarta' },
  { id: '3', nama: 'Koperasi Sentosa Jaya', kota: 'Surabaya' },
])

const form = reactive<AnggotaForm>({
  koperasiId: '',
  nik: '',
  namaLengkap: '',
  tempatLahir: '',
  tanggalLahir: '',
  jenisKelamin: '',
  agama: '',
  statusPerkawinan: '',
  pekerjaan: '',
  pendidikan: '',
  alamatLengkap: '',
  provinsi: '',
  kabupaten: '',
  kecamatan: '',
  kelurahan: '',
  kodePos: '',
  noTelepon: '',
  email: '',
  noTeleponDarurat: '',
  namaKontakDarurat: '',
  hubunganKontakDarurat: ''
})

const selectedKoperasi = computed(() => {
  return koperasiList.value.find(k => k.id === form.koperasiId)
})

const handleSubmit = async () => {
  loading.value = true
  
  // TODO: Implementasi API call
  setTimeout(() => {
    loading.value = false
    alert(`Pendaftaran berhasil dikirim ke ${selectedKoperasi.value?.nama}!\n\nSilakan tunggu konfirmasi dari admin koperasi melalui email atau WhatsApp.`)
    router.push('/')
  }, 1500)
}

// Auto-fill NIK (demo purposes)
const handleNIKChange = () => {
  // TODO: Validasi NIK 16 digit
  if (form.nik.length === 16) {
    // Auto extract data from NIK (demo)
    // Digit 7-12 adalah tanggal lahir (DDMMYY)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-4xl mx-auto">
      
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-red-800 mb-3">Daftar Sebagai Anggota Koperasi</h1>
        <p class="text-sm text-gray-600">
          Silakan lengkapi data diri Anda untuk menjadi anggota koperasi
        </p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-lg shadow-md p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          
          <!-- Section 0: Pilih Koperasi -->
          <div class="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-5">
            <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <UIcon name="i-heroicons-building-office-2" class="w-5 h-5 text-red-600" />
              Pilih Koperasi
            </h2>
            
            <div>
              <label class="block text-xs text-gray-700 mb-2">
                Koperasi Tujuan <span class="text-red-500">*</span>
              </label>
              <select 
                v-model="form.koperasiId"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">-- Pilih Koperasi --</option>
                <option 
                  v-for="koperasi in koperasiList" 
                  :key="koperasi.id" 
                  :value="koperasi.id"
                >
                  {{ koperasi.nama }} - {{ koperasi.kota }}
                </option>
              </select>
              
              <div v-if="selectedKoperasi" class="mt-3 p-3 bg-white border border-green-200 rounded-md">
                <div class="flex items-center gap-2 text-sm text-green-700">
                  <UIcon name="i-heroicons-check-circle" class="w-5 h-5" />
                  <span class="font-medium">Koperasi dipilih: {{ selectedKoperasi.nama }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Section 1: Data Pribadi -->
          <div>
            <h2 class="text-lg font-bold text-gray-800 mb-4 pb-2 border-b flex items-center gap-2">
              <UIcon name="i-heroicons-user" class="w-5 h-5 text-red-600" />
              Data Pribadi
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- NIK -->
              <div class="md:col-span-2">
                <label class="block text-xs text-gray-700 mb-1">
                  NIK (Nomor Induk Kependudukan) <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.nik"
                  type="text"
                  required
                  maxlength="16"
                  placeholder="16 digit sesuai KTP"
                  @input="handleNIKChange"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
                <p class="text-xs text-gray-500 mt-1">
                  <UIcon name="i-heroicons-information-circle" class="w-3 h-3 inline" />
                  NIK harus 16 digit sesuai KTP
                </p>
              </div>

              <!-- Nama Lengkap -->
              <div class="md:col-span-2">
                <label class="block text-xs text-gray-700 mb-1">
                  Nama Lengkap <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.namaLengkap"
                  type="text"
                  required
                  placeholder="Nama lengkap sesuai KTP"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <!-- Tempat Lahir -->
              <div>
                <label class="block text-xs text-gray-700 mb-1">
                  Tempat Lahir <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.tempatLahir"
                  type="text"
                  required
                  placeholder="Kota/Kabupaten"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <!-- Tanggal Lahir -->
              <div>
                <label class="block text-xs text-gray-700 mb-1">
                  Tanggal Lahir <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.tanggalLahir"
                  type="date"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <!-- Jenis Kelamin -->
              <div>
                <label class="block text-xs text-gray-700 mb-1">
                  Jenis Kelamin <span class="text-red-500">*</span>
                </label>
                <select 
                  v-model="form.jenisKelamin"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">-- Pilih --</option>
                  <option value="laki-laki">Laki-laki</option>
                  <option value="perempuan">Perempuan</option>
                </select>
              </div>

              <!-- Agama -->
              <div>
                <label class="block text-xs text-gray-700 mb-1">
                  Agama <span class="text-red-500">*</span>
                </label>
                <select 
                  v-model="form.agama"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">-- Pilih --</option>
                  <option value="islam">Islam</option>
                  <option value="kristen">Kristen</option>
                  <option value="katolik">Katolik</option>
                  <option value="hindu">Hindu</option>
                  <option value="buddha">Buddha</option>
                  <option value="konghucu">Konghucu</option>
                </select>
              </div>

              <!-- Status Perkawinan -->
              <div>
                <label class="block text-xs text-gray-700 mb-1">
                  Status Perkawinan <span class="text-red-500">*</span>
                </label>
                <select 
                  v-model="form.statusPerkawinan"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">-- Pilih --</option>
                  <option value="belum-kawin">Belum Kawin</option>
                  <option value="kawin">Kawin</option>
                  <option value="cerai-hidup">Cerai Hidup</option>
                  <option value="cerai-mati">Cerai Mati</option>
                </select>
              </div>

              <!-- Pekerjaan -->
              <div>
                <label class="block text-xs text-gray-700 mb-1">
                  Pekerjaan <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.pekerjaan"
                  type="text"
                  required
                  placeholder="Contoh: Karyawan Swasta"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <!-- Pendidikan -->
              <div>
                <label class="block text-xs text-gray-700 mb-1">
                  Pendidikan Terakhir <span class="text-red-500">*</span>
                </label>
                <select 
                  v-model="form.pendidikan"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">-- Pilih --</option>
                  <option value="sd">SD</option>
                  <option value="smp">SMP</option>
                  <option value="sma">SMA/SMK</option>
                  <option value="d3">D3</option>
                  <option value="s1">S1</option>
                  <option value="s2">S2</option>
                  <option value="s3">S3</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Section 2: Alamat -->
          <div>
            <h2 class="text-lg font-bold text-gray-800 mb-4 pb-2 border-b flex items-center gap-2">
              <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-red-600" />
              Alamat Domisili
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Alamat Lengkap -->
              <div class="md:col-span-2">
                <label class="block text-xs text-gray-700 mb-1">
                  Alamat Lengkap <span class="text-red-500">*</span>
                </label>
                <textarea 
                  v-model="form.alamatLengkap"
                  rows="3"
                  required
                  placeholder="Jalan, nomor rumah, RT/RW, dll"
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

          <!-- Section 3: Kontak -->
          <div>
            <h2 class="text-lg font-bold text-gray-800 mb-4 pb-2 border-b flex items-center gap-2">
              <UIcon name="i-heroicons-phone" class="w-5 h-5 text-red-600" />
              Informasi Kontak
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- No. Telepon -->
              <div>
                <label class="block text-xs text-gray-700 mb-1">
                  No. Telepon/HP <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.noTelepon"
                  type="tel"
                  required
                  placeholder="08123456789"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <!-- Email -->
              <div>
                <label class="block text-xs text-gray-700 mb-1">
                  Email <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="email@example.com"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
          </div>

          <!-- Section 4: Kontak Darurat -->
          <div>
            <h2 class="text-lg font-bold text-gray-800 mb-4 pb-2 border-b flex items-center gap-2">
              <UIcon name="i-heroicons-shield-exclamation" class="w-5 h-5 text-red-600" />
              Kontak Darurat
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Nama Kontak Darurat -->
              <div>
                <label class="block text-xs text-gray-700 mb-1">
                  Nama Kontak Darurat <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.namaKontakDarurat"
                  type="text"
                  required
                  placeholder="Nama keluarga/kerabat terdekat"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <!-- Hubungan -->
              <div>
                <label class="block text-xs text-gray-700 mb-1">
                  Hubungan <span class="text-red-500">*</span>
                </label>
                <select 
                  v-model="form.hubunganKontakDarurat"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">-- Pilih --</option>
                  <option value="orang-tua">Orang Tua</option>
                  <option value="suami-istri">Suami/Istri</option>
                  <option value="anak">Anak</option>
                  <option value="saudara">Saudara Kandung</option>
                  <option value="kerabat">Kerabat</option>
                </select>
              </div>

              <!-- No. Telepon Darurat -->
              <div class="md:col-span-2">
                <label class="block text-xs text-gray-700 mb-1">
                  No. Telepon Darurat <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.noTeleponDarurat"
                  type="tel"
                  required
                  placeholder="08123456789"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
          </div>

          <!-- Info -->
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div class="text-xs text-yellow-800">
                <p class="font-semibold mb-1">Perhatian:</p>
                <ul class="list-disc list-inside space-y-1 text-yellow-700">
                  <li>Pastikan semua data yang Anda masukkan sudah benar dan sesuai KTP</li>
                  <li>Admin koperasi akan memverifikasi data Anda dalam 1-3 hari kerja</li>
                  <li>Anda akan dihubungi melalui email/WhatsApp untuk proses selanjutnya</li>
                  <li>Siapkan fotocopy KTP dan pas foto 3x4 untuk proses verifikasi</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex gap-3">
            <NuxtLink 
              to="/"
              class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 text-sm font-semibold rounded-md hover:bg-gray-50 transition-colors text-center"
            >
              Batal
            </NuxtLink>
            <button 
              type="submit"
              :disabled="loading || !form.koperasiId"
              class="flex-1 px-6 py-3 bg-red-700 text-white text-sm font-semibold rounded-md hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {{ loading ? 'Mengirim...' : 'Kirim Pendaftaran' }}
            </button>
          </div>

          <!-- Footer Link -->
          <div class="text-center pt-4">
            <p class="text-xs text-gray-600">
              Sudah menjadi anggota? 
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