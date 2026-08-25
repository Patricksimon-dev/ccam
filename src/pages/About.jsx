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
        <h2>{welcomeTitle}</h2>
        <p className="about-lead">{welcomeText}</p>
      </section>

      <div className="about-grid">
        <article className="about-card glass-card">
          <div className="card-icon-badge">
            <FaBullseye className="about-icon" />
          </div>
          <h3>Our Mission</h3>
          <p>{mission}</p>
        </article>

        <article className="about-card glass-card">
          <div className="card-icon-badge">
            <FaEye className="about-icon" />
          </div>
          <h3>Our Vision</h3>
          <p>{vision}</p>
        </article>

        <article className="about-card glass-card">
          <div className="card-icon-badge">
            <FaHistory className="about-icon" />
          </div>
          <h3>Our History</h3>
          <p>{history}</p>
        </article>

        <article className="about-card glass-card">
          <div className="card-icon-badge">
            <FaHeart className="about-icon" />
          </div>
          <h3>Core Values</h3>
          <p>{values}</p>
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
