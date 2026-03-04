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

/** ✅ Bentuk minimal response profile dari backend */
type ProfileApiResponse = {
  id?: string
  sub?: string
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
  isSuperAdminContext(): boolean {
    if (!import.meta.client) return false

    const hostname = window.location.hostname
    const parts = hostname.split('.')

    if (hostname === 'localhost' || hostname === '127.0.0.1') return true
    if (parts.length > 1 && parts[0] !== 'www') return false
    return true
  }

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

    const endpoint = isSuperAdmin ? '/api/admin/auth/login' : '/api/auth/login'

    if (config.public.debugMode) {
      console.log('[AuthService] Using endpoint:', endpoint)
    }

    return apiService.post<LoginResponse>(endpoint, {
      email: credentials.email,
      password: credentials.password,
    })
  }

  async getProfile(): Promise<UserProfile> {
    const isSuperAdmin = this.isSuperAdminContext()
    const endpoint = isSuperAdmin ? '/api/admin/auth/profile' : '/api/auth/profile'

    // ✅ FIX: jangan unknown
    const response = await apiService.get<ProfileApiResponse>(endpoint)

    return {
      id: response.id || response.sub || '',
      email: response.email,
      role: response.role,
      name: response.name,
      tenantId: response.tenantId,
    }
  }

  async refreshToken(): Promise<{ accessToken: string }> {
    const isSuperAdmin = this.isSuperAdminContext()
    const endpoint = isSuperAdmin ? '/api/admin/auth/refresh' : '/api/auth/refresh'
    return apiService.post<{ accessToken: string }>(endpoint, {})
  }

  async logout(): Promise<void> {
    if (import.meta.client) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')
    }
  }

  decodeToken(token: string): JwtPayload | null {
    try {
      const parts = token.split('.')
      if (parts.length !== 3) return null

      const base64Url = parts[1]
      if (!base64Url) return null

      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join('')
      )

      return JSON.parse(jsonPayload) as JwtPayload
    } catch (error) {
      console.error('[AuthService] Failed to decode token:', error)
      return null
    }
  }

  isTokenExpired(token: string): boolean {
    const payload = this.decodeToken(token)
    if (!payload?.exp) return true
    const now = Math.floor(Date.now() / 1000)
    return payload.exp < now
  }
}

export const authService = new AuthService()