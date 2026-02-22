/**
 * API Plugin
 * Provides an Axios instance with base URL, auth token injection, and response interceptors.
 * Usage in components/composables: const { $api } = useNuxtApp()
 */
import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = axios.create({
    baseURL: config.public.apiBase as string,
    timeout: (config.public.apiTimeout as number) || 30000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  // Request interceptor – attach access token
  api.interceptors.request.use((req) => {
    if (import.meta.client) {
      const token = localStorage.getItem('access_token')
      if (token) {
        req.headers.Authorization = `Bearer ${token}`
      }
    }
    return req
  })

  // Response interceptor – handle 401
  api.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response?.status === 401 && import.meta.client) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user')
        navigateTo('/auth/login')
      }
      return Promise.reject(error)
    },
  )

  return {
    provide: {
      api,
    },
  }
})
