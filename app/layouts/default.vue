<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <header class="bg-white border-b shadow-sm sticky top-0 z-50">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 class="font-bold text-red-600 text-xl">Koperasi Merah Putih</h1>
        <nav class="space-x-4">
          <NuxtLink to="/" class="text-slate-600 hover:text-red-600 font-medium">Beranda</NuxtLink>
          <NuxtLink to="/login" class="text-slate-600 hover:text-red-600 font-medium">Login</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>

    <footer class="bg-slate-900 text-white text-center py-4 text-sm mt-auto">
      &copy; {{ new Date().getFullYear() }} Koperasi Merah Putih. All rights reserved.
    </footer>
  </div>
</template>