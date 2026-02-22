import type { User } from '~/types'
import { Role } from '~/types'

export const useAuth = () => {
  const user = useState<User | null>('auth-user', () => {
    // Check if we're in browser and have stored session
    if (process.client) {
      const stored = localStorage.getItem('user')
      if (stored) {
        return JSON.parse(stored)
      }
    }
    return null
  })

  const isAuthenticated = computed(() => !!user.value)
  const role = computed(() => user.value?.role ?? null)

  const login = async (credentials: { email: string; password: string; remember?: boolean }) => {
    // TODO: Implement real API call
    let userData: User | null = null

    // Mock login logic
    if (credentials.email === 'superadmin@koperasi.com') {
      userData = {
        id: '1', // ✅ String instead of number
        name: 'Super Admin',
        email: credentials.email,
        role: Role.SUPERADMIN,
      }
    } else if (credentials.email === 'ketua@koperasi.com') {
      userData = {
        id: '2', // ✅ String
        name: 'Ketua Koperasi',
        email: credentials.email,
        role: Role.KETUA,
        cooperativeId: '1', // ✅ String
      }
    } else if (credentials.email === 'bendahara@koperasi.com') {
      userData = {
        id: '3',
        name: 'Bendahara',
        email: credentials.email,
        role: Role.BENDAHARA,
        cooperativeId: '1',
      }
    } else if (credentials.email === 'sekretaris@koperasi.com') {
      userData = {
        id: '4', // ✅ String
        name: 'Sekretaris',
        email: credentials.email,
        role: Role.SEKRETARIS,
        cooperativeId: '1', // ✅ String
      }
    } else if (credentials.email === 'pengawas@koperasi.com') {
      userData = {
        id: '5', // ✅ String
        name: 'Pengawas',
        email: credentials.email,
        role: Role.PENGAWAS,
        cooperativeId: '1', // ✅ String
      }
    } else if (credentials.email === 'anggota@koperasi.com') {
      userData = {
        id: '6', // ✅ String
        name: 'Anggota Koperasi',
        email: credentials.email,
        role: Role.ANGGOTA,
        cooperativeId: '1', // ✅ String
      }
    } else {
      throw new Error('Email atau password salah')
    }

    user.value = userData

    // ✅ Store in localStorage if remember me
    if (process.client && credentials.remember) {
      localStorage.setItem('user', JSON.stringify(userData))
    }

    return { success: true, user: userData }
  }

  const logout = async () => {
    user.value = null

    if (process.client) {
      localStorage.removeItem('user')
    }

    await navigateTo('/auth/login')
  }

  return {
    user: computed(() => user.value),
    isAuthenticated,
    role,
    login,
    logout,
  }
}
