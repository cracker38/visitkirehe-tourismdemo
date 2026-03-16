import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { apiUrl } from '../api/apiUrl'
import BackgroundMusic from './BackgroundMusic'
import AudioMuteButton from './AudioMuteButton'

// Five main nav items; some have dropdown (second row of links)
const mainNavItems = [
  { id: 'home', label: 'Home', to: '/' },
  {
    id: 'discover',
    label: 'Discover',
    dropdown: [
      { to: '/about', label: 'About Kirehe' },
      { to: '/things-to-do', label: 'Things To Do' },
      { to: '/places-to-visit', label: 'Places to Visit' },
      { to: '/gallery', label: 'Gallery' },
    ],
  },
  {
    id: 'plan',
    label: 'Plan',
    dropdown: [
      { to: '/accommodation', label: 'Accommodation' },
      { to: '/events', label: 'Events & Culture' },
    ],
  },
  {
    id: 'info',
    label: 'Travel & Info',
    dropdown: [
      { to: '/travel-info', label: 'Travel Info' },
      { to: '/blog', label: 'Blog & Stories' },
    ],
  },
  { id: 'contact', label: 'Contact', to: '/contact' },
]

// Flat list for footer / mobile
const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Kirehe' },
  { to: '/things-to-do', label: 'Things To Do' },
  { to: '/places-to-visit', label: 'Places to Visit' },
  { to: '/accommodation', label: 'Accommodation' },
  { to: '/events', label: 'Events & Culture' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/travel-info', label: 'Travel Info' },
  { to: '/contact', label: 'Contact' },
]

function LogoIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="20" cy="20" r="18" stroke="url(#logo-a)" strokeWidth="2" fill="none" />
      <ellipse cx="20" cy="20" rx="8" ry="18" stroke="url(#logo-a)" strokeWidth="1.5" fill="none" />
      <path d="M4 20h32" stroke="url(#logo-a)" strokeWidth="1.2" />
      <defs>
        <linearGradient id="logo-a" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1B5E20" />
          <stop offset="1" stopColor="#0288D1" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function Layout({ children }) {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdownId, setOpenDropdownId] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Keep dropdown open when current path is inside it
  useEffect(() => {
    const path = location.pathname
    const parent = mainNavItems.find(
      (item) => item.dropdown && item.dropdown.some((sub) => sub.to === path || (sub.to !== '/' && path.startsWith(sub.to)))
    )
    if (parent) setOpenDropdownId(parent.id)
    else setOpenDropdownId(null)
  }, [location.pathname])

  const activeDropdown = mainNavItems.find((item) => item.id === openDropdownId)

  const isActiveParent = (item) =>
    item.dropdown && item.dropdown.some((sub) => location.pathname === sub.to || (sub.to !== '/' && location.pathname.startsWith(sub.to)))

  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundMusic />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.06)]' : 'bg-white border-b border-gray-100'
        }`}
      >
        <nav className="container mx-auto px-4 lg:px-6" onMouseLeave={() => setOpenDropdownId(null)}>
          {/* Top row: logo + 5 main nav + CTA */}
          <div className="flex items-center h-14">
            <Link
              to="/"
              className="flex items-center gap-3 shrink-0 lg:mr-0 mr-auto group"
              aria-label="Visit Kirehe – Home"
            >
              <LogoIcon className="w-9 h-9 shrink-0 text-nature" />
              <span className="flex flex-col leading-tight">
                <span className="text-base font-bold text-nature tracking-tight">Visit</span>
                <span className="text-base font-bold text-nature tracking-tight -mt-0.5">Kirehe</span>
              </span>
            </Link>

            <div className="hidden xl:block flex-1 min-w-0" aria-hidden />

            {/* Five main nav items (desktop) */}
            <div className="hidden xl:flex items-center gap-0 shrink-0">
              {mainNavItems.map((item) => {
                const isOpen = openDropdownId === item.id
                if (item.to) {
                  return (
                    <NavLink
                      key={item.id}
                      to={item.to}
                      className={({ isActive }) =>
                        `px-4 py-2.5 text-[15px] font-medium rounded-lg transition-colors ${
                          isActive ? 'text-lake-blue' : 'text-gray-600 hover:text-lake-blue hover:bg-gray-50'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  )
                }
                const isActive = isActiveParent(item)
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setOpenDropdownId(item.id)}
                  >
                    <button
                      type="button"
                      className={`px-4 py-2.5 text-[15px] font-medium rounded-lg transition-colors flex items-center gap-1 ${
                        isOpen || isActive ? 'text-lake-blue' : 'text-gray-600 hover:text-lake-blue hover:bg-gray-50'
                      }`}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <svg className={`w-4 h-4 transition-transform ${isOpen || isActive ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                )
              })}
              <AudioMuteButton />
              <span className="w-px h-5 bg-gray-200 ml-1 mr-3 flex-shrink-0" aria-hidden />
              <Link
                to="/plan-your-trip"
                className="inline-flex items-center gap-2 bg-nature hover:bg-nature-dark text-white font-semibold text-[15px] py-2.5 px-5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
              >
                Plan Your Trip
              </Link>
            </div>

            {/* Tablet: simple main links + CTA */}
            <div className="hidden lg:block xl:hidden flex-1 min-w-0" aria-hidden />
            <div className="hidden lg:flex xl:hidden items-center gap-1 shrink-0">
              <NavLink to="/" className={({ isActive }) => `px-3 py-2 text-sm font-medium rounded-lg ${isActive ? 'text-nature' : 'text-gray-600 hover:text-nature'}`}>
                Home
              </NavLink>
              <NavLink to="/places-to-visit" className={({ isActive }) => `px-3 py-2 text-sm font-medium rounded-lg ${isActive ? 'text-nature' : 'text-gray-600 hover:text-nature'}`}>
                Places
              </NavLink>
              <NavLink to="/accommodation" className={({ isActive }) => `px-3 py-2 text-sm font-medium rounded-lg ${isActive ? 'text-nature' : 'text-gray-600 hover:text-nature'}`}>
                Stay
              </NavLink>
              <NavLink to="/travel-info" className={({ isActive }) => `px-3 py-2 text-sm font-medium rounded-lg ${isActive ? 'text-nature' : 'text-gray-600 hover:text-nature'}`}>
                Travel Info
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => `px-3 py-2 text-sm font-medium rounded-lg ${isActive ? 'text-nature' : 'text-gray-600 hover:text-nature'}`}>
                Contact
              </NavLink>
              <AudioMuteButton />
              <span className="w-px h-5 bg-gray-200 mx-1" aria-hidden />
              <Link to="/plan-your-trip" className="inline-flex bg-nature hover:bg-nature-dark text-white font-semibold text-sm py-2 px-4 rounded-lg transition-all shadow-sm">
                Plan Trip
              </Link>
            </div>

            {/* Mobile: mute + menu */}
            <div className="lg:hidden flex items-center gap-1">
              <AudioMuteButton />
              <button
                type="button"
                className="p-2.5 -mr-2 rounded-xl text-nature hover:bg-nature/10 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
              </button>
            </div>
          </div>

          {/* Second row: dropdown sub-links (desktop only) */}
          <AnimatePresence>
            {activeDropdown?.dropdown && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="hidden xl:block border-t border-gray-100 bg-gray-50/80"
              >
                <div className="container mx-auto px-4 lg:px-6">
                  <div className="flex items-center gap-1 py-3">
                    {activeDropdown.dropdown.map((sub) => (
                      <NavLink
                        key={sub.to}
                        to={sub.to}
                        className={({ isActive }) =>
                          `px-4 py-2 text-[15px] font-medium rounded-lg transition-colors ${
                            isActive ? 'text-lake-blue' : 'text-gray-600 hover:text-lake-blue hover:bg-white'
                          }`
                        }
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Mobile menu – main nav + dropdown sections */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden border-t border-gray-100 bg-gray-50/80 backdrop-blur-sm"
            >
              <div className="container mx-auto px-4 py-4 max-h-[70vh] overflow-y-auto">
                {mainNavItems.map((item) => {
                  if (item.to) {
                    return (
                      <div key={item.id} className="mb-2">
                        <NavLink
                          to={item.to}
                          className={({ isActive }) =>
                            `block py-2.5 px-4 rounded-xl text-[15px] font-medium transition-colors ${
                              isActive ? 'text-nature bg-white shadow-sm' : 'text-gray-700 hover:bg-white hover:text-nature'
                            }`
                          }
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </NavLink>
                      </div>
                    )
                  }
                  return (
                    <div key={item.id} className="mb-4 last:mb-0">
                      <p className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        {item.label}
                      </p>
                      <ul className="space-y-0.5">
                        {item.dropdown.map((sub) => (
                          <li key={sub.to}>
                            <NavLink
                              to={sub.to}
                              className={({ isActive }) =>
                                `block py-2.5 px-4 rounded-xl text-[15px] font-medium transition-colors ${
                                  isActive ? 'text-nature bg-white shadow-sm' : 'text-gray-700 hover:bg-white hover:text-nature'
                                }`
                              }
                              onClick={() => setMobileOpen(false)}
                            >
                              {sub.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
                <div className="pt-3 mt-2 border-t border-gray-200">
                  <Link
                    to="/plan-your-trip"
                    className="flex items-center justify-center w-full bg-nature hover:bg-nature-dark text-white font-semibold py-3.5 px-4 rounded-xl transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Plan Your Trip
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className={`flex-1 transition-[padding] duration-200 ${activeDropdown?.dropdown ? 'pt-[7.5rem]' : 'pt-16'}`}>
        {children}
      </main>

      <Footer />
    </div>
  )
}

function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletter = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(apiUrl('/api/newsletter'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) setSubscribed(true)
    } catch {
      setSubscribed(true) // fallback for demo
    }
  }

  return (
    <footer className="bg-nature text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>🌍</span> Visit Kirehe
            </h3>
            <p className="text-white/90 text-sm">
              Promoting tourism, culture, and nature in Kirehe District, Eastern Province of Rwanda.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/90">
              {navLinks.slice(0, 5).map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="hover:text-sunshine transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-white/90">
              <li>Kirehe District, Eastern Province</li>
              <li>Rwanda</li>
              <li>info@visitkirehe.rw</li>
              <li>+250785354935</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            {subscribed ? (
              <p className="text-sunshine text-sm">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="px-3 py-2 rounded text-gray-800 text-sm"
                  required
                />
                <button type="submit" className="btn-accent text-sm py-2">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/80">
            © {new Date().getFullYear()} Visit Kirehe Tourism Platform. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-white/80 hover:text-sunshine transition-colors" aria-label="Facebook">Facebook</a>
            <a href="#" className="text-white/80 hover:text-sunshine transition-colors" aria-label="Twitter">Twitter</a>
            <a href="#" className="text-white/80 hover:text-sunshine transition-colors" aria-label="Instagram">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
