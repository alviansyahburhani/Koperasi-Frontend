export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()

  if (authStore.isAuthenticated && authStore.user) {
    // Redirect based on role
    if (authStore.isSuperadmin) {
      return navigateTo('/superadmin')
    } else if (authStore.isAdmin) {
      return navigateTo('/admin')
    } else if (authStore.isAnggota) {
      return navigateTo('/anggota')
    }

    return navigateTo('/')
  }
})
