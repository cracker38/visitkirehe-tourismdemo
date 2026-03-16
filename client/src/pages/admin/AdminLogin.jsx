import { useState, useEffect } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdminAuth } from '../../contexts/AdminAuthContext'
import { login } from '../../api/admin'

const REMEMBER_KEY = 'visitkirehe_admin_email'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(null)
  const [forgotMessage, setForgotMessage] = useState(false)
  const { user, loading: authLoading, loginSuccess } = useAdminAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem(REMEMBER_KEY)
    if (saved) {
      setEmail(saved)
      setRememberMe(true)
    }
  }, [])

  useEffect(() => {
    const dark = localStorage.getItem('adminDark') === 'true'
    if (dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [])

  if (user) return <Navigate to="/admin/dashboard" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email.trim(), password)
      if (rememberMe) localStorage.setItem(REMEMBER_KEY, email.trim())
      else localStorage.removeItem(REMEMBER_KEY)
      loginSuccess()
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (error) setError('')
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (error) setError('')
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-10 h-10 border-2 border-nature border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 dark:text-gray-400 text-sm">Checking session...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
      {/* Left panel - branding (hidden on small screens) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="hidden lg:flex lg:w-[48%] xl:w-[52%] relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-95"
          style={{
            background: 'linear-gradient(135deg, #0D3D10 0%, #1B5E20 40%, #0288D1 100%)',
          }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.06\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-80" />
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 text-white">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
              </svg>
              <span className="font-semibold text-lg">Visit Kirehe</span>
            </Link>
          </div>
          <div className="max-w-md">
            <h2 className="text-3xl xl:text-4xl font-bold leading-tight mb-4">
              Manage your tourism platform with confidence
            </h2>
            <p className="text-white/85 text-lg">
              Access the admin dashboard to update attractions, events, gallery, and travel information for Kirehe District.
            </p>
          </div>
          <div className="flex items-center gap-6 text-white/80 text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-sunshine" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Secure login
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-sunshine" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Full content control
            </span>
          </div>
        </div>
      </motion.div>

      {/* Right panel - form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12"
      >
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-nature dark:text-lake-light font-semibold text-lg">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" /></svg>
              Visit Kirehe
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-xl dark:shadow-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden">
            <div className="p-8 sm:p-10">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-nature to-nature-dark dark:from-lake-blue dark:to-lake-light text-white mb-4 shadow-lg"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </motion.div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Admin sign in
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm sm:text-base">
                  Enter your credentials to access the dashboard
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {forgotMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-lake-blue/10 dark:bg-lake-blue/20 border border-lake-blue/30 dark:border-lake-blue/40 text-lake-blue dark:text-lake-light text-sm"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span>Contact your system administrator to reset your password.</span>
                  </motion.div>
                )}
                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-300 text-sm"
                    >
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Email address
                  </label>
                  <div
                    className={`relative rounded-xl border bg-gray-50/50 dark:bg-gray-800/50 transition-all duration-200 ${
                      focused === 'email'
                        ? 'ring-2 ring-nature dark:ring-lake-light border-nature dark:border-lake-light'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </span>
                    <input
                      id="admin-email"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      required
                      autoComplete="email"
                      placeholder="admin@visitkirehe.rw"
                      className="w-full pl-12 pr-4 py-3.5 bg-transparent border-0 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-0 text-sm sm:text-base rounded-xl"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Password
                  </label>
                  <div
                    className={`relative rounded-xl border bg-gray-50/50 dark:bg-gray-800/50 transition-all duration-200 ${
                      focused === 'password'
                        ? 'ring-2 ring-nature dark:ring-lake-light border-nature dark:border-lake-light'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                    <input
                      id="admin-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={handlePasswordChange}
                      onFocus={() => setFocused('password')}
                      onBlur={() => setFocused(null)}
                      required
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3.5 bg-transparent border-0 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-0 text-sm sm:text-base rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="flex items-center justify-between flex-wrap gap-2"
                >
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-nature dark:text-lake-light focus:ring-nature dark:focus:ring-lake-light"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      Remember email
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotMessage(true)
                      setTimeout(() => setForgotMessage(false), 5000)
                    }}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-nature dark:hover:text-lake-light transition-colors"
                  >
                    Forgot password?
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-nature to-nature-dark dark:from-lake-blue dark:to-lake-light text-white font-semibold shadow-lg shadow-nature/25 dark:shadow-lake-blue/25 hover:shadow-xl hover:shadow-nature/30 dark:hover:shadow-lake-blue/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nature dark:focus:ring-lake-light disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      'Sign in'
                    )}
                  </button>
                </motion.div>
              </form>

              <p className="mt-8 text-center">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-nature dark:hover:text-lake-light transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to website
                </Link>
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">
            Protected admin area. Unauthorized access is prohibited.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
