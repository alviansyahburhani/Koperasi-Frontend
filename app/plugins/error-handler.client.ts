/**
 * Global Error Handler Plugin (Simplified)
 * Menangkap semua error yang tidak ter-handle
 */

export default defineNuxtPlugin((nuxtApp) => {
  const toast = useToast()

  // ========================================
  // 1. Vue Error Handler
  // ========================================
  nuxtApp.vueApp.config.errorHandler = (error: any, instance, info) => {
    console.error('🔴 Vue Error Handler')
    console.error('Error:', error)
    console.error('Component:', instance?.$options.name || 'Unknown')
    console.error('Info:', info)

    // Show toast
    toast.add({
      title: 'Terjadi Kesalahan',
      description: error.message || 'Terjadi kesalahan pada aplikasi',
      color: 'red',
      icon: 'i-lucide-alert-triangle',
    })
  }

  // ========================================
  // 2. Unhandled Promise Rejection
  // ========================================
  window.addEventListener('unhandledrejection', (event) => {
    console.error('🔴 Unhandled Promise Rejection')
    console.error('Reason:', event.reason)

    event.preventDefault()

    toast.add({
      title: 'Terjadi Kesalahan',
      description: event.reason?.message || 'Operasi gagal',
      color: 'red',
      icon: 'i-lucide-alert-triangle',
    })
  })

  // ========================================
  // 3. Global Error Event
  // ========================================
  window.addEventListener('error', (event) => {
    // Jangan handle error dari script external (ads, analytics)
    if (event.filename && !event.filename.includes(window.location.origin)) {
      return
    }

    console.error('🔴 Global Error Event')
    console.error('Message:', event.message)
    console.error('Source:', event.filename)
    console.error('Line:', event.lineno)
  })

  // ========================================
  // 4. Network Error Handler
  // ========================================
  window.addEventListener('offline', () => {
    toast.add({
      title: 'Tidak Ada Koneksi',
      description: 'Anda sedang offline. Beberapa fitur mungkin tidak berfungsi.',
      color: 'orange',
      icon: 'i-lucide-wifi-off',
    })
  })

  window.addEventListener('online', () => {
    toast.add({
      title: 'Kembali Online',
      description: 'Koneksi internet Anda telah pulih.',
      color: 'green',
      icon: 'i-lucide-wifi',
    })
  })
})