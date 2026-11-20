import type { LegalSection } from '../data/privacy'

interface LegalArticleProps {
  sections: LegalSection[]
  disclaimer?: string
}

export default function LegalArticle({ sections, disclaimer }: LegalArticleProps) {
  return (
    <article className="prose-policy space-y-8 text-sm leading-relaxed text-[#3e5164]">
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="mb-4 border-b border-[#e4eef6] pb-2 text-base font-bold text-[#1d3348] sm:text-lg">
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
              <h3 className="mb-3 text-sm font-semibold text-[#1d3348]">{sub.subtitle}</h3>
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
                <p className="mt-2 text-xs text-[#7d8fa0]">{sub.footer}</p>
              )}
            </div>
          ))}

          {section.table && (
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-[#d5e4f0]">
                    {section.table.headers.map((h) => (
                      <th key={h} className="px-2 py-2 text-left font-semibold text-[#1d3348]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#eef3f8]">
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
            <p key={item.label} className="mb-3 border-l-2 border-[#e4eef6] pl-3">
              <strong className="text-[#1d3348]">{item.label}：</strong>
              {item.text}
            </p>
          ))}

          {section.note && (
            <p className="mb-3 font-medium text-[#8a5a12]">{section.note}</p>
          )}

          {section.contact && (
            <div className="mt-3 space-y-2 rounded-xl border border-[#e4eef6] bg-[#f7fbff] p-4">
              <p>
                <strong className="text-[#1d3348]">应用内路径：</strong>
                {section.contact.inApp}
              </p>
              <p>
                <strong className="text-[#1d3348]">联系邮箱：</strong>
                <a
                  href={`mailto:${section.contact.email}`}
                  className="text-[#2f7dce] underline hover:text-[#1d5fa8]"
                >
                  {section.contact.email}
                </a>
              </p>
            </div>
          )}

          {section.footer && <p className="mt-3 text-[#7d8fa0]">{section.footer}</p>}
        </section>
      ))}

      {disclaimer && (
        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-[#7a4e10] sm:text-sm">
          <strong>再次提示：</strong>
          {disclaimer}
        </div>
      )}
    </article>
  )
}
