import { useState } from 'react'
import { FaHandHoldingHeart, FaCross, FaGift, FaCopy, FaCheck, FaBuilding, FaUserCheck, FaCreditCard, FaHeart, FaUsers, FaChurch } from 'react-icons/fa'
import { toast } from 'react-toastify'
import PageHeader from '../components/PageHeader'

export default function Donation() {
  const [copied, setCopied] = useState(false)
  const accountNumber = '3054917540'

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber)
    setCopied(true)
    toast.success('Account number copied to clipboard!')
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div className="page donation-page">
      <PageHeader
        title="Support Our Ministry"
        subtitle="Your generosity enables us to reach lives, support community outreach, and expand God’s kingdom."
      />

      {/* Main Digital Bank Card */}
      <section className="donation-card-container">
        <article className="bank-card-wrapper glass-card">
          <div className="bank-card-header">
            <div className="bank-card-brand">
              <FaCreditCard className="card-chip-icon" />
              <span>OFFERING & TITHE TRANSFER</span>
            </div>
            <span className="bank-card-badge">First Bank</span>
          </div>

          <div className="bank-card-body">
            <div className="account-number-block">
              <span className="card-label">ACCOUNT NUMBER</span>
              <div className="account-number-row">
                <span className="account-number">{accountNumber}</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`copy-btn ${copied ? 'copied' : ''}`}
                  title="Copy Account Number"
                >
                  {copied ? <><FaCheck /> Copied</> : <><FaCopy /> Copy</>}
                </button>
              </div>
            </div>

            <div className="card-details-grid">
              <div className="card-detail-item">
                <span className="card-label"><FaUserCheck /> ACCOUNT NAME</span>
                <strong className="card-val">Ekele Idoko Mark</strong>
              </div>
              <div className="card-detail-item">
                <span className="card-label"><FaBuilding /> BANK NAME</span>
                <strong className="card-val">First Bank Nigeria</strong>
              </div>
            </div>
          </div>

          <div className="bank-card-footer">
            <span>Christ Chosen Assembly Ministry • Official Giving Account</span>
          </div>
        </article>
      </section>

      {/* Scripture & Info Grid */}
      <section className="donation-info-grid">
        <article className="donation-info-card glass-card">
          <div className="info-card-header">
            <div className="icon-circle">
              <FaCross />
            </div>
            <h3>Why We Give</h3>
          </div>
          <p>
            Giving is an act of worship and gratitude. Your tithes and offerings enable us to maintain weekly worship services, care for families in need, and spread the Gospel.
          </p>
        </article>

        <article className="donation-info-card glass-card">
          <div className="info-card-header">
            <div className="icon-circle">
              <FaGift />
            </div>
            <h3>Ways to Support</h3>
          </div>
          <p>
            Beyond direct bank transfers, you can give in person during services, via church leadership, or sponsor specific ministry projects and community outreach programs.
          </p>
        </article>
      </section>

      {/* Impact Areas */}
      <section className="impact-section glass-card">
        <h3 className="impact-title">Where Your Support Goes</h3>
        <div className="impact-grid">
          <div className="impact-item">
            <FaChurch className="impact-icon" />
            <h4>Church Growth</h4>
            <p>Sustaining worship services, sanctuary upkeep, and ministry operations.</p>
          </div>
          <div className="impact-item">
            <FaUsers className="impact-icon" />
            <h4>Community Outreach</h4>
            <p>Providing food, welfare, and spiritual support to families in need.</p>
          </div>
          <div className="impact-item">
            <FaHeart className="impact-icon" />
            <h4>Youth & Children</h4>
            <p>Empowering the next generation with Sunday school, youth events, and guidance.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
