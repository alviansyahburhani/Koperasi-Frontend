/**
 * Application Constants
 * Semua konstanta aplikasi dipusatkan di sini
 */

// ==================== App Info ====================

export const APP_NAME = 'Koperasi Merah Putih'
export const APP_VERSION = '1.0.0'
export const APP_DESCRIPTION = 'Platform Digital 16 Buku Wajib Koperasi'

// ==================== API Endpoints ====================

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  KOPERASI: {
    LIST: '/koperasi',
    DETAIL: (id: string) => `/koperasi/${id}`,
    CREATE: '/koperasi',
    UPDATE: (id: string) => `/koperasi/${id}`,
    DELETE: (id: string) => `/koperasi/${id}`,
  },
  ANGGOTA: {
    LIST: '/anggota',
    DETAIL: (id: string) => `/anggota/${id}`,
    CREATE: '/anggota',
    UPDATE: (id: string) => `/anggota/${id}`,
    DELETE: (id: string) => `/anggota/${id}`,
  },
  SIMPANAN: {
    LIST: '/simpanan',
    CREATE: '/simpanan',
    HISTORY: (anggotaId: string) => `/simpanan/anggota/${anggotaId}`,
  },
  PINJAMAN: {
    LIST: '/pinjaman',
    CREATE: '/pinjaman',
    APPROVE: (id: string) => `/pinjaman/${id}/approve`,
    REJECT: (id: string) => `/pinjaman/${id}/reject`,
  },
} as const

// ==================== Storage Keys ====================

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'koperasi_auth_token',
  REFRESH_TOKEN: 'koperasi_refresh_token',
  USER_DATA: 'koperasi_user_data',
  THEME: 'koperasi_theme',
} as const

// ==================== User Roles ====================

export const USER_ROLES = {
  ADMIN: 'admin',
  PENGURUS: 'pengurus',
  ANGGOTA: 'anggota',
} as const

export const ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Administrator',
  [USER_ROLES.PENGURUS]: 'Pengurus Koperasi',
  [USER_ROLES.ANGGOTA]: 'Anggota',
} as const

// ==================== Status Options ====================

export const KOPERASI_STATUS = {
  AKTIF: 'aktif',
  NON_AKTIF: 'non-aktif',
  PENDING: 'pending',
} as const

export const ANGGOTA_STATUS = {
  AKTIF: 'aktif',
  NON_AKTIF: 'non-aktif',
  KELUAR: 'keluar',
} as const

export const PINJAMAN_STATUS = {
  DIAJUKAN: 'diajukan',
  DISETUJUI: 'disetujui',
  DITOLAK: 'ditolak',
  LUNAS: 'lunas',
  MENUNGGAK: 'menunggak',
} as const

// ==================== Validation Rules ====================

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  NIK_LENGTH: 16,
  PHONE_MIN_LENGTH: 10,
  PHONE_MAX_LENGTH: 15,
} as const

// ==================== Pagination ====================

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 10,
  PER_PAGE_OPTIONS: [10, 25, 50, 100],
} as const

// ==================== Date Formats ====================

export const DATE_FORMATS = {
  DISPLAY: 'DD MMMM YYYY',
  DISPLAY_WITH_TIME: 'DD MMMM YYYY HH:mm',
  API: 'YYYY-MM-DD',
  API_WITH_TIME: 'YYYY-MM-DD HH:mm:ss',
} as const

// ==================== Currency ====================

export const CURRENCY = {
  CODE: 'IDR',
  SYMBOL: 'Rp',
  LOCALE: 'id-ID',
} as const

// ==================== Routes ====================

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN: {
    DASHBOARD: '/admin',
    ANGGOTA: '/admin/anggota',
    SIMPANAN: '/admin/simpanan',
    PINJAMAN: '/admin/pinjaman',
    SHU: '/admin/shu',
  },
} as const
