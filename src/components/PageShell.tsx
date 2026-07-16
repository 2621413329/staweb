import { Link } from 'react-router-dom'
import SiteNav from '../components/SiteNav'

interface PageShellProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export default function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <div className="page-scroll flex flex-col w-full min-h-full bg-gradient-to-br from-sky-900 via-blue-900 to-indigo-950">
      <SiteNav />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <header className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h1>
            {subtitle && (
              <p className="text-sm text-blue-200/60">{subtitle}</p>
            )}
          </header>

          <div className="rounded-2xl bg-slate-900/50 backdrop-blur-md border border-white/10 p-6 sm:p-8 shadow-xl">
            {children}
          </div>

          <footer className="mt-8 text-center text-xs text-blue-200/40">
            <Link to="/" className="hover:text-blue-200/70 transition-colors">
              ← 返回首页
            </Link>
            <span className="mx-2">·</span>
            <Link to="/privacy" className="hover:text-blue-200/70 transition-colors">
              隐私政策
            </Link>
            <span className="mx-2">·</span>
            <Link to="/terms" className="hover:text-blue-200/70 transition-colors">
              用户协议
            </Link>
            <span className="mx-2">·</span>
            <span>联系：2621413329@qq.com</span>
          </footer>
        </div>
      </main>
    </div>
  )
}
