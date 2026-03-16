import { createContext, useContext, useState, useEffect } from 'react'
import { getMe, logout as apiLogout, isAuthenticated } from '../api/admin'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated()) {
      setLoading(false)
      return
    }
    getMe()
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem('adminToken')
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const logout = () => {
    apiLogout()
    setUser(null)
  }

  const loginSuccess = () => {
    getMe().then(setUser)
  }

  return (
    <AdminAuthContext.Provider value={{ user, loading, logout, loginSuccess }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
