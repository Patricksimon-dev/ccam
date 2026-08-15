import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FaChurch, FaSignOutAlt } from 'react-icons/fa'
import './AdminLayout.css'

const adminLinks = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/about', label: 'About' },
  { to: '/admin/leadership', label: 'Leadership' },
  { to: '/admin/announcements', label: 'Announcements' },
  { to: '/admin/sermons', label: 'Sermons' },
  { to: '/admin/activities', label: 'Weekly Activities' },
  { to: '/admin/events', label: 'Church Events' },
  { to: '/admin/social', label: 'Social Media' },
]

export default function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <FaChurch />
          <span>Church Admin</span>
        </div>
        <nav className="admin-nav">
          {adminLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => (isActive ? 'admin-nav-link active' : 'admin-nav-link')}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-nav-link">View Site</Link>
          <button type="button" className="admin-nav-link logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  )
}
