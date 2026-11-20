import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FlyLight from '../components/FlyLight'
import { centerOf, type Point } from '../lib/geometry'
import { AvatarFace } from '../components/IslandArt'
import IslandScene from '../components/IslandScene'
import Shell from '../components/Shell'
import { companions, islandById, islandForTags, islandName, moods, type IslandId, type MoodId } from '../data/site'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const steps = [
  { id: 'write', label: '写下' },
  { id: 'mood', label: '心情' },
  { id: 'tags', label: '标签' },
  { id: 'media', label: '照片与语音' },
  { id: 'done', label: '完成' },
]

export default function Record() {
  const reduced = usePrefersReducedMotion()
  const demoRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const [step, setStep] = useState(0)
  const [sentence, setSentence] = useState('')
  const [mood, setMood] = useState<MoodId>('calm')
  const [tags, setTags] = useState(['生活', '家人'])
  const [editing, setEditing] = useState(false)
  const [custom, setCustom] = useState('')
  const [message, setMessage] = useState('')
  const [flight, setFlight] = useState<{ token: number; color: string; from: Point; to: Point } | null>(null)
  const token = useRef(0)
  const landing = islandForTags(tags, sentence)
  const star = companions[0]

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(() => {
      setStep((value) => (value + 1) % steps.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [paused])

  useEffect(() => {
    if (step !== 4) {
      setMessage('')
      return
    }
    if (!demoRef.current) return
    const origin = demoRef.current.querySelector('[data-fly-origin]')
    const target = demoRef.current.querySelector(`[data-island="${landing}"]`)
    if (!origin || !target) return
    const island = islandById(landing)
    token.current += 1
    const current = token.current
    setFlight({
      token: current,
      color: island.color,
      from: centerOf(origin),
      to: centerOf(target),
    })
    const delay = reduced ? 200 : 1200
    const timer = window.setTimeout(() => {
      if (token.current !== current) return
      setMessage(`已安放在${islandName(landing)}。`)
    }, delay)
    return () => window.clearTimeout(timer)
  }, [step, landing, reduced])

  function replaceTag() {
    const next = custom.trim()
    if (!next) return
    setTags([next])
    setCustom('')
    setEditing(false)
  }

  const lamps = Object.fromEntries(
    (['work', 'study', 'health', 'social', 'life', 'wealth'] as IslandId[]).map((id) => [id, id === landing && step === 4 ? 1 : 0.4]),
  ) as Partial<Record<IslandId, number>>

  return (
    <Shell>
      <section className="section">
        <div className="wrap">
          <header className="page-head">
            <h1>有没有一个想留住的瞬间？</h1>
            <p>不必是大事。一行也可以。</p>
          </header>
          <div className="phone-demo" ref={demoRef}>
            <div
              className="phone"
              onPointerEnter={() => setPaused(true)}
              onPointerLeave={() => setPaused(false)}
              onFocusCapture={() => setPaused(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node)) setPaused(false)
              }}
            >
              {step === 0 && (
                <div>
                  <label htmlFor="daily">写下</label>
                  <textarea
                    id="daily"
                    className="field"
                    rows={4}
                    placeholder="今晚发生的一件小事"
                    value={sentence}
                    onChange={(event) => setSentence(event.target.value)}
                  />
                  <div className="partner-mini">
                    <span className="avatar mini" style={{ background: star.tint }}>
                      <AvatarFace tint={star.tint} name={star.name} />
                    </span>
                    <span>{star.name}</span>
                  </div>
                </div>
              )}
              {step === 1 && (
                <div>
                  <p>心情</p>
                  <div className="mood-row" role="group" aria-label="心情">
                    {moods.map((item) => (
                      <div key={item.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <button
                          type="button"
                          className="mood-face"
                          aria-pressed={mood === item.id}
                          aria-label={item.label}
                          onClick={() => setMood(item.id)}
                        >
                          <MoodFace kind={item.id} />
                        </button>
                        <span className="hint">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {step === 2 && (
                <div>
                  <p>标签</p>
                  <div className="chip-row" style={{ marginTop: 10 }}>
                    {tags.map((tag) => (
                      <span key={tag} className={`chip${editing ? ' is-editing' : ''}`}>
                        {tag}
                        {editing && (
                          <button type="button" className="chip-x" aria-label={`去掉${tag}`} onClick={() => setTags(tags.filter((item) => item !== tag))}>
                            ×
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                  {!editing ? (
                    <button type="button" className="chip" style={{ marginTop: 12 }} onClick={() => setEditing(true)}>
                      改一下
                    </button>
                  ) : (
                    <div style={{ marginTop: 12 }}>
                      <label className="sr-only" htmlFor="my-tag">
                        换成我的说法
                      </label>
                      <input
                        id="my-tag"
                        className="field"
                        value={custom}
                        placeholder="换成我的说法"
                        onChange={(event) => setCustom(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') replaceTag()
                        }}
                      />
                      <button type="button" className="chip" style={{ marginTop: 8 }} onClick={replaceTag}>
                        换成我的说法
                      </button>
                    </div>
                  )}
                </div>
              )}
              {step === 3 && (
                <div>
                  <p>照片与语音</p>
                  <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                    <Link to="/membership" className="dash">
                      照片
                      <small>星屿会员</small>
                    </Link>
                    <Link to="/membership" className="dash">
                      语音
                      <small>星屿会员</small>
                    </Link>
                  </div>
                  <button type="button" className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setStep(4)}>
                    放进世界
                  </button>
                </div>
              )}
              {step === 4 && (
                <div>
                  <p data-fly-origin>「{sentence.trim() || '今晚发生的一件小事'}」</p>
                  <div className="record-layout">
                    <IslandScene className="is-clip" lamps={{ ...lamps, main: 0.8 }} />
                  </div>
                  <p className="live-line" aria-live="polite">
                    {message}
                  </p>
                  <p className="partner-line">我看见了，它在这里很安全。</p>
                </div>
              )}
              <div className="step-dots" role="tablist" aria-label="记录步骤">
                {steps.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={item.label}
                    aria-current={step === index ? 'step' : undefined}
                    onClick={() => setStep(index)}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="three">
                <article className="card">
                  <p>你写的是生活。</p>
                </article>
                <article className="card">
                  <p>心情和标签可以随时改。AI 只是先帮你放一下。</p>
                </article>
                <article className="card">
                  <p>照片用来自己回看。语音用来把没打出来的话留下。</p>
                </article>
              </div>
              <p className="fine" style={{ marginTop: 18 }}>
                这些整理只属于你自己看，也只供个人参考。它不是诊断，也不是建议。
              </p>
            </div>
          </div>
        </div>
      </section>
      <FlyLight token={flight?.token ?? 0} color={flight?.color ?? '#F4A261'} from={flight?.from ?? null} to={flight?.to ?? null} />
    </Shell>
  )
}

function MoodFace({ kind }: { kind: MoodId }) {
  const mouth =
    kind === 'happy'
      ? 'M14 24 Q20 30 26 24'
      : kind === 'sad'
        ? 'M14 28 Q20 22 26 28'
        : kind === 'annoyed'
          ? 'M13 26 H27'
          : kind === 'tired'
            ? 'M15 27 H25'
            : 'M14 25 H26'
  const eyes = kind === 'tired' ? 'M15 16 H18 M22 16 H25' : 'M16 16 H18 M22 16 H24'
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <path d={eyes} fill="none" stroke="#2C3E50" strokeWidth="1.6" strokeLinecap="round" />
      <path d={mouth} fill="none" stroke="#2C3E50" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
