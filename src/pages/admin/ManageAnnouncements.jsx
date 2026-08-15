import { format, parseISO } from 'date-fns'
import ContentManager from '../../components/admin/ContentManager'

const fields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'content', label: 'Content', type: 'textarea', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'pinned', label: 'Pin to top', type: 'checkbox' },
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
          <h3>
            {item.title}
            {item.pinned && <span className="badge badge-gold">Pinned</span>}
          </h3>
          <p className="admin-row-meta">
            {format(parseISO(item.date), 'MMM d, yyyy')} &middot; {item.content.slice(0, 80)}...
          </p>
        </>
      )}
    />
  )
}
