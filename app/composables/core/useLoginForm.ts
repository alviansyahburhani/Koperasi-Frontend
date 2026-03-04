import type { LoginCredentials } from '~/services/auth.service'

export const useLoginForm = () => {
  const authStore = useAuthStore()
  const router = useRouter()

  const loading = ref(false)
  const showPassword = ref(false)
  const errorMessage = ref('')

  const form = reactive({
    email: '',
    password: '',
    rememberMe: false,
  })

  const clearError = () => {
    errorMessage.value = ''
  }

  const redirectAfterLogin = async () => {
    if (authStore.isSuperadmin) return router.push('/superadmin')
    if (authStore.isAdmin) return router.push('/admin')
    if (authStore.isAnggota) return router.push('/anggota')
    return router.push('/')
  }

  const submit = async () => {
    loading.value = true
    errorMessage.value = ''

    try {
      const credentials: LoginCredentials = {
        email: form.email,
        password: form.password,
      }

      const result = await authStore.login(credentials)

      if (result.success) {
        await redirectAfterLogin()
        return
      }

      errorMessage.value = result.message
    } catch (error: unknown) {
      console.error('[Login] Unexpected error:', error)
      errorMessage.value = 'Terjadi kesalahan yang tidak terduga. Silakan coba lagi.'
    } finally {
      loading.value = false
    }
  }

  return {
    form,
    loading,
    showPassword,
    errorMessage,
    submit,
    clearError,
  }
}