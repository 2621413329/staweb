import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import LegalArticle from '../components/LegalArticle'
import { termsMeta, termsSections } from '../data/terms'

export default function Terms() {
  return (
    <PageShell
      title={termsMeta.title}
      subtitle={`${termsMeta.subtitle} · 更新日期：${termsMeta.updatedAt}`}
    >
      <p className="mb-6 text-sm text-mist">
        关联文档：
        <Link to="/privacy" className="ml-1 text-sky underline">
          隐私政策
        </Link>
      </p>

      <LegalArticle
        sections={termsSections}
        disclaimer="本应用提供的情绪陪伴与成长建议仅供参考，不能替代专业医疗或心理咨询服务。订阅与退款事宜请同时参阅 Apple App Store 相关政策。"
      />
    </PageShell>
  )
}
