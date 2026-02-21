export default defineEventHandler(async (event) => {
  const { email } = await readBody(event)
  
  // Validasi email
  if (!email || !email.includes('@')) {
    throw createError({
      statusCode: 400,
      message: 'Email tidak valid'
    })
  }
  
  // TODO: 
  // 1. Cek apakah email terdaftar di database
  // 2. Generate reset token
  // 3. Simpan token ke database dengan expiry time
  // 4. Kirim email dengan link reset
  
  // Untuk saat ini return success
  return { 
    success: true,
    message: 'Link reset password telah dikirim ke email Anda'
  }
})