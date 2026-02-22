export default defineEventHandler(async (event) => {
  const { token } = await readBody(event)

  if (!token) {
    throw createError({
      statusCode: 400,
      message: 'Token tidak valid',
    })
  }

  // TODO:
  // 1. Cek token di database
  // 2. Cek apakah sudah expired

  return {
    valid: true,
  }
})
