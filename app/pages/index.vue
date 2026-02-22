<script setup lang="ts">
// UBAH KE 'false' UNTUK MELIHAT VERSI SUPER ADMIN
// UBAH KE 'true' UNTUK MELIHAT VERSI TENANT (KOPERASI KLIEN)
const isTenant = true
</script>

<template>
  <div class="bg-white min-h-screen">
    <LandingHeroSection />
    <LandingStatsSection />
    <LandingHistorySection />
    <LandingFeaturesSection />

    <div v-if="isTenant">
      <div
        class="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-8"
      />

      <TenantBerita />
      <TenantProduk />
      <TenantGaleri />
    </div>

    <LandingCtaSection />
  </div>
</template>
