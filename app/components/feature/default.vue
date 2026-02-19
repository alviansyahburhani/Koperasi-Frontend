<script setup lang="ts">
/**
 * Default Layout
 * Main layout untuk halaman public
 */
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white">
    <Header />

    <main class="flex-grow">
      <slot />
    </main>

    <Footer />
  </div>
</template>