import { Role } from '~/types'
import { RoleConfig } from '~/utils/roles'

export default defineNuxtRouteMiddleware((to) => {
  const user = useState<any>('auth-user')
  const role = user.value?.role as Role | null
  
  if (!role) {
    return navigateTo('/auth/login')
  }
  
  // Define route role requirements
  const routeRoles: Record<string, Role[]> = {
    '/superadmin': [Role.SUPERADMIN],
    '/dashboard': [Role.KETUA, Role.SEKRETARIS, Role.BENDAHARA, Role.PENGAWAS, Role.ANGGOTA]
  }
  
  // Check if route starts with any protected path
  for (const [path, allowedRoles] of Object.entries(routeRoles)) {
    if (to.path.startsWith(path)) {
      if (!allowedRoles.includes(role)) {
        const config = RoleConfig[role]
        return navigateTo(config?.dashboardRoute || '/')
      }
    }
  }
})