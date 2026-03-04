<script setup lang="ts">
import LoginForm from '~/components/auth/LoginForm.vue'

definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})

useHead({
  title: 'Login - Sistem Koperasi',
  meta: [{ name: 'description', content: 'Login ke sistem koperasi' }],
})

const { form, loading, showPassword, errorMessage, submit, clearError } = useLoginForm()
</script>

<template>
  <LoginForm
    v-model:email="form.email"
    v-model:password="form.password"
    v-model:rememberMe="form.rememberMe"
    :loading="loading"
    :show-password="showPassword"
    :error-message="errorMessage"
    @submit="submit"
    @clear-error="clearError"
    @update:show-password="showPassword = $event"
  />
</template>