/**
 * useFileUpload - Shared composable for file upload handling
 */
export const useAppFileUpload = () => {
  const uploading = ref(false)
  const progress = ref(0)

  const upload = async (_file: File): Promise<string | null> => {
    uploading.value = true
    progress.value = 0
    try {
      // TODO: implement via useApi
      return null
    } finally {
      uploading.value = false
      progress.value = 100
    }
  }

  return { uploading, progress, upload }
}
