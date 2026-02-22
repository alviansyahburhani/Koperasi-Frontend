/**
 * useToast - Core composable for toast notifications
 * Wraps Nuxt UI's useToast with app-specific defaults
 */
export const useAppToast = () => {
  const toast = useToast()

  const success = (message: string, title = 'Berhasil') => {
    toast.add({ title, description: message, color: 'green', icon: 'i-lucide-check-circle' })
  }

  const error = (message: string, title = 'Terjadi Kesalahan') => {
    toast.add({ title, description: message, color: 'red', icon: 'i-lucide-alert-triangle' })
  }

  const info = (message: string, title = 'Informasi') => {
    toast.add({ title, description: message, color: 'blue', icon: 'i-lucide-info' })
  }

  const warning = (message: string, title = 'Perhatian') => {
    toast.add({ title, description: message, color: 'orange', icon: 'i-lucide-alert-circle' })
  }

  return { success, error, info, warning }
}
