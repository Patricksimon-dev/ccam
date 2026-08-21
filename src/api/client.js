import axios from 'axios'

const TOKEN_KEY = 'church_token'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '/api' : 'https://christchosen.onrender.com/api'),
  headers: { 'Content-Type': 'application/json' },
})

export function assetUrl(value) {
  if (!value || /^(data:|blob:|https?:\/\/)/i.test(value)) return value
  const apiBase = api.defaults.baseURL.startsWith('/')
    ? window.location.origin + api.defaults.baseURL
    : api.defaults.baseURL
  return new URL(value, apiBase).toString()
}

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

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
