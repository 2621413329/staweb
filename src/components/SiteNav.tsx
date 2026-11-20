import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { href: '/#ritual', label: '体验', id: 'ritual' },
  { href: '/#features', label: '功能', id: 'features' },
  { href: '/#islands', label: '群岛', id: 'islands' },
  { href: '/download', label: '下载', id: '' },
]

export default function SiteNav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  function handleNavClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) {
    setOpen(false)
    if (!id || pathname !== '/') return
    event.preventDefault()
    window.history.replaceState(null, '', `/#${id}`)
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 40)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-sand/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white shadow-sm">
            <IslandMark />
          </span>
          <span>
            <span className="block text-sm font-semibold leading-tight text-ink">星屿</span>
            <span className="block text-[11px] leading-tight text-clay">成长小岛</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex" aria-label="站点">
          {links.map((item) => {
            const active = item.href === '/download' && pathname.startsWith('/download')
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`rounded-full px-3 py-1.5 text-sm ${
                  active ? 'bg-white font-semibold text-ink' : 'text-clay hover:text-ink'
                }`}
                aria-current={active ? 'page' : undefined}
                onClick={(event) => handleNavClick(event, item.id)}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/download"
            className="hidden rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-white sm:inline-flex"
          >
            获取星屿
          </Link>
          <button
            type="button"
            className="rounded-full border border-line px-3 py-1.5 text-sm text-ink sm:hidden"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            菜单
          </button>
        </div>
      </div>
      {open && (
        <nav className="space-y-1 border-t border-line px-5 py-3 sm:hidden" aria-label="站点">
          {links.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="block rounded-xl px-3 py-2 text-sm text-ink hover:bg-white"
              onClick={(event) => handleNavClick(event, item.id)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}

function IslandMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <ellipse cx="11" cy="15.5" rx="7" ry="3" fill="#E7C4A4" />
      <ellipse cx="11" cy="14.2" rx="6.2" ry="2.6" fill="#8FBF9A" />
      <path d="M8 12.2h6l-1 2.2H9z" fill="#FFFBF7" />
      <path d="M7.4 12.2 11 8.6l3.6 3.6z" fill="#C4845A" />
    </svg>
  )
}
