import { useContent } from '../context/ContentContext'
import { FaBullseye, FaEye, FaHistory, FaHeart, FaQuoteLeft, FaChurch } from 'react-icons/fa'
import PageHeader from '../components/PageHeader'
import './About.css'

export default function About() {
  const { data } = useContent()
  const { welcomeTitle, welcomeText, mission, vision, history, values } = data.about || {}

  return (
    <div className="page about-page">
      <PageHeader
        title="About Our Ministry"
        subtitle="Discover our heart, mission, vision, and the foundation of our faith community."
      />

      <section className="about-hero-card glass-card">
        <div className="about-hero-badge">
          <FaChurch />
        </div>
        <span className="section-eyebrow">Welcome to CCAM</span>
        <h2>{welcomeTitle || 'Welcome to Christ Chosen Assembly Ministry'}</h2>
        <p className="about-lead">
          {welcomeText ||
            'We are a vibrant, spirit-filled community committed to spreading God’s love, building strong disciples, and serving our local community with faith and purpose.'}
        </p>
      </section>

      <div className="about-grid">
        <article className="about-card glass-card">
          <div className="card-icon-badge">
            <FaBullseye className="about-icon" />
          </div>
          <h3>Our Mission</h3>
          <p>{mission || 'To preach the uncompromised Gospel of Jesus Christ, making disciples and empowering believers to live victorious lives.'}</p>
        </article>

        <article className="about-card glass-card">
          <div className="card-icon-badge">
            <FaEye className="about-icon" />
          </div>
          <h3>Our Vision</h3>
          <p>{vision || 'To see lives transformed, families restored, and communities impacted through the power of the Holy Spirit.'}</p>
        </article>

        <article className="about-card glass-card">
          <div className="card-icon-badge">
            <FaHistory className="about-icon" />
          </div>
          <h3>Our History</h3>
          <p>{history || 'Founded with a divine calling to serve God’s people, Christ Chosen Assembly Ministry has grown into a beacon of hope and faith.'}</p>
        </article>

        <article className="about-card glass-card">
          <div className="card-icon-badge">
            <FaHeart className="about-icon" />
          </div>
          <h3>Core Values</h3>
          <p>{values || 'Faith in God, Unconditional Love, Biblical Integrity, Community Fellowship, and Dedicated Prayer.'}</p>
        </article>
      </div>

      <section className="scripture-callout-card glass-card">
        <FaQuoteLeft className="quote-icon" />
        <blockquote className="scripture-text">
          "For where two or three gather in my name, there am I with them."
        </blockquote>
        <cite className="scripture-ref">— Matthew 18:20</cite>
      </section>
    </div>
  )
}
