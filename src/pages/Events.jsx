import { format, parseISO } from 'date-fns'
import { useContent } from '../context/ContentContext'
import { assetUrl } from '../api/client'
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import PageHeader from '../components/PageHeader'

export default function Events() {
  const { data } = useContent()
  const sorted = [...data.events].sort((a, b) => a.date.localeCompare(b.date))

  return (
    <div className="page">
      <PageHeader
        title="Church Events"
        subtitle="Special events and gatherings for our church family."
      />
      <div className="content-list events-grid">
        {sorted.length === 0 ? (
          <p className="empty-state">No upcoming events.</p>
        ) : (
          sorted.map((event) => (
            <article key={event.id} className="content-card event-card">
              {event.imageUrl && (
                <img src={assetUrl(event.imageUrl)} alt="" className="event-image" />
              )}
              <div className="event-date-badge">
                <span className="event-month">{format(parseISO(event.date), 'MMM')}</span>
                <span className="event-day">{format(parseISO(event.date), 'd')}</span>
              </div>
              <div className="event-details">
                <h2>{event.title}</h2>
                <p className="meta">
                  <FaClock /> {event.time}
                  {event.location && (
                    <> &middot; <FaMapMarkerAlt /> {event.location}</>
                  )}
                </p>
                <p>{event.description}</p>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  )
}
