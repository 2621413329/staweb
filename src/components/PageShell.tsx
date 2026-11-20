import { Link } from 'react-router-dom'
import SiteNav from './SiteNav'

interface PageShellProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export default function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-[#FFF6EE] text-[#3D3229]">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <header className="mb-8">
          <h1 className="font-serif text-3xl font-semibold">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-[#8C7B6B]">{subtitle}</p>}
        </header>
        <div className="rounded-[1.8rem] border border-[#F0E2D4] bg-white p-6 shadow-[0_20px_50px_rgba(120,80,40,0.05)] sm:p-8">
          {children}
        </div>
        <footer className="mt-8 text-center text-xs text-[#8C7B6B]">
          <Link to="/" className="hover:text-[#3D3229]">返回首页</Link>
          <span className="mx-2">·</span>
          <Link to="/privacy" className="hover:text-[#3D3229]">隐私政策</Link>
          <span className="mx-2">·</span>
          <Link to="/terms" className="hover:text-[#3D3229]">用户协议</Link>
          <span className="mx-2">·</span>
          <a href="mailto:2621413329@qq.com" className="hover:text-[#3D3229]">2621413329@qq.com</a>
        </footer>
      </main>
    </div>
  )
}
