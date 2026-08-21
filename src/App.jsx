import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './context/AuthContext'
import { ContentProvider } from './context/ContentContext'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminLayout from './components/admin/AdminLayout'
import Home from './pages/Home'
import About from './pages/About'
import Leadership from './pages/Leadership'
import Contact from './pages/Contact'
import Donation from './pages/Donation'
import Announcements from './pages/Announcements'
import Sermons from './pages/Sermons'
import Activities from './pages/Activities'
import Events from './pages/Events'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageAnnouncements from './pages/admin/ManageAnnouncements'
import ManageSermons from './pages/admin/ManageSermons'
import ManageActivities from './pages/admin/ManageActivities'
import ManageEvents from './pages/admin/ManageEvents'
import ManageAbout from './pages/admin/ManageAbout'
import ManageLeadership from './pages/admin/ManageLeadership'
import ManageSocial from './pages/admin/ManageSocial'

export default function App() {
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    const hasSeenWelcome = window.localStorage.getItem('ccam-welcome-seen') === 'true'
    if (!hasSeenWelcome) {
      setShowWelcome(true)
    }
  }, [])

  const closeWelcome = () => {
    window.localStorage.setItem('ccam-welcome-seen', 'true')
    setShowWelcome(false)
  }

  return (
    <AuthProvider>
      <ContentProvider>
        <BrowserRouter>
          {showWelcome && (
            <div className="welcome-overlay">
              <div className="welcome-modal" role="dialog" aria-modal="true">
                <button className="welcome-close" onClick={closeWelcome} aria-label="Close welcome message">
                  ×
                </button>

                <div className="welcome-logo-badge" aria-hidden="true">
                  <img src="/logo1.png" alt="Christ Chosen Assembly Ministry logo" className="welcome-logo-image" />
                </div>

                <h1>Welcome to Christ Chosen Assembly Ministry</h1>
                <p>
                  We are glad you are here. May your visit bring peace, encouragement, and divine connection.
                </p>

                <button className="welcome-enter-btn" onClick={closeWelcome}>
                  Enter Site
                </button>
              </div>
            </div>
          )}

          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="leadership" element={<Leadership />} />
              <Route path="contact" element={<Contact />} />
              <Route path="donation" element={<Donation />} />
              <Route path="announcements" element={<Announcements />} />
              <Route path="sermons" element={<Sermons />} />
              <Route path="activities" element={<Activities />} />
              <Route path="events" element={<Events />} />
            </Route>

            <Route path="admin/login" element={<AdminLogin />} />
            <Route
              path="admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="announcements" element={<ManageAnnouncements />} />
              <Route path="sermons" element={<ManageSermons />} />
              <Route path="activities" element={<ManageActivities />} />
              <Route path="events" element={<ManageEvents />} />
              <Route path="about" element={<ManageAbout />} />
              <Route path="leadership" element={<ManageLeadership />} />
              <Route path="social" element={<ManageSocial />} />
            </Route>
          </Routes>
          <ToastContainer position="bottom-right" autoClose={3000} />
        </BrowserRouter>
      </ContentProvider>
    </AuthProvider>
  )
}
