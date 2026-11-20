import { useEffect, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { legalMeta } from '../data/legal-meta'
import { navItems } from '../data/site'

const titles: Record<string, string> = {
  '/': '星屿',
  '/world': '世界 · 星屿',
  '/record': '记录 · 星屿',
  '/growth': '轨迹 · 星屿',
  '/companion': '伙伴 · 星屿',
  '/membership': '会员 · 星屿',
  '/download': '下载 · 星屿',
  '/privacy': '隐私政策 · 星屿',
  '/terms': '用户协议 · 星屿',
}

export default function Shell({ children }: { children: ReactNode }) {
  const location = useLocation()

  useEffect(() => {
    document.title = titles[location.pathname] ?? '星屿'
    if (location.hash) {
      const target = document.querySelector(location.hash)
      if (target) {
        target.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  )
}

function SiteHeader() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <Link to="/" className="logo">
        星屿
      </Link>
      <nav className="desktop-nav" aria-label="全站">
        {navItems.map((item) => (
          <Link key={item.to} to={item.to} aria-current={location.pathname === item.to ? 'page' : undefined}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link to="/download" className="btn btn-primary header-cta">
        打开星屿
      </Link>
      <button
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-label={open ? '关闭菜单' : '打开菜单'}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
      </button>
      {open && (
        <div className="nav-panel">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} aria-current={location.pathname === item.to ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
          <Link to="/download" className="btn btn-primary">
            打开星屿
          </Link>
        </div>
      )}
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p className="brand">星屿</p>
        <p className="tagline">把看不见的人生，变成一个可以回去的世界。</p>
        <nav className="footer-links" aria-label="页脚">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
          <Link to="/terms">用户协议</Link>
          <Link to="/privacy">隐私政策</Link>
          <Link to="/privacy#account-deletion">注销说明</Link>
          <a href={`mailto:${legalMeta.contactEmail}`}>联系</a>
        </nav>
        <p className="fine">
          记录默认仅本人可见。AI 结果仅供个人参考，不构成医疗或心理咨询意见。注销后数据永久删除。
        </p>
      </div>
    </footer>
  )
}
