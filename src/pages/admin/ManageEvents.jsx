import { format, parseISO } from 'date-fns'
import ContentManager from '../../components/admin/ContentManager'

const fields = [
  { name: 'title', label: 'Event Title', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'time', label: 'Time', required: true, placeholder: '9:00 AM' },
  { name: 'location', label: 'Location', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'imageUrl', label: 'Image URL (optional)', placeholder: 'https://...' },
]

export default function ManageEvents() {
  return (
    <ContentManager
      collection="events"
      title="Church Events"
      fields={fields}
      socialShare
      renderItem={(item) => (
        <>
          <h3>{item.title}</h3>
          <p className="admin-row-meta">
            {format(parseISO(item.date), 'MMM d, yyyy')} at {item.time}
            {item.location && <> &middot; {item.location}</>}
          </p>
        </>
      )}
    />
  )
}
