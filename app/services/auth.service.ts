import { apiService } from './api.service'

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

export interface UserProfile {
  sub: string
  email: string
  role: string
}

export class AuthService {
  /**
   * Login
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // ✅ useRuntimeConfig dipanggil di dalam method (saat runtime)
    const config = useRuntimeConfig()

    if (config.public.debugMode) {
      console.log('[AuthService] Login attempt:', { email: credentials.email })
    }

    return apiService.post<LoginResponse>('/auth/login', {
      email: credentials.email,
      password: credentials.password,
    })
  }

  /**
   * Get User Profile
   */
  async getProfile(): Promise<UserProfile> {
    return apiService.get<UserProfile>('/auth/profile')
  }

  /**
   * Refresh Token
   */
  async refreshToken(): Promise<{ accessToken: string }> {
    return apiService.post<{ accessToken: string }>('/auth/refresh')
  }

  /**
   * Logout
   */
  async logout(): Promise<void> {
    if (process.client) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }
  }
}

// Export singleton
export const authService = new AuthService()