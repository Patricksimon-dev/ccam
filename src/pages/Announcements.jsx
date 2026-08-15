import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { useContent } from '../context/ContentContext'
import { FaThumbtack, FaCalendarAlt, FaSearch, FaBullhorn, FaFilter } from 'react-icons/fa'
import PageHeader from '../components/PageHeader'

export default function Announcements() {
  const { data } = useContent()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterMode, setFilterMode] = useState('all') // 'all', 'pinned'

  const announcements = data.announcements || []

  const sorted = [...announcements].sort((a, b) => {
    if (a.pinned !== b.pinned) return b.pinned - a.pinned
    return b.date.localeCompare(a.date)
  })

  const filtered = sorted.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
    if (filterMode === 'pinned') {
      return matchesSearch && item.pinned
    }
    return matchesSearch
  })

  return (
    <div className="page announcements-page">
      <PageHeader
        title="Church Announcements"
        subtitle="Stay informed with the latest news, updates, and notices from our church community."
      />

      {/* Control Bar */}
      <div className="announcements-control-bar glass-card">
        <div className="search-input-wrap">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="announcement-search-input"
          />
        </div>

        <div className="filter-tabs">
          <button
            className={`tab-btn ${filterMode === 'all' ? 'active' : ''}`}
            onClick={() => setFilterMode('all')}
          >
            <FaBullhorn /> All ({announcements.length})
          </button>
          <button
            className={`tab-btn ${filterMode === 'pinned' ? 'active' : ''}`}
            onClick={() => setFilterMode('pinned')}
          >
            <FaThumbtack /> Pinned ({announcements.filter(a => a.pinned).length})
          </button>
        </div>
      </div>

      {/* List */}
      <div className="announcements-list">
        {filtered.length === 0 ? (
          <div className="empty-state-card glass-card">
            <FaBullhorn className="empty-icon" />
            <h3>No Announcements Found</h3>
            <p>
              {searchTerm
                ? `No announcements matching "${searchTerm}". Try a different search.`
                : 'There are currently no announcements. Check back soon!'}
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <article
              key={item.id}
              className={`announcement-card glass-card ${item.pinned ? 'is-pinned' : ''}`}
            >
              <div className="announcement-card-header">
                <div className="announcement-title-group">
                  <h2 className="announcement-title">{item.title}</h2>
                  <time className="announcement-date">
                    <FaCalendarAlt className="date-icon" />
                    {format(parseISO(item.date), 'MMMM d, yyyy')}
                  </time>
                </div>
                {item.pinned && (
                  <span className="pinned-badge">
                    <FaThumbtack /> Pinned Notice
                  </span>
                )}
              </div>

              <div className="announcement-body">
                <p>{item.content}</p>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  )
}
