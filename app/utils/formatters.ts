/**
 * Formatter Utilities
 * Helper functions untuk formatting data
 */

import { CURRENCY } from './constants'

/**
 * Format number ke format currency Indonesia
 * @example formatCurrency(1000000) // "Rp 1.000.000"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(CURRENCY.LOCALE, {
    style: 'currency',
    currency: CURRENCY.CODE,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

/**
 * Format number ke format ribuan dengan pemisah
 * @example formatNumber(1000000) // "1.000.000"
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat(CURRENCY.LOCALE).format(num)
}

/**
 * Format date ke format Indonesia
 * @example formatDate('2024-01-15') // "15 Januari 2024"
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]
  
  const day = d.getDate()
  const month = months[d.getMonth()]
  const year = d.getFullYear()
  
  return `${day} ${month} ${year}`
}

/**
 * Format date with time
 * @example formatDateTime('2024-01-15T10:30:00') // "15 Januari 2024, 10:30"
 */
export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const dateStr = formatDate(d)
  const hours = d.getHours().toString().padStart(2, '0')
  const minutes = d.getMinutes().toString().padStart(2, '0')
  
  return `${dateStr}, ${hours}:${minutes}`
}

/**
 * Format phone number ke format Indonesia
 * @example formatPhone('081234567890') // "0812-3456-7890"
 */
export function formatPhone(phone: string): string {
  // Remove non-numeric characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Format: 0812-3456-7890
  const match = cleaned.match(/^(\d{4})(\d{4})(\d+)$/)
  
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`
  }
  
  return phone
}

/**
 * Format NIK dengan pemisah
 * @example formatNIK('1234567890123456') // "1234-5678-9012-3456"
 */
export function formatNIK(nik: string): string {
  const cleaned = nik.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{4})(\d{4})(\d{4})(\d{4})$/)
  
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}-${match[4]}`
  }
  
  return nik
}

/**
 * Truncate text dengan ellipsis
 * @example truncate('Lorem ipsum dolor sit amet', 10) // "Lorem ipsu..."
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * Get initials from name
 * @example getInitials('John Doe') // "JD"
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

/**
 * Capitalize first letter
 * @example capitalize('hello world') // "Hello world"
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

/**
 * Format file size
 * @example formatFileSize(1024) // "1 KB"
 */
export function formatFileSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Bytes'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}