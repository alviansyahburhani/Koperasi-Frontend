export default defineNuxtRouteMiddleware(() => {
  const user = useState<any>('auth-user')
  
  if (!user.value) {
    return navigateTo('/auth/login')
  }
})