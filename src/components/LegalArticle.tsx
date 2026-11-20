import type { LegalSection } from '../data/privacy'

interface LegalArticleProps {
  sections: LegalSection[]
  disclaimer?: string
}

export default function LegalArticle({ sections, disclaimer }: LegalArticleProps) {
  return (
    <article className="prose-policy space-y-8 text-sm leading-relaxed text-ink/80">
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="mb-4 border-b border-ink/10 pb-2 text-base font-bold text-ink sm:text-lg">
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
              <h3 className="mb-3 text-sm font-semibold text-ink">{sub.subtitle}</h3>
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
                <p className="mt-2 text-xs text-mist">{sub.footer}</p>
              )}
            </div>
          ))}

          {section.table && (
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-ink/10">
                    {section.table.headers.map((h) => (
                      <th key={h} className="px-2 py-2 text-left font-semibold text-ink">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row) => (
                    <tr key={row[0]} className="border-b border-ink/5">
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
            <p key={item.label} className="mb-3 border-l-2 border-ink/10 pl-3">
              <strong className="text-ink">{item.label}：</strong>
              {item.text}
            </p>
          ))}

          {section.note && (
            <p className="mb-3 font-medium text-[#8a5a2a]">{section.note}</p>
          )}

          {section.contact && (
            <div className="mt-3 space-y-2 rounded-xl border border-ink/10 bg-sand p-4">
              <p>
                <strong className="text-ink">应用内路径：</strong>
                {section.contact.inApp}
              </p>
              <p>
                <strong className="text-ink">联系邮箱：</strong>
                <a
                  href={`mailto:${section.contact.email}`}
                  className="text-sky underline"
                >
                  {section.contact.email}
                </a>
              </p>
            </div>
          )}

          {section.footer && <p className="mt-3 text-mist">{section.footer}</p>}
        </section>
      ))}

      {disclaimer && (
        <div className="mt-8 rounded-xl border border-[#f0d7b0] bg-[#fff6e8] p-4 text-xs text-[#8a5a2a] sm:text-sm">
          <strong>再次提示：</strong>
          {disclaimer}
        </div>
      )}
    </article>
  )
}
