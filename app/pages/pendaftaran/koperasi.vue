<script setup>
import { reactive, ref } from 'vue'

// --- LOGIKA FORM ---
const currentStep = ref(1)
const totalSteps = 4
const isSubmitting = ref(false)

const formData = reactive({
  // Step 1: Kedudukan
  cooperativeName: '',
  subdomain: '',
  skAhuKoperasi: '',
  province: '',
  city: '',
  district: '',
  village: '',
  alamatLengkap: '',
  petaLokasi: '',
  // Step 2: PIC
  picFullName: '',
  picNik: '',
  picGender: 'Laki-laki',
  picPlaceOfBirth: '',
  picDateOfBirth: '',
  picOccupation: '',
  picPhoneNumber: '',
  picAddress: '',
  // Step 3: Akun
  email: '',
  password: '',
  confirmPassword: '',
  // Step 4: Dokumen
  files: {
    pengesahan: null,
    daftarUmum: null,
    aktaNotaris: null,
    npwp: null
  }
})

const errors = reactive({})

const validateStep = (step) => {
  Object.keys(errors).forEach(key => delete errors[key])

  if (step === 1) {
    if (!formData.cooperativeName) errors.cooperativeName = 'Nama Koperasi wajib diisi'
    if (!formData.subdomain) errors.subdomain = 'Subdomain wajib diisi'
    if (!formData.province) errors.province = 'Provinsi wajib diisi'
    if (!formData.city) errors.city = 'Kabupaten/Kota wajib diisi'
    if (!formData.district) errors.district = 'Kecamatan wajib diisi'
    if (!formData.village) errors.village = 'Desa/Kelurahan wajib diisi'
    if (!formData.alamatLengkap) errors.alamatLengkap = 'Alamat lengkap wajib diisi'
  }
  
  if (step === 2) {
    if (!formData.picFullName) errors.picFullName = 'Nama lengkap PIC wajib diisi'
    if (formData.picNik.length !== 16) errors.picNik = 'NIK harus 16 digit'
    if (!formData.picPhoneNumber) errors.picPhoneNumber = 'Nomor telepon wajib diisi'
    if (!formData.picAddress) errors.picAddress = 'Alamat PIC wajib diisi'
  }

  if (step === 3) {
    if (!formData.email) errors.email = 'Email wajib diisi'
    if (formData.password.length < 8) errors.password = 'Password minimal 8 karakter'
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Password tidak cocok'
  }

  return Object.keys(errors).length === 0
}

