# Folder Structure

This document describes the folder structure of the Koperasi Frontend project.

## Overview

```
Koperasi-Frontend/
├── .github/                            # ⚙️ Infrastruktur CI/CD & PR Template
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── lint.yml
│   │   └── test.yml
│   └── PULL_REQUEST_TEMPLATE.md
│
├── .vscode/                            # 🛠️ Konfigurasi Workspace & Snippets
│   ├── settings.json
│   ├── extensions.json
│   └── snippets.json
│
├── app/                                # 📦 CORE APLIKASI (Nuxt 4 srcDir)
│   ├── app.vue                         # Root component Nuxt
│   ├── error.vue                       # Halaman custom error (404, 500)
│   │
│   ├── assets/                         # 🎨 File statis yang butuh di-compile (Tailwind)
│   │   ├── css/main.css
│   │   └── images/
│   │       ├── logo/
│   │       └── icons/
│   │
│   ├── components/                     # 🧩 KOMPONEN (Potongan UI)
│   │   ├── admin/                      # -> Komponen khusus Admin
│   │   │   ├── dashboard/
│   │   │   │   ├── BarChart.vue
│   │   │   │   ├── LineChart.vue
│   │   │   │   └── StatsCard.vue
│   │   │   └── DocumentViewer.vue
│   │   ├── auth/                       # -> Komponen form Autentikasi
│   │   │   ├── ForgotPasswordForm.vue
│   │   │   ├── LoginForm.vue
│   │   │   ├── RegisterForm.vue
│   │   │   └── ResetPasswordForm.vue
│   │   ├── base/                       # -> Komponen Dasar/Atomic (Global)
│   │   │   ├── BaseAlert.vue
│   │   │   ├── BaseButton.vue
│   │   │   ├── BaseCard.vue
│   │   │   ├── BaseCheckbox.vue
│   │   │   ├── BaseConfirmDialog.vue
│   │   │   ├── BaseEmptyState.vue
│   │   │   ├── BaseFloatingCard.vue
│   │   │   ├── BaseInput.vue
│   │   │   ├── BaseLoadingSpinner.vue
│   │   │   ├── BaseModal.vue
│   │   │   ├── BasePasswordInput.vue
│   │   │   ├── BaseSearchBar.vue
│   │   │   ├── BaseSelect.vue
│   │   │   └── BaseTable.vue
│   │   ├── landing/                    # -> Potongan untuk Halaman Depan
│   │   │   ├── AboutSection.vue
│   │   │   ├── CtaSection.vue
│   │   │   ├── FeaturesSection.vue
│   │   │   ├── HeroImage.vue
│   │   │   ├── HeroSection.vue
│   │   │   ├── HistorySection.vue
│   │   │   └── StatsSection.vue
│   │   ├── layout/                     # -> Kerangka Halaman
│   │   │   ├── AppFooter.vue
│   │   │   ├── AppHeader.vue
│   │   │   ├── AppPageHeader.vue
│   │   │   ├── AppRoleGate.vue
│   │   │   └── AppTemplateMenu.vue
│   │   ├── superadmin/                 # -> Komponen khusus Superadmin
│   │   │   ├── ApplicationTable.vue
│   │   │   ├── CooperativeTable.vue
│   │   │   └── DecisionModal.vue
│   │   └── tenant/                     # -> Komponen khusus Koperasi/Tenant
│   │       ├── TenantBerita.vue
│   │       ├── TenantGaleri.vue
│   │       └── TenantProduk.vue
│   │
│   ├── composables/                    # 🧠 LOGIKA (Fungsi Reaktif Vue/Nuxt)
│   │   ├── admin/
│   │   │   ├── anggota/useAnggota.ts
│   │   │   ├── pinjaman/usePinjaman.ts
│   │   │   └── simpanan/useSimpanan.ts
│   │   ├── anggota/
│   │   │   ├── useMyPinjaman.ts
│   │   │   ├── useMyProfile.ts
│   │   │   └── useMySimpanan.ts
│   │   ├── core/                       # -> Logika Inti Aplikasi
│   │   │   ├── useApi.ts
│   │   │   ├── useAuth.ts
│   │   │   ├── useAuthApi.ts
│   │   │   ├── useAuthForm.ts
│   │   │   ├── useErrorHandler.ts
│   │   │   ├── useModal.ts
│   │   │   ├── usePermission.ts
│   │   │   └── useToast.ts
│   │   ├── public/
│   │   │   ├── useAnggotaRegistration.ts
│   │   │   ├── useKoperasiRegistration.ts
│   │   │   └── useNavigation.ts
│   │   ├── shared/                     # -> Logika yang dipakai bersama
│   │   │   ├── useDataTable.ts
│   │   │   ├── useFileUpload.ts
│   │   │   ├── useMenu.ts
│   │   │   ├── usePagination.ts
│   │   │   └── useWilayah.ts
│   │   └── superadmin/
│   │       ├── useApplications.ts
│   │       ├── useCooperatives.ts
│   │       ├── useMasterData.ts
│   │       └── useTenantMonitoring.ts
│   │
│   ├── layouts/                        # 📐 LAYOUT (Template Rute)
│   │   ├── admin.vue
│   │   ├── auth.vue
│   │   ├── dashboard.vue
│   │   ├── default.vue
│   │   └── superadmin.vue
│   │
│   ├── middleware/                     # 🛡️ PENJAGA RUTE (Akses/Auth)
│   │   ├── auth.ts
│   │   ├── guest.ts
│   │   ├── permission.ts
│   │   ├── role.ts
│   │   └── tenant.ts
│   │
│   ├── pages/                          # 🗺️ RUTE APLIKASI (URL Browser)
│   │   ├── index.vue                   # /
│   │   ├── fitur.vue                   # /fitur
│   │   ├── tentang.vue                 # /tentang
│   │   ├── admin/
│   │   │   ├── index.vue               # /admin
│   │   │   ├── anggota/
│   │   │   │   ├── index.vue           # /admin/anggota
│   │   │   │   ├── tambah.vue          # /admin/anggota/tambah
│   │   │   │   └── [id].vue            # /admin/anggota/:id
│   │   │   ├── pinjaman/index.vue      # /admin/pinjaman
│   │   │   └── simpanan/index.vue      # /admin/simpanan
│   │   ├── anggota/
│   │   │   ├── index.vue               # /anggota
│   │   │   ├── profil.vue              # /anggota/profil
│   │   │   └── transaksi.vue           # /anggota/transaksi
│   │   ├── auth/
│   │   │   ├── login.vue               # /auth/login
│   │   │   ├── lupa-password.vue       # /auth/lupa-password
│   │   │   ├── reset-password.vue      # /auth/reset-password
│   │   │   └── register/
│   │   │       ├── anggota.vue         # /auth/register/anggota
│   │   │       └── koperasi.vue        # /auth/register/koperasi
│   │   └── superadmin/
│   │       ├── index.vue               # /superadmin
│   │       ├── koperasi/index.vue      # /superadmin/koperasi
│   │       ├── monitoring/index.vue    # /superadmin/monitoring
│   │       └── permohonan/index.vue    # /superadmin/permohonan
│   │
│   ├── plugins/                        # 🔌 PLUGINS (Berjalan sebelum Vue mount)
│   │   ├── api.ts
│   │   ├── auth-init.client.ts
│   │   └── error-handler.client.ts
│   │
│   ├── server/                         # 🖥️ NITRO SERVER (API Internal/SSR)
│   │   ├── api/auth/
│   │   │   ├── forgot-password.post.ts
│   │   │   ├── reset-password.post.ts
│   │   │   └── validate-reset-token.post.ts
│   │   └── utils/
│   │       └── reset-password-email.html
│   │
│   ├── services/                       # 📡 SERVICES (Pemanggil API Murni/Axios)
│   │   ├── api.service.ts
│   │   ├── auth.service.ts
│   │   └── tenant-registration.service.ts
│   │
│   ├── stores/                         # 🗄️ STATE MANAGEMENT (Pinia)
│   │   ├── auth.ts
│   │   ├── tenant.ts
│   │   └── ui.ts
│   │
│   ├── types/                          # 🏷️ TYPESCRIPT (Definisi Tipe)
│   │   ├── index.ts                    # -> Export semua types dari sini
│   │   ├── anggota.types.ts
│   │   ├── api.types.ts
│   │   ├── application.types.ts
│   │   ├── auth.types.ts
│   │   ├── cooperative.types.ts
│   │   ├── error.types.ts
│   │   ├── pinjaman.types.ts
│   │   ├── simpanan.types.ts
│   │   └── user.types.ts
│   │
│   └── utils/                          # 🛠️ UTILS (Fungsi Bantu Murni JS/TS)
│       ├── constants.ts
│       ├── formatters.ts
│       ├── menus.ts
│       ├── roles.ts
│       └── validators.ts
│
├── public/                             # 🌍 FILE STATIK PUBLIK (Akses langsung URL)
│   ├── favicon.ico
│   ├── robots.txt
│   └── images/
│
├── tests/                              # 🧪 PENGUJIAN KODE
│   ├── unit/
│   └── e2e/
│
├── .editorconfig
├── .env.example
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── nuxt.config.ts                      # Konfigurasi utama Nuxt (pastikan srcDir: 'app/')
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── FRONTEND_GUIDELINES.md
└── README.md
```

## Composables Convention

- All composables in subdirectories under `app/composables/` are **auto-imported** via the `imports.dirs` setting in `nuxt.config.ts`.
- Composables should be named with the `use` prefix, e.g. `useAuth`, `usePagination`.
- **core/** – low-level primitives shared by all roles.
- **shared/** – feature composables that multiple roles share (pagination, file upload, region data).
- **public/** – composables for unauthenticated pages.
- **superadmin/**, **admin/**, **anggota/** – role-scoped feature composables.

## Components Convention

- **base/** components are fully generic and have no business logic.
- Role-specific components live in their respective subdirectory and may import base components.
- Components are auto-imported by Nuxt from the `app/components/` tree.
