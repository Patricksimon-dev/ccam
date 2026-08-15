import { format, parseISO } from 'date-fns'
import ContentManager from '../../components/admin/ContentManager'

const fields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'preacher', label: 'Preacher', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'scripture', label: 'Scripture Reference' },
  { name: 'summary', label: 'Summary', type: 'textarea', required: true },
  { name: 'videoUrl', label: 'Video URL', placeholder: 'https://youtube.com/...' },
  { name: 'audioUrl', label: 'Audio URL', placeholder: 'https://...' },
]

export default function ManageSermons() {
  return (
    <ContentManager
      collection="sermons"
      title="Sermons"
      fields={fields}
      socialShare
      renderItem={(item) => (
        <>
          <h3>{item.title}</h3>
          <p className="admin-row-meta">
            {item.preacher} &middot; {format(parseISO(item.date), 'MMM d, yyyy')}
            {item.scripture && <> &middot; {item.scripture}</>}
          </p>
        </>
      )}
    />
  )
}
