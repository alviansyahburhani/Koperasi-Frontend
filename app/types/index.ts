// =============================================
// TYPES & INTERFACES
// =============================================

export enum Role {
  SUPERADMIN = 'SUPERADMIN',
  KETUA = 'KETUA',
  SEKRETARIS = 'SEKRETARIS',
  BENDAHARA = 'BENDAHARA',
  PENGAWAS = 'PENGAWAS',
  ANGGOTA = 'ANGGOTA',
}

export enum Permission {
  // Anggota Management
  VIEW_ANGGOTA = 'view:anggota',
  CREATE_ANGGOTA = 'create:anggota',
  UPDATE_ANGGOTA = 'update:anggota',
  DELETE_ANGGOTA = 'delete:anggota',

  // Simpanan Management
  VIEW_SIMPANAN = 'view:simpanan',
  CREATE_SIMPANAN = 'create:simpanan',
  UPDATE_SIMPANAN = 'update:simpanan',

  // Pinjaman Management
  VIEW_PINJAMAN = 'view:pinjaman',
  CREATE_PINJAMAN = 'create:pinjaman',
  APPROVE_PINJAMAN = 'approve:pinjaman',
  DISBURSE_PINJAMAN = 'disburse:pinjaman',

  // Laporan
  VIEW_LAPORAN = 'view:laporan',
  EXPORT_LAPORAN = 'export:laporan',

  // Settings
  MANAGE_SETTINGS = 'manage:settings',
  MANAGE_USERS = 'manage:users',

  // Audit
  VIEW_AUDIT = 'view:audit',

  // Superadmin
  MANAGE_KOPERASI = 'manage:koperasi',
  VERIFY_REGISTRATION = 'verify:registration',
}

export interface User {
  id: string // ✅ Changed from number to string
  name: string
  email: string
  role: Role
  cooperativeId?: string // ✅ Changed from number to string
  avatar?: string
  phone?: string
}

export interface Cooperative {
  id: string // ✅ Changed from number to string
  name: string
  subdomain: string
  status: 'ACTIVE' | 'SUSPENDED' | 'INACTIVE'
}

export interface MenuItem {
  label: string
  icon: string
  to?: string
  permission?: Permission | Permission[]
  badge?: number
  children?: MenuItem[]
}
