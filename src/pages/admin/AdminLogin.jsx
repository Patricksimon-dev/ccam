import { Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'
import { FaChurch, FaLock, FaEnvelope, FaSpinner } from 'react-icons/fa'
import './AdminLogin.css'

export default function AdminLogin() {
  const { login, isAuthenticated, authLoading } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm({
    defaultValues: { email: '', password: '' },
  })

  if (authLoading) {
    return (
      <div className="login-page">
        <div className="login-card">
          <FaSpinner className="spinner-icon" />
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Loading session…</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const onSubmit = async ({ email, password }) => {
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      toast.success('Welcome back, Admin!')
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit(onSubmit)}>
        <div className="login-logo-badge">
          <img src="/logo1.png" alt="Christ Chosen Assembly Ministry Logo" className="login-logo-img" />
          <div className="login-church-icon-overlay">
            <FaChurch />
          </div>
        </div>

        <h1>Admin Portal</h1>
        <p className="login-subtitle">Sign in to manage Christ Chosen Assembly Ministry</p>

        {error && <div className="login-error">{error}</div>}

        <div className="login-field-group">
          <label className="form-label">
            <FaEnvelope className="label-icon" /> Email or Username
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. idokoekeleadmin.ccam.com"
            autoComplete="username"
            disabled={loading}
            {...register('email', { required: true })}
          />
        </div>

        <div className="login-field-group">
          <label className="form-label">
            <FaLock className="label-icon" /> Password
          </label>
          <input
            type="password"
            className="form-input"
            placeholder="••••••••"
            autoComplete="current-password"
            disabled={loading}
            {...register('password', { required: true })}
          />
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary btn-full login-submit-btn">
          {loading ? (
            <>
              <FaSpinner className="spinner-icon" /> Signing in...
            </>
          ) : (
            'Sign In to Dashboard'
          )}
        </button>

        <p className="login-footer-text">
          Christ Chosen Assembly Ministry &copy; {new Date().getFullYear()}
        </p>
      </form>
    </div>
  )
}
