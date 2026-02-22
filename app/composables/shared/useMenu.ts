import type { MenuItem, Permission } from '~/types'
import { getMenuByRole } from '~/utils/menus'

export const useMenu = () => {
  const { role } = useAuth()
  const { can } = usePermission()

  const filterMenuByPermission = (items: MenuItem[]): MenuItem[] => {
    return items
      .filter((item) => {
        if (!item.permission) return true

        if (typeof item.permission === 'string') {
          return can(item.permission as Permission)
        }

        if (Array.isArray(item.permission)) {
          return item.permission.some((p) => can(p as Permission))
        }

        return false
      })
      .map((item) => {
        if (item.children && item.children.length > 0) {
          const filteredChildren = filterMenuByPermission(item.children)
          if (filteredChildren.length > 0 || item.to) {
            return {
              ...item,
              children: filteredChildren,
            }
          }
          return null
        }
        return item
      })
      .filter((item): item is MenuItem => item !== null)
  }

  const menuItems = computed(() => {
    if (!role.value) return []

    const baseMenu = getMenuByRole(role.value)
    return filterMenuByPermission(baseMenu)
  })

  return {
    menuItems,
  }
}
