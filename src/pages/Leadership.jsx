import { useContent } from '../context/ContentContext'
import { FaUser, FaQuoteLeft, FaCrown, FaUsers } from 'react-icons/fa'
import PageHeader from '../components/PageHeader'
import './Leadership.css'

export default function Leadership() {
  const { data } = useContent()
  const leaders = data.leadership || []

  return (
    <div className="page leadership-page">
      <PageHeader
        title="Church Leadership"
        subtitle="Meet the devoted pastors and leaders serving Christ Chosen Assembly Ministry."
      />

      <div className="leadership-grid">
        {leaders.length === 0 ? (
          <div className="empty-state-card glass-card">
            <FaUsers className="empty-icon" />
            <h3>Leadership Information Coming Soon</h3>
            <p>Our pastoral and leadership details are currently being updated.</p>
          </div>
        ) : (
          leaders.map((leader) => (
            <article key={leader.id} className="leader-card glass-card">
              <div className="leader-photo-wrap">
                {leader.imageUrl ? (
                  <img src={leader.imageUrl} alt={leader.name} className="leader-img" />
                ) : (
                  <div className="leader-placeholder-circle">
                    <FaUser />
                  </div>
                )}
                <div className="leader-crown-badge">
                  <FaCrown />
                </div>
              </div>

              <div className="leader-info">
                <span className="leader-role-badge">{leader.role || 'Church Leader'}</span>
                <h2 className="leader-name">{leader.name}</h2>
                <p className="leader-bio">{leader.bio || 'Serving God’s ministry with passion, wisdom, and love.'}</p>
              </div>
            </article>
          ))
        )}
      </div>

      <section className="leadership-callout glass-card">
        <FaQuoteLeft className="quote-icon" />
        <blockquote className="leadership-quote">
          "Remember your leaders, who spoke the word of God to you. Consider the outcome of their way of life and imitate their faith."
        </blockquote>
        <cite className="leadership-cite">— Hebrews 13:7</cite>
      </section>
    </div>
  )
}
