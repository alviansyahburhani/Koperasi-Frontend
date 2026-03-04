<script setup lang="ts"></script>

<template>
  <div class="min-h-screen relative overflow-hidden bg-slate-50">
    <!-- background blobs -->
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-red-500/15 blur-3xl"
      />
      <div
        class="absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-rose-500/15 blur-3xl"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/60"
      />
    </div>

    <!-- content -->
    <main class="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
      <slot />
    </main>
  </div>
</template>