import PageShell from '../components/PageShell'
import { privacyMeta, privacySections } from '../data/privacy'

export default function Privacy() {
  return (
    <PageShell
      title={privacyMeta.title}
      subtitle={`更新日期：${privacyMeta.updatedAt} · 生效日期：${privacyMeta.effectiveAt}`}
    >
      <article className="prose-policy space-y-8 text-blue-100/80 text-sm leading-relaxed">
        {privacySections.map((section) => (
          <section key={section.title}>
            <h2 className="text-base sm:text-lg font-bold text-white mb-4 pb-2 border-b border-white/10">
              {section.title}
            </h2>

            {'paragraphs' in section &&
              section.paragraphs?.map((p) => (
                <p key={p.slice(0, 20)} className="mb-3">
                  {p}
                </p>
              ))}

            {'intro' in section && section.intro && (
              <p className="mb-3">{section.intro}</p>
            )}

            {'subsections' in section &&
              section.subsections?.map((sub) => (
                <div key={sub.subtitle} className="mb-5">
                  <h3 className="text-sm font-semibold text-blue-100 mb-3">
                    {sub.subtitle}
                  </h3>
                  {'items' in sub &&
                    sub.items?.map((item) => (
                      <p key={item.label} className="mb-2 pl-3 border-l-2 border-white/10">
                        <strong className="text-white">{item.label}：</strong>
                        {item.text}
                      </p>
                    ))}
                  {'paragraphs' in sub &&
                    sub.paragraphs?.map((p) => (
                      <p key={p.slice(0, 20)} className="mb-2">
                        {p}
                      </p>
                    ))}
                  {'intro' in sub && sub.intro && (
                    <p className="mb-2">{sub.intro}</p>
                  )}
                  {'list' in sub && sub.list && (
                    <ul className="list-disc pl-5 space-y-1 mb-2">
                      {sub.list.map((item) => (
                        <li key={item.slice(0, 20)}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {'text' in sub && sub.text && <p className="mb-2">{sub.text}</p>}
                  {'footer' in sub && sub.footer && (
                    <p className="mt-2 text-blue-200/60 text-xs">{sub.footer}</p>
                  )}
                </div>
              ))}

            {'table' in section && section.table && (
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/15">
                      {section.table.headers.map((h) => (
                        <th
                          key={h}
                          className="text-left py-2 px-2 text-white font-semibold"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row) => (
                      <tr key={row[0]} className="border-b border-white/5">
                        {row.map((cell, i) => (
                          <td key={i} className="py-2 px-2 align-top">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {'list' in section && section.list && (
              <ul className="list-disc pl-5 space-y-2 mb-3">
                {section.list.map((item) => (
                  <li key={item.slice(0, 24)}>{item}</li>
                ))}
              </ul>
            )}

            {'items' in section &&
              section.items?.map((item) => (
                <p key={item.label} className="mb-3 pl-3 border-l-2 border-white/10">
                  <strong className="text-white">{item.label}：</strong>
                  {item.text}
                </p>
              ))}

            {'note' in section && section.note && (
              <p className="mb-3 font-medium text-amber-200/90">{section.note}</p>
            )}

            {'contact' in section && section.contact && (
              <div className="mt-3 p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <p>
                  <strong className="text-white">应用内路径：</strong>
                  {section.contact.inApp}
                </p>
                <p>
                  <strong className="text-white">联系邮箱：</strong>
                  <a
                    href={`mailto:${section.contact.email}`}
                    className="text-blue-300 hover:text-blue-200 underline"
                  >
                    {section.contact.email}
                  </a>
                </p>
              </div>
            )}

            {'footer' in section && section.footer && (
              <p className="mt-3 text-blue-200/60">{section.footer}</p>
            )}
          </section>
        ))}

        <div className="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-400/20 text-amber-100/90 text-xs sm:text-sm">
          <strong>再次提示：</strong>
          本应用提供的情绪陪伴与 AI 内容仅供参考，不能替代专业医疗或心理咨询服务。请理性使用，妥善保护个人隐私。
        </div>
      </article>
    </PageShell>
  )
}
