export function isAdminUser(googleId?: string) {
  if (!googleId) return null
  const adminIds = process.env.ADMIN_IDS?.split(',') ?? []
  return adminIds.includes(googleId)
}
