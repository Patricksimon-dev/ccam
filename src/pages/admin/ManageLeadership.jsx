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
          {item.imageUrl ? (
            <img
              src={assetUrl(item.imageUrl)}
              alt=""
              style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '50%', flexShrink: 0 }}
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          ) : (
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(212, 161, 27, 0.15)',
                color: 'var(--gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <FaUser />
            </div>
          )}
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
