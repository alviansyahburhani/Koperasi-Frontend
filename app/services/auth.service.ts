import { apiService } from './api.service'

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  warning?: {
    code: string
    message: string
    subscriptionEndDate?: Date
    actionRequired: string
  }
}

export interface JwtPayload {
  sub: string
  email: string
  role: string
  tenantId?: string
  subscriptionStatus?: string
  isExpired?: boolean
  isGracePeriod?: boolean
  iat?: number
  exp?: number
}

export interface UserProfile {
  id: string
  email: string
  role: string
  name?: string
  tenantId?: string
}

export class AuthService {
  /**
   * ✅ Detect if Super Admin based on URL
   * Super Admin = localhost tanpa subdomain
   * Tenant = subdomain.localhost
   */
  private isSuperAdminContext(): boolean {
    if (!import.meta.client) return false

    const hostname = window.location.hostname
    const parts = hostname.split('.')

    // localhost atau 127.0.0.1 (tanpa subdomain) = Super Admin
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return true
    }

    // Jika ada subdomain (parts > 1) dan bukan 'www' = Tenant
    if (parts.length > 1 && parts[0] !== 'www') {
      return false
    }

    // Default: assume super admin
    return true
  }

  /**
   * Login - Auto detect super admin vs tenant based on URL
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const config = useRuntimeConfig()
    const isSuperAdmin = this.isSuperAdminContext()

    if (config.public.debugMode) {
      console.log('[AuthService] Login context:', {
        email: credentials.email,
        hostname: import.meta.client ? window.location.hostname : 'SSR',
        isSuperAdmin,
      })
    }

    // ✅ Use different endpoint based on context
    const endpoint = isSuperAdmin
      ? '/api/admin/auth/login' // Super admin login
      : '/api/auth/login' // Tenant login

    if (config.public.debugMode) {
      console.log('[AuthService] Using endpoint:', endpoint)
    }

    return apiService.post<LoginResponse>(endpoint, {
      email: credentials.email,
      password: credentials.password,
    })
  }

  /**
   * Get User Profile from Backend
   */
  async getProfile(): Promise<UserProfile> {
    const isSuperAdmin = this.isSuperAdminContext()

    // ✅ Use different endpoint based on context
    const endpoint = isSuperAdmin
      ? '/api/admin/auth/profile' // Jika ada
      : '/api/auth/profile'

    const response = await apiService.get<unknown>(endpoint)

    return {
      id: response.id || response.sub,
      email: response.email,
      role: response.role,
      name: response.name,
      tenantId: response.tenantId,
    }
  }

  /**
   * Refresh Token
   */
  async refreshToken(): Promise<{ accessToken: string }> {
    const isSuperAdmin = this.isSuperAdminContext()

    // ✅ Use different endpoint based on context
    const endpoint = isSuperAdmin ? '/api/admin/auth/refresh' : '/api/auth/refresh'

    return apiService.post<{ accessToken: string }>(endpoint, {})
  }

  /**
   * Logout
   */
  async logout(): Promise<void> {
    if (import.meta.client) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')
    }
  }

  /**
   * Decode JWT Token
   */
  decodeToken(token: string): JwtPayload | null {
    try {
      const parts = token.split('.')

      if (parts.length !== 3) {
        console.error('[AuthService] Invalid token format')
        return null
      }

      const base64Url = parts[1]

      if (!base64Url) {
        console.error('[AuthService] Token payload is missing')
        return null
      }

      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )

      return JSON.parse(jsonPayload) as JwtPayload
    } catch (error) {
      console.error('[AuthService] Failed to decode token:', error)
      return null
    }
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(token: string): boolean {
    const payload = this.decodeToken(token)
    if (!payload || !payload.exp) return true

    const now = Math.floor(Date.now() / 1000)
    return payload.exp < now
  }
}

export const authService = new AuthService()