const nextStep = () => {
  if (validateStep(currentStep.value)) {
    if (currentStep.value < totalSteps) currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleFile = (e, key) => {
  formData.files[key] = e.target.files[0]
}

const submitForm = async () => {
  isSubmitting.value = true
  // Simulasi integrasi backend NestJS
  setTimeout(() => {
    alert('Pendaftaran Berhasil Dikirim!')
    isSubmitting.value = false
  }, 2000)
}

// --- STYLING CONSTANTS ---
const inputClass = "w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all duration-200"
const labelClass = "block text-[13px] font-semibold text-gray-700 mb-1.5 uppercase tracking-wide"
const sectionTitleClass = "text-xl font-bold text-[#8B1E3F] mb-6 flex items-center gap-3 border-b border-gray-100 pb-4"
</script>

<template>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <div class="min-h-screen bg-[#F8FAFC] pt-16 pb-20 font-['Inter',sans-serif] text-left">
    <main class="max-w-4xl mx-auto px-6">
      
      <div class="text-center mb-12">
        <h1 class="text-3xl font-extrabold text-[#8B1E3F] tracking-tight mb-2">Form Permohonan Akun Koperasi</h1>
        <p class="text-sm text-gray-500 font-medium">Lengkapi data koperasi Anda untuk pendaftaran sistem.</p>
      </div>

      <div class="flex justify-between items-center mb-12 max-w-2xl mx-auto relative px-4">
        <div class="absolute top-1/2 left-0 w-full h-[2px] bg-gray-200 -z-0"></div>
        <div 
          class="absolute top-1/2 left-0 h-[2px] bg-[#C41E3A] transition-all duration-700 ease-in-out -z-0" 
          :style="{ width: ((currentStep - 1) / (totalSteps - 1) * 100) + '%' }"
        ></div>
        
        <div v-for="s in totalSteps" :key="s" class="z-10 flex flex-col items-center">
          <div 
            :class="[
              'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-sm', 
              currentStep >= s ? 'bg-[#C41E3A] text-white scale-110' : 'bg-white border-2 border-gray-200 text-gray-400'
            ]"
          >
            {{ s }}
          </div>
        </div>
      </div>

      <div class="bg-white rounded-3xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] border border-gray-100 p-10">
        
        <div v-if="currentStep === 1" class="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          <h2 :class="sectionTitleClass">1. Kedudukan Koperasi</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div class="md:col-span-1">
              <label :class="labelClass">Nama Koperasi <span class="text-red-500">*</span></label>
              <input v-model="formData.cooperativeName" type="text" :class="[inputClass, errors.cooperativeName ? 'border-red-500' : '']" placeholder="Contoh: Koperasi Maju Jaya" />
              <p v-if="errors.cooperativeName" class="text-[10px] text-red-500 mt-1 font-medium">{{ errors.cooperativeName }}</p>
            </div>
            <div>
              <label :class="labelClass">Subdomain <span class="text-red-500">*</span></label>
              <div class="flex">
                <input v-model="formData.subdomain" type="text" :class="inputClass + ' rounded-r-none border-r-0'" placeholder="majujaya" />
                <span class="px-4 bg-gray-50 border border-gray-200 border-l-0 rounded-r-lg text-[11px] flex items-center text-gray-400 font-bold">.koperasi.com</span>
              </div>
            </div>
            <div class="md:col-span-2">
              <label :class="labelClass">SK AHU Koperasi <span class="text-red-500">*</span></label>
              <input v-model="formData.skAhuKoperasi" type="text" :class="inputClass" placeholder="Masukkan nomor SK AHU" />
            </div>
            <div>
              <label :class="labelClass">Provinsi <span class="text-red-500">*</span></label>
              <input v-model="formData.province" type="text" :class="inputClass" placeholder="Masukkan Provinsi" />
            </div>
            <div>
              <label :class="labelClass">Kabupaten/Kota <span class="text-red-500">*</span></label>
              <input v-model="formData.city" type="text" :class="inputClass" placeholder="Masukkan Kabupaten/Kota" />
            </div>
            <div>
              <label :class="labelClass">Kecamatan <span class="text-red-500">*</span></label>
              <input v-model="formData.district" type="text" :class="inputClass" placeholder="Masukkan Kecamatan" />
            </div>
            <div>
              <label :class="labelClass">Desa/Kelurahan <span class="text-red-500">*</span></label>
              <input v-model="formData.village" type="text" :class="inputClass" placeholder="Masukkan Desa/Kelurahan" />
            </div>
            <div class="md:col-span-2">
              <label :class="labelClass">Alamat Lengkap <span class="text-red-500">*</span></label>
              <textarea v-model="formData.alamatLengkap" rows="3" :class="inputClass" placeholder="Jalan, nomor rumah, RT/RW, dll"></textarea>
            </div>
            <div class="md:col-span-2">
              <label :class="labelClass">Link Google Maps <span class="text-gray-400 text-[11px] font-normal normal-case">(Opsional)</span></label>
              <input v-model="formData.petaLokasi" type="url" :class="inputClass" placeholder="https://maps.app.goo.gl/..." />
            </div>
          </div>
        </div>

        <div v-if="currentStep === 2" class="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          <h2 :class="sectionTitleClass">2. Informasi PIC (Penanggung Jawab)</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div class="md:col-span-2">
              <label :class="labelClass">Nama Lengkap PIC <span class="text-red-500">*</span></label>
              <input v-model="formData.picFullName" type="text" :class="inputClass" placeholder="Nama sesuai KTP" />
            </div>
            <div>
              <label :class="labelClass">NIK PIC <span class="text-red-500">*</span></label>
              <input v-model="formData.picNik" type="text" maxlength="16" :class="inputClass" placeholder="16 Digit NIK" />
            </div>
            <div>
              <label :class="labelClass">Jenis Kelamin PIC <span class="text-red-500">*</span></label>
              <select v-model="formData.picGender" :class="inputClass">
                <option>Laki-laki</option>
                <option>Perempuan</option>
              </select>
            </div>
            <div>
              <label :class="labelClass">Tempat Lahir PIC <span class="text-red-500">*</span></label>
              <input v-model="formData.picPlaceOfBirth" type="text" :class="inputClass" />
            </div>
            <div>
              <label :class="labelClass">Tanggal Lahir PIC <span class="text-red-500">*</span></label>
              <input v-model="formData.picDateOfBirth" type="date" :class="inputClass" />
            </div>
            <div>
              <label :class="labelClass">Pekerjaan PIC <span class="text-red-500">*</span></label>
              <input v-model="formData.picOccupation" type="text" :class="inputClass" />
            </div>
            <div>
              <label :class="labelClass">Nomor Telepon PIC <span class="text-red-500">*</span></label>
              <input v-model="formData.picPhoneNumber" type="tel" :class="inputClass" placeholder="08xxxx" />
            </div>
            <div class="md:col-span-2">
              <label :class="labelClass">Alamat Lengkap PIC <span class="text-red-500">*</span></label>
              <textarea v-model="formData.picAddress" rows="3" :class="inputClass" placeholder="Alamat lengkap PIC"></textarea>
            </div>
          </div>
        </div>

        <div v-if="currentStep === 3" class="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          <h2 :class="sectionTitleClass">3. Informasi Akun Koperasi</h2>
          <div class="space-y-5">
            <div>
              <label :class="labelClass">Email Koperasi (Login) <span class="text-red-500">*</span></label>
              <input v-model="formData.email" type="email" :class="inputClass" placeholder="admin@koperasi.com" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label :class="labelClass">Kata Sandi <span class="text-red-500">*</span></label>
                <input v-model="formData.password" type="password" :class="inputClass" placeholder="Minimal 8 karakter" />
              </div>
              <div>
                <label :class="labelClass">Ulangi Kata Sandi <span class="text-red-500">*</span></label>
                <input v-model="formData.confirmPassword" type="password" :class="inputClass" placeholder="Konfirmasi sandi" />
              </div>
            </div>
          </div>
        </div>

        <div v-if="currentStep === 4" class="animate-in fade-in duration-500 space-y-6">
          <h2 :class="sectionTitleClass">4. Dokumen Pendukung (PDF)</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div v-for="(label, key) in {
              pengesahan: 'Pengesahan Pendirian',
              daftarUmum: 'Daftar Umum',
              aktaNotaris: 'Akta Notaris',
              npwp: 'NPWP Koperasi'
            }" :key="key" class="p-5 border border-gray-100 bg-[#F9FAFB] rounded-2xl">
              <label :class="labelClass">{{ label }} <span class="text-red-500">*</span></label>
              <input type="file" accept="application/pdf" @change="e => handleFile(e, key)" class="text-xs mt-2 block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-[#C41E3A] hover:file:bg-red-100 cursor-pointer" />
            </div>
          </div>
        </div>

        <div class="flex justify-between mt-12 pt-8 border-t border-gray-100">
          <button 
            type="button"
            @click="prevStep" 
            v-if="currentStep > 1" 
            class="px-8 py-2.5 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-all text-sm"
          >
            Kembali
          </button>
          <div v-else></div>
          <button 
            type="button"
            @click="currentStep === totalSteps ? submitForm() : nextStep()" 
            :class="[
              'px-12 py-2.5 rounded-xl font-bold text-white transition-all shadow-md text-sm', 
              isSubmitting ? 'bg-gray-400' : 'bg-[#C41E3A] hover:bg-[#A01830] shadow-red-200'
            ]"
          >
            {{ currentStep === totalSteps ? (isSubmitting ? 'Mengirim...' : 'Kirim Pendaftaran') : 'Lanjut' }}
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.animate-in {
  animation-duration: 500ms;
  animation-fill-mode: both;
}
/* Menghilangkan scrollbar default pada textarea */
textarea {
  resize: vertical;
}
</style>