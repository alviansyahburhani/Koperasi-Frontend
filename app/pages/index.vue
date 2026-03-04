<script setup lang="ts">
import { LANDING_HERO } from '~/utils/landing'

const koperasiQuery = ref('')

const handleSearchKoperasi = (query: string) => {
  // sementara: nanti bisa diarahkan ke halaman list koperasi atau hasil pencarian
  // contoh: navigateTo({ path: '/koperasi', query: { q: query } })
  console.log('[Landing] search koperasi:', query)
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <LandingHeroSection
      v-model="koperasiQuery"
      :content="LANDING_HERO"
      @search="handleSearchKoperasi"
    />
    <LandingStatsSection />
    <LandingHistorySection />
    <LandingFeaturesSection />
    <LandingCtaSection />
  </div>
</template>