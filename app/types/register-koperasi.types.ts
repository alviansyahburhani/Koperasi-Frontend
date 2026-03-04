export type Gender = 'Laki-laki' | 'Perempuan'

export type RegisterKoperasiStep = 1 | 2 | 3 | 4

export type DokumenKey = 'pengesahan' | 'daftarUmum' | 'aktaNotaris' | 'npwp'

export interface RegisterKoperasiFiles {
  pengesahan: File | null
  daftarUmum: File | null
  aktaNotaris: File | null
  npwp: File | null
}

export interface RegisterKoperasiFormData {
  // Step 1
  cooperativeName: string
  subdomain: string
  skAhuKoperasi: string
  province: string
  city: string
  district: string
  village: string
  alamatLengkap: string
  petaLokasi: string

  // Step 2
  picFullName: string
  picNik: string
  picGender: Gender
  picPlaceOfBirth: string
  picDateOfBirth: string
  picOccupation: string
  picPhoneNumber: string
  picAddress: string

  // Step 3
  email: string
  password: string
  confirmPassword: string

  // Step 4
  files: RegisterKoperasiFiles
}

export type RegisterKoperasiErrors = Partial<Record<keyof RegisterKoperasiFormData, string>> & {
  files?: Partial<Record<DokumenKey, string>>
}