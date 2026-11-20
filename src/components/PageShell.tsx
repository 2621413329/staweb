import { Link } from 'react-router-dom'
import SiteNav from './SiteNav'

interface PageShellProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export default function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-sand text-ink">
      <SiteNav />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-ink">{title}</h1>
            {subtitle && <p className="mt-2 text-sm text-clay">{subtitle}</p>}
          </header>

          <div className="rounded-[1.6rem] border border-line bg-card p-6 shadow-sm sm:p-8">
            {children}
          </div>

          <footer className="mt-8 text-center text-xs text-clay">
            <Link to="/" className="hover:text-ink">← 返回首页</Link>
            <span className="mx-2">·</span>
            <Link to="/privacy" className="hover:text-ink">隐私政策</Link>
            <span className="mx-2">·</span>
            <Link to="/terms" className="hover:text-ink">用户协议</Link>
            <span className="mx-2">·</span>
            <a href="mailto:2621413329@qq.com" className="hover:text-ink">2621413329@qq.com</a>
          </footer>
        </div>
      </main>
    </div>
  )
}
