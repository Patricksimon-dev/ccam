import { useContent } from '../context/ContentContext'
import { assetUrl } from '../api/client'
import { FaCrown, FaQuoteLeft } from 'react-icons/fa'
import PageHeader from '../components/PageHeader'
import './Leadership.css'

export default function Leadership() {
  const { data } = useContent()
  const rawLeaders = data.leadership || []

  // Find Senior Pastor / General Overseer from database if present
  const overseerFromData = rawLeaders.find(
    (l) =>
      (l.role || '').toLowerCase().includes('general overseer') ||
      (l.role || '').toLowerCase().includes('senior pastor') ||
      (l.name || '').toLowerCase().includes('ekele')
  )

  const overseer = overseerFromData || {
    id: 'built-in-pastor',
    name: 'Pastor Ekele Idoko',
    role: 'Senior Pastor & General Overseer',
    bio: 'Leading Christ Chosen Assembly Ministry with vision, faith, and dedication to God’s word and community service.',
    imageUrl: '/go-pastor.jpg',
  }

  const teamMembers = rawLeaders.filter((l) => l.id !== overseer.id)

  return (
    <div className="page leadership-page">
      <PageHeader
        title="Church Leadership"
        subtitle="Meet the devoted pastors and leaders serving Christ Chosen Assembly Ministry."
      />

      <div className="leadership-grid">
        {/* Built-in Featured General Overseer Card */}
        <article className="leader-card leader-card-featured glass-card">
          <div className="leader-photo-wrap">
            <div className="leader-img-container">
              <img
                src={assetUrl(overseer.imageUrl) || '/go-pastor.jpg'}
                alt={overseer.name}
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
            <span className="leader-role-badge">{overseer.role || 'Senior Pastor & General Overseer'}</span>
            <h2 className="leader-name">{overseer.name}</h2>
            <p className="leader-bio">
              {overseer.bio || 'Leading Christ Chosen Assembly Ministry with vision, faith, and dedication to God’s word and community service.'}
            </p>
          </div>
        </article>

        {/* Dynamic Leadership Team Members */}
        {teamMembers.map((leader) => (
          <article key={leader.id} className="leader-card glass-card">
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
            </div>

            <div className="leader-info">
              <span className="leader-role-badge">{leader.role || 'Church Leader'}</span>
              <h2 className="leader-name">{leader.name}</h2>
              <p className="leader-bio">{leader.bio || 'Serving God’s ministry with passion, wisdom, and love.'}</p>
            </div>
          </article>
        ))}
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
