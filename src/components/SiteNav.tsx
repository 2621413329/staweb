import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Mark from './showcase/Mark'

const links = [
  { href: '/#look', label: '打开后' },
  { href: '/#studio', label: '安放故事' },
  { href: '/#islands', label: '十一座岛' },
  { href: '/#features', label: '功能' },
]

export default function SiteNav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-[#f7f4ee]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Mark />
          <span>
            <span className="block text-sm font-semibold leading-tight text-ink">成长小岛</span>
            <span className="block text-[11px] leading-tight text-mist">星屿 · Star Island</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm text-mist transition hover:bg-white hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/download"
            className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
              pathname.startsWith('/download') ? 'bg-ink text-white' : 'bg-[#5ea9ff] text-white'
            }`}
          >
            下载
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-full border border-ink/10 px-3 py-1.5 text-sm text-ink md:hidden"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? '关闭' : '菜单'}
        </button>
      </div>

      {open && (
        <div className="space-y-1 border-t border-ink/5 px-4 py-3 md:hidden">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm text-ink"
            >
              {item.label}
            </a>
          ))}
          <Link to="/download" onClick={() => setOpen(false)} className="block rounded-xl bg-[#5ea9ff] px-3 py-2 text-sm font-semibold text-white">
            下载
          </Link>
        </div>
      )}
    </header>
  )
}
