import { RoleConfig } from '~/utils/roles'

export default defineNuxtRouteMiddleware(() => {
  const user = useState<any>('auth-user')
  
  if (user.value && user.value.role) {
    const config = RoleConfig[user.value.role as keyof typeof RoleConfig]
    return navigateTo(config?.dashboardRoute || '/')
  }
})