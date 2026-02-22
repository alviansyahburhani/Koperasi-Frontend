/**
 * API Service with Complete Error Handling
 */

export class ApiService {
  private baseURL: string
  private timeout: number
  private debugMode: boolean
  private initialized: boolean = false

  constructor() {
    this.baseURL = ''
    this.timeout = 30000
    this.debugMode = false
  }

  /**
   * Initialize config
   */
  private initConfig() {
    if (!this.initialized) {
      const config = useRuntimeConfig()
      this.baseURL = config.public.apiBase as string
      this.timeout = config.public.apiTimeout as number
      this.debugMode = config.public.debugMode as boolean
      this.initialized = true

      if (this.debugMode) {
        console.log('[ApiService] Initialized:', { baseURL: this.baseURL })
      }
    }
  }

  /**
   * Get headers with auth token
   */
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }

    // Add auth token if exists
    if (import.meta.client) {
      const token = localStorage.getItem('access_token')
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }

    return headers
  }

  /**
   * Handle API Error
   * ✅ FIX: useErrorHandler hunknowna bisa dipanggil di Nuxt context
   */
  private handleError(error: unknown): never {
    // Simple error handling tanpa composable
    const statusCode = error.statusCode || error.response?.status || 500
    const message = error.message || error.response?.data?.message || 'Terjadi kesalahan'

    // Log di development
    if (this.debugMode) {
      console.error('[ApiService] Error:', {
        statusCode,
        message,
        error,
      })
    }

    // Handle 401 - Auto logout
    if (statusCode === 401 && import.meta.client) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      navigateTo('/auth/login')
    }

    // Throw formatted error
    throw createError({
      statusCode,
      message,
      data: error.response?.data,
    })
  }

  /**
   * Make HTTP Request
   */
  private async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    endpoint: string,
    data?: unknown
  ): Promise<T> {
    this.initConfig()

    const url = `${this.baseURL}${endpoint}`

    if (this.debugMode) {
      console.log(`[ApiService] ${method} ${url}`, data)
    }

    try {
      const response = await $fetch<T>(url, {
        method,
        headers: this.getHeaders(),
        body: data,
        timeout: this.timeout,
        retry: method === 'GET' ? 2 : 0,
        retryDelay: 1000,
      })

      if (this.debugMode) {
        console.log(`[ApiService] Response ${method} ${url}:`, response)
      }

      return response
    } catch (error: unknown) {
      if (this.debugMode) {
        console.error(`[ApiService] Error ${method} ${url}:`, error)
      }

      this.handleError(error)
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>('GET', endpoint)
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>('POST', endpoint, data)
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>('PUT', endpoint, data)
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>('PATCH', endpoint, data)
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>('DELETE', endpoint)
  }
}

// Export singleton instance
export const apiService = new ApiService()
