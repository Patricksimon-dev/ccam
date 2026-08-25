import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { api, setAuthToken, getAuthToken } from '../api/client'

const AUTH_KEY = 'church_admin_auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [admin, setAdmin] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const handleAuthExpired = () => {
      setAuthToken(null)
      setIsAuthenticated(false)
      setAdmin(null)
      setAuthLoading(false)
    }

    window.addEventListener('church-auth-expired', handleAuthExpired)
    const token = getAuthToken()
    if (!token) {
      setAuthLoading(false)
      return () => window.removeEventListener('church-auth-expired', handleAuthExpired)
    }
    api
      .get('/auth/me')
      .then(({ data }) => {
        setAdmin(data.admin)
        setIsAuthenticated(true)
        sessionStorage.setItem(AUTH_KEY, 'true')
      })
      .catch(() => {
        setAuthToken(null)
        sessionStorage.removeItem(AUTH_KEY)
      })
      .finally(() => setAuthLoading(false))
    return () => window.removeEventListener('church-auth-expired', handleAuthExpired)
  }, [])

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    setAuthToken(data.token)
    setAdmin(data.admin)
    setIsAuthenticated(true)
    sessionStorage.setItem(AUTH_KEY, 'true')
    return true
  }, [])

  const logout = useCallback(() => {
    setAuthToken(null)
    sessionStorage.removeItem(AUTH_KEY)
    setIsAuthenticated(false)
    setAdmin(null)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, admin, authLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
