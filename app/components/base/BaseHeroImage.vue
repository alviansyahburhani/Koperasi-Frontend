<script setup lang="ts">
/**
 * HeroImage Component
 * Dashboard mockup image with browser chrome
 *
 * @example
 * <HeroImage
 *   src="https://example.com/image.jpg"
 *   alt="Dashboard Preview"
 * />
 */

interface Props {
  src: string
  alt: string
  showDots?: boolean
}

withDefaults(defineProps<Props>(), {
  showDots: true,
})
</script>

<template>
  <div class="relative w-full max-w-2xl mx-auto lg:max-w-none">
    <!-- Main image container -->
    <div
      class="relative rounded-2xl bg-white p-2 shadow-[0_20px_50px_rgba(220,38,38,0.15)] border border-slate-100 z-10 hover:shadow-2xl transition-shadow duration-500"
    >
      <!-- Browser chrome -->
      <div v-if="showDots" class="flex gap-1.5 px-4 pt-3 pb-2 border-b border-slate-50 mb-2">
        <div class="w-3 h-3 rounded-full bg-red-400" />
        <div class="w-3 h-3 rounded-full bg-amber-400" />
        <div class="w-3 h-3 rounded-full bg-green-400" />
      </div>

      <!-- Image -->
      <img
        :src="src"
        :alt="alt"
        class="rounded-xl w-full h-auto object-cover border border-slate-100"
        loading="lazy"
      >
    </div>

    <!-- Floating cards slot -->
    <slot />
  </div>
</template>
