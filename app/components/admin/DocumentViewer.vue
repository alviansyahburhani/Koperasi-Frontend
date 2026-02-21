<script setup lang="ts">
interface Props {
  documentUrl: string
  documentName: string
}

const props = defineProps<Props>()
const isLoading = ref(true)
const hasError = ref(false)

const handleLoad = () => {
  isLoading.value = false
}

const handleError = () => {
  isLoading.value = false
  hasError.value = true
}

const downloadDocument = () => {
  window.open(props.documentUrl, '_blank')
}
</script>

<template>
  <div class="relative bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-file-text" class="w-5 h-5 text-red-600" />
        <span class="text-sm font-medium text-gray-900">{{ documentName }}</span>
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="downloadDocument"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <UIcon name="i-lucide-download" class="w-4 h-4" />
          Download
        </button>
      </div>
    </div>

    <!-- PDF Viewer -->
    <div class="relative h-[600px] bg-gray-50">
      <!-- Loading State -->
      <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p class="text-sm text-gray-600 mt-4">Memuat dokumen...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="hasError" class="absolute inset-0 flex items-center justify-center">
        <div class="text-center">
          <UIcon name="i-lucide-alert-circle" class="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p class="text-sm font-medium text-gray-900">Gagal memuat dokumen</p>
          <p class="text-xs text-gray-500 mt-1">Silakan download untuk melihat dokumen</p>
          <button
            @click="downloadDocument"
            class="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
          >
            <UIcon name="i-lucide-download" class="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      <!-- PDF Embed -->
      <iframe
        v-show="!isLoading && !hasError"
        :src="documentUrl"
        @load="handleLoad"
        @error="handleError"
        class="w-full h-full border-0"
        title="Document Viewer"
      />
    </div>
  </div>
</template>