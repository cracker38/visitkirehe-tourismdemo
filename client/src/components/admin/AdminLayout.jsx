import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, Outlet } from 'react-router-dom'
import { useAdminAuth } from '../../contexts/AdminAuthContext'

const nav = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/admin/attractions', label: 'Attractions', icon: '🏞️' },
  { to: '/admin/things-to-do', label: 'Things To Do', icon: '🎯' },
  { to: '/admin/hotels', label: 'Hotels', icon: '🏨' },
  { to: '/admin/events', label: 'Events', icon: '📅' },
  { to: '/admin/gallery', label: 'Gallery', icon: '🖼️' },
  { to: '/admin/blog', label: 'Blog', icon: '📝' },
  { to: '/admin/travel-info', label: 'Travel Info', icon: 'ℹ️' },
  { to: '/admin/messages', label: 'Messages', icon: '✉️' },
  { to: '/admin/settings', label: 'Settings', icon: '⚙️' },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('adminDark') === 'true')
  const { user, logout } = useAdminAuth()
  const navigate = useNavigate()

  const toggleDark = () => {
    setDarkMode((d) => !d)
    localStorage.setItem('adminDark', !darkMode)
    document.documentElement.classList.toggle('dark', !darkMode)
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <aside
        className={`fixed left-0 top-0 z-40 h-full w-64 border-r transition-transform ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex h-14 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/admin/dashboard" className="font-bold text-nature dark:text-lake-light">
            Visit Kirehe Admin
          </Link>
          <button type="button" className="lg:hidden p-2" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            ✕
          </button>
        </div>
        <nav className="p-3 space-y-0.5">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-nature text-white dark:bg-nature dark:text-white'
                    : darkMode
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-nature'
                }`
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1 lg:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b px-4 bg-white/95 dark:bg-gray-800/95 dark:border-gray-700 backdrop-blur">
          <button type="button" className="p-2 lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Menu">
            ☰
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleDark}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">{user?.email}</span>
            <Link to="/" className="text-sm text-nature hover:underline" target="_blank" rel="noopener noreferrer">
              View site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="p-4 md:p-6"><Outlet /></main>
      </div>
    </div>
  )
}
