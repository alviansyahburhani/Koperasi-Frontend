/**
 * Error Types
 * Definisi type untuk error handling
 */

export interface AppError {
  statusCode: number
  message: string
  data?: any
  stack?: string
}

export interface ApiErrorResponse {
  success: false
  message: string
  errors?: Record<string, string[]>
  statusCode?: number
}

export interface ApiSuccessResponse<T = any> {
  success: true
  data: T
  message?: string
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse

// Error categories
export enum ErrorCategory {
  NETWORK = 'network',
  AUTH = 'auth',
  VALIDATION = 'validation',
  SERVER = 'server',
  NOT_FOUND = 'not_found',
  PERMISSION = 'permission',
  UNKNOWN = 'unknown'
}

// Error severity
export enum ErrorSeverity {
  LOW = 'low',       // Minor issues, can continue
  MEDIUM = 'medium', // Important but not critical
  HIGH = 'high',     // Critical, blocks functionality
  FATAL = 'fatal'    // App cannot continue
}

export interface ErrorLog {
  category: ErrorCategory
  severity: ErrorSeverity
  message: string
  statusCode?: number
  timestamp: Date
  url?: string
  userId?: string
  stack?: string
  metadata?: Record<string, any>
}