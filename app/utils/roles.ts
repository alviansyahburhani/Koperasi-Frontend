import { Role, Permission } from '~/types'

export const RoleConfig = {
  [Role.SUPERADMIN]: {
    label: 'Super Admin',
    color: 'purple',
    dashboardRoute: '/superadmin',
    layout: 'superadmin'
  },
  [Role.KETUA]: {
    label: 'Ketua Koperasi',
    color: 'red',
    dashboardRoute: '/dashboard',
    layout: 'dashboard'
  },
  [Role.SEKRETARIS]: {
    label: 'Sekretaris',
    color: 'blue',
    dashboardRoute: '/dashboard',
    layout: 'dashboard'
  },
  [Role.BENDAHARA]: {
    label: 'Bendahara',
    color: 'green',
    dashboardRoute: '/dashboard',
    layout: 'dashboard'
  },
  [Role.PENGAWAS]: {
    label: 'Pengawas',
    color: 'orange',
    dashboardRoute: '/dashboard',
    layout: 'dashboard'
  },
  [Role.ANGGOTA]: {
    label: 'Anggota',
    color: 'gray',
    dashboardRoute: '/dashboard',
    layout: 'dashboard'
  }
} as const

// ✅ Fix: Better type definition
type PermissionList = Permission[] | readonly ['*']

export const RolePermissions: Record<Role, PermissionList> = {
  [Role.SUPERADMIN]: ['*'] as const,
  
  [Role.KETUA]: [
    Permission.VIEW_ANGGOTA,
    Permission.CREATE_ANGGOTA,
    Permission.UPDATE_ANGGOTA,
    Permission.DELETE_ANGGOTA,
    Permission.VIEW_SIMPANAN,
    Permission.CREATE_SIMPANAN,
    Permission.VIEW_PINJAMAN,
    Permission.CREATE_PINJAMAN,
    Permission.APPROVE_PINJAMAN,
    Permission.VIEW_LAPORAN,
    Permission.EXPORT_LAPORAN,
    Permission.MANAGE_SETTINGS,
    Permission.MANAGE_USERS
  ],
  
  [Role.SEKRETARIS]: [
    Permission.VIEW_ANGGOTA,
    Permission.CREATE_ANGGOTA,
    Permission.UPDATE_ANGGOTA,
    Permission.VIEW_SIMPANAN,
    Permission.VIEW_PINJAMAN,
    Permission.VIEW_LAPORAN
  ],
  
  [Role.BENDAHARA]: [
    Permission.VIEW_ANGGOTA,
    Permission.VIEW_SIMPANAN,
    Permission.CREATE_SIMPANAN,
    Permission.UPDATE_SIMPANAN,
    Permission.VIEW_PINJAMAN,
    Permission.DISBURSE_PINJAMAN,
    Permission.VIEW_LAPORAN,
    Permission.EXPORT_LAPORAN
  ],
  
  [Role.PENGAWAS]: [
    Permission.VIEW_ANGGOTA,
    Permission.VIEW_SIMPANAN,
    Permission.VIEW_PINJAMAN,
    Permission.VIEW_LAPORAN,
    Permission.EXPORT_LAPORAN,
    Permission.VIEW_AUDIT
  ],
  
  [Role.ANGGOTA]: [
    Permission.VIEW_SIMPANAN,
    Permission.VIEW_PINJAMAN,
    Permission.CREATE_PINJAMAN
  ]
}

export function getRolePermissions(role: Role): PermissionList {
  return RolePermissions[role] || []
}

export function hasPermission(userRole: Role, permission: Permission): boolean {
  const permissions = getRolePermissions(userRole)
  
  // Check for wildcard permission
  if (permissions.length === 1 && permissions[0] === '*') {
    return true
  }
  
  return (permissions as Permission[]).includes(permission)
}