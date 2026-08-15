import ContentManager from '../../components/admin/ContentManager'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const fields = [
  { name: 'title', label: 'Activity Title', required: true },
  {
    name: 'day',
    label: 'Day of Week',
    type: 'select',
    options: DAYS,
    required: true,
    defaultValue: 'Sunday',
  },
  { name: 'time', label: 'Time', required: true, placeholder: '10:00 AM' },
  { name: 'location', label: 'Location', placeholder: 'Main Sanctuary' },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
]

export default function ManageActivities() {
  return (
    <ContentManager
      collection="activities"
      title="Weekly Activities"
      fields={fields}
      renderItem={(item) => (
        <>
          <h3>{item.title}</h3>
          <p className="admin-row-meta">
            {item.day} at {item.time}
            {item.location && <> &middot; {item.location}</>}
          </p>
        </>
      )}
    />
  )
}
