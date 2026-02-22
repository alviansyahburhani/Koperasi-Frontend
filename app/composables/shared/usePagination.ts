/**
 * usePagination - Shared composable for pagination state
 */
export const usePagination = (defaultPerPage = 10) => {
  const page = ref(1)
  const perPage = ref(defaultPerPage)
  const total = ref(0)

  const totalPages = computed(() => Math.ceil(total.value / perPage.value))
  const hasNextPage = computed(() => page.value < totalPages.value)
  const hasPrevPage = computed(() => page.value > 1)

  const nextPage = () => { if (hasNextPage.value) page.value++ }
  const prevPage = () => { if (hasPrevPage.value) page.value-- }
  const goToPage = (p: number) => { page.value = p }
  const reset = () => { page.value = 1 }

  return { page, perPage, total, totalPages, hasNextPage, hasPrevPage, nextPage, prevPage, goToPage, reset }
}
