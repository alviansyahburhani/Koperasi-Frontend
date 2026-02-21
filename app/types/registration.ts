export type Gender = 'MALE' | 'FEMALE'
export type SubscriptionPlan = 'MONTHLY' | 'YEARLY'

export interface TenantRegistrationForm {
  // Step 1: Informasi Koperasi
  cooperativeName: string
  subdomain: string
  skAhuKoperasi: string
  
  // Step 2: Alamat
  province: string
  city: string
  district: string
  village: string
  alamatLengkap: string
  petaLokasi: string
  
  // Step 3: Data PIC
  picFullName: string
  picNik: string
  picGender: Gender
  picPlaceOfBirth: string
  picDateOfBirth: string
  picOccupation: string
  picAddress: string
  picPhoneNumber: string
  
  // Step 4: Akun Login
  email: string
  password: string
  confirmPassword: string
  
  // Step 5: Dokumen
  dokPengesahanPendirianUrl: string
  dokDaftarUmumUrl: string
  dokAkteNotarisUrl: string
  dokNpwpKoperasiUrl: string
  
  // Step 6: Subscription
  subscriptionPlan: SubscriptionPlan
}

export interface RegistrationResponse {
  message: string
  tenant: {
    id: string
    name: string
    subdomain: string
    status: string
  }
  paymentUrl?: string
}

export interface DocumentUploadResponse {
  url: string
  filename: string
  size: number
}