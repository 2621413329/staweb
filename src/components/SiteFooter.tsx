import { Link } from 'react-router-dom'
import { legalMeta } from '../data/legal-meta'

export default function SiteFooter() {
  return (
    <footer className="border-t border-ink/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-mist sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>成长小岛 · 星屿。把看不见的人生，变成一个可以回去的世界。</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <Link to="/download" className="hover:text-ink">下载</Link>
          <Link to="/privacy" className="hover:text-ink">隐私政策</Link>
          <Link to="/terms" className="hover:text-ink">用户协议</Link>
          <a href={`mailto:${legalMeta.contactEmail}`} className="hover:text-ink">
            {legalMeta.contactEmail}
          </a>
        </div>
      </div>
    </footer>
  )
}
