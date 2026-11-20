import type { ReactNode } from 'react'
import Shell from './Shell'

interface PageShellProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export default function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <Shell>
      <article className="wrap legal">
        <h1>{title}</h1>
        {subtitle && <p className="lede">{subtitle}</p>}
        <div className="card legal-card" style={{ marginTop: 24 }}>
          {children}
        </div>
      </article>
    </Shell>
  )
}
