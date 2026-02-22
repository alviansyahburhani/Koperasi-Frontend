/**
 * API Composable
 * Wrapper untuk API calls dengan error handling
 */

import type { ApiResponse } from '../types'

interface UseApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
  token?: string
}

export const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  /**
   * Make API request
   */
  async function request<T = unknown>(
    endpoint: string,
    options: UseApiOptions = {}
  ): Promise<ApiResponse<T>> {
    const { method = 'GET', body, headers = {}, token } = options

    try {
      // Prepare headers
      const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...headers,
      }

      // Add auth token if provided
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`
      }

      // Make request
      const response = await $fetch<ApiResponse<T>>(`${baseURL}${endpoint}`, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
      })

      return response
    } catch (error: unknown) {
      // Handle error
      console.error('API Error:', error)

      return {
        success: false,
        message: error.message || 'Terjadi kesalahan pada server',
        errors: error.data?.errors,
      }
    }
  }

  /**
   * GET request
   */
  function get<T = unknown>(endpoint: string, token?: string) {
    return request<T>(endpoint, { method: 'GET', token })
  }

  /**
   * POST request
   */
  function post<T = unknown>(endpoint: string, body: unknown, token?: string) {
    return request<T>(endpoint, { method: 'POST', body, token })
  }

  /**
   * PUT request
   */
  function put<T = unknown>(endpoint: string, body: unknown, token?: string) {
    return request<T>(endpoint, { method: 'PUT', body, token })
  }

  /**
   * PATCH request
   */
  function patch<T = unknown>(endpoint: string, body: unknown, token?: string) {
    return request<T>(endpoint, { method: 'PATCH', body, token })
  }

  /**
   * DELETE request
   */
  function del<T = unknown>(endpoint: string, token?: string) {
    return request<T>(endpoint, { method: 'DELETE', token })
  }

  return {
    request,
    get,
    post,
    put,
    patch,
    delete: del,
  }
}
