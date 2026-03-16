import { Navigate, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../../contexts/AdminAuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAdminAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return children
}
