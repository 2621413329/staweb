import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { href: '/#place', label: '安放故事' },
  { href: '/#app', label: '看看星屿' },
  { href: '/download', label: '下载' },
]

export default function SiteNav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[#eadfd4]/80 bg-[#fff8f2]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src="/art/faces/xiao_guangbao_ping_jing.webp" alt="" className="h-9 w-9 object-contain" />
          <span className="leading-tight">
            <span className="block font-serif text-lg text-[#3d3229]">星屿</span>
            <span className="block text-[10px] tracking-[0.18em] text-[#8c7b6b]">STAR ISLAND</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((link) => {
            const active = link.href === '/download' && pathname.startsWith('/download')
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`rounded-full px-3.5 py-2 text-sm ${
                  active ? 'bg-white text-[#3d3229] shadow-sm' : 'text-[#6b5b4e] hover:bg-white/70'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            to="/download"
            className="ml-2 rounded-full bg-[#3d3229] px-4 py-2 text-sm font-semibold text-white"
          >
            下载星屿
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-full px-3 py-2 text-sm text-[#3d3229] sm:hidden"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? '关闭' : '菜单'}
        </button>
      </div>
      {open && (
        <div className="space-y-1 border-t border-[#eadfd4] px-4 py-3 sm:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm text-[#3d3229]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/download"
            onClick={() => setOpen(false)}
            className="mt-1 block rounded-full bg-[#3d3229] px-4 py-2 text-center text-sm text-white"
          >
            下载星屿
          </Link>
        </div>
      )}
    </header>
  )
}
