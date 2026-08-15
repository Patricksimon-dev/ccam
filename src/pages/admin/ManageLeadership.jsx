import ContentManager from '../../components/admin/ContentManager'

const fields = [
  { name: 'name', label: 'Full Name', required: true },
  { name: 'role', label: 'Role / Title', required: true, placeholder: 'Senior Pastor' },
  { name: 'bio', label: 'Biography', type: 'textarea', required: true },
  { name: 'imageUrl', label: 'Photo URL (optional)', placeholder: 'https://...' },
]

export default function ManageLeadership() {
  return (
    <ContentManager
      collection="leadership"
      title="Leadership"
      fields={fields}
      renderItem={(item) => (
        <>
          <h3>{item.name}</h3>
          <p className="admin-row-meta">
            {item.role} &middot; {item.bio.slice(0, 80)}...
          </p>
        </>
      )}
    />
  )
}
