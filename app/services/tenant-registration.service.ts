import { apiService } from './api.service'
import type {
  TenantRegistrationForm,
  RegistrationResponse,
  DocumentUploadResponse,
} from '~/types/registration'

export class TenantRegistrationService {
  /**
   * Check if _subdomain is available
   */
  async checkSubdomainAvailability(_subdomain: string): Promise<{ available: boolean }> {
    try {
      // Backend endpoint untuk check subdomain (jika ada)
      // Untuk sekarang, kita validasi di frontend dulu
      // TODO: Add backend endpoint GET /api/public/check-subdomain/:subdomain
      return { available: true }
    } catch (error) {
      console.error('[TenantRegistration] Check _subdomain error:', error)
      return { available: false }
    }
  }

  /**
   * Upload document file
   */
  async uploadDocument(file: File, documentType: string): Promise<DocumentUploadResponse> {
    const formData = new FormData()
    formData.append('file', file)

    const endpoints: Record<string, string> = {
      pengesahan: '/api/uploads/tenant-registration/pengesahan-pendirian',
      daftarUmum: '/api/uploads/tenant-registration/daftar-umum',
      akte: '/api/uploads/tenant-registration/akte-notaris',
      npwp: '/api/uploads/tenant-registration/npwp-koperasi',
    }

    const endpoint = endpoints[documentType]
    if (!endpoint) {
      throw new Error('Invalid document type')
    }

    const response = await apiService.post<DocumentUploadResponse>(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response
  }

  /**
   * Submit registration
   */
  async submitRegistration(
    data: Omit<TenantRegistrationForm, 'confirmPassword'>
  ): Promise<RegistrationResponse> {
    // Transform data to match backend DTO
    const payload = {
      // Informasi Koperasi
      cooperativeName: data.cooperativeName,
      _subdomain: data.subdomain.toLowerCase().trim(),
      skAhuKoperasi: data.skAhuKoperasi || undefined,

      // Alamat
      province: data.province,
      city: data.city,
      district: data.district,
      village: data.village,
      alamatLengkap: data.alamatLengkap,
      petaLokasi: data.petaLokasi || undefined,

      // Data PIC
      picFullName: data.picFullName,
      picNik: data.picNik,
      picGender: data.picGender,
      picPlaceOfBirth: data.picPlaceOfBirth,
      picDateOfBirth: data.picDateOfBirth, // Already in YYYY-MM-DD format
      picOccupation: data.picOccupation,
      picAddress: data.picAddress,
      picPhoneNumber: data.picPhoneNumber,

      // Akun
      email: data.email,
      password: data.password,

      // Dokumen
      dokPengesahanPendirianUrl: data.dokPengesahanPendirianUrl || undefined,
      dokDaftarUmumUrl: data.dokDaftarUmumUrl || undefined,
      dokAkteNotarisUrl: data.dokAkteNotarisUrl || undefined,
      dokNpwpKoperasiUrl: data.dokNpwpKoperasiUrl || undefined,

      // Subscription
      subscriptionPlan: data.subscriptionPlan,
    }

    return apiService.post<RegistrationResponse>('/api/public/register', payload)
  }
}

export const tenantRegistrationService = new TenantRegistrationService()
