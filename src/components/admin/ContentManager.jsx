import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import { FaPlus, FaEdit, FaTrash, FaTimes, FaCheck } from 'react-icons/fa'
import { useContent } from '../../context/ContentContext'
import { api, assetUrl, notifySocialResults } from '../../api/client'
import './ContentManager.css'

function buildSocialMeta(formData, socialShare) {
  if (!socialShare) return {}
  const platforms = []
  if (formData.shareFacebook) platforms.push('facebook')
  if (formData.shareInstagram) platforms.push('instagram')
  if (formData.shareTwitter) platforms.push('twitter')
  if (formData.shareLinkedIn) platforms.push('linkedin')
  if (formData.shareTikTok) platforms.push('tiktok')
  if (formData.shareYouTube) platforms.push('youtube')
  if (formData.shareWhatsApp) platforms.push('whatsapp')
  return {
    shareToSocial: Boolean(formData.shareToSocial && platforms.length),
    platforms,
    customMessage: formData.customMessage || '',
  }
}

export default function ContentManager({
  collection,
  title,
  fields,
  renderItem,
  socialShare = false,
}) {
  const { data, addItem, updateItem, deleteItem } = useContent()
  const items = data[collection] || []
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [localPreviews, setLocalPreviews] = useState({})

  const defaultValues = fields.reduce(
    (acc, f) => {
      acc[f.name] = f.defaultValue ?? (f.type === 'checkbox' ? false : '')
      return acc
    },
    socialShare
      ? {
          shareToSocial: false,
          shareFacebook: true,
          shareInstagram: false,
          shareTwitter: false,
          shareLinkedIn: false,
          shareTikTok: false,
          shareYouTube: false,
          shareWhatsApp: false,
          customMessage: '',
        }
      : {}
  )

  const { register, handleSubmit, reset, setValue, control } = useForm({ defaultValues })
  const watchedValues = useWatch({ control })
  const shareToSocial = watchedValues.shareToSocial

  const openCreate = () => {
    reset(defaultValues)
    setEditing(null)
    setShowForm(true)
  }

  const openEdit = (item) => {
    reset({ ...defaultValues })
    fields.forEach((f) => setValue(f.name, item[f.name] ?? defaultValues[f.name]))
    setEditing(item.id)
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditing(null)
    setLocalPreviews({})
    reset(defaultValues)
  }

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0]
    if (!file) return

    setLocalPreviews((prev) => ({ ...prev, [fieldName]: URL.createObjectURL(file) }))

    const formData = new FormData()
    formData.append('file', file)

    const loadingToast = toast.loading(`Uploading ${file.name}...`)
    try {
      const res = await api.post('/admin/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setValue(fieldName, res.data.url, { shouldDirty: true })
      setLocalPreviews((prev) => ({ ...prev, [fieldName]: res.data.url }))
      toast.update(loadingToast, {
        render: 'Upload complete!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
    } catch (err) {
      toast.update(loadingToast, {
        render: err.response?.data?.error || 'Upload failed',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      })
    }
  }

  const onSubmit = async (formData) => {
    const socialMeta = buildSocialMeta(formData, socialShare)
    const contentFields = { ...formData }
    delete contentFields.shareToSocial
    delete contentFields.shareFacebook
    delete contentFields.shareInstagram
    delete contentFields.shareTwitter
    delete contentFields.shareLinkedIn
    delete contentFields.shareTikTok
    delete contentFields.shareYouTube
    delete contentFields.shareWhatsApp
    delete contentFields.customMessage

    setSaving(true)
    try {
      if (editing) {
        const res = await updateItem(collection, editing, contentFields, socialMeta)
        notifySocialResults(res.socialResults, toast)
        toast.success('Updated successfully')
      } else {
        const res = await addItem(collection, contentFields, socialMeta)
        notifySocialResults(res.socialResults, toast)
        toast.success('Created successfully')
      }
      closeForm()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return
    try {
      await deleteItem(collection, id)
      toast.success('Deleted successfully')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Delete failed')
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>{title}</h1>
          <p className="admin-subtitle">{items.length} item{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={openCreate}>
          <FaPlus /> Add New
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <form className="admin-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-header">
              <h2>{editing ? 'Edit' : 'Create'} {title.replace(/s$/, '') || title}</h2>
              <button type="button" className="btn-icon" onClick={closeForm}>
                <FaTimes />
              </button>
            </div>

            {fields.map((field) => (
              <label key={field.name} className="form-label">
                {field.label}
                {field.type === 'textarea' ? (
                  <textarea
                    className="form-input"
                    rows={4}
                    {...register(field.name, { required: field.required })}
                  />
                ) : field.type === 'select' ? (
                  <select className="form-input" {...register(field.name, { required: field.required })}>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : field.type === 'checkbox' ? (
                  <input type="checkbox" {...register(field.name)} />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                    <input
                      type={field.type || 'text'}
                      className="form-input"
                      placeholder={field.placeholder}
                      {...register(field.name, { required: field.required })}
                    />
                    {(field.name.toLowerCase().endsWith('url') || field.name.toLowerCase().endsWith('photo') || field.name.toLowerCase().endsWith('image')) && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.15rem' }}>
                        <input
                          type="file"
                          accept={
                            field.name.toLowerCase().includes('image') || field.name.toLowerCase().includes('photo')
                              ? 'image/*'
                              : field.name.toLowerCase().includes('audio')
                              ? 'audio/*'
                              : field.name.toLowerCase().includes('video')
                              ? 'video/*'
                              : '*'
                          }
                          onChange={(e) => handleFileUpload(e, field.name)}
                          style={{
                            fontSize: '0.8rem',
                            color: 'var(--text-muted)',
                            background: 'var(--bg-alt)',
                            padding: '0.25rem 0.5rem',
                            border: '1px solid var(--border)',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        />
                        {(localPreviews[field.name] || watchedValues[field.name]) && (field.name.toLowerCase().includes('image') || field.name.toLowerCase().includes('photo')) ? (
                          <img
                            src={assetUrl(localPreviews[field.name] || watchedValues[field.name])}
                            alt="Selected preview"
                            style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '50%' }}
                          />
                        ) : null}
                      </div>
                    )}
                  </div>
                )}
              </label>
            ))}

            {socialShare && (
              <fieldset className="social-fieldset">
                <legend>Social media</legend>
                <label className="form-label inline-check">
                  <input type="checkbox" {...register('shareToSocial')} />
                  Post to social when saving
                </label>
                {shareToSocial && (
                  <>
                    <label className="form-label inline-check">
                      <input type="checkbox" {...register('shareFacebook')} />
                      Facebook Page
                    </label>
                    <label className="form-label inline-check">
                      <input type="checkbox" {...register('shareInstagram')} />
                      Instagram
                    </label>
                    <label className="form-label inline-check">
                      <input type="checkbox" {...register('shareTwitter')} />
                      X (Twitter)
                    </label>
                    <label className="form-label inline-check">
                      <input type="checkbox" {...register('shareLinkedIn')} />
                      LinkedIn
                    </label>
                    <label className="form-label inline-check">
                      <input type="checkbox" {...register('shareTikTok')} />
                      TikTok
                    </label>
                    <label className="form-label inline-check">
                      <input type="checkbox" {...register('shareYouTube')} />
                      YouTube
                    </label>
                    <label className="form-label inline-check">
                      <input type="checkbox" {...register('shareWhatsApp')} />
                      WhatsApp
                    </label>
                    <label className="form-label">
                      Custom message (optional)
                      <textarea className="form-input" rows={3} {...register('customMessage')} />
                    </label>
                  </>
                )}
              </fieldset>
            )}

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={closeForm}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                <FaCheck /> {saving ? 'Saving…' : editing ? 'Save Changes' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-table">
        {items.length === 0 ? (
          <p className="empty-state">No items yet. Click &quot;Add New&quot; to create one.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="admin-row">
              <div className="admin-row-content">
                {renderItem(item)}
              </div>
              <div className="admin-row-actions">
                <button type="button" className="btn-icon" onClick={() => openEdit(item)} title="Edit">
                  <FaEdit />
                </button>
                <button type="button" className="btn-icon btn-danger" onClick={() => handleDelete(item.id)} title="Delete">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
