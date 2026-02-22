import { defineStore } from 'pinia'
import { authService, type LoginCredentials, type UserProfile } from '~/services/auth.service'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as UserProfile | null,
    token: null as string | null,
    refreshToken: null as string | null,
    isAuthenticated: false,
    loading: false,
  }),

  getters: {
    /**
     * User role (raw dari backend)
     */
    userRole: (state) => state.user?.role || null,

    /**
     * Super Admin check
     */
    isSuperadmin: (state) => {
      const role = state.user?.role?.toUpperCase()
      return role === 'SUPERADMIN'
    },

    /**
     * ✅ Pengurus check (admin koperasi)
     */
    isPengurus: (state) => {
      const role = state.user?.role
      return role === 'Pengurus' // Case-sensitive sesuai backend
    },

    /**
     * ✅ Pengawas check (supervisor koperasi)
     */
    isPengawas: (state) => {
      const role = state.user?.role
      return role === 'Pengawas' // Case-sensitive sesuai backend
    },

    /**
     * ✅ Anggota check (member koperasi)
     */
    isAnggota: (state) => {
      const role = state.user?.role
      return role === 'Anggota' // Case-sensitive sesuai backend
    },

    /**
     * ✅ isAdmin = Pengurus OR Pengawas
     * (kedua role ini bisa akses admin dashboard)
     */
    isAdmin: (state) => {
      const role = state.user?.role
      return role === 'Pengurus' || role === 'Pengawas'
    },
  },

  actions: {
    /**
     * Login
     */
    async login(credentials: LoginCredentials): Promise<{ success: boolean; message: string }> {
      this.loading = true
      const config = useRuntimeConfig()

      try {
        if (config.public.debugMode) {
          console.log('[AuthStore] Login start:', credentials.email)
        }

        // Call login API
        const response = await authService.login(credentials)

        if (config.public.debugMode) {
          console.log('[AuthStore] Login response received')
        }

        // Save tokens
        this.token = response.accessToken
        this.refreshToken = response.refreshToken
        this.isAuthenticated = true

        // Save to localStorage
        if (import.meta.client) {
          localStorage.setItem('access_token', response.accessToken)
          localStorage.setItem('refresh_token', response.refreshToken)
        }

        // ✅ Decode JWT to get user info
        const payload = authService.decodeToken(response.accessToken)

        if (payload) {
          // ✅ FIX: Check if this is super admin login (no subdomain)
          const isSuperAdminContext = authService.isSuperAdminContext()

          if (config.public.debugMode) {
            console.log('[AuthStore] Is Super Admin context:', isSuperAdminContext)
            console.log('[AuthStore] JWT payload:', payload)
          }

          this.user = {
            id: payload.sub,
            email: payload.email,
            // ✅ FIX: Set 'SUPERADMIN' if login from localhost without subdomain
            role: isSuperAdminContext ? 'SUPERADMIN' : payload.role || 'ANGGOTA',
            tenantId: payload.tenantId,
            name: payload.email.split('@')[0], // Fallback name
          }

          // Save user to localStorage
          if (import.meta.client) {
            localStorage.setItem('user', JSON.stringify(this.user))
          }

          if (config.public.debugMode) {
            console.log('[AuthStore] User profile set from JWT:', this.user)
          }
        }

        // Handle warning (subscription expired, etc)
        if (response.warning) {
          console.warn('[AuthStore] Login warning:', response.warning)
          // TODO: Show warning toast/modal
        }

        return {
          success: true,
          message: 'Login berhasil!',
        }
      } catch (error: unknown) {
        console.error('[AuthStore] Login error:', error)

        // Clear state on error
        this.user = null
        this.token = null
        this.refreshToken = null
        this.isAuthenticated = false

        // Handle error message
        let message = 'Login gagal. Silakan coba lagi.'

        if (error.statusCode === 401) {
          message = 'Email atau password salah.'
        } else if (error.statusCode === 404) {
          message = 'Server tidak dapat dihubungi. Pastikan backend berjalan.'
        } else if (error.statusCode === 500) {
          message = 'Server sedang bermasalah. Silakan coba lagi nanti.'
        } else if (error.message) {
          message = Array.isArray(error.message) ? error.message[0] : error.message
        }

        return {
          success: false,
          message,
        }
      } finally {
        this.loading = false
      }
    },

    /**
     * Fetch user profile (optional - jika mau refresh dari backend)
     */
    async fetchProfile() {
      try {
        const profile = await authService.getProfile()

        if (useRuntimeConfig().public.debugMode) {
          console.log('[AuthStore] Profile fetched from API:', profile)
        }

        this.user = profile

        // Update localStorage
        if (import.meta.client) {
          localStorage.setItem('user', JSON.stringify(profile))
        }
      } catch (error) {
        console.error('[AuthStore] Fetch profile error:', error)
        throw error
      }
    },

    /**
     * Logout
     */
    async logout() {
      try {
        await authService.logout()
      } catch (error) {
        console.error('[AuthStore] Logout error:', error)
      } finally {
        // Clear state
        this.user = null
        this.token = null
        this.refreshToken = null
        this.isAuthenticated = false

        // Clear localStorage
        if (import.meta.client) {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('user')
        }

        // Redirect to login
        navigateTo('/auth/login')
      }
    },

    /**
     * Initialize auth from storage (called on app start)
     */
    async initAuth() {
      if (import.meta.server) return

      const accessToken = localStorage.getItem('access_token')
      const refreshToken = localStorage.getItem('refresh_token')
      const storedUser = localStorage.getItem('user')

      if (accessToken && refreshToken) {
        try {
          // Check if token expired
          if (authService.isTokenExpired(accessToken)) {
            console.log('[AuthStore] Token expired, clearing auth')
            this.logout()
            return
          }

          // Restore state
          this.token = accessToken
          this.refreshToken = refreshToken
          this.isAuthenticated = true

          // Restore user from localStorage
          if (storedUser) {
            this.user = JSON.parse(storedUser)
          } else {
            // Fallback: decode from token
            const payload = authService.decodeToken(accessToken)
            if (payload) {
              // ✅ FIX: Check context to set correct role
              const isSuperAdminContext = authService.isSuperAdminContext()

              this.user = {
                id: payload.sub,
                email: payload.email,
                role: isSuperAdminContext ? 'SUPERADMIN' : payload.role || 'ANGGOTA',
                tenantId: payload.tenantId,
                name: payload.email.split('@')[0],
              }
            }
          }

          if (useRuntimeConfig().public.debugMode) {
            console.log('[AuthStore] Auth restored from storage:', {
              user: this.user,
              authenticated: this.isAuthenticated,
            })
          }
        } catch (error) {
          console.error('[AuthStore] Failed to restore auth:', error)

          // Clear invalid data
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('user')
          this.isAuthenticated = false
        }
      }
    },
  },
})
