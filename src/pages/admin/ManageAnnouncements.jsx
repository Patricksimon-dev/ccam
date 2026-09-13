import { format, parseISO } from 'date-fns'
import ContentManager from '../../components/admin/ContentManager'
import { assetUrl } from '../../api/client'

const fields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'content', label: 'Content', type: 'textarea', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'pinned', label: 'Pin to top', type: 'checkbox' },
  { name: 'imageUrl', label: 'Image (upload or URL)', placeholder: 'Upload image below or paste https://...' },
]

export default function ManageAnnouncements() {
  return (
    <ContentManager
      collection="announcements"
      title="Announcements"
      fields={fields}
      socialShare
      renderItem={(item) => (
        <>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            {item.imageUrl ? (
              <img src={assetUrl(item.imageUrl)} alt="announcement" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8 }} />
            ) : null}
            <div>
              <h3>
                {item.title}
                {item.pinned && <span className="badge badge-gold">Pinned</span>}
              </h3>
              <p className="admin-row-meta">
                {format(parseISO(item.date), 'MMM d, yyyy')} &middot; {item.content.slice(0, 80)}...
              </p>
            </div>
          </div>
        </>
      )}
    />
  )
}
