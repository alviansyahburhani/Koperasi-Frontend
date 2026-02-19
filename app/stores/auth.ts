/**
 * Auth Store
 * Pinia store untuk authentication state management
 */

import { defineStore } from 'pinia'
import type { User, AuthCredentials, AuthResponse } from '../types'
import { STORAGE_KEYS, API_ENDPOINTS } from '../utils/constants'
import { useApi } from '~/composables/useApi'

export const useAuthStore = defineStore('auth', () => {
  // ==================== State ====================
  
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isAuthenticated = computed(() => !!token.value)
  const isLoading = ref(false)

  // ==================== Actions ====================

  /**
   * Login user
   */
  async function login(credentials: AuthCredentials) {
    isLoading.value = true
    const api = useApi()

    try {
      const response = await api.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      )

      if (response.success && response.data) {
        // Store auth data
        token.value = response.data.token
        user.value = response.data.user

        // Persist to localStorage
        if (process.client) {
          localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token)
          localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user))
        }

        return { success: true, message: 'Login berhasil' }
      }

      return { success: false, message: response.message }
    } catch (error: any) {
      return { success: false, message: error.message || 'Login gagal' }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Logout user
   */
  async function logout() {
    // Clear state
    user.value = null
    token.value = null

    // Clear localStorage
    if (process.client) {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.USER_DATA)
    }

    // Redirect to login
    await navigateTo('/login')
  }

  /**
   * Initialize auth from localStorage
   */
  function initAuth() {
    if (process.client) {
      const storedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER_DATA)

      if (storedToken && storedUser) {
        token.value = storedToken
        user.value = JSON.parse(storedUser)
      }
    }
  }

  /**
   * Check if user has specific role
   */
  function hasRole(role: string): boolean {
    return user.value?.role === role
  }

  return {
    // State
    user,
    token,
    isAuthenticated,
    isLoading,
    
    // Actions
    login,
    logout,
    initAuth,
    hasRole
  }
})