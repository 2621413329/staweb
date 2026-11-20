import type { LegalSection } from '../data/privacy'

interface LegalArticleProps {
  sections: LegalSection[]
  disclaimer?: string
}

export default function LegalArticle({ sections, disclaimer }: LegalArticleProps) {
  return (
    <article className="space-y-8 text-sm leading-relaxed">
      {sections.map((section) => (
        <section key={section.title} id={section.title.includes('您的权利') ? 'account-deletion' : undefined}>
          <h2 className="text-base sm:text-lg font-bold mb-4 pb-2">
            {section.title}
          </h2>

          {section.paragraphs?.map((p) => (
            <p key={p.slice(0, 24)} className="mb-3">
              {p}
            </p>
          ))}

          {section.intro && <p className="mb-3">{section.intro}</p>}

          {section.subsections?.map((sub) => (
            <div key={sub.subtitle} className="mb-5">
              <h3 className="text-sm font-semibold mb-3">{sub.subtitle}</h3>
              {sub.paragraphs?.map((p) => (
                <p key={p.slice(0, 24)} className="mb-2">
                  {p}
                </p>
              ))}
              {sub.intro && <p className="mb-2">{sub.intro}</p>}
              {sub.list && (
                <ul className="list-disc pl-5 space-y-1 mb-2">
                  {sub.list.map((item) => (
                    <li key={item.slice(0, 24)}>{item}</li>
                  ))}
                </ul>
              )}
              {sub.text && <p className="mb-2">{sub.text}</p>}
              {sub.footer && (
                <p className="mt-2 text-xs" style={{ color: '#7B8A9A' }}>{sub.footer}</p>
              )}
            </div>
          ))}

          {section.table && (
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-xs sm:text-sm border-collapse">
                <thead>
                  <tr>
                    {section.table.headers.map((h) => (
                      <th key={h} className="text-left py-2 px-2 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row) => (
                    <tr key={row[0]}>
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

          {section.list && (
            <ul className="list-disc pl-5 space-y-2 mb-3">
              {section.list.map((item) => (
                <li key={item.slice(0, 24)}>{item}</li>
              ))}
            </ul>
          )}

          {section.items?.map((item) => (
            <p key={item.label} className="mb-3 pl-3 border-l-2" style={{ borderColor: 'rgba(94,169,255,0.35)' }}>
              <strong>{item.label}：</strong>
              {item.text}
            </p>
          ))}

          {section.note && (
            <p className="mb-3 font-medium">{section.note}</p>
          )}

          {section.contact && (
            <div className="mt-3 p-4 rounded-xl space-y-2" style={{ background: '#F5F9FF' }}>
              <p>
                <strong>应用内路径：</strong>
                {section.contact.inApp}
              </p>
              <p>
                <strong>联系邮箱：</strong>
                <a
                  href={`mailto:${section.contact.email}`}
                  className="underline"
                >
                  {section.contact.email}
                </a>
              </p>
            </div>
          )}

          {section.footer && <p className="mt-3" style={{ color: '#7B8A9A' }}>{section.footer}</p>}
        </section>
      ))}

      {disclaimer && (
        <div className="legal-note">
          <strong>再次提示：</strong>
          {disclaimer}
        </div>
      )}
    </article>
  )
}
