<script setup lang="ts">
/**
 * HeroSection Component
 * Landing page hero section with search
 */

interface Props {
  title: string
  subtitle: string
  highlightText: string
  description: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  imageSrc: string
  imageAlt: string
}

const props = withDefaults(defineProps<Props>(), {
  ctaText: 'Mulai Sekarang',
  ctaLink: '/daftar',
  secondaryCtaText: 'Pelajari Lebih Lanjut',
  secondaryCtaLink: '/tentang'
})

const searchQuery = ref('')

function handleSearch() {
  console.log('Searching for:', searchQuery.value)
  // TODO: Implement search logic
}
</script>

<template>
  <section class="relative pt-20 pb-24 lg:pt-32 lg:pb-32 overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] bg-red-50 rounded-full blur-3xl opacity-70" />
      <div class="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[500px] h-[500px] bg-pink-50 rounded-full blur-3xl opacity-70" />
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
        
        <!-- Left Content -->
        <div class="flex-1 text-center lg:text-left animate-slide-in-left">
          <!-- Badge -->
          <Badge 
            variant="primary" 
            icon="i-heroicons-rocket-launch" 
            :pulse="true"
            class="mb-6"
          >
            {{ subtitle }}
          </Badge>

          <!-- Title -->
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.15]">
            {{ title }} <br class="hidden sm:block" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
              {{ highlightText }}
            </span>
          </h1>

          <!-- Description -->
          <p class="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            {{ description }}
          </p>

          <!-- Search Bar -->
          <SearchBar 
            v-model="searchQuery"
            placeholder="Cari nama koperasi Anda..."
            button-text="Cari"
            class="mb-10"
            @search="handleSearch"
          />

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
            <UButton 
              :to="ctaLink"
              color="red" 
              size="lg" 
              class="px-8 py-3 text-base font-bold shadow-lg shadow-red-500/30 hover:-translate-y-1 transition-transform w-full sm:w-auto justify-center"
            >
              {{ ctaText }}
            </UButton>
            
            <UButton 
              :to="secondaryCtaLink"
              color="gray" 
              variant="ghost" 
              size="lg" 
              class="px-8 py-3 text-base font-medium hover:bg-slate-100 w-full sm:w-auto justify-center"
            >
              {{ secondaryCtaText }}
              <UIcon name="i-heroicons-arrow-right" class="ml-2" />
            </UButton>
          </div>
        </div>

        <!-- Right Content - Image -->
        <div class="flex-1 animate-slide-in-right">
          <HeroImage :src="imageSrc" :alt="imageAlt">
            <!-- Floating Cards -->
            <FloatingCard
              position="bottom-left"
              icon="i-heroicons-shield-check"
              icon-color="green"
              label="Buku 1-16"
              value="100% Sinkron"
            />
            
            <FloatingCard
              position="top-right"
              icon="i-heroicons-chart-bar"
              icon-color="red"
              label="SHU Bulan Ini"
              value="+Rp 45Jt"
              :delay="true"
              class="hidden sm:block"
            />
          </HeroImage>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* Animasi Masuk dari Kiri */
@keyframes slideInLeft {
  0% { opacity: 0; transform: translateX(-50px); }
  100% { opacity: 1; transform: translateX(0); }
}
.animate-slide-in-left {
  animation: slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Animasi Masuk dari Kanan */
@keyframes slideInRight {
  0% { opacity: 0; transform: translateX(50px); }
  100% { opacity: 1; transform: translateX(0); }
}
.animate-slide-in-right {
  animation: slideInRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>