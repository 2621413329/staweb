import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const anchors = [
  { id: 'world', label: '世界' },
  { id: 'record', label: '记录' },
  { id: 'preview', label: '体验' },
  { id: 'witness', label: '伙伴' },
  { id: 'member', label: '会员' },
]

export default function SiteNav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (pathname !== '/') return
    const id = window.location.hash.replace('#', '')
    if (!id) return
    const timer = window.setTimeout(() => scrollToId(id), 60)
    return () => window.clearTimeout(timer)
  }, [pathname])

  const go = (id: string) => {
    setOpen(false)
    if (pathname !== '/') {
      window.location.href = `/#${id}`
      return
    }
    scrollToId(id)
    window.history.replaceState(null, '', `/#${id}`)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/5 bg-sand/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white shadow-soft" aria-hidden>
            <svg viewBox="0 0 32 32" className="h-7 w-7">
              <ellipse cx="16" cy="23" rx="9" ry="2.2" fill="#B8DCFF" />
              <ellipse cx="16" cy="18" rx="9" ry="4" fill="#7DCEA0" />
              <circle cx="22" cy="11" r="2" fill="#E8A87C" />
            </svg>
          </span>
          <span>
            <span className="block text-sm font-semibold leading-tight text-ink">星屿</span>
            <span className="block text-[11px] leading-tight text-mist">成长小岛</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="页面">
          {anchors.map((item) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              onClick={(event) => {
                event.preventDefault()
                go(item.id)
              }}
              className="rounded-full px-3 py-2 text-sm text-mist hover:bg-white hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/download"
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              pathname === '/download' ? 'bg-ink text-white' : 'bg-white text-ink shadow-soft'
            }`}
          >
            下载
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-full border border-ink/10 bg-white px-3 py-2 text-sm lg:hidden"
          aria-expanded={open}
          aria-label={open ? '关闭菜单' : '打开菜单'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? '关闭' : '菜单'}
        </button>
      </div>
      {open && (
        <div className="border-t border-ink/5 bg-sand px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {anchors.map((item) => (
              <a
                key={item.id}
                href={`/#${item.id}`}
                onClick={(event) => {
                  event.preventDefault()
                  go(item.id)
                }}
                className="rounded-xl px-3 py-2 text-sm text-ink hover:bg-white"
              >
                {item.label}
              </a>
            ))}
            <Link to="/download" className="rounded-xl px-3 py-2 text-sm font-semibold text-ink hover:bg-white">
              下载
            </Link>
            <Link to="/privacy" className="rounded-xl px-3 py-2 text-sm text-mist">
              隐私政策
            </Link>
            <Link to="/terms" className="rounded-xl px-3 py-2 text-sm text-mist">
              用户协议
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

function scrollToId(id: string) {
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' })
}
