/**
 * useSimpanan - Admin composable for savings management
 */
export const useSimpanan = () => {
  const simpananList = ref([])
  const loading = ref(false)

  const fetchSimpanan = async () => {
    loading.value = true
    try {
      // TODO: implement via useApi
    } finally {
      loading.value = false
    }
  }

  return { simpananList, loading, fetchSimpanan }
}
