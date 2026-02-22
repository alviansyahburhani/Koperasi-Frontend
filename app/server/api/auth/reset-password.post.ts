export default defineEventHandler(async (event) => {
  const { token, password } = await readBody(event)

  // Validasi
  if (!token || !password) {
    throw createError({
      statusCode: 400,
      message: 'Token dan password harus diisi',
    })
  }

  if (password.length < 8) {
    throw createError({
      statusCode: 400,
      message: 'Password minimal 8 karakter',
    })
  }

  // TODO:
  // 1. Validasi token dari database
  // 2. Cek apakah token sudah expired
  // 3. Update password user
  // 4. Hapus token dari database

  return {
    success: true,
    message: 'Password berhasil diubah',
  }
})
