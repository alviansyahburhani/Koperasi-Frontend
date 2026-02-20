<template>
  <section class="py-24 bg-white relative overflow-hidden">
    <div class="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-slate-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

    <div class="container mx-auto px-4 lg:max-w-7xl relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div class="relative w-full aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden bg-slate-100 group shadow-2xl border border-slate-100">
          <img 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2064&auto=format&fit=crop" 
            alt="Pengurus Koperasi Modern" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90" 
          />
          <div class="absolute inset-0 bg-gradient-to-tr from-slate-900/80 via-slate-900/40 to-transparent"></div>
          
          <div class="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl text-white transform group-hover:-translate-y-2 transition-transform duration-500 shadow-2xl">
            <div class="flex items-center gap-4 mb-2">
              <div class="bg-emerald-500/20 p-2 rounded-lg">
                <UIcon name="i-lucide-clock" class="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p class="text-emerald-300 text-xs font-bold uppercase tracking-wider">Efisiensi Waktu RAT</p>
                <p class="font-bold text-xl">Dari 2 Bulan ➔ 2 Menit</p>
              </div>
            </div>
            <p class="text-sm text-slate-300 mt-2">
              Laporan Neraca, Laba/Rugi, dan SHU ter-generate secara otomatis secara real-time.
            </p>
          </div>

          <div class="absolute top-8 left-8 bg-white p-3 rounded-xl shadow-xl flex items-center gap-3 animate-float">
            <div class="bg-blue-100 p-2 rounded-lg">
              <UIcon name="i-lucide-calculator" class="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-500 uppercase">Akurasi Perhitungan</p>
              <p class="font-extrabold text-slate-800">100% Presisi</p>
            </div>
          </div>
        </div>

        <div class="space-y-8">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-bold mb-4 shadow-sm border border-red-100">
              <UIcon name="i-lucide-trending-up" class="w-4 h-4" /> 
              Selamat Tinggal Pembukuan Manual
            </div>
            
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
              Mengakhiri Era <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Pembukuan yang Memusingkan</span>
            </h2>
            
            <p class="text-lg text-slate-600 leading-relaxed">
              Koperasi Merah Putih bukan sekadar aplikasi pencatatan. Kami adalah arsitektur transformasi digital yang menyelesaikan akar masalah manajerial koperasi Anda.
            </p>
          </div>

          <div class="space-y-5 mt-8">
            
            <div class="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
              <div class="bg-red-100 p-2.5 rounded-xl shrink-0 mt-0.5">
                <UIcon name="i-lucide-file-spreadsheet" class="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h4 class="font-bold text-slate-900 text-lg mb-1">Bebas Selisih & Salah Hitung</h4>
                <p class="text-slate-600 text-sm leading-relaxed">
                  Perhitungan bunga menurun/flat, denda keterlambatan pinjaman, hingga pembagian SHU dihitung dengan presisi mesin akuntansi standar perbankan.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
              <div class="bg-emerald-100 p-2.5 rounded-xl shrink-0 mt-0.5">
                <UIcon name="i-lucide-check-circle-2" class="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h4 class="font-bold text-slate-900 text-lg mb-1">Standar Kepatuhan Kemenkop</h4>
                <p class="text-slate-600 text-sm leading-relaxed">
                  Tidak perlu menebak-nebak format laporan. Sistem kami mengunci format 16 Buku Wajib sesuai dengan regulasi resmi Kementerian Koperasi dan UKM RI.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
              <div class="bg-blue-100 p-2.5 rounded-xl shrink-0 mt-0.5">
                <UIcon name="i-lucide-shield-alert" class="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 class="font-bold text-slate-900 text-lg mb-1">Keamanan Anti-Fraud (Log Audit)</h4>
                <p class="text-slate-600 text-sm leading-relaxed">
                  Membangun *trust* anggota dengan sistem transparan. Setiap perubahan kas atau data akan tercatat (Siapa, Kapan, Apa yang diubah) dan tidak bisa dihapus diam-diam.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-float {
  animation: float 4s ease-in-out infinite;
}
</style>