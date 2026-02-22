<script setup lang="ts">
import { ref } from 'vue'

// Data Dummy Galeri (Kita tambahkan Judul dan Kategori agar lebih informatif)
// Kita juga menambahkan properti 'size' untuk mengatur tata letak asimetris
const galeriList = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1542744094-24638ea0b347?w=800&q=80',
    title: 'Rapat Anggota Tahunan (RAT) 2025',
    category: 'Kegiatan Utama',
    size: 'large', // Gambar ini akan besar (2x2 grid)
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&q=80',
    title: 'Kunjungan Studi Banding Koperasi Jabar',
    category: 'Kunjungan',
    size: 'normal',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
    title: 'Pelatihan Digital Marketing UMKM',
    category: 'Pelatihan',
    size: 'normal',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
    title: 'Bazaar Produk Anggota & Pasar Murah',
    category: 'Event Sosial',
    size: 'normal',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=600&q=80',
    title: 'Penyerahan Dana Santunan Pendidikan',
    category: 'Sosial',
    size: 'normal',
  },
]

// --- Logic untuk Lightbox (Modal Gambar Fullscreen) ---
const isOpen = ref(false)
const selectedImage = ref(galeriList[0])

const openLightbox = (img: (typeof galeriList)[0]) => {
  selectedImage.value = img
  isOpen.value = true
}
</script>

<template>
  <section class="py-24 bg-white relative overflow-hidden">
    <div
      class="absolute top-1/2 right-[-20%] -translate-y-1/2 w-[50rem] h-[50rem] bg-red-50/60 rounded-full blur-[120px] pointer-events-none"
    ></div>

    <div class="container mx-auto px-4 lg:max-w-7xl relative z-10">
      <div class="text-center mb-16 max-w-3xl mx-auto">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold mb-4 shadow-sm"
        >
          <UIcon name="i-lucide-image" class="w-4 h-4 text-red-500" />
          Dokumentasi
        </div>
        <h2 class="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Galeri <span class="text-red-600">Kegiatan Kami</span>
        </h2>
        <p class="text-lg text-slate-500 mt-4 leading-relaxed">
          Momen-momen penting kebersamaan dan kemajuan anggota koperasi yang kami abadikan.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-4 md:gap-6 grid-flow-dense">
        <div
          v-for="foto in galeriList"
          :key="foto.id"
          @click="openLightbox(foto)"
          :class="[
            'group relative rounded-3xl overflow-hidden cursor-pointer bg-slate-100 shadow-sm hover:shadow-xl transition-all duration-500',
            foto.size === 'large' ? 'md:col-span-2 md:row-span-2' : '', // Logika untuk gambar besar
          ]"
        >
          <img
            :src="foto.src"
            :alt="foto.title"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          />

          <div
            class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6"
          >
            <div
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-100"
            >
              <UIcon name="i-lucide-maximize-2" class="w-8 h-8 text-white" />
            </div>

            <div
              class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200"
            >
              <span class="text-xs font-bold text-red-300 mb-2 block">{{ foto.category }}</span>
              <h3 class="text-white font-bold text-lg md:text-xl leading-tight line-clamp-2">
                {{ foto.title }}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <UButton
          variant="outline"
          color="gray"
          class="rounded-full px-8 py-3 font-semibold bg-white hover:bg-slate-50 border-slate-200 text-slate-700 transition-all active:scale-95"
        >
          Lihat Dokumentasi Lainnya
        </UButton>
      </div>
    </div>

    <UModal
      v-model="isOpen"
      :ui="{ width: 'max-w-5xl', overlay: { background: 'bg-slate-900/90 backdrop-blur-sm' } }"
    >
      <div
        class="relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col md:flex-row"
      >
        <div
          class="flex-grow relative bg-black flex items-center justify-center overflow-hidden group md:w-2/3"
        >
          <img
            :src="selectedImage.src"
            :alt="selectedImage.title"
            class="max-w-full max-h-[85vh] object-contain"
          />
        </div>

        <div class="bg-white p-8 md:w-1/3 flex flex-col justify-center relative">
          <button
            @click="isOpen = false"
            class="absolute top-4 right-4 p-2 bg-slate-100 text-slate-500 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <UIcon name="i-lucide-x" class="w-5 h-5" />
          </button>

          <span
            class="text-xs font-bold text-red-600 mb-2 uppercase tracking-wider flex items-center gap-2"
          >
            <UIcon name="i-lucide-tag" class="w-4 h-4" /> {{ selectedImage.category }}
          </span>
          <h3 class="text-2xl font-extrabold text-slate-900 leading-tight mb-4">
            {{ selectedImage.title }}
          </h3>
          <p class="text-slate-600 leading-relaxed text-sm">
            Deskripsi detail mengenai kegiatan ini dapat ditambahkan di sini. Ini memberikan konteks
            lebih pada foto yang ditampilkan kepada pengunjung.
          </p>

          <div
            class="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500"
          >
            <span class="flex items-center gap-1"
              ><UIcon name="i-lucide-calendar" class="w-4 h-4" /> 20 Feb 2026</span
            >
            <span class="flex items-center gap-1"
              ><UIcon name="i-lucide-camera" class="w-4 h-4" /> Dokumentasi KMP</span
            >
          </div>
        </div>
      </div>
    </UModal>
  </section>
</template>
