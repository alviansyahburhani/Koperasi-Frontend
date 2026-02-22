<script setup lang="ts">
import { ref } from 'vue'

const bukuWajibList = [
  {
    id: '01',
    title: 'Daftar Anggota',
    icon: 'i-lucide-users',
    desc: 'Pencatatan data lengkap anggota.',
    pengurus: 'Full Akses',
    anggota: 'Read-only',
    tamu: 'Terkunci',
  },
  {
    id: '02',
    title: 'Daftar Pengurus',
    icon: 'i-lucide-user-cog',
    desc: 'Susunan kepengurusan aktif.',
    pengurus: 'Full Akses',
    anggota: 'Read-only',
    tamu: 'Terkunci',
  },
  {
    id: '03',
    title: 'Daftar Pengawas',
    icon: 'i-lucide-shield-check',
    desc: 'Data pengawas koperasi.',
    pengurus: 'Full Akses',
    anggota: 'Read-only',
    tamu: 'Terkunci',
  },
  {
    id: '04',
    title: 'Simpanan Anggota',
    icon: 'i-lucide-piggy-bank',
    desc: 'Rekap pokok, wajib, sukarela.',
    pengurus: 'Bendahara',
    anggota: 'Pribadi',
    tamu: 'Terkunci',
  },
  {
    id: '05',
    title: 'Pinjaman Anggota',
    icon: 'i-lucide-hand-coins',
    desc: 'Riwayat pinjaman & angsuran.',
    pengurus: 'Bendahara',
    anggota: 'Pribadi',
    tamu: 'Terkunci',
  },
  {
    id: '06',
    title: 'Daftar Inventaris',
    icon: 'i-lucide-box',
    desc: 'Aset barang fisik koperasi.',
    pengurus: 'Sekretaris',
    anggota: 'Read-only',
    tamu: 'Read-only',
  },
  {
    id: '07',
    title: 'Notulen Rapat Anggota',
    icon: 'i-lucide-users-round',
    desc: 'Catatan hasil RAT tahunan.',
    pengurus: 'Sekretaris',
    anggota: 'Read-only',
    tamu: 'Read-only',
  },
  {
    id: '08',
    title: 'Notulen Rapat Pengurus',
    icon: 'i-lucide-briefcase',
    desc: 'Rapat internal pengurus.',
    pengurus: 'Ketua/Sek',
    anggota: 'Terkunci',
    tamu: 'Terkunci',
  },
  {
    id: '09',
    title: 'Notulen Rapat Pengawas',
    icon: 'i-lucide-gavel',
    desc: 'Catatan evaluasi pengawas.',
    pengurus: 'Ketua/Sek',
    anggota: 'Terkunci',
    tamu: 'Terkunci',
  },
  {
    id: '10',
    title: 'Daftar Karyawan',
    icon: 'i-lucide-contact',
    desc: 'Data staff operasional.',
    pengurus: 'Full Akses',
    anggota: 'Read-only',
    tamu: 'Read-only',
  },
  {
    id: '11',
    title: 'Buku Tamu',
    icon: 'i-lucide-book-open-check',
    desc: 'Kunjungan fisik & website.',
    pengurus: 'Full Akses',
    anggota: 'Tulis/Baca',
    tamu: 'Menulis',
  },
  {
    id: '12',
    title: 'Saran Anggota',
    icon: 'i-lucide-message-square',
    desc: 'Aspirasi dari anggota.',
    pengurus: 'Full Akses',
    anggota: 'Tulis/Baca',
    tamu: 'Menulis',
  },
  {
    id: '13',
    title: 'Saran Pengawas',
    icon: 'i-lucide-message-circle-warning',
    desc: 'Teguran dari pengawas.',
    pengurus: 'Full Akses',
    anggota: 'Terkunci',
    tamu: 'Terkunci',
  },
  {
    id: '14',
    title: 'Anjuran Pejabat',
    icon: 'i-lucide-scroll-text',
    desc: 'Arahan dinas terkait.',
    pengurus: 'Full Akses',
    anggota: 'Read-only',
    tamu: 'Read-only',
  },
  {
    id: '15',
    title: 'Catatan Kejadian',
    icon: 'i-lucide-clipboard-list',
    desc: 'Log insiden penting.',
    pengurus: 'Full Akses',
    anggota: 'Read-only',
    tamu: 'Read-only',
  },
  {
    id: '16',
    title: 'Agenda & Ekspedisi',
    icon: 'i-lucide-calendar-days',
    desc: 'Surat menyurat & jadwal.',
    pengurus: 'Full Akses',
    anggota: 'Read-only',
    tamu: 'Read-only',
  },
]

// Logika untuk tombol Slider
const sliderRef = ref<HTMLElement | null>(null)

