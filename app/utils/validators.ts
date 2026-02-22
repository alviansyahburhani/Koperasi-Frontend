/**
 * Validation Utilities
 * Helper functions untuk validasi data
 */

import { VALIDATION } from './constants'

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 */
export function isValidPassword(password: string): boolean {
  return password.length >= VALIDATION.PASSWORD_MIN_LENGTH
}

/**
 * Validate NIK (16 digits)
 */
export function isValidNIK(nik: string): boolean {
  const cleaned = nik.replace(/\D/g, '')
  return cleaned.length === VALIDATION.NIK_LENGTH
}

/**
 * Validate phone number Indonesia
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')
  return (
    cleaned.length >= VALIDATION.PHONE_MIN_LENGTH &&
    cleaned.length <= VALIDATION.PHONE_MAX_LENGTH &&
    (cleaned.startsWith('08') || cleaned.startsWith('628'))
  )
}

/**
 * Validate required field
 */
export function isRequired(value: unknown): boolean {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  return value !== null && value !== undefined
}

/**
 * Validate number range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}
