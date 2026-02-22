import type { MenuItem } from '~/types'
import { Role, Permission } from '~/types' // ✅ Import Permission enum

export const SuperadminMenu: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'i-lucide-layout-dashboard',
    to: '/superadmin',
  },
  {
    label: 'Permohonan Pendaftaran',
    icon: 'i-lucide-inbox',
    to: '/superadmin/permohonan',
    badge: 5,
  },
  {
    label: 'Koperasi Aktif',
    icon: 'i-lucide-building-2',
    to: '/superadmin/koperasi',
  },
  {
    label: 'Monitoring',
    icon: 'i-lucide-activity',
    to: '/superadmin/monitoring/activity-log',
  },
  {
    label: 'Master Data',
    icon: 'i-lucide-database',
    children: [
      { label: 'Wilayah', to: '/superadmin/master-data/wilayah', icon: 'i-lucide-map' },
      {
        label: 'Email Template',
        to: '/superadmin/master-data/email-template',
        icon: 'i-lucide-mail',
      },
    ],
  },
]

export const AdminMenu: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'i-lucide-layout-dashboard',
    to: '/dashboard',
  },
  {
    label: 'Anggota',
    icon: 'i-lucide-users',
    to: '/dashboard/anggota',
    permission: Permission.VIEW_ANGGOTA, // ✅ Use enum
  },
  {
    label: 'Simpanan',
    icon: 'i-lucide-piggy-bank',
    to: '/dashboard/simpanan',
    permission: Permission.VIEW_SIMPANAN, // ✅ Use enum
  },
  {
    label: 'Pinjaman',
    icon: 'i-lucide-hand-coins',
    to: '/dashboard/pinjaman',
    permission: Permission.VIEW_PINJAMAN, // ✅ Use enum
  },
  {
    label: 'Laporan',
    icon: 'i-lucide-file-text',
    to: '/dashboard/laporan',
    permission: Permission.VIEW_LAPORAN, // ✅ Use enum
    children: [
      {
        label: 'Keuangan',
        to: '/dashboard/laporan/keuangan',
        icon: 'i-lucide-wallet',
        permission: Permission.VIEW_LAPORAN, // ✅ Use enum
      },
      {
        label: '16 Buku Wajib',
        to: '/dashboard/laporan/16-buku',
        icon: 'i-lucide-book-open',
        permission: Permission.VIEW_LAPORAN, // ✅ Use enum
      },
    ],
  },
  {
    label: 'Audit',
    icon: 'i-lucide-shield-check',
    to: '/dashboard/audit',
    permission: Permission.VIEW_AUDIT, // ✅ Use enum
  },
  {
    label: 'Pengaturan',
    icon: 'i-lucide-settings',
    permission: Permission.MANAGE_SETTINGS, // ✅ Use enum
    children: [
      {
        label: 'Profil Koperasi',
        to: '/dashboard/pengaturan/profil-koperasi',
        icon: 'i-lucide-building',
        permission: Permission.MANAGE_SETTINGS, // ✅ Use enum
      },
      {
        label: 'User Management',
        to: '/dashboard/pengaturan/user-management',
        icon: 'i-lucide-user-cog',
        permission: Permission.MANAGE_USERS, // ✅ Use enum
      },
    ],
  },
]

export function getMenuByRole(role: Role): MenuItem[] {
  if (role === Role.SUPERADMIN) {
    return SuperadminMenu
  }

  return AdminMenu
}
