import { format, parseISO } from 'date-fns'
import { useContent } from '../context/ContentContext'
import { FaPlay, FaHeadphones } from 'react-icons/fa'
import PageHeader from '../components/PageHeader'

export default function Sermons() {
  const { data } = useContent()
  const sorted = [...data.sermons].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="page">
      <PageHeader
        title="Sermons"
        subtitle="Watch or listen to messages from our pastors."
      />
      <div className="content-list">
        {sorted.length === 0 ? (
          <p className="empty-state">No sermons available yet.</p>
        ) : (
          sorted.map((sermon) => (
            <article key={sermon.id} className="content-card">
              <h2>{sermon.title}</h2>
              <p className="meta">
                {sermon.preacher} &middot;{' '}
                {format(parseISO(sermon.date), 'MMMM d, yyyy')}
                {sermon.scripture && <> &middot; {sermon.scripture}</>}
              </p>
              <p>{sermon.summary}</p>
              <div className="media-links">
                {sermon.videoUrl && (
                  <a href={sermon.videoUrl} target="_blank" rel="noopener noreferrer" className="media-btn">
                    <FaPlay /> Watch Video
                  </a>
                )}
                {sermon.audioUrl && (
                  <a href={sermon.audioUrl} target="_blank" rel="noopener noreferrer" className="media-btn">
                    <FaHeadphones /> Listen
                  </a>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  )
}
