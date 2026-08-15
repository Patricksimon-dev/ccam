import { Link, NavLink } from 'react-router-dom'
import './Header.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/leadership', label: 'Leadership' },
  { to: '/contact', label: 'Contact' },
  { to: '/donation', label: 'Donation' },
  { to: '/announcements', label: 'Announcement' },
]

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <img src="/logo1.png" alt="Logo" className="logo-image" style={{height:'40px',marginRight:'8px'}} />
          <span>Christ Chosen Assembly Ministry</span>
        </Link>
        <nav className="main-nav">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              end={to === '/'}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
