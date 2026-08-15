import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaHeart, FaChevronRight } from 'react-icons/fa'
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn, FaTiktok, FaYoutube, FaWhatsapp } from 'react-icons/fa6'
import './Footer.css'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Leadership', path: '/leadership' },
  { label: 'Announcements', path: '/announcements' },
  { label: 'Donations', path: '/donation' },
  { label: 'Contact Us', path: '/contact' },
]

const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com', icon: FaFacebookF },
  { label: 'Instagram', href: 'https://instagram.com', icon: FaInstagram },
  { label: 'X', href: 'https://x.com', icon: FaXTwitter },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: FaLinkedinIn },
  { label: 'TikTok', href: 'https://tiktok.com', icon: FaTiktok },
  { label: 'YouTube', href: 'https://youtube.com', icon: FaYoutube },
  { label: 'WhatsApp', href: 'https://wa.me/2349012484878', icon: FaWhatsapp },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col footer-branding">
          <div className="footer-logo-wrap">
            <img src="/logo1.png" alt="Christ Chosen Assembly Ministry logo" className="footer-logo" />
          </div>
          <h3 className="footer-title">Christ Chosen Assembly Ministry</h3>
          <p className="footer-tagline">
            Building faith, hope, and love in our community. Spreading the Gospel of Jesus Christ across the nations.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-nav">
            {navLinks.map(({ label, path }) => (
              <li key={path}>
                <Link to={path} className="footer-nav-link">
                  <FaChevronRight className="nav-arrow" /> {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Contact Info</h4>
          <div className="footer-contact-list">
            <p><FaMapMarkerAlt className="footer-icon" /> <span>No 15 Anikulapo Street, Agege, Lagos, Nigeria</span></p>
            <p><FaPhone className="footer-icon" /> <a href="tel:+2349012484878">+234 901 248 4878</a></p>
            <p><FaEnvelope className="footer-icon" /> <a href="mailto:christchosenassemblymin@gmail.com">christchosenassemblymin@gmail.com</a></p>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Worship Schedule</h4>
          <div className="footer-schedule">
            <div className="schedule-item">
              <FaClock className="footer-icon" />
              <div>
                <strong>Sunday Worship</strong>
                <span>08:30 AM</span>
              </div>
            </div>
            <div className="schedule-item">
              <FaClock className="footer-icon" />
              <div>
                <strong>Wednesday Bible Study</strong>
                <span>07:00 PM</span>
              </div>
            </div>
          </div>

          <div className="footer-social-wrapper">
            <span className="social-label">Follow Us</span>
            <div className="footer-social-icons">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="footer-social-link">
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} Christ Chosen Assembly Ministry. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/donation" className="footer-give-btn">
              <FaHeart /> Support Ministry
            </Link>
            <Link to="/admin/login" className="admin-link">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
