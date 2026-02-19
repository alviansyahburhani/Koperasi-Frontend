<template>
  <div class="max-w-md mx-auto mt-16">
    <UCard>
      <template #header>
        <h2 class="text-2xl font-bold text-center text-slate-800">Login Sistem</h2>
      </template>

      <form class="space-y-5" @submit.prevent="handleLogin">
        
        <UFormGroup label="Email" name="email">
          <UInput type="email" placeholder="admin@koperasimerahputih.com" icon="i-heroicons-envelope" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput type="password" placeholder="••••••••" icon="i-heroicons-lock-closed" />
        </UFormGroup>

        <div class="flex items-center justify-between text-sm">
          <UCheckbox label="Ingat saya" name="remember" />
          <NuxtLink to="/forgot-password" class="text-primary-600 hover:underline">Lupa password?</NuxtLink>
        </div>

        <UButton type="submit" color="primary" block size="lg" class="mt-6">
          Masuk
        </UButton>
        
      </form>
    </UCard>
  </div>
</template>

<script setup>
// Fungsi yang akan dijalankan saat tombol Masuk diklik
const handleLogin = () => {
  alert('Nanti ini akan dihubungkan ke API NestJS milikmu!');
}
</script>