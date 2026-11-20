import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', label: '首页', hash: '' },
  { path: '/#try', label: '体验', hash: '#try' },
  { path: '/#features', label: '功能', hash: '#features' },
  { path: '/download', label: '下载', hash: '' },
]

export default function SiteNav() {
  const { pathname, hash } = useLocation()
  const onHome = pathname === '/'

  useEffect(() => {
    if (!hash) return
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  return (
    <nav className="sticky top-0 z-50 border-b border-[#e4eef6]/80 bg-[#f4f8fc]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#d7ecff] text-lg">🏝️</span>
          <span className="min-w-0">
            <span className="block truncate text-base font-black tracking-wide text-[#1d3348]">星屿</span>
            <span className="block text-[10px] font-semibold text-[#7B8A9A]">成长小岛 · Star Island</span>
          </span>
        </Link>
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const active = item.path === '/download'
              ? pathname.startsWith('/download')
              : onHome && (item.hash ? hash === item.hash : hash === '' || hash === '#')
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-full px-2.5 py-1.5 text-xs font-bold sm:px-3 sm:text-sm ${
                  active ? 'bg-white text-[#1d3348] shadow-sm' : 'text-[#5c7084] hover:text-[#1d3348]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <Link
            to="/privacy"
            className={`hidden rounded-full px-3 py-1.5 text-sm font-bold md:inline ${
              pathname.startsWith('/privacy') ? 'bg-white text-[#1d3348] shadow-sm' : 'text-[#5c7084] hover:text-[#1d3348]'
            }`}
          >
            隐私
          </Link>
          <Link
            to="/terms"
            className={`hidden rounded-full px-3 py-1.5 text-sm font-bold md:inline ${
              pathname.startsWith('/terms') ? 'bg-white text-[#1d3348] shadow-sm' : 'text-[#5c7084] hover:text-[#1d3348]'
            }`}
          >
            协议
          </Link>
        </div>
      </div>
    </nav>
  )
}
