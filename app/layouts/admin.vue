<script setup lang="ts">
/**
 * Admin Layout
 * Dashboard layout - Reuse same footer
 */
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <!-- Different header untuk admin -->
    <header class="bg-white border-b shadow-sm">
      <div class="container mx-auto px-4 py-3">
        <h1 class="font-bold text-red-600">Admin Dashboard</h1>
      </div>
    </header>

    <main class="flex-grow">
      <slot />
    </main>

    <!-- Reuse same footer! -->
    <AppFooter />
  </div>
</template>
