import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import SiteNav from './SiteNav'

interface PageShellProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export default function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <div className="page-scroll flex min-h-full w-full flex-col bg-[#f4f8fc] text-[#243447]">
      <SiteNav />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
          <header className="mb-8">
            <h1 className="mb-2 text-2xl font-black text-[#1d3348] sm:text-3xl">{title}</h1>
            {subtitle && <p className="text-sm text-[#6d7e90]">{subtitle}</p>}
          </header>

          <div className="rounded-3xl border border-[#e4eef6] bg-white p-6 shadow-sm sm:p-8">
            {children}
          </div>

          <footer className="mt-8 text-center text-xs text-[#8aa0b3]">
            <Link to="/" className="hover:text-[#2f7dce]">
              ← 返回首页
            </Link>
            <span className="mx-2">·</span>
            <Link to="/privacy" className="hover:text-[#2f7dce]">
              隐私政策
            </Link>
            <span className="mx-2">·</span>
            <Link to="/terms" className="hover:text-[#2f7dce]">
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
