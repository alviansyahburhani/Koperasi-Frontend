/**
 * Global Type Definitions
 * Centralized type definitions untuk seluruh aplikasi
 */

// ==================== User & Auth Types ====================

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  createdAt: string
  updatedAt: string
}

export type UserRole = 'admin' | 'pengurus' | 'anggota'

export interface AuthCredentials {
  email: string
  password: string
  remember?: boolean
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}

// ==================== Koperasi Types ====================

export interface Koperasi {
  id: string
  nama: string
  alamat: string
  noTelepon: string
  email: string
  website?: string
  logo?: string
  status: KoperasiStatus
  createdAt: string
  updatedAt: string
}

export type KoperasiStatus = 'aktif' | 'non-aktif' | 'pending'

// ==================== Anggota Types ====================

export interface Anggota {
  id: string
  koperasiId: string
  nik: string
  nama: string
  alamat: string
  noTelepon: string
  email?: string
  tanggalBergabung: string
  status: AnggotaStatus
  simpananPokok: number
  simpananWajib: number
  totalSimpanan: number
}

export type AnggotaStatus = 'aktif' | 'non-aktif' | 'keluar'

// ==================== Simpanan Types ====================

export interface Simpanan {
  id: string
  anggotaId: string
  jenis: JenisSimpanan
  nominal: number
  tanggal: string
  keterangan?: string
}

export type JenisSimpanan = 'pokok' | 'wajib' | 'sukarela'

// ==================== Pinjaman Types ====================

export interface Pinjaman {
  id: string
  anggotaId: string
  nominal: number
  bunga: number
  jangkaWaktu: number // dalam bulan
  angsuranPerBulan: number
  sisaPinjaman: number
  status: PinjamanStatus
  tanggalPinjam: string
  tanggalJatuhTempo: string
}

export type PinjamanStatus = 'diajukan' | 'disetujui' | 'ditolak' | 'lunas' | 'menunggak'

// ==================== SHU Types ====================

export interface SHU {
  id: string
  koperasiId: string
  tahun: number
  totalPendapatan: number
  totalBeban: number
  labaBersih: number
  pembagianAnggota: number
  pembagianCadangan: number
  tanggalPembagian: string
}

// ==================== API Response Types ====================

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    perPage: number
    currentPage: number
    lastPage: number
  }
}

// ==================== Form Types ====================

export interface FormError {
  field: string
  message: string
}

export interface ValidationError {
  errors: Record<string, string[]>
}

// ==================== UI Component Types ====================

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'

export interface BadgeProps {
  variant?: ColorVariant
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  pulse?: boolean
}

// ==================== Utility Types ====================

export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type Maybe<T> = T | null | undefined