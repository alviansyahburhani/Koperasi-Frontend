import type { UseFetchOptions } from 'nuxt/app'

export interface ApiError {
  statusCode: number
  message: string | string[]
  error: string
}

export class ApiService {
  private _initialized = false
  private _baseURL: string = ''
  private _timeout: number = 30000
  private _debugMode: boolean = false

  /**
   * Initialize config (called once)
   */
  private initConfig() {
    if (!this._initialized) {
      const config = useRuntimeConfig()
      this._baseURL = config.public.apiBase as string
      this._timeout = config.public.apiTimeout as number
      this._debugMode = config.public.debugMode as boolean
      this._initialized = true

      if (this._debugMode) {
        console.log('[ApiService] Initialized with baseURL:', this._baseURL)
      }
    }
  }

  /**
   * Generic API call
   */
  async call<T>(
    endpoint: string,
    options: UseFetchOptions<T> = {}
  ): Promise<T> {
    // Initialize config first
    this.initConfig()

    // Get token from localStorage
    let token: string | null = null
    if (process.client) {
      token = localStorage.getItem('access_token')
    }

    // Build headers
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...options.headers as Record<string, string>,
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    // Debug log
    if (this._debugMode) {
      console.log('[ApiService] Request:', {
        method: options.method || 'GET',
        url: `${this._baseURL}${endpoint}`,
        headers,
        body: options.body
      })
    }

    try {
      const data = await $fetch<T>(endpoint, {
        baseURL: this._baseURL,
        method: options.method || 'GET',
        headers,
        body: options.body,
        timeout: this._timeout,
        
        onResponseError: ({ response }) => {
          const error = response._data as ApiError
          
          if (this._debugMode) {
            console.error('[ApiService] Response Error:', {
              status: response.status,
              error: error
            })
          }

          // Handle 401 - Unauthorized
          if (response.status === 401 && process.client) {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            
            if (!window.location.pathname.includes('/auth/login')) {
              window.location.href = '/auth/login'
            }
          }
        },

        onRequestError: ({ error }) => {
          if (this._debugMode) {
            console.error('[ApiService] Request Error:', error)
          }
        }
      })

      if (this._debugMode) {
        console.log('[ApiService] Response:', data)
      }

      return data

    } catch (error: any) {
      const apiError: ApiError = {
        statusCode: error.statusCode || error.status || 500,
        message: error.data?.message || error.message || 'Terjadi kesalahan pada server',
        error: error.data?.error || 'Internal Server Error'
      }

      throw apiError
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, options?: UseFetchOptions<T>): Promise<T> {
    return this.call<T>(endpoint, { ...options, method: 'GET' })
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, body?: any, options?: UseFetchOptions<T>): Promise<T> {
    return this.call<T>(endpoint, { ...options, method: 'POST', body })
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, body?: any, options?: UseFetchOptions<T>): Promise<T> {
    return this.call<T>(endpoint, { ...options, method: 'PUT', body })
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, options?: UseFetchOptions<T>): Promise<T> {
    return this.call<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

// Export singleton instance
export const apiService = new ApiService()