import ContentManager from '../../components/admin/ContentManager'
import { assetUrl } from '../../api/client'

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
          {item.imageUrl && (
            <img
              src={assetUrl(item.imageUrl)}
              alt=""
              style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '50%', marginRight: '0.75rem' }}
            />
          )}
          <h3>{item.name}</h3>
          <p className="admin-row-meta">
            {item.role} &middot; {item.bio.slice(0, 80)}...
          </p>
        </>
      )}
    />
  )
}
