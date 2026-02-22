/**
 * usePinjaman - Admin composable for loan management
 */
export const usePinjaman = () => {
  const pinjamanList = ref([])
  const loading = ref(false)

  const fetchPinjaman = async () => {
    loading.value = true
    try {
      // TODO: implement via useApi
    } finally {
      loading.value = false
    }
  }

  return { pinjamanList, loading, fetchPinjaman }
}
