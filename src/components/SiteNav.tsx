import { Link, useLocation } from 'react-router-dom'

const links = [
  { href: '/#demo', label: '体验', compact: true },
  { href: '/#features', label: '功能', compact: true },
  { href: '/download', label: '下载', compact: true },
  { href: '/privacy', label: '隐私政策', compact: false },
  { href: '/terms', label: '用户协议', compact: false },
]

export default function SiteNav() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 border-b border-[#F0E2D4]/80 bg-[#FFF6EE]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5">
        <Link to="/" className="flex items-center gap-2.5">
          <Mark />
            <span>
            <span className="block whitespace-nowrap text-sm font-semibold leading-tight text-[#3D3229]">星屿</span>
            <span className="block whitespace-nowrap text-[11px] leading-tight text-[#8C7B6B]">成长小岛</span>
          </span>
        </Link>
        <nav className="flex items-center gap-0.5 text-[13px] sm:gap-1 sm:text-sm">
          {links.map((item) => {
            const active = item.href.startsWith('/') && !item.href.includes('#') && pathname.startsWith(item.href)
            const className = `whitespace-nowrap rounded-full px-2.5 py-1.5 sm:px-3 ${item.compact ? '' : 'hidden sm:inline'} ${active ? 'bg-[#3D3229] text-[#FFF6EE]' : 'text-[#6F5C4E] hover:bg-white'}`
            if (item.href.includes('#')) {
              return (
                <a key={item.href} href={item.href} className={className}>
                  {item.label}
                </a>
              )
            }
            return (
              <Link key={item.href} to={item.href} className={className}>
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="h-9 w-9" aria-hidden="true">
      <rect width="32" height="32" rx="11" fill="#FFE7D2" />
      <path d="M5 22c4.5-7 7.5-9 11-9s6.5 2 11 9" fill="#E7C4A4" />
      <circle cx="16" cy="12" r="3.2" fill="#E8A87C" />
      <circle cx="22.5" cy="9" r="1.2" fill="#F2C14E" />
    </svg>
  )
}