const scrollLeft = () => {
  if (sliderRef.value) {
    sliderRef.value.scrollBy({ left: -350, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (sliderRef.value) {
    sliderRef.value.scrollBy({ left: 350, behavior: 'smooth' })
  }
}

// Fungsi pewarnaan cerdas untuk status akses
const getAccessColor = (status: string) => {
  if (status === 'Terkunci') return 'text-red-500 bg-red-50'
  if (['Full Akses', 'Ketua/Sek', 'Bendahara', 'Sekretaris'].includes(status))
    return 'text-indigo-600 bg-indigo-50'
  if (['Menulis', 'Tulis/Baca'].includes(status)) return 'text-blue-600 bg-blue-50'
  return 'text-emerald-600 bg-emerald-50' // Untuk Read-only / Pribadi
}
</script>

<template>
  <section class="pt-24 pb-8 bg-white relative overflow-hidden">
    <div
      class="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-50/60 rounded-full blur-[120px] pointer-events-none"
    ></div>
    <div
      class="absolute bottom-[-20%] right-[-10%] w-[50rem] h-[50rem] bg-teal-50/50 rounded-full blur-[120px] pointer-events-none"
    ></div>

    <div class="container mx-auto px-4 lg:max-w-7xl relative z-10">
      <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div class="max-w-2xl">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-bold mb-4 border border-red-100"
          >
            <UIcon name="i-lucide-shield" class="w-4 h-4" />
            Smart Access Control
          </div>
          <h2 class="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Eksplorasi
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400"
              >16 Buku Wajib</span
            >
          </h2>
          <p class="text-lg text-slate-600 mt-4 leading-relaxed">
            Geser untuk melihat detail setiap modul. Privasi anggota terjamin dengan sistem hak
            akses bertingkat yang diatur otomatis oleh sistem.
          </p>
        </div>

        <div class="flex gap-3 shrink-0">
          <button
            @click="scrollLeft"
            class="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-red-600 hover:border-red-200 hover:shadow-md transition-all active:scale-95"
          >
            <UIcon name="i-lucide-arrow-left" class="w-6 h-6" />
          </button>
          <button
            @click="scrollRight"
            class="w-12 h-12 rounded-full bg-red-600 shadow-lg shadow-red-600/30 flex items-center justify-center text-white hover:bg-red-700 hover:-translate-y-0.5 transition-all active:scale-95"
          >
            <UIcon name="i-lucide-arrow-right" class="w-6 h-6" />
          </button>
        </div>
      </div>

      <div class="relative -mx-4 px-4">
        <div
          ref="sliderRef"
          class="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-12 pt-4"
        >
          <div
            v-for="buku in bukuWajibList"
            :key="buku.id"
            class="min-w-[300px] md:min-w-[340px] snap-center shrink-0 relative bg-slate-50/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:bg-white transition-all duration-300 group overflow-hidden flex flex-col"
          >
            <div
              class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-rose-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
            ></div>

            <div class="p-6 flex flex-col h-full">
              <div class="flex items-start gap-4 mb-4">
                <div
                  class="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-400 flex items-center justify-center shrink-0 group-hover:bg-red-50 group-hover:border-red-100 group-hover:text-red-600 transition-all duration-300"
                >
                  <UIcon :name="buku.icon" class="w-7 h-7" />
                </div>
                <div>
                  <span
                    class="inline-block px-2 py-0.5 rounded text-[10px] font-black bg-white border border-slate-200 text-slate-500 mb-2 tracking-wider uppercase"
                  >
                    BUKU {{ buku.id }}
                  </span>
                  <h3
                    class="font-bold text-slate-800 text-lg leading-tight group-hover:text-red-600 transition-colors"
                  >
                    {{ buku.title }}
                  </h3>
                </div>
              </div>

              <p class="text-sm text-slate-500 mb-6 flex-grow">{{ buku.desc }}</p>
              <div
                class="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-5"
              ></div>

              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-xs font-medium text-slate-500 flex items-center gap-1.5"
                    ><UIcon name="i-lucide-briefcase" class="w-3.5 h-3.5" /> Pengurus</span
                  >
                  <span
                    :class="[
                      'text-xs font-bold px-2 py-1 rounded-md border border-slate-100',
                      getAccessColor(buku.pengurus),
                    ]"
                    >{{ buku.pengurus }}</span
                  >
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-xs font-medium text-slate-500 flex items-center gap-1.5"
                    ><UIcon name="i-lucide-user" class="w-3.5 h-3.5" /> Anggota</span
                  >
                  <span
                    :class="[
                      'text-xs font-bold px-2 py-1 rounded-md border border-slate-100',
                      getAccessColor(buku.anggota),
                    ]"
                    >{{ buku.anggota }}</span
                  >
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-xs font-medium text-slate-500 flex items-center gap-1.5"
                    ><UIcon name="i-lucide-globe" class="w-3.5 h-3.5" /> Tamu Web</span
                  >
                  <span
                    :class="[
                      'text-xs font-bold px-2 py-1 rounded-md border border-slate-100',
                      getAccessColor(buku.tamu),
                    ]"
                    >{{ buku.tamu }}</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="min-w-[1px] md:min-w-[20px] shrink-0"></div>
        </div>

        <div
          class="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent pointer-events-none hidden md:block"
        ></div>
        <div
          class="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent pointer-events-none hidden md:block"
        ></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<style scoped>
/* Menyembunyikan Scrollbar Bawaan Browser agar terlihat seperti Aplikasi Native */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
