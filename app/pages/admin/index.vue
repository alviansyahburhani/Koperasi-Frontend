<script setup>
// WAJIB: Memberitahu Nuxt agar halaman ini pakai sidebar admin, bukan navbar publik
definePageMeta({
  layout: 'admin'
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-800 mb-6">Dashboard Overview</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
      <UCard>
        <div class="flex items-center gap-4">
          <div class="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <UIcon name="i-heroicons-users" class="w-8 h-8" />
          </div>
          <div>
            <p class="text-sm text-slate-500 font-medium">Total Anggota</p>
            <p class="text-2xl font-bold text-slate-800">1,245</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center gap-4">
          <div class="p-3 bg-green-100 text-green-600 rounded-lg">
            <UIcon name="i-heroicons-banknotes" class="w-8 h-8" />
          </div>
          <div>
            <p class="text-sm text-slate-500 font-medium">Total Simpanan</p>
            <p class="text-2xl font-bold text-slate-800">Rp 450 Juta</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center gap-4">
          <div class="p-3 bg-orange-100 text-orange-600 rounded-lg">
            <UIcon name="i-heroicons-document-text" class="w-8 h-8" />
          </div>
          <div>
            <p class="text-sm text-slate-500 font-medium">Pinjaman Aktif</p>
            <p class="text-2xl font-bold text-slate-800">32</p>
          </div>
        </div>
      </UCard>

    </div>

    <UCard>
      <template #header>
        <h3 class="font-bold text-slate-800">Tren Pendaftaran Anggota (Bulan Ini)</h3>
      </template>
      
      <div class="h-64 flex items-center justify-center bg-slate-50 border border-dashed border-slate-300 rounded-md">
        <div class="text-center text-slate-400">
          <UIcon name="i-heroicons-chart-bar" class="w-12 h-12 mb-2 mx-auto" />
          <p>Area Visualisasi Data / Chart akan dipasang di sini</p>
        </div>
      </div>
    </UCard>

  </div>
</template>