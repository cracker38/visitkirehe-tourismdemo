import { Routes, Route, Navigate } from 'react-router-dom'
import { AudioProvider } from './contexts/AudioContext'
import { AdminAuthProvider } from './contexts/AdminAuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminLayout from './components/admin/AdminLayout'
import ToastProvider from './components/admin/ToastProvider'
import Home from './pages/Home'
import About from './pages/About'
import ThingsToDo from './pages/ThingsToDo'
import PlacesToVisit from './pages/PlacesToVisit'
import Accommodation from './pages/Accommodation'
import Events from './pages/Events'
import Gallery from './pages/Gallery'
import TravelInfo from './pages/TravelInfo'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import PlanTrip from './pages/PlanTrip'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminAttractions from './pages/admin/AdminAttractions'
import AdminHotels from './pages/admin/AdminHotels'
import AdminEvents from './pages/admin/AdminEvents'
import AdminThingsToDo from './pages/admin/AdminThingsToDo'
import AdminGallery from './pages/admin/AdminGallery'
import AdminBlog from './pages/admin/AdminBlog'
import AdminTravelInfo from './pages/admin/AdminTravelInfo'
import AdminMessages from './pages/admin/AdminMessages'
import AdminSettings from './pages/admin/AdminSettings'

function App() {
  return (
    <AudioProvider>
      <AdminAuthProvider>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <ToastProvider>
                  <AdminLayout />
                </ToastProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="attractions" element={<AdminAttractions />} />
            <Route path="things-to-do" element={<AdminThingsToDo />} />
            <Route path="hotels" element={<AdminHotels />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="travel-info" element={<AdminTravelInfo />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/things-to-do" element={<ThingsToDo />} />
                <Route path="/places-to-visit" element={<PlacesToVisit />} />
                <Route path="/accommodation" element={<Accommodation />} />
                <Route path="/events" element={<Events />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/travel-info" element={<TravelInfo />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/plan-your-trip" element={<PlanTrip />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </AdminAuthProvider>
    </AudioProvider>
  )
}

export default App
