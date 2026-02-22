/**
 * useMyPinjaman - Member composable for own loan data
 */
export const useMyPinjaman = () => {
  const pinjaman = ref([])
  const loading = ref(false)

  const fetchPinjaman = async () => {
    loading.value = true
    try {
      // TODO: implement via useApi
    } finally {
      loading.value = false
    }
  }

  return { pinjaman, loading, fetchPinjaman }
}
