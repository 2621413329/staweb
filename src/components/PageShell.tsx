import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'

interface PageShellProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export default function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#fff8f2] text-[#3d3229]">
      <SiteNav />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <header className="mb-6">
          <h1 className="font-serif text-3xl text-[#3d3229]">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-[#8c7b6b]">{subtitle}</p>}
        </header>
        <div className="rounded-[28px] border border-[#eadfd4] bg-white p-6 shadow-sm sm:p-8">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
