import type { Permission } from '~/types'
import { hasPermission as checkPermission } from '~/utils/roles'

export const usePermission = () => {
  const { role } = useAuth()
  
  const can = (permission: Permission): boolean => {
    if (!role.value) return false
    return checkPermission(role.value, permission)
  }
  
  const canAny = (permissions: Permission[]): boolean => {
    return permissions.some(p => can(p))
  }
  
  const canAll = (permissions: Permission[]): boolean => {
    return permissions.every(p => can(p))
  }
  
  return {
    can,
    canAny,
    canAll
  }
}