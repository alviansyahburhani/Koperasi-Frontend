// app/composables/useNavigation.ts

export const useNavigation = () => {
  // Data untuk Menu Navigasi
  const navItems = [
    { label: 'Beranda', to: '/' },
    { label: 'Tentang', to: '/tentang' },
    { label: 'Fitur', to: '/fitur' },
    { label: 'Login', to: '/login' }
  ]

  // Data untuk Customer Service & Sosial Media
  const socialLinks = [
    {
      name: 'WhatsApp',
      label: '+62 812-3456-7890',
      href: 'https://wa.me/6281234567890',
      icon: 'i-simple-icons-whatsapp', // Memakai icon whatsapp dari simple-icons
      color: 'green'
    },
    {
      name: 'Email',
      label: 'admin@koperasi.com',
      href: 'mailto:admin@koperasi.com',
      icon: 'i-heroicons-envelope', // Memakai icon amplop dari heroicons
      color: 'blue'
    },
    {
      name: 'Instagram', // Ini akan muncul di jejeran icon bawah
      label: '@koperasimerahputih',
      href: 'https://instagram.com/koperasimerahputih',
      icon: 'i-simple-icons-instagram',
      color: 'pink'
    }
  ]

  return {
    navItems,
    socialLinks
  }
}