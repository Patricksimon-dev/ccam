import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { api } from '../api/client'

const ContentContext = createContext(null)

const COLLECTIONS = ['announcements', 'sermons', 'activities', 'events', 'leadership']

const emptyData = {
  announcements: [],
  sermons: [],
  activities: [],
  events: [],
  leadership: [],
  about: {
    welcomeTitle: '',
    welcomeText: '',
    mission: '',
    vision: '',
    history: '',
    values: '',
  },
}

export function ContentProvider({ children }) {
  const [data, setData] = useState(emptyData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setError(null)
    try {
      const { data: content } = await api.get('/content')
      setData(content)
    } catch (err) {
      setError(err.response?.data?.error || 'Could not load content. Is the API server running?')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const addItem = useCallback(async (collection, item, socialMeta = {}) => {
    const payload = { ...item, ...socialMeta }
    const { data: res } = await api.post(`/admin/${collection}`, payload)
    setData((prev) => ({
      ...prev,
      [collection]: [res.item, ...prev[collection]],
    }))
    return res
  }, [])

  const updateItem = useCallback(async (collection, id, updates, socialMeta = {}) => {
    const payload = { ...updates, ...socialMeta }
    const { data: res } = await api.put(`/admin/${collection}/${id}`, payload)
    setData((prev) => ({
      ...prev,
      [collection]: prev[collection].map((row) => (row.id === id ? res.item : row)),
    }))
    return res
  }, [])

  const deleteItem = useCallback(async (collection, id) => {
    await api.delete(`/admin/${collection}/${id}`)
    setData((prev) => ({
      ...prev,
      [collection]: prev[collection].filter((row) => row.id !== id),
    }))
  }, [])

  const updateAbout = useCallback(async (updates) => {
    const { data: about } = await api.put('/admin/about', updates)
    setData((prev) => ({ ...prev, about }))
    return about
  }, [])

  return (
    <ContentContext.Provider
      value={{
        data,
        loading,
        error,
        refresh,
        addItem,
        updateItem,
        deleteItem,
        updateAbout,
        collections: COLLECTIONS,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}
