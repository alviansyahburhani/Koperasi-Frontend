export type AccessStatus =
  | 'Terkunci'
  | 'Full Akses'
  | 'Ketua/Sek'
  | 'Bendahara'
  | 'Sekretaris'
  | 'Menulis'
  | 'Tulis/Baca'
  | 'Read-only'
  | 'Pribadi'

export interface BukuWajibItem {
  id: string
  title: string
  icon: string
  desc: string
  pengurus: AccessStatus
  anggota: AccessStatus
  tamu: AccessStatus
}

export interface LandingStatItem {
  label: string
  value: string
}

export interface HeroContent {
  badgeText: string
  titleLine1: string
  titleHighlight: string
  description: string
  searchPlaceholder: string
  searchButtonText: string
  image: { src: string; alt: string }
  systemStatus: { label: string; value: string }
}