<script setup lang="ts">
// SEO Meta
useHead({
  title: 'Koperasi Merah Putih - Platform Digital 16 Buku Wajib',
  meta: [
    { 
      name: 'description', 
      content: 'Digitalisasi pengelolaan koperasi dengan sistem 16 Buku Wajib yang transparan dan efisien' 
    }
  ]
})
</script>

<template>
  <div class="bg-white selection:bg-red-100 selection:text-red-900">
    
    <section class="relative pt-20 pb-24 lg:pt-32 lg:pb-32 overflow-hidden">
      <!-- Background Effects -->
      <div class="absolute inset-0 z-0 pointer-events-none">
        <div class="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] bg-red-50 rounded-full blur-3xl opacity-70" />
        <div class="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[500px] h-[500px] bg-pink-50 rounded-full blur-3xl opacity-70" />
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          <!-- Left Content -->
          <div class="flex-1 text-center lg:text-left">
            
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 text-sm font-bold mb-6 shadow-sm">
              <UIcon name="i-heroicons-rocket-launch" class="w-4 h-4 animate-pulse" /> 
              Platform Koperasi Era Digital
            </div>

            <!-- Title -->
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.15]">
              Revolusi Koperasi Anda dengan <br class="hidden sm:block" />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
                Sistem 16 Buku Wajib
              </span>
            </h1>

            <!-- Description -->
            <p class="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Tinggalkan tumpukan kertas. Kelola simpan pinjam, SHU, hingga anggota baru dalam satu platform cerdas, transparan, dan terstandarisasi.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 mt-8">
              <UButton 
                to="/daftar-koperasi"
                color="red" 
                size="lg" 
                class="px-8 py-3 text-base font-bold shadow-lg shadow-red-500/30 hover:-translate-y-1 transition-transform w-full sm:w-auto justify-center"
              >
                Buka Cabang Baru
              </UButton>
              
              <UButton 
                to="/login"
                color="gray" 
                variant="ghost" 
                size="lg" 
                class="px-8 py-3 text-base font-medium hover:bg-slate-100 w-full sm:w-auto justify-center"
              >
                Masuk Pengurus
                <UIcon name="i-heroicons-arrow-right" class="ml-2" />
              </UButton>
            </div>
          </div>

          <!-- Right Content - Image -->
          <div class="flex-1">
            <div class="relative w-full max-w-2xl mx-auto lg:max-w-none">
              <div class="relative rounded-2xl bg-white p-2 shadow-[0_20px_50px_rgba(220,38,38,0.15)] border border-slate-100 z-10 hover:shadow-2xl transition-shadow duration-500">
                
                <!-- Browser chrome -->
                <div class="flex gap-1.5 px-4 pt-3 pb-2 border-b border-slate-50 mb-2">
                  <div class="w-3 h-3 rounded-full bg-red-400" />
                  <div class="w-3 h-3 rounded-full bg-amber-400" />
                  <div class="w-3 h-3 rounded-full bg-green-400" />
                </div>
                
                <!-- Image -->
                 <NuxtImg 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                  alt="Mockup Dashboard Koperasi"
                  class="rounded-xl w-full h-auto object-cover border border-slate-100"
                  loading="lazy"
                  width="2070"
                  height="1380"
                />
              </div>

              <!-- Floating Card - Bottom Left -->
              <div class="absolute -bottom-8 -left-4 sm:-left-8 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20">
                <div class="flex items-center gap-4">
                  <div class="bg-green-100 p-3 rounded-full">
                    <UIcon name="i-heroicons-shield-check" class="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p class="text-xs text-slate-500 font-medium">Buku 1-16</p>
                    <p class="font-bold text-slate-800">100% Sinkron</p>
                  </div>
                </div>
              </div>

              <!-- Floating Card - Top Right -->
              <div class="absolute -top-8 -right-4 sm:-right-8 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 hidden sm:block">
                <div class="flex items-center gap-4">
                  <div class="bg-red-100 p-3 rounded-full">
                    <UIcon name="i-heroicons-chart-bar" class="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p class="text-xs text-slate-500 font-medium">SHU Bulan Ini</p>
                    <p class="font-bold text-slate-800 text-lg">+Rp 45Jt</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

  </div>
</template>