import type { AccessStatus } from '~/types/landing.types'

export const useLandingFeaturesSlider = () => {
  const sliderRef = ref<HTMLElement | null>(null)

  const scrollBy = (left: number) => {
    sliderRef.value?.scrollBy({ left, behavior: 'smooth' })
  }

  const scrollLeft = () => scrollBy(-350)
  const scrollRight = () => scrollBy(350)

  const getAccessColor = (status: AccessStatus | string) => {
    if (status === 'Terkunci') return 'text-red-500 bg-red-50'
    if (['Full Akses', 'Ketua/Sek', 'Bendahara', 'Sekretaris'].includes(status))
      return 'text-indigo-600 bg-indigo-50'
    if (['Menulis', 'Tulis/Baca'].includes(status)) return 'text-blue-600 bg-blue-50'
    return 'text-emerald-600 bg-emerald-50'
  }

  return { sliderRef, scrollLeft, scrollRight, getAccessColor }
}