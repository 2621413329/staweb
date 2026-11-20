import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import SiteFooter from './SiteFooter'
import SiteNav from './SiteNav'

interface PageShellProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export default function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-sand text-ink">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-5 pb-8 pt-28 sm:px-6">
        <p className="text-sm text-mist">
          <Link to="/" className="hover:text-ink">
            星屿
          </Link>
          <span className="mx-2">/</span>
          {title}
        </p>
        <h1 className="mt-3 font-display text-4xl text-ink">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-mist">{subtitle}</p>}
        <div className="mt-8 rounded-[28px] border border-ink/5 bg-white p-6 shadow-soft sm:p-8">{children}</div>
      </main>
      <SiteFooter />
    </div>
  )
}
