import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'

interface PageShellProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export default function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <div className="page-scroll flex min-h-full flex-col bg-[#f7f4ee] text-ink">
      <SiteNav />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          <header className="mb-8">
            <h1 className="font-display text-3xl text-ink sm:text-4xl">{title}</h1>
            {subtitle && <p className="mt-2 text-sm text-mist">{subtitle}</p>}
          </header>

          <div className="rounded-[28px] bg-white p-6 shadow-[0_18px_50px_-36px_rgba(36,52,71,0.45)] ring-1 ring-ink/5 sm:p-8">
            {children}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
