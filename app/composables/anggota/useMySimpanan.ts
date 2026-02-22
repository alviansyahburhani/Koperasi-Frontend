/**
 * useMySimpanan - Member composable for own savings data
 */
export const useMySimpanan = () => {
  const simpanan = ref([])
  const loading = ref(false)

  const fetchSimpanan = async () => {
    loading.value = true
    try {
      // TODO: implement via useApi
    } finally {
      loading.value = false
    }
  }

  return { simpanan, loading, fetchSimpanan }
}
