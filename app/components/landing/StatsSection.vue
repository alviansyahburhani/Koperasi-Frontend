<script setup lang="ts">
import { LANDING_STATS } from '~/utils/landing'
</script>

<template>
  <section class="py-12 bg-red-700 text-white border-y border-red-800">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-red-600/50 text-center">
        <div
          v-for="(item, idx) in LANDING_STATS"
          :key="item.label"
          class="animate-fade-in-up"
          :class="`delay-${(idx + 1) * 100}`"
        >
          <h4 class="text-4xl md:text-5xl font-extrabold mb-2 text-white drop-shadow-md">
            {{ item.value }}
          </h4>
          <p class="text-red-200 font-medium text-sm md:text-base">
            {{ item.label }}
          </p>
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
.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }
</style>