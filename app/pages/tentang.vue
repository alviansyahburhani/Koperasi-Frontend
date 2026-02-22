<script setup lang="ts">
useHead({
  title: 'Tentang Kami - Koperasi Merah Putih',
  meta: [
    {
      name: 'description',
      content:
        'Tentang platform digital Koperasi Merah Putih untuk pengelolaan 16 Buku Wajib Koperasi',
    },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-white py-16">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h1 class="text-5xl font-bold text-slate-900 mb-6">
          Tentang <span class="text-red-600">Koperasi Merah Putih</span>
        </h1>
        <p class="text-xl text-slate-600">
          Platform digital untuk transformasi pengelolaan koperasi modern
        </p>
      </div>

      <!-- Content -->
      <div class="max-w-4xl mx-auto space-y-12">
        <!-- Visi -->
        <section>
          <h2 class="text-3xl font-bold text-slate-900 mb-4">Visi Kami</h2>
          <p class="text-lg text-slate-600 leading-relaxed">
            Menjadi platform digital terdepan dalam transformasi pengelolaan koperasi di Indonesia,
            membantu koperasi mengelola administrasi dengan lebih efisien, transparan, dan
            akuntabel.
          </p>
        </section>

        <!-- Misi -->
        <section>
          <h2 class="text-3xl font-bold text-slate-900 mb-4">Misi Kami</h2>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <UIcon
                name="i-heroicons-check-circle"
                class="w-6 h-6 text-red-600 mt-1 flex-shrink-0"
              />
              <span class="text-lg text-slate-600">
                Digitalisasi 16 Buku Wajib Koperasi sesuai standar pemerintah
              </span>
            </li>
            <li class="flex items-start gap-3">
              <UIcon
                name="i-heroicons-check-circle"
                class="w-6 h-6 text-red-600 mt-1 flex-shrink-0"
              />
              <span class="text-lg text-slate-600">
                Memudahkan pengelolaan simpan pinjam yang transparan
              </span>
            </li>
            <li class="flex items-start gap-3">
              <UIcon
                name="i-heroicons-check-circle"
                class="w-6 h-6 text-red-600 mt-1 flex-shrink-0"
              />
              <span class="text-lg text-slate-600">
                Meningkatkan kepercayaan anggota melalui sistem yang akuntabel
              </span>
            </li>
            <li class="flex items-start gap-3">
              <UIcon
                name="i-heroicons-check-circle"
                class="w-6 h-6 text-red-600 mt-1 flex-shrink-0"
              />
              <span class="text-lg text-slate-600">
                Memberikan laporan real-time untuk pengambilan keputusan yang lebih baik
              </span>
            </li>
          </ul>
        </section>

        <!-- Features -->
        <section>
          <h2 class="text-3xl font-bold text-slate-900 mb-6">Fitur Unggulan</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="p-6 border border-slate-200 rounded-lg hover:shadow-lg transition">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <UIcon name="i-heroicons-document-text" class="w-6 h-6 text-red-600" />
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">16 Buku Wajib Digital</h3>
              <p class="text-slate-600">
                Kelola semua buku administrasi koperasi dalam satu platform terintegrasi
              </p>
            </div>

            <div class="p-6 border border-slate-200 rounded-lg hover:shadow-lg transition">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <UIcon name="i-heroicons-chart-bar" class="w-6 h-6 text-red-600" />
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">Laporan Real-time</h3>
              <p class="text-slate-600">
                Dapatkan insight bisnis secara real-time dengan dashboard interaktif
              </p>
            </div>

            <div class="p-6 border border-slate-200 rounded-lg hover:shadow-lg transition">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <UIcon name="i-heroicons-shield-check" class="w-6 h-6 text-red-600" />
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">Keamanan Terjamin</h3>
              <p class="text-slate-600">
                Data koperasi dilindungi dengan enkripsi dan backup otomatis
              </p>
            </div>

            <div class="p-6 border border-slate-200 rounded-lg hover:shadow-lg transition">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <UIcon name="i-heroicons-users" class="w-6 h-6 text-red-600" />
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">Multi-tenant</h3>
              <p class="text-slate-600">
                Satu platform untuk banyak koperasi dengan data terpisah dan aman
              </p>
            </div>
          </div>
        </section>

        <!-- CTA -->
        <section
          class="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-12 text-center text-white"
        >
          <h2 class="text-3xl font-bold mb-4">Siap Bergabung?</h2>
          <p class="text-xl mb-8 opacity-90">
            Mulai transformasi digital koperasi Anda sekarang juga
          </p>
          <div class="flex justify-center gap-4">
            <UButton to="/daftar-koperasi" color="white" size="lg" class="font-bold">
              Daftar Sekarang
            </UButton>
            <UButton
              to="/login"
              variant="outline"
              size="lg"
              class="font-bold text-white border-white hover:bg-white/10"
            >
              Login
            </UButton>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
