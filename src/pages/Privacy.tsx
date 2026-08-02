import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import LegalArticle from '../components/LegalArticle'
import { privacyMeta, privacySections } from '../data/privacy'

export default function Privacy() {
  return (
    <PageShell
      title={privacyMeta.title}
      subtitle={`${privacyMeta.subtitle} · 更新日期：${privacyMeta.updatedAt}`}
    >
      <p className="mb-6 text-sm text-blue-200/70">
        关联文档：
        <Link to="/terms" className="ml-1 text-blue-300 hover:text-blue-200 underline">
          用户协议
        </Link>
      </p>

      <LegalArticle
        sections={privacySections}
        disclaimer="本应用提供的情绪陪伴与 AI 内容仅供参考，不能替代专业医疗或心理咨询服务。请理性使用，妥善保护个人隐私。"
      />
    </PageShell>
  )
}
