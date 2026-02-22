/**
 * useWilayah - Shared composable for Indonesian region data (Provinsi, Kabupaten, Kecamatan)
 */
export const useWilayah = () => {
  const provinsi = ref([])
  const kabupaten = ref([])
  const kecamatan = ref([])
  const loading = ref(false)

  const fetchProvinsi = async () => {
    loading.value = true
    try {
      // TODO: implement via useApi or static data
    } finally {
      loading.value = false
    }
  }

  return { provinsi, kabupaten, kecamatan, loading, fetchProvinsi }
}
