const ADMIN_EMAIL = 'elias38@gmail.com'
const ADMIN_PASSWORD = 'Elias@123'

const sessions = new Map()

export function login(email, password) {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = `admin_${Date.now()}_${Math.random().toString(36).slice(2)}`
    sessions.set(token, { email, createdAt: Date.now() })
    return token
  }
  return null
}

export function validateSession(token) {
  if (!token || !token.startsWith('admin_')) return false
  const session = sessions.get(token)
  if (!session) return false
  if (Date.now() - session.createdAt > 7 * 24 * 60 * 60 * 1000) {
    sessions.delete(token)
    return false
  }
  return true
}

export function logout(token) {
  if (token) sessions.delete(token)
}

export function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '') || req.query.token
  if (!validateSession(token)) {
    return res.status(401).json({ error: 'Unauthorized', code: 'AUTH_REQUIRED' })
  }
  req.adminToken = token
  next()
}
