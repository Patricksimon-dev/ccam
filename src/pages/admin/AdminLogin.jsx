import { Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'
import { FaChurch, FaLock, FaEnvelope } from 'react-icons/fa'
import './AdminLogin.css'

export default function AdminLogin() {
  const { login, isAuthenticated, authLoading } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const { register, handleSubmit } = useForm({
    defaultValues: { email: '', password: '' },
  })

  if (authLoading) {
    return <div className="login-page"><p>Loading…</p></div>
  }

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const onSubmit = async ({ email, password }) => {
    setError('')
    try {
      await login(email, password)
      toast.success('Welcome back!')
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit(onSubmit)}>
        <div className="login-icon">
          <FaChurch />
        </div>
        <h1>Admin Login</h1>
        <p className="login-subtitle">Sign in to manage church content</p>

        {error && <p className="login-error">{error}</p>}

        <label className="form-label">
          <FaEnvelope /> Username
          <input
            type="text"
            className="form-input"
            placeholder="Enter username"
            autoComplete="username"
            {...register('email', { required: true })}
          />
        </label>

        <label className="form-label">
          <FaLock /> Password
          <input
            type="password"
            className="form-input"
            placeholder="Enter password"
            autoComplete="current-password"
            {...register('password', { required: true })}
          />
        </label>

        <button type="submit" className="btn btn-primary btn-full">
          Sign In
        </button>

      </form>
    </div>
  )
}
