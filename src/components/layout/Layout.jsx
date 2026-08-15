import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useContent } from '../../context/ContentContext'

export default function Layout() {
  const { loading, error } = useContent()

  return (
    <div className="site-layout">
      <Header />
      <main className="site-main">
        {loading && <div className="page-loading">Loading…</div>}
        {!loading && error && <div className="page-error">{error}</div>}
        {!loading && !error && <Outlet />}
      </main>
      <Footer />
    </div>
  )
}
