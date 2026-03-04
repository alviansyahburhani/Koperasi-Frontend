<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})

useHead({
  title: 'Pendaftaran Koperasi - Sistem Koperasi',
  meta: [{ name: 'description', content: 'Pendaftaran akun koperasi' }],
})
</script>

<template>
  <RegisterKoperasiWizard />
</template>