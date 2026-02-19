/**
 * Navigation Composable
 * Centralized navigation data
 */

export const useNavigation = () => {
  const navItems = [
    { label: 'Beranda', to: '/', icon: 'i-heroicons-home' },
    { label: 'Tentang', to: '/tentang', icon: 'i-heroicons-information-circle' },
    { label: 'Fitur', to: '/fitur', icon: 'i-heroicons-sparkles' },
    { label: 'Login', to: '/login', icon: 'i-heroicons-arrow-right-on-rectangle' }
  ]

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: 'i-heroicons-chat-bubble-left-right',
      href: 'https://wa.me/6281234567890',
      label: '+62 812-3456-7890',
      color: 'green'
    },
    {
      name: 'Email',
      icon: 'i-heroicons-envelope',
      href: 'mailto:admin@koperasimerahputih.com',
      label: 'admin@koperasi.com',
      color: 'blue'
    },
    {
      name: 'Instagram',
      icon: 'i-heroicons-camera',
      href: 'https://instagram.com/koperasimerahputih',
      label: '@koperasimerahputih',
      color: 'pink'
    }
  ]

  return {
    navItems,
    socialLinks
  }
}