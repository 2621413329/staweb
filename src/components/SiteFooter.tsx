import { Link } from 'react-router-dom'
import { legalMeta } from '../data/legal-meta'

export default function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 px-5 py-10 text-sm text-mist">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-medium text-ink">星屿 · 成长小岛</p>
          <p className="mt-2 max-w-xl text-xs leading-relaxed">
            情绪陪伴、成长建议与 AI 内容仅供个人参考，不能替代专业医疗或心理咨询。
          </p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <Link to="/download" className="hover:text-ink">
            下载
          </Link>
          <Link to="/privacy" className="hover:text-ink">
            隐私政策
          </Link>
          <Link to="/terms" className="hover:text-ink">
            用户协议
          </Link>
          <a href={`mailto:${legalMeta.contactEmail}`} className="hover:text-ink">
            {legalMeta.contactEmail}
          </a>
        </div>
      </div>
    </footer>
  )
}
