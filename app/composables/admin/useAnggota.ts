/**
 * useAnggota - Admin composable for member management
 */
export const useAnggota = () => {
  const anggotaList = ref([])
  const loading = ref(false)

  const fetchAnggota = async () => {
    loading.value = true
    try {
      // TODO: implement via useApi
    } finally {
      loading.value = false
    }
  }

  return { anggotaList, loading, fetchAnggota }
}
