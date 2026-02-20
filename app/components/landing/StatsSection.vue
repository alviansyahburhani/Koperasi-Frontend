<template>
  <section class="py-12 bg-red-700 text-white border-y border-red-800">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-red-600/50 text-center">
        
        <div class="animate-fade-in-up delay-100">
          <h4 class="text-4xl md:text-5xl font-extrabold mb-2 text-white drop-shadow-md">100+</h4>
          <p class="text-red-200 font-medium text-sm md:text-base">Koperasi Bergabung</p>
        </div>
        
        <div class="animate-fade-in-up delay-200">
          <h4 class="text-4xl md:text-5xl font-extrabold mb-2 text-white drop-shadow-md">16</h4>
          <p class="text-red-200 font-medium text-sm md:text-base">Modul Buku Wajib</p>
        </div>
        
        <div class="animate-fade-in-up delay-300">
          <h4 class="text-4xl md:text-5xl font-extrabold mb-2 text-white drop-shadow-md">Rp 50M+</h4>
          <p class="text-red-200 font-medium text-sm md:text-base">Aset Dikelola</p>
        </div>
        
        <div class="animate-fade-in-up delay-400">
          <h4 class="text-4xl md:text-5xl font-extrabold mb-2 text-white drop-shadow-md">100%</h4>
          <p class="text-red-200 font-medium text-sm md:text-base">Keamanan Data</p>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { opacity: 0; animation: fadeInUp 0.8s ease-out forwards; }
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }
</style>