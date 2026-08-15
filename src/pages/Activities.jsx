import { useContent } from '../context/ContentContext'
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import PageHeader from '../components/PageHeader'

const DAY_ORDER = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function Activities() {
  const { data } = useContent()
  const sorted = [...data.activities].sort(
    (a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day)
  )

  return (
    <div className="page">
      <PageHeader
        title="Weekly Activities"
        subtitle="Regular programs and gatherings throughout the week."
      />
      <div className="content-list">
        {sorted.length === 0 ? (
          <p className="empty-state">No weekly activities listed.</p>
        ) : (
          sorted.map((activity) => (
            <article key={activity.id} className="content-card activity-card">
              <div className="activity-day">{activity.day}</div>
              <div className="activity-details">
                <h2>{activity.title}</h2>
                <p className="meta">
                  <FaClock /> {activity.time}
                  {activity.location && (
                    <> &middot; <FaMapMarkerAlt /> {activity.location}</>
                  )}
                </p>
                <p>{activity.description}</p>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  )
}
