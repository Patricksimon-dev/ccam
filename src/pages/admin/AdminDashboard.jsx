import { Link } from 'react-router-dom'
import { useContent } from '../../context/ContentContext'
import { FaBullhorn, FaBook, FaCalendarWeek, FaCalendarAlt, FaInfoCircle, FaUsers } from 'react-icons/fa'

const sections = [
  { key: 'about', label: 'About', icon: FaInfoCircle, path: '/admin/about', count: () => '1 page' },
  { key: 'leadership', label: 'Leadership', icon: FaUsers, path: '/admin/leadership' },
  { key: 'announcements', label: 'Announcements', icon: FaBullhorn, path: '/admin/announcements' },
  { key: 'sermons', label: 'Sermons', icon: FaBook, path: '/admin/sermons' },
  { key: 'activities', label: 'Weekly Activities', icon: FaCalendarWeek, path: '/admin/activities' },
  { key: 'events', label: 'Church Events', icon: FaCalendarAlt, path: '/admin/events' },
]

export default function AdminDashboard() {
  const { data } = useContent()

  return (
    <div className="admin-page">
      <h1>Dashboard</h1>
      <p className="admin-subtitle">Manage your church website content</p>

      <div className="admin-stats">
        {sections.map(({ key, label, icon: Icon, path, count }) => (
          <Link key={key} to={path} className="stat-card">
            <Icon className="stat-icon" />
            <div>
              <span className="stat-count">{count ? count() : data[key].length}</span>
              <span className="stat-label">{label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
