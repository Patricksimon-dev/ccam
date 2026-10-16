import { format, parseISO } from 'date-fns'
import ContentManager from '../../components/admin/ContentManager'
import { assetUrl } from '../../api/client'

const fields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'preacher', label: 'Preacher', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'scripture', label: 'Scripture Reference' },
  { name: 'summary', label: 'Summary', type: 'textarea', required: true },
  { name: 'imageUrl', label: 'Sermon Image (upload or URL)', placeholder: 'Upload image below or paste https://...' },
  { name: 'videoUrl', label: 'Video URL or file', placeholder: 'https://youtube.com/... or upload file below' },
  { name: 'audioUrl', label: 'Audio URL or file', placeholder: 'https://... or upload file below' },
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
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {item.imageUrl ? (
              <img src={assetUrl(item.imageUrl)} alt="thumb" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8 }} />
            ) : null}
            {item.title}
          </h3>
          <p className="admin-row-meta">
            {item.preacher} &middot; {format(parseISO(item.date), 'MMM d, yyyy')}
            {item.scripture && <> &middot; {item.scripture}</>}
          </p>
        </>
      )}
    />
  )
}
