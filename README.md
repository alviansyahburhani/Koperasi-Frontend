# Koperasi Frontend

Frontend aplikasi manajemen koperasi berbasis **Nuxt 4** dengan dukungan multi-tenant, role-based access control, dan integrasi backend NestJS.

## Teknologi

- **Nuxt 4** – Framework Vue 3 SSR/SSG
- **Nuxt UI** – Komponen UI berbasis Tailwind CSS
- **Pinia** – State management
- **Axios** – HTTP client
- **TypeScript** – Strict mode

---

## Setup Lingkungan

### 1. Salin file konfigurasi lingkungan

```bash
cp .env.example .env
```

### 2. Sesuaikan nilai variabel lingkungan

| Variabel | Default | Keterangan |
|---|---|---|
| `NUXT_PUBLIC_API_BASE` | `http://localhost:3002` | URL base backend API |
| `NUXT_PUBLIC_API_TIMEOUT` | `30000` | Timeout request (ms) |
| `NUXT_PUBLIC_APP_URL` | `http://localhost:3000` | URL aplikasi frontend |
| `NUXT_PUBLIC_MAIN_DOMAIN` | `localhost` | Domain utama (untuk multi-tenant) |
| `NUXT_PUBLIC_USE_HTTPS` | `false` | Aktifkan HTTPS |
| `NUXT_PUBLIC_DEBUG_MODE` | `false` | Mode debug |

---

## Instalasi & Menjalankan Aplikasi

### Prasyarat

- Node.js 20+
- pnpm 10+

### Instalasi dependensi

```bash
pnpm install
```

### Mode pengembangan

```bash
pnpm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build untuk produksi

```bash
pnpm run build
```

### Preview hasil build

```bash
pnpm run preview
```

### Lint & Format

```bash
# Cek lint
pnpm run lint

# Auto-fix lint
pnpm run lint:fix

# Format kode
pnpm run format
```

---

## Struktur Folder

Lihat [`docs/FOLDER_STRUCTURE.md`](./docs/FOLDER_STRUCTURE.md) untuk penjelasan lengkap.

```
app/
├── assets/
│   └── css/main.css
├── components/
│   ├── base/          # Komponen dasar (BaseButton, BaseInput, dll.)
│   ├── layout/        # AppHeader, AppFooter, dll.
│   ├── landing/       # Komponen halaman landing
│   ├── tenant/        # Komponen halaman tenant
│   ├── admin/         # Komponen admin dashboard
│   └── superadmin/    # Komponen superadmin
├── composables/
│   ├── core/          # useApi, useAuth, useErrorHandler, usePermission
│   ├── shared/        # useMenu, usePagination, useDataTable, dll.
│   ├── public/        # useNavigation, useKoperasiRegistration, dll.
│   ├── superadmin/    # useApplications, useCooperatives, dll.
│   ├── admin/         # useAnggota, useSimpanan, usePinjaman
│   └── anggota/       # useMyProfile, useMySimpanan, useMyPinjaman
├── layouts/           # default, auth, dashboard, admin, superadmin
├── middleware/        # auth, guest, role, permission
├── pages/             # Halaman-halaman aplikasi
├── plugins/           # api.ts (Axios), auth-init, error-handler
├── services/          # Layanan API (auth.service, api.service, dll.)
├── stores/            # auth, tenant, ui
├── types/             # TypeScript type definitions
└── utils/             # constants, formatters, validators, menus, roles
```

---

## Integrasi Backend

Lihat [`docs/API_INTEGRATION.md`](./docs/API_INTEGRATION.md) untuk dokumentasi endpoint API.

Backend: [alviansyahburhani/Koperasi-Backend](https://github.com/alviansyahburhani/Koperasi-Backend) (NestJS)

---

## Kontribusi

Baca [`FRONTEND GUIDLINES.md`](./FRONTEND%20GUIDLINES.md) sebelum berkontribusi.
