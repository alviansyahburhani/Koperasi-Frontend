<script setup lang="ts">
// Di sini nanti kita bisa menambahkan props seperti judul atau gambar dari API
</script>

<template>
  <section class="relative pt-24 pb-20 lg:pt-32 lg:pb-32 bg-white overflow-hidden">
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-red-100 rounded-full blur-3xl opacity-50 animate-blob"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-slate-100 rounded-full blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        <div class="flex-1 text-center lg:text-left">
          
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold mb-6 shadow-sm animate-fade-in-up">
            <UIcon name="i-lucide-rocket" class="w-4 h-4" /> 
            Sistem Koperasi Terintegrasi #1
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight animate-fade-in-up delay-100">
            Transformasi Digital <br class="hidden lg:block" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
              Koperasi Indonesia
            </span>
          </h1>

          <p class="text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up delay-200">
            Kelola simpan pinjam, anggota, dan laporan 16 buku wajib dalam satu platform. Transparan, aman, dan disetujui standar nasional.
          </p>

          <div class="relative max-w-md mx-auto lg:mx-0 mb-10 group animate-fade-in-up delay-300">
            <div class="absolute inset-0 bg-red-400 rounded-full blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
            <div class="relative flex items-center bg-white border border-slate-200 rounded-full p-1.5 shadow-lg focus-within:ring-2 focus-within:ring-red-100 transition-all">
              <div class="pl-4 text-slate-400">
                <UIcon name="i-lucide-search" class="w-5 h-5" />
              </div>
              <input 
                type="text" 
                placeholder="Cari koperasi terdaftar..." 
                class="flex-1 bg-transparent border-none focus:ring-0 px-3 py-2 text-slate-700 placeholder-slate-400 outline-none w-full text-sm sm:text-base"
              />
              <UButton color="red" class="rounded-full px-6 py-2.5 font-bold transition-transform active:scale-95">
                Cari
              </UButton>
            </div>
          </div>
        </div>

        <div class="flex-1 relative w-full max-w-xl lg:max-w-none animate-fade-in-right">
          <div class="relative z-10 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 transform rotate-1 hover:rotate-0 transition-transform duration-500">
            <div class="bg-slate-50 border-b border-slate-100 px-4 py-3 rounded-t-xl flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-red-400"></div>
              <div class="w-3 h-3 rounded-full bg-amber-400"></div>
              <div class="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div class="aspect-[16/10] bg-slate-100 rounded-b-xl overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" 
                alt="Dashboard Koperasi" 
                class="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div class="absolute -bottom-6 -left-4 bg-white p-4 rounded-xl shadow-xl border border-slate-50 flex items-center gap-3 z-20 animate-float">
            <div class="bg-green-100 p-2 rounded-lg text-green-600">
              <UIcon name="i-lucide-shield-check" class="w-6 h-6" />
            </div>
            <div>
              <p class="text-xs text-slate-500 font-bold">Status Sistem</p>
              <p class="text-sm font-bold text-slate-800">100% Aman</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob { animation: blob 7s infinite; }
.animation-delay-2000 { animation-delay: 2s; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { opacity: 0; animation: fadeInUp 0.8s ease-out forwards; }
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }

@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
}
.animate-fade-in-right { opacity: 0; animation: fadeInRight 1s ease-out 0.3s forwards; }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-float { animation: float 4s ease-in-out infinite; }
</style>