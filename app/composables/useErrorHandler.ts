/**
 * Error Handler Composable
 * Reusable error handling logic
 */

import { ErrorCategory, ErrorSeverity, type ErrorLog } from '~/types/error.types'

export const useErrorHandler = () => {
  const toast = useToast()
  const config = useRuntimeConfig()

  /**
   * Get error category from status code
   */
  const getErrorCategory = (statusCode?: number): ErrorCategory => {
    if (!statusCode) return ErrorCategory.UNKNOWN

    if (statusCode === 401 || statusCode === 403) return ErrorCategory.AUTH
    if (statusCode === 404) return ErrorCategory.NOT_FOUND
    if (statusCode === 422) return ErrorCategory.VALIDATION
    if (statusCode >= 500) return ErrorCategory.SERVER
    if (statusCode === 0) return ErrorCategory.NETWORK

    return ErrorCategory.UNKNOWN
  }

  /**
   * Get error severity from status code
   */
  const getErrorSeverity = (statusCode?: number): ErrorSeverity => {
    if (!statusCode) return ErrorSeverity.MEDIUM

    if (statusCode === 401) return ErrorSeverity.HIGH
    if (statusCode === 403) return ErrorSeverity.MEDIUM
    if (statusCode === 404) return ErrorSeverity.LOW
    if (statusCode === 422) return ErrorSeverity.MEDIUM
    if (statusCode >= 500) return ErrorSeverity.HIGH

    return ErrorSeverity.MEDIUM
  }

  /**
   * Get user-friendly error message
   */
  const getUserFriendlyMessage = (statusCode?: number, originalMessage?: string): string => {
    // Jika ada pesan dari server, gunakan itu
    if (originalMessage && originalMessage.length < 200) {
      return originalMessage
    }

    // Default messages berdasarkan status code
    const messages: Record<number, string> = {
      400: 'Permintaan tidak valid. Periksa kembali data yang Anda masukkan.',
      401: 'Sesi Anda telah berakhir. Silakan login kembali.',
      403: 'Anda tidak memiliki akses ke fitur ini.',
      404: 'Data yang Anda cari tidak ditemukan.',
      422: 'Data yang Anda masukkan tidak valid. Periksa kembali form Anda.',
      429: 'Terlalu banyak permintaan. Silakan tunggu sebentar.',
      500: 'Terjadi kesalahan pada server. Tim kami sedang menangani masalah ini.',
      502: 'Server sedang tidak dapat dijangkau. Coba lagi dalam beberapa saat.',
      503: 'Layanan sedang dalam pemeliharaan. Coba lagi nanti.',
    }

    return messages[statusCode || 500] || 'Terjadi kesalahan yang tidak terduga.'
  }

  /**
   * Log error (ke console, server, atau monitoring service)
   */
  const logError = (errorLog: ErrorLog) => {
    // Development: log ke console
    if (config.public.debugMode) {
      console.group(`🔴 ${errorLog.severity.toUpperCase()} Error [${errorLog.category}]`)
      console.error('Message:', errorLog.message)
      console.error('Status Code:', errorLog.statusCode)
      console.error('URL:', errorLog.url)
      console.error('Timestamp:', errorLog.timestamp)
      if (errorLog.stack) {
        console.error('Stack:', errorLog.stack)
      }
      if (errorLog.metadata) {
        console.error('Metadata:', errorLog.metadata)
      }
      console.groupEnd()
    }

    // Production: kirim ke monitoring service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Implement Sentry
    }
  }

  /**
   * Show error toast notification
   */
  const showErrorToast = (message: string, severity: ErrorSeverity = ErrorSeverity.MEDIUM) => {
    const colors: Record<ErrorSeverity, 'orange' | 'red'> = {
      [ErrorSeverity.LOW]: 'orange',
      [ErrorSeverity.MEDIUM]: 'red',
      [ErrorSeverity.HIGH]: 'red',
      [ErrorSeverity.FATAL]: 'red',
    }

    const icons: Record<ErrorSeverity, string> = {
      [ErrorSeverity.LOW]: 'i-lucide-alert-circle',
      [ErrorSeverity.MEDIUM]: 'i-lucide-alert-triangle',
      [ErrorSeverity.HIGH]: 'i-lucide-octagon-alert',
      [ErrorSeverity.FATAL]: 'i-lucide-x-circle',
    }

    toast.add({
      title: 'Terjadi Kesalahan',
      description: message,
      color: colors[severity],
      icon: icons[severity],
    })
  }

  /**
   * Handle error dengan complete flow
   */
  const handleError = (
    error: any,
    options: {
      showToast?: boolean
      redirect?: string
      customMessage?: string
    } = {}
  ) => {
    const { showToast: shouldShowToast = true, redirect, customMessage } = options

    // Extract error info
    const statusCode = error.statusCode || error.response?.status || 500
    const originalMessage = error.message || error.response?.data?.message
    const stack = error.stack

    // Get error details
    const category = getErrorCategory(statusCode)
    const severity = getErrorSeverity(statusCode)
    const message = customMessage || getUserFriendlyMessage(statusCode, originalMessage)

    // Log error
    const errorLog: ErrorLog = {
      category,
      severity,
      message: originalMessage || message,
      statusCode,
      timestamp: new Date(),
      url: process.client ? window.location.href : undefined,
      stack,
      metadata: {
        response: error.response?.data,
        request: error.config,
      },
    }

    logError(errorLog)

    // Show toast
    if (shouldShowToast && process.client) {
      showErrorToast(message, severity)
    }

    // Handle specific cases
    if (statusCode === 401 && process.client) {
      // Clear auth and redirect to login
      const authStore = useAuthStore()
      authStore.logout()

      if (!redirect) {
        navigateTo('/auth/login')
      }
    }

    // Redirect if specified
    if (redirect && process.client) {
      navigateTo(redirect)
    }

    return {
      statusCode,
      message,
      category,
      severity,
    }
  }

  return {
    handleError,
    logError,
    showErrorToast,
    getUserFriendlyMessage,
    getErrorCategory,
    getErrorSeverity,
  }
}
