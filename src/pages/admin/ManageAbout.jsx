import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaSave, FaTrash } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { useContent } from '../../context/ContentContext'

const fields = [
  { name: 'welcomeTitle', label: 'Welcome Section Title' },
  { name: 'welcomeText', label: 'Welcome Text', type: 'textarea' },
  { name: 'mission', label: 'Mission', type: 'textarea' },
  { name: 'vision', label: 'Vision', type: 'textarea' },
  { name: 'history', label: 'History', type: 'textarea' },
  { name: 'values', label: 'Core Values', type: 'textarea' },
]

export default function ManageAbout() {
  const { data, updateAbout, deleteAbout } = useContent()
  const { register, handleSubmit, reset } = useForm({ defaultValues: data.about })

  useEffect(() => {
    reset(data.about)
  }, [data.about, reset])

  const onSubmit = async (formData) => {
    try {
      await updateAbout(formData)
      toast.success('About page updated')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Update failed')
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to clear the About page?')) return
    try {
      await deleteAbout()
      toast.success('About page cleared')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Delete failed')
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>About Page</h1>
          <p className="admin-subtitle">Edit the content shown on the About page</p>
        </div>
      </div>

      <form className="admin-form admin-form-inline" onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <label key={field.name} className="form-label">
            {field.label}
            {field.type === 'textarea' ? (
              <textarea className="form-input" rows={4} {...register(field.name)} />
            ) : (
              <input type="text" className="form-input" {...register(field.name)} />
            )}
          </label>
        ))}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            <FaSave /> Save Changes
          </button>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>
            <FaTrash /> Clear Content
          </button>
        </div>
      </form>
    </div>
  )
}
