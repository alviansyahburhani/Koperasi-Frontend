<template>
  <section class="pt-8 pb-32 bg-white relative overflow-hidden">
    <div
      class="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[50rem] h-[40rem] bg-red-50/60 rounded-full blur-[100px] pointer-events-none"
    ></div>

    <div class="container mx-auto px-4 relative z-10 text-center">
      <div class="max-w-3xl mx-auto flex flex-col items-center">
        <span
          class="inline-block py-1.5 px-4 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold mb-8 tracking-wide shadow-sm hover:shadow-md transition-shadow cursor-default"
        >
          Tersedia untuk Seluruh Indonesia
        </span>

        <h2
          class="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1]"
        >
          Satu Platform. <br />
          <span class="text-red-600">Ribuan Kemudahan.</span>
        </h2>

        <p class="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed max-w-2xl">
          Tinggalkan cara lama. Beralih ke ekosistem digital yang transparan, aman, dan dirancang
          khusus untuk memajukan Koperasi di era modern.
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
          <NuxtLink
            to="pendaftaran/koperasi"
            class="inline-flex justify-center items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30 active:scale-95"
          >
            Daftarkan Koperasi Anda
          </NuxtLink>

          <NuxtLink
            to="/login"
            class="inline-flex justify-center items-center gap-2 px-8 py-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded-full border border-slate-200 transition-all duration-300 shadow-sm active:scale-95"
          >
            Masuk Pengurus
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
