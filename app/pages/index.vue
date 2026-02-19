<template>
  <div class="py-16">
    <div class="text-center max-w-3xl mx-auto">
      <h1 class="text-4xl font-extrabold text-slate-900 mb-6">
        Selamat Datang di <span class="text-red-600">Koperasi Merah Putih</span>
      </h1>
      <p class="text-lg text-slate-600 mb-10 leading-relaxed">
        Wujudkan kesejahteraan bersama melalui layanan simpan pinjam yang transparan, aman, dan sepenuhnya digital. Bergabunglah bersama kami sekarang juga!
      </p>
      
      <div class="flex justify-center gap-4">
        <UButton to="/pendaftaran" color="primary" size="lg" icon="i-heroicons-user-plus">
          Daftar Anggota
        </UButton>
        <UButton to="/login" color="gray" variant="solid" size="lg" icon="i-heroicons-arrow-right-on-rectangle">
          Masuk Portal
        </UButton>
      </div>
    </div>
  </div>
</template>