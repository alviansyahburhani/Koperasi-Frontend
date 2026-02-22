/**
 * useDataTable - Shared composable for data table with search, sort, and pagination
 */
export const useDataTable = <T>(defaultPerPage = 10) => {
  const { page, perPage, total, totalPages, hasNextPage, hasPrevPage, nextPage, prevPage, goToPage, reset } = usePagination(defaultPerPage)

  const search = ref('')
  const sortBy = ref('')
  const sortDir = ref<'asc' | 'desc'>('asc')
  const data = ref<T[]>([])
  const loading = ref(false)

  const toggleSort = (field: string) => {
    if (sortBy.value === field) {
      sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortBy.value = field
      sortDir.value = 'asc'
    }
    reset()
  }

  return { data, loading, search, sortBy, sortDir, toggleSort, page, perPage, total, totalPages, hasNextPage, hasPrevPage, nextPage, prevPage, goToPage, reset }
}
