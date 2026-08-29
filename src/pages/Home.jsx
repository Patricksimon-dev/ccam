import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { useContent } from '../context/ContentContext';
import { FaBullhorn, FaBook, FaCalendarWeek, FaCalendarAlt, FaChurch, FaHeart, FaHandsHelping, FaStar } from 'react-icons/fa';
import './Home.css';
import ContactForm from '../components/ContactForm';
import Map from '../components/Map';

export default function Home() {
  const { data } = useContent();
  const pinnedAnnouncement = data.announcements.find((a) => a.pinned);
  const latestSermon = data.sermons[0];
  const upcomingEvent = [...data.events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .find((e) => e.date >= new Date().toISOString().slice(0, 10));

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-branding">
            <h1>CHRIST CHOSEN</h1>
            <h2>ASSEMBLY MINISTRY</h2>
            <img src="/logo1.png" alt="Christ Chosen Assembly Ministry logo" className="hero-logo" />
            <p className="hero-verse">Surely Jesus is Alive — Rev 1:8</p>
          </div>
          <p className="hero-subtitle">
            A place of worship, fellowship, and spiritual growth for all.
          </p>
          <div className="hero-actions">
            <Link to="/sermons" className="btn btn-primary">Watch Sermons</Link>
            <Link to="/events" className="btn btn-outline">Upcoming Events</Link>
          </div>
        </div>
      </section>

      <section className="welcome-alert-banner">
        <div className="welcome-alert-header">
          <div className="welcome-alert-badge">
            <FaChurch className="welcome-icon-glow" />
            <span>Welcome Alert</span>
          </div>
        </div>
        <div className="welcome-alert-body">
          <h2 className="welcome-alert-title">Welcome to Christ Chosen Assembly Ministry!</h2>
          <p className="welcome-alert-text">
            We are overjoyed to welcome you to our faith family. Whether you are seeking a spiritual home, looking for prayer, or exploring faith, you are warmly invited to worship, grow, and serve with us.
          </p>
          <div className="welcome-highlights-row">
            <span className="welcome-pill"><FaHeart /> Spirit-Filled Worship</span>
            <span className="welcome-pill"><FaStar /> Uncompromising Word</span>
            <span className="welcome-pill"><FaHandsHelping /> Loving Fellowship</span>
          </div>
          <div className="welcome-alert-actions">
            <Link to="/about" className="welcome-btn-primary">Discover Our Heart</Link>
            <Link to="/leadership" className="welcome-btn-outline">Meet General Overseer &amp; Leadership</Link>
          </div>
        </div>
      </section>

      {pinnedAnnouncement && (
        <section className="pinned-alert-banner">
          <div className="pinned-alert-icon-box">
            <FaBullhorn />
          </div>
          <div className="pinned-alert-body">
            <span className="badge">Pinned Announcement</span>
            <h2>{pinnedAnnouncement.title}</h2>
            <p>{pinnedAnnouncement.content}</p>
          </div>
        </section>
      )}

      <section className="quick-links">
        <Link to="/announcements" className="quick-card">
          <FaBullhorn />
          <h3>Announcements</h3>
          <p>{data.announcements.length} active</p>
        </Link>
        <Link to="/sermons" className="quick-card">
          <FaBook />
          <h3>Sermons</h3>
          <p>Latest messages</p>
        </Link>
        <Link to="/activities" className="quick-card">
          <FaCalendarWeek />
          <h3>Weekly Activities</h3>
          <p>{data.activities.length} programs</p>
        </Link>
        <Link to="/events" className="quick-card">
          <FaCalendarAlt />
          <h3>Church Events</h3>
          <p>Join us soon</p>
        </Link>
      </section>

      <div className="home-grid">
        {latestSermon && (
          <section className="section card">
            <h2>Latest Sermon</h2>
            <h3>{latestSermon.title}</h3>
            <p className="meta">
              {latestSermon.preacher} &middot;{' '}
              {format(parseISO(latestSermon.date), 'MMMM d, yyyy')}
            </p>
            <p>{latestSermon.summary}</p>
            <Link to="/sermons" className="link-more">View all sermons &rarr;</Link>
          </section>
        )}

        {upcomingEvent && (
          <section className="section card">
            <h2>Next Event</h2>
            <h3>{upcomingEvent.title}</h3>
            <p className="meta">
              {format(parseISO(upcomingEvent.date), 'MMMM d, yyyy')} at {upcomingEvent.time}
            </p>
            <p>{upcomingEvent.description}</p>
            <Link to="/events" className="link-more">See all events &rarr;</Link>
          </section>
        )}
      </div>

      <section className="section card">
        <Map />
      </section>
      <section className="section card">
        <ContactForm />
      </section>
    </div>
  );
}
