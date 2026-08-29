import { useContent } from '../context/ContentContext'
import { assetUrl } from '../api/client'
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
          <article className="leader-card leader-card-featured glass-card">
            <div className="leader-photo-wrap">
              <div className="leader-img-container">
                <img
                  src="/go-pastor.jpg"
                  alt="General Overseer"
                  className="leader-img"
                />
              </div>
              <div className="leader-crown-badge">
                <FaCrown />
              </div>
            </div>

            <div className="leader-info">
              <span className="leader-role-badge">Senior Pastor &amp; General Overseer</span>
              <h2 className="leader-name">Rev. Dr. Patrick Ogar</h2>
              <p className="leader-bio">Leading Christ Chosen Assembly Ministry with vision, faith, and dedication to God’s word and community service.</p>
            </div>
          </article>
        ) : (
          leaders.map((leader) => {
            const isFeatured = (leader.role || '').toLowerCase().includes('general overseer') || (leader.role || '').toLowerCase().includes('senior pastor')
            return (
              <article key={leader.id} className={`leader-card glass-card ${isFeatured ? 'leader-card-featured' : ''}`}>
                <div className="leader-photo-wrap">
                  <div className="leader-img-container">
                    <img
                      src={assetUrl(leader.imageUrl) || '/go-pastor.jpg'}
                      alt={leader.name}
                      className="leader-img"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = '/go-pastor.jpg'
                      }}
                    />
                  </div>
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
            )
          })
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
