import { Permission } from '~/types'
import { hasPermission } from '~/utils/roles'

export default defineNuxtRouteMiddleware((to) => {
  const user = useState<any>('auth-user')
  const role = user.value?.role
  
  if (!role) {
    return navigateTo('/auth/login')
  }
  
  // Define route permission requirements
  const routePermissions: Record<string, Permission> = {
    '/dashboard/anggota/tambah': 'create:anggota' as Permission,
    '/dashboard/simpanan/transaksi': 'create:simpanan' as Permission,
    '/dashboard/pinjaman/approve': 'approve:pinjaman' as Permission,
    '/dashboard/pengaturan/user-management': 'manage:users' as Permission,
    '/dashboard/audit': 'view:audit' as Permission
  }
  
  const requiredPermission = routePermissions[to.path]
  
  if (requiredPermission && !hasPermission(role, requiredPermission)) {
    return navigateTo('/dashboard')
  }
})