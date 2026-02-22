<script setup lang="ts">
import AppFooter from '~/components/layout/AppFooter.vue'
import AppHeader from '~/components/layout/AppHeader.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <AppHeader />

    <main class="flex-grow">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
