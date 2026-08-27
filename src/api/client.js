import axios from 'axios'

const TOKEN_KEY = 'church_token'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '/api' : 'https://cc-cosp.onrender.com/api'),
  headers: { 'Content-Type': 'application/json' },
})

export function assetUrl(value) {
  if (!value) return ''
  if (/^(data:|blob:)/i.test(value)) return value

  let cleanPath = value
  const uploadsIdx = value.indexOf('/api/uploads/')
  if (uploadsIdx !== -1) {
    cleanPath = value.substring(uploadsIdx)
  }

  if (/^https?:\/\//i.test(cleanPath)) return cleanPath

  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath
  }

  const apiBase = api.defaults.baseURL || '/api'
  if (/^https?:\/\//i.test(apiBase)) {
    const origin = new URL(apiBase).origin
    return `${origin}${cleanPath}`
  }

  return cleanPath
}

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem(TOKEN_KEY)
      sessionStorage.removeItem('church_admin_auth')
      window.dispatchEvent(new Event('church-auth-expired'))
    }
    return Promise.reject(error)
  }
)

export function setAuthToken(token) {
  if (token) sessionStorage.setItem(TOKEN_KEY, token)
  else sessionStorage.removeItem(TOKEN_KEY)
}

export function getAuthToken() {
  return sessionStorage.getItem(TOKEN_KEY)
}

export function notifySocialResults(socialResults, toast) {
  if (!socialResults?.length) return
  for (const r of socialResults) {
    if (r.status === 'success') {
      toast.success(`Posted to ${r.platform}`)
    } else {
      toast.error(`${r.platform}: ${r.error}`)
    }
  }
}
