<template>
  <div class="min-h-screen bg-slate-100 flex">
    <aside class="w-64 bg-slate-900 text-white flex flex-col">
      <div class="p-4 text-center font-bold text-lg border-b border-slate-700">
        Panel Pengurus
      </div>
      <nav class="flex-1 p-4 space-y-2">
        <NuxtLink to="/admin" class="block py-2 px-3 rounded hover:bg-slate-800 transition">Dashboard</NuxtLink>
        <NuxtLink to="/admin/anggota" class="block py-2 px-3 rounded hover:bg-slate-800 transition">Buku 01 - Anggota</NuxtLink>
        <NuxtLink to="/admin/simpanan" class="block py-2 px-3 rounded hover:bg-slate-800 transition">Buku 04 - Simpanan</NuxtLink>
        <NuxtLink to="/admin/pinjaman" class="block py-2 px-3 rounded hover:bg-slate-800 transition">Buku 05 - Pinjaman</NuxtLink>
      </nav>
      <div class="p-4 border-t border-slate-700">
        <button class="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition">
          Logout
        </button>
      </div>
    </aside>

    <div class="flex-1 flex flex-col h-screen overflow-hidden">
      <header class="bg-white shadow-sm h-16 flex items-center justify-end px-6">
        <div class="font-medium text-slate-700">Halo, Admin Koperasi</div>
      </header>
      
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>