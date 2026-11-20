import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AvatarFace } from '../components/IslandArt'
import Shell from '../components/Shell'
import { companions } from '../data/site'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function Companion() {
  const reduced = usePrefersReducedMotion()
  const scroller = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [dot, setDot] = useState(0)

  function scrollToCard(index: number) {
    const card = scroller.current?.children[index] as HTMLElement | undefined
    card?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <Shell>
      <section className="section">
        <div className="wrap">
          <header className="page-head">
            <h1>有人看见你放进世界的那些日子。</h1>
            <p>他们不催你成长。</p>
          </header>
          <div
            className="companion-row"
            ref={scroller}
            onScroll={(event) => {
              const el = event.currentTarget
              const width = el.clientWidth || 1
              setDot(Math.round(el.scrollLeft / (width * 0.8)))
            }}
          >
            {companions.map((person) => {
              const active = selected === person.id
              return (
                <article key={person.id} className={`card companion-card${active ? ' is-selected' : ''}${selected && !active ? ' is-dim' : ''}`}>
                  <button type="button" className="companion-hit" aria-pressed={active} onClick={() => setSelected(person.id)}>
                    <span className="avatar" style={{ background: person.tint }}>
                      <AvatarFace tint={person.tint} name={person.name} />
                    </span>
                    {person.member && <span className="member-pill">会员</span>}
                    {person.eyebrow && <p className="entry-kicker">{person.eyebrow}</p>}
                    <h2>{person.name}</h2>
                    <p>{person.line}</p>
                    {person.traits.length > 0 && (
                      <p className="trait-list">
                        {person.traits.map((trait) => (
                          <span key={trait}>{trait}</span>
                        ))}
                      </p>
                    )}
                  </button>
                  <div className={`intro-wrap${active ? ' open' : ' closed'}`} inert={active ? undefined : true}>
                    <div className="intro-inner">
                      <p>{person.intro}</p>
                      <Link className="btn btn-primary" to="/download">
                        {person.member ? '会员伙伴，下载后可在开通会员时选择' : '下载后可以选 TA'}
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
          <div className="dots">
            {companions.map((person, index) => (
              <button key={person.id} type="button" aria-label={person.name} aria-current={dot === index} onClick={() => scrollToCard(index)} />
            ))}
          </div>
          <div className="split" style={{ marginTop: 28 }}>
            <article className="card">
              <p>每天第一条日常，都可以和伙伴说说话。</p>
            </article>
            <article className="card">
              <p>会员可以有更多对话，也可以养更多座故事岛。</p>
            </article>
          </div>
          <p className="fine">伙伴不属于世界。世界属于你。</p>
        </div>
      </section>
    </Shell>
  )
}
