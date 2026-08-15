import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api/client'

export default function ManageSocial() {
  const [status, setStatus] = useState(null)
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      const [statusRes, logsRes] = await Promise.all([
        api.get('/admin/social/status'),
        api.get('/admin/social/logs'),
      ])
      setStatus(statusRes.data)
      setLogs(logsRes.data)
    } catch (err) {
      toast.error(err.response?.data?.error || 'Could not load social settings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  if (loading) {
    return <div className="admin-page"><p>Loading…</p></div>
  }

  return (
    <div className="admin-page">
      <h1>Social Media</h1>
      <p className="admin-subtitle">
        Connect your configured channels in <code>server/.env</code>, then share content when creating announcements, sermons, or events. The same post can be saved on the website and sent to the selected social outlets at the same time.
      </p>

      <div className="admin-stats" style={{ marginBottom: '2rem' }}>
        <div className="stat-card" style={{ cursor: 'default' }}>
          <div>
            <span className="stat-label">Facebook</span>
            <p className="admin-row-meta">
              {status?.facebook?.configured && status.facebook.enabled
                ? 'Ready to post'
                : 'Not configured — set FACEBOOK_ENABLED=true and FACEBOOK_* values in .env'}
            </p>
          </div>
        </div>
        <div className="stat-card" style={{ cursor: 'default' }}>
          <div>
            <span className="stat-label">Instagram</span>
            <p className="admin-row-meta">
              {status?.instagram?.configured && status.instagram.enabled
                ? 'Ready to post'
                : 'Not configured — set INSTAGRAM_ENABLED=true and INSTAGRAM_* values in .env'}
            </p>
          </div>
        </div>
        <div className="stat-card" style={{ cursor: 'default' }}>
          <div>
            <span className="stat-label">X (Twitter)</span>
            <p className="admin-row-meta">
              {status?.twitter?.configured && status.twitter.enabled
                ? 'Ready to post'
                : 'Not configured — set TWITTER_ENABLED=true and TWITTER_BEARER_TOKEN in .env'}
            </p>
          </div>
        </div>
        <div className="stat-card" style={{ cursor: 'default' }}>
          <div>
            <span className="stat-label">LinkedIn</span>
            <p className="admin-row-meta">
              {status?.linkedin?.configured && status.linkedin.enabled
                ? 'Ready to post'
                : 'Not configured — set LINKEDIN_ENABLED=true and LINKEDIN_* values in .env'}
            </p>
          </div>
        </div>
        <div className="stat-card" style={{ cursor: 'default' }}>
          <div>
            <span className="stat-label">TikTok</span>
            <p className="admin-row-meta">
              {status?.tiktok?.configured && status.tiktok.enabled
                ? 'Ready to post'
                : 'Not configured — set TIKTOK_ENABLED=true and TIKTOK_ACCESS_TOKEN in .env'}
            </p>
          </div>
        </div>
        <div className="stat-card" style={{ cursor: 'default' }}>
          <div>
            <span className="stat-label">YouTube</span>
            <p className="admin-row-meta">
              {status?.youtube?.configured && status.youtube.enabled
                ? 'Ready to post'
                : 'Not configured — set YOUTUBE_ENABLED=true and YOUTUBE_* values in .env'}
            </p>
          </div>
        </div>
        <div className="stat-card" style={{ cursor: 'default' }}>
          <div>
            <span className="stat-label">WhatsApp</span>
            <p className="admin-row-meta">
              {status?.whatsapp?.configured && status.whatsapp.enabled
                ? 'Ready to post'
                : 'Not configured — set WHATSAPP_ENABLED=true and WHATSAPP_* values in .env'}
            </p>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.1rem' }}>Publish history</h2>
      <div className="admin-table">
        {logs.length === 0 ? (
          <p className="empty-state">No social posts yet.</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="admin-row">
              <div className="admin-row-content">
                <h3>
                  {log.platform} — {log.status}
                  <span className={`badge ${log.status === 'success' ? 'badge-gold' : ''}`}>
                    {log.content_type}
                  </span>
                </h3>
                <p className="admin-row-meta">
                  {log.created_at}
                  {log.error && <> &middot; {log.error}</>}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
