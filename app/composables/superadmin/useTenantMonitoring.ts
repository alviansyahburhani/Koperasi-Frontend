/**
 * useTenantMonitoring - Superadmin composable for monitoring tenant activity
 */
export const useTenantMonitoring = () => {
  const tenants = ref([])
  const loading = ref(false)

  const fetchTenants = async () => {
    loading.value = true
    try {
      // TODO: implement via useApi
    } finally {
      loading.value = false
    }
  }

  return { tenants, loading, fetchTenants }
}
