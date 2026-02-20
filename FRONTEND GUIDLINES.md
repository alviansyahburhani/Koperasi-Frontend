📖 Panduan Pengembangan Frontend Koperasi (Nuxt 3)
Dokumen ini berisi batasan, aturan penulisan kode, dan standar profesional yang wajib dipatuhi selama pengembangan proyek manajemen koperasi ini. Segala bentuk pelanggaran terhadap aturan ini akan ditolak (reject) saat proses penulisan kode.

🎯 1. Batasan Proyek (Scope Management)
Untuk memastikan rilis tepat waktu dan aplikasi tetap ringan, kita membatasi ruang lingkup hanya pada fitur inti:

Fokus Utama: Registrasi Tenant (Koperasi), Autentikasi, Manajemen Profil/Galeri, dan Dashboard dasar.

TIDAK Dikerjakan (Out of Scope): Fitur chatting real-time antar anggota, marketplace kompleks, atau integrasi Payment Gateway otomatis (pembayaran tetap menggunakan validasi manual/transfer bank pada fase ini).

Catatan: Jika ada ide fitur baru yang brilian namun di luar fokus utama, masukkan ke daftar "Backlog/Fase 2". Jangan langsung ditulis di kode!

💻 2. Paradigma Vue 3 & Nuxt 3 (Wajib)
Proyek ini menggunakan ekosistem Vue murni. Segala bentuk mindset atau sisa kode dari framework lain (seperti React) dilarang keras:

Wajib <script setup lang="ts">: Semua komponen menggunakan Composition API. Dilarang menggunakan Options API (export default { data() }).

Reaktivitas: Gunakan ref() untuk tipe data primitif (string, boolean, angka) dan reactive() untuk objek yang dikelompokkan (seperti form data).

Hapus Sintaks React: Jangan pernah gunakan className (gunakan class), htmlFor (gunakan for), useState, useEffect, onChange, atau onSubmit. Gunakan directives bawaan Vue seperti v-model, @click, @submit.prevent, dan v-if.

🛡️ 3. Keamanan Tipe (Strict TypeScript)
Tidak boleh ada kode yang memicu warning atau error TypeScript (garis bawah merah di editor).

Anti any: Semua variabel, properti komponen (props), dan respons API harus memiliki tipe data (Type/Interface) yang jelas.

Penanganan Data Kosong (undefined / null): Data yang diambil dari API atau state yang awalnya kosong (seperti gambar yang di-klik di galeri) harus ditangani dengan aman.

Gunakan v-if di template untuk memastikan elemen hanya dirender jika data sudah ada.

Gunakan Optional Chaining (?.) untuk mencegah aplikasi crash (contoh: user?.profile?.avatar).

🎨 4. Aturan Styling & UI (Tailwind CSS)
Hindari Inline Style Dinamis untuk Class: Jangan pernah memasukkan objek style (seperti background) ke dalam atribut :class.

✅ Benar: :style="{ backgroundImage: \url(${image})` }"`

❌ Salah: :class="{ background: \url(${image})` }"`

Ekstraksi Komponen: Jika sebuah elemen UI (seperti Tombol, Input Form, atau Card) digunakan lebih dari 2 kali, wajib dipisah menjadi komponen tersendiri di dalam folder components/ agar DRY (Don't Repeat Yourself).

📂 5. Pengelolaan State & API
Hindari State Global yang Berlebihan: Jika data hanya digunakan di satu halaman, gunakan state lokal di dalam komponen tersebut. Gunakan state global (seperti Pinia atau useState Nuxt) hanya untuk data yang diakses lintas halaman (seperti data User Login).

API Calls: Selalu gunakan composable bawaan Nuxt seperti useFetch atau useAsyncData untuk pemanggilan API agar mendukung SSR (Server-Side Rendering) dengan optimal.

Dengan dokumen di atas tersimpan di repository, kita memiliki pijakan yang sangat kuat untuk setiap baris kode yang akan kita tulis ke depannya.

Sekarang, sesuai janji kita, silakan kirimkan kode tenantGallery Anda, dan mari kita bersihkan error TypeScript-nya menggunakan aturan #3 dan #4 di atas!
