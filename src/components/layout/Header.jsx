import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
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
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Auto-close menu when route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const toggleMenu = () => setMenuOpen((prev) => !prev)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src="/logo1.png" alt="Logo" className="logo-image" />
          <span className="logo-text">Christ Chosen Assembly Ministry</span>
          <span className="logo-text-short">CCAM</span>
        </Link>

        <button
          className="mobile-toggle"
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`main-nav ${menuOpen ? 'mobile-open' : ''}`}>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMenu}
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
