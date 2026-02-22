<script setup lang="ts">
interface Props {
  isOpen: boolean
  decision: 'approve' | 'reject' | null
  cooperativeName: string
}

interface Emits {
  (e: 'close'): void
  (e: 'confirm', data: { decision: 'approve' | 'reject'; note?: string }): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const note = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  if (props.decision === 'reject' && !note.value.trim()) {
    alert('Harap masukkan alasan penolakan')
    return
  }

  loading.value = true

  // Simulate API call
  setTimeout(() => {
    emit('confirm', {
      decision: props.decision!,
      note: note.value,
    })
    loading.value = false
    note.value = ''
  }, 1000)
}

const handleClose = () => {
  if (!loading.value) {
    note.value = ''
    emit('close')
  }
}

watch(
  () => props.isOpen,
  (val) => {
    if (!val) {
      note.value = ''
    }
  }
)
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" @click.self="handleClose">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
      <!-- Backdrop -->
      <div
        class="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75"
        @click="handleClose"
      />

      <!-- Modal -->
      <div
        class="relative inline-block w-full max-w-lg px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:p-6"
      >
        <!-- Icon -->
        <div
          class="flex items-center justify-center w-12 h-12 mx-auto rounded-full mb-4"
          :class="decision === 'approve' ? 'bg-green-100' : 'bg-red-100'"
        >
          <UIcon
            :name="decision === 'approve' ? 'i-lucide-check-circle-2' : 'i-lucide-x-circle'"
            class="w-6 h-6"
            :class="decision === 'approve' ? 'text-green-600' : 'text-red-600'"
          />
        </div>

        <!-- Content -->
        <div class="text-center mb-5">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ decision === 'approve' ? 'Setujui Permohonan' : 'Tolak Permohonan' }}
          </h3>
          <p class="mt-2 text-sm text-gray-600">
            {{
              decision === 'approve'
                ? `Apakah Anda yakin ingin menyetujui permohonan dari "${cooperativeName}"?`
                : `Apakah Anda yakin ingin menolak permohonan dari "${cooperativeName}"?`
            }}
          </p>
        </div>

        <!-- Form -->
        <form class="space-y-4" @submit.prevent="handleSubmit">
          <!-- Note for Approval (Optional) -->
          <div v-if="decision === 'approve'">
            <label class="block text-sm font-medium text-gray-700 mb-2"> Catatan (Opsional) </label>
            <textarea
              v-model="note"
              rows="3"
              placeholder="Tambahkan catatan jika diperlukan..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <!-- Note for Rejection (Required) -->
          <div v-if="decision === 'reject'">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Alasan Penolakan <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="note"
              rows="4"
              required
              placeholder="Jelaskan alasan penolakan permohonan ini..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <p class="text-xs text-gray-500 mt-1">Alasan ini akan dikirimkan ke email pendaftar</p>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3 mt-6">
            <button
              type="button"
              :disabled="loading"
              class="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              @click="handleClose"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="loading"
              :class="[
                'flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
                decision === 'approve'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700',
              ]"
            >
              <span v-if="!loading">
                {{ decision === 'approve' ? 'Setujui' : 'Tolak' }}
              </span>
              <span v-else class="inline-flex items-center gap-2">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"/>
                Memproses...
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
