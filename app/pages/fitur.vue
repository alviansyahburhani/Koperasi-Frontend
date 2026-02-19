<script setup lang="ts">
useHead({
  title: 'Fitur - Koperasi Merah Putih',
  meta: [
    { name: 'description', content: 'Fitur lengkap platform Koperasi Merah Putih untuk pengelolaan koperasi modern' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 py-16">
    <div class="container mx-auto px-4">
      
      <!-- Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h1 class="text-5xl font-bold text-slate-900 mb-6">
          Fitur <span class="text-red-600">Lengkap</span>
        </h1>
        <p class="text-xl text-slate-600">
          Semua yang Anda butuhkan untuk mengelola koperasi modern
        </p>
      </div>

      <!-- Features Grid -->
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <!-- Feature 1 -->
          <UCard class="hover:shadow-xl transition">
            <div class="text-center">
              <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UIcon name="i-heroicons-users" class="w-8 h-8 text-red-600" />
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">Buku 01 - Anggota</h3>
              <p class="text-slate-600">
                Kelola data anggota dengan mudah dan terstruktur
              </p>
            </div>
          </UCard>

          <!-- Feature 2 -->
          <UCard class="hover:shadow-xl transition">
            <div class="text-center">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UIcon name="i-heroicons-banknotes" class="w-8 h-8 text-green-600" />
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">Buku 04 - Simpanan</h3>
              <p class="text-slate-600">
                Catat simpanan pokok, wajib, dan sukarela secara otomatis
              </p>
            </div>
          </UCard>

          <!-- Feature 3 -->
          <UCard class="hover:shadow-xl transition">
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UIcon name="i-heroicons-currency-dollar" class="w-8 h-8 text-blue-600" />
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">Buku 05 - Pinjaman</h3>
              <p class="text-slate-600">
                Proses persetujuan dan pelacakan pinjaman real-time
              </p>
            </div>
          </UCard>

          <!-- Feature 4 -->
          <UCard class="hover:shadow-xl transition">
            <div class="text-center">
              <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UIcon name="i-heroicons-chart-pie" class="w-8 h-8 text-purple-600" />
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">SHU Otomatis</h3>
              <p class="text-slate-600">
                Hitung dan bagikan Sisa Hasil Usaha secara transparan
              </p>
            </div>
          </UCard>

          <!-- Feature 5 -->
          <UCard class="hover:shadow-xl transition">
            <div class="text-center">
              <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UIcon name="i-heroicons-document-chart-bar" class="w-8 h-8 text-orange-600" />
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">Laporan Lengkap</h3>
              <p class="text-slate-600">
                Berbagai laporan keuangan dan operasional siap cetak
              </p>
            </div>
          </UCard>

          <!-- Feature 6 -->
          <UCard class="hover:shadow-xl transition">
            <div class="text-center">
              <div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UIcon name="i-heroicons-shield-check" class="w-8 h-8 text-pink-600" />
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">Multi-role Access</h3>
              <p class="text-slate-600">
                Atur hak akses sesuai jabatan di koperasi
              </p>
            </div>
          </UCard>

        </div>

        <!-- CTA -->
        <div class="text-center mt-16">
          <UButton to="/daftar-koperasi" color="red" size="xl" class="font-bold">
            Coba Gratis Sekarang
          </UButton>
        </div>
      </div>

    </div>
  </div>
</template>