<script setup lang="ts">
// Data dummy berita
const beritaList = [
  { id: 1, title: 'Pembagian SHU Tahun Buku 2025 Sukses Digelar', date: '15 Feb 2026', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&q=80', excerpt: 'Alhamdulillah, Rapat Anggota Tahunan (RAT) dan pembagian Sisa Hasil Usaha berjalan lancar.' },
  { id: 2, title: 'Koperasi Buka Layanan Pinjaman Pendidikan', date: '10 Feb 2026', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&q=80', excerpt: 'Kini anggota dapat mengajukan pinjaman khusus untuk biaya pendidikan anak dengan bunga ringan.' },
  { id: 3, title: 'Pelatihan Kewirausahaan untuk Anggota UMKM', date: '05 Feb 2026', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&q=80', excerpt: 'Tingkatkan omset bisnis Anda dengan mengikuti pelatihan digital marketing gratis untuk anggota.' }
]
</script>

<template>
  <section class="py-24 bg-slate-50 relative overflow-hidden">
    
    <div class="absolute top-0 right-[-10%] w-[40rem] h-[40rem] bg-red-100/40 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute bottom-0 left-[-10%] w-[30rem] h-[30rem] bg-rose-50/50 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="container mx-auto px-4 lg:max-w-7xl relative z-10">
      
      <div class="flex flex-col sm:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-bold mb-4 shadow-sm">
            <UIcon name="i-lucide-newspaper" class="w-4 h-4 text-red-500" /> 
            Kabar Terkini
          </div>
          <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Berita & <span class="text-red-600">Pengumuman</span></h2>
          <p class="text-lg text-slate-500 mt-2">Informasi dan kegiatan terbaru dari koperasi kami.</p>
        </div>
        <UButton variant="outline" color="gray" class="hidden sm:flex rounded-full px-6 font-semibold bg-white hover:bg-slate-100 border-slate-200 text-slate-700">
          Lihat Semua <UIcon name="i-lucide-arrow-right" class="ml-1" />
        </UButton>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <NuxtLink 
          v-for="berita in beritaList" 
          :key="berita.id" 
          to="#"
          class="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
        >
          <div class="relative w-full aspect-video overflow-hidden bg-slate-100">
            <img 
              :src="berita.image" 
              :alt="berita.title" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div class="p-6 md:p-8 flex flex-col flex-grow relative z-10 bg-white">
            
            <span class="text-xs font-bold text-red-500 mb-3 tracking-wider uppercase flex items-center gap-1.5">
              <UIcon name="i-lucide-calendar" class="w-3.5 h-3.5" /> {{ berita.date }}
            </span>
            
            <h3 class="font-bold text-xl text-slate-900 mb-3 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
              {{ berita.title }}
            </h3>
            
            <p class="text-sm text-slate-500 line-clamp-3 mb-6 flex-grow leading-relaxed">
              {{ berita.excerpt }}
            </p>

            <div class="w-full h-px bg-slate-100 mt-auto mb-4"></div>
            <div class="flex items-center text-sm font-semibold text-slate-700 group-hover:text-red-600 transition-colors">
              Baca Selengkapnya <UIcon name="i-lucide-arrow-right" class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </div>

          </div>
        </NuxtLink>

      </div>
      
      <div class="mt-8 text-center sm:hidden">
        <UButton variant="outline" color="gray" size="lg" class="w-full justify-center rounded-full font-semibold bg-white border-slate-200 text-slate-700">
          Lihat Semua Berita
        </UButton>
      </div>

    </div>
  </section>
</template>