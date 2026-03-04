<script setup lang="ts">
import { BUKU_WAJIB_LIST } from '~/utils/landing'

const bukuWajibList = BUKU_WAJIB_LIST
const { sliderRef, scrollLeft, scrollRight, getAccessColor } = useLandingFeaturesSlider()
</script>

<template>
  <section class="pt-24 pb-8 bg-white relative overflow-hidden">
    <div
      class="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-50/60 rounded-full blur-[120px] pointer-events-none"
    />
    <div
      class="absolute bottom-[-20%] right-[-10%] w-[50rem] h-[50rem] bg-teal-50/50 rounded-full blur-[120px] pointer-events-none"
    />

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
            class="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-red-600 hover:border-red-200 hover:shadow-md transition-all active:scale-95"
            @click="scrollLeft"
          >
            <UIcon name="i-lucide-arrow-left" class="w-6 h-6" />
          </button>
          <button
            class="w-12 h-12 rounded-full bg-red-600 shadow-lg shadow-red-600/30 flex items-center justify-center text-white hover:bg-red-700 hover:-translate-y-0.5 transition-all active:scale-95"
            @click="scrollRight"
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
            />

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

              <p class="text-sm text-slate-500 mb-6 flex-grow">
                {{ buku.desc }}
              </p>

              <div
                class="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-5"
              />

              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                    <UIcon name="i-lucide-briefcase" class="w-3.5 h-3.5" /> Pengurus
                  </span>
                  <span
                    :class="[
                      'text-xs font-bold px-2 py-1 rounded-md border border-slate-100',
                      getAccessColor(buku.pengurus),
                    ]"
                  >
                    {{ buku.pengurus }}
                  </span>
                </div>

                <div class="flex justify-between items-center">
                  <span class="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                    <UIcon name="i-lucide-user" class="w-3.5 h-3.5" /> Anggota
                  </span>
                  <span
                    :class="[
                      'text-xs font-bold px-2 py-1 rounded-md border border-slate-100',
                      getAccessColor(buku.anggota),
                    ]"
                  >
                    {{ buku.anggota }}
                  </span>
                </div>

                <div class="flex justify-between items-center">
                  <span class="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                    <UIcon name="i-lucide-globe" class="w-3.5 h-3.5" /> Tamu Web
                  </span>
                  <span
                    :class="[
                      'text-xs font-bold px-2 py-1 rounded-md border border-slate-100',
                      getAccessColor(buku.tamu),
                    ]"
                  >
                    {{ buku.tamu }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="min-w-[1px] md:min-w-[20px] shrink-0" />
        </div>

        <div
          class="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent pointer-events-none hidden md:block"
        />
        <div
          class="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent pointer-events-none hidden md:block"
        />
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