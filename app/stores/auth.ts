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
    userRole: (state) => state.user?.role || null,
    isSuperadmin: (state) => state.user?.role === 'superadmin',
    isAdmin: (state) => ['ketua', 'bendahara', 'sekretaris', 'pengawas'].includes(state.user?.role || ''),
    isAnggota: (state) => state.user?.role === 'anggota',
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
          console.log('[AuthStore] Login response:', response)
        }

        // Save tokens
        this.token = response.accessToken
        this.refreshToken = response.refreshToken
        this.isAuthenticated = true

        // Save to localStorage
        if (process.client) {
          localStorage.setItem('access_token', response.accessToken)
          localStorage.setItem('refresh_token', response.refreshToken)
        }

        // Fetch user profile
        await this.fetchProfile()

        return {
          success: true,
          message: 'Login berhasil!'
        }

      } catch (error: any) {
        console.error('[AuthStore] Login error:', error)

        // Handle error message
        let message = 'Login gagal. Silakan coba lagi.'

        if (error.statusCode === 401) {
          message = 'Email atau password salah.'
        } else if (error.message) {
          message = Array.isArray(error.message) 
            ? error.message[0] 
            : error.message
        }

        return {
          success: false,
          message
        }

      } finally {
        this.loading = false
      }
    },

    /**
     * Fetch user profile
     */
    async fetchProfile() {
      try {
        const profile = await authService.getProfile()
        
        if (useRuntimeConfig().public.debugMode) {
          console.log('[AuthStore] Profile fetched:', profile)
        }

        this.user = profile

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

        // Redirect to login
        navigateTo('/auth/login')
      }
    },

    /**
     * Initialize auth from storage
     */
    async initAuth() {
      if (process.server) return

      const accessToken = localStorage.getItem('access_token')
      const refreshToken = localStorage.getItem('refresh_token')

      if (accessToken && refreshToken) {
        try {
          this.token = accessToken
          this.refreshToken = refreshToken
          this.isAuthenticated = true

          // Verify token by fetching profile
          await this.fetchProfile()

          if (useRuntimeConfig().public.debugMode) {
            console.log('[AuthStore] Auth initialized from storage')
          }

        } catch (error) {
          console.error('[AuthStore] Token verification failed:', error)
          
          // Clear invalid tokens
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          this.isAuthenticated = false
        }
      }
    },
  },
})