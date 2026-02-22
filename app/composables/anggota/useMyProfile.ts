/**
 * useMyProfile - Member composable for own profile management
 */
export const useMyProfile = () => {
  const profile = ref(null)
  const loading = ref(false)

  const fetchProfile = async () => {
    loading.value = true
    try {
      // TODO: implement via useApi
    } finally {
      loading.value = false
    }
  }

  return { profile, loading, fetchProfile }
}
