import { FaUser } from 'react-icons/fa'
import ContentManager from '../../components/admin/ContentManager'
import { assetUrl } from '../../api/client'

const fields = [
  { name: 'name', label: 'Full Name', required: true },
  { name: 'role', label: 'Role / Title', required: true, placeholder: 'Senior Pastor' },
  { name: 'bio', label: 'Biography', type: 'textarea', required: true },
  { name: 'imageUrl', label: 'Leader Photo / Image (upload or URL)', placeholder: 'Upload photo below or paste https://...' },
]

export default function ManageLeadership() {
  return (
    <ContentManager
      collection="leadership"
      title="Leadership"
      fields={fields}
      renderItem={(item) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <img
            src={assetUrl(item.imageUrl) || '/go-pastor.jpg'}
            alt=""
            style={{ width: '48px', height: '48px', objectFit: 'cover', objectPosition: 'center 15%', borderRadius: '50%', flexShrink: 0 }}
            onError={(e) => {
              e.target.onerror = null
              e.target.src = '/go-pastor.jpg'
            }}
          />
          <div>
            <h3>{item.name}</h3>
            <p className="admin-row-meta">
              {item.role} &middot; {(item.bio || '').slice(0, 80)}...
            </p>
          </div>
        </div>
      )}
    />
  )
}
