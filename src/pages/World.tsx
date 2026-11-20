import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FlyLight from '../components/FlyLight'
import { centerOf, type Point } from '../lib/geometry'
import IslandScene from '../components/IslandScene'
import { MainIslandArt } from '../components/IslandArt'
import Shell from '../components/Shell'
import {
  classifySentence,
  growthLevels,
  islandById,
  islandName,
  skies,
  storyIslands,
  worldPresets,
  type IslandId,
  type Sky,
} from '../data/site'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function World() {
  const reduced = usePrefersReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const originRef = useRef<HTMLInputElement>(null)
  const [preset, setPreset] = useState(0)
  const [text, setText] = useState(worldPresets[0].text)
  const [sky, setSky] = useState<Sky>('clear')
  const [level, setLevel] = useState(1)
  const [bright, setBright] = useState<IslandId | null>(null)
  const [message, setMessage] = useState('')
  const [flight, setFlight] = useState<{ token: number; color: string; from: Point; to: Point } | null>(null)
  const token = useRef(0)

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-level]')
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        setLevel(Number(visible.target.getAttribute('data-level')))
      },
      { threshold: [0.6] },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  function choosePreset(index: number) {
    setPreset(index)
    setText(worldPresets[index].text)
  }

  function place() {
    const sentence = text.trim()
    if (!sentence || !stageRef.current || !originRef.current) return
    const islandId = classifySentence(sentence, worldPresets[preset].island)
    const island = islandById(islandId)
    const target = stageRef.current.querySelector(`[data-island="${islandId}"]`)
    if (!target) return
    token.current += 1
    const current = token.current
    setFlight({
      token: current,
      color: island.color,
      from: centerOf(originRef.current),
      to: centerOf(target),
    })
    const delay = reduced ? 200 : 1200
    window.setTimeout(() => {
      if (token.current !== current) return
      setBright(islandId)
      setMessage(`已安放在${islandName(islandId)}。`)
    }, delay)
  }

  const lamps = {
    main: 0.9,
    work: bright === 'work' ? 1 : 0.45,
    study: bright === 'study' ? 1 : 0.45,
    health: bright === 'health' ? 1 : 0.45,
    social: bright === 'social' ? 1 : 0.45,
    life: bright === 'life' ? 1 : 0.45,
    wealth: bright === 'wealth' ? 1 : 0.45,
  }

  return (
    <Shell>
      <section className="section">
        <div className="wrap">
          <header className="page-head">
            <h1>世界不是背景。</h1>
            <p>你回来，是为了看看今天的海。</p>
          </header>
          <div className="stage">
            <div ref={stageRef}>
              <IslandScene sky={sky} level={level} lamps={lamps} interactive className="is-flat" />
              {!message && <p className="live-line">你的世界还在等第一个瞬间。</p>}
              <p className="live-line" aria-live="polite">
                {message}
              </p>
            </div>
            <form
              className="card"
              onSubmit={(event) => {
                event.preventDefault()
                place()
              }}
            >
              <div className="preset-row" role="radiogroup" aria-label="示例日常">
                {worldPresets.map((item, index) => (
                  <button
                    key={item.text}
                    type="button"
                    className="chip"
                    role="radio"
                    aria-checked={preset === index}
                    onClick={() => choosePreset(index)}
                  >
                    {item.text}
                  </button>
                ))}
              </div>
              <label className="sr-only" htmlFor="world-sentence">
                想留下的一句
              </label>
              <input
                id="world-sentence"
                ref={originRef}
                className="field"
                maxLength={24}
                value={text}
                onChange={(event) => setText(event.target.value.slice(0, 24))}
              />
              <button className="btn btn-primary" type="submit" disabled={!text.trim()} style={{ marginTop: 16 }}>
                放进世界
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap grow-layout">
          <div className="sticky-island card" style={{ textAlign: 'center' }}>
            <MainIslandArt level={level} lamp={1} sky={sky} detailed />
            <p className="pale-note">建筑是日子留下来的形状，不是打卡换来的奖品。</p>
          </div>
          <div className="level-row">
            {growthLevels.map((node) => (
              <article
                key={node.level}
                className={`card level-node${level === node.level ? ' is-current' : ''}`}
                data-level={node.level}
              >
                <h3>{node.title}</h3>
                <p>{node.names}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap island-list">
          {storyIslands.map((island) => (
            <article key={island.id} className="card island-info" style={{ ['--tone' as string]: island.color }}>
              <div className="bar" />
              <div className="body">
                <h3>{island.name}岛</h3>
                <p>{island.days}</p>
                <p className="pale-note">「{island.example}」</p>
              </div>
            </article>
          ))}
          <p className="fine">每个分类，一开始有一座岛。会员可以拥有更多座。</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2>岛上的天色会变。</h2>
          <p className="lede">它是世界的空气，不是一张天气预报。</p>
          <div className="quad" style={{ marginTop: 18 }}>
            {skies.map((item) => (
              <button
                key={item.id}
                type="button"
                className="card sky-card"
                aria-pressed={sky === item.id}
                onClick={() => setSky(item.id)}
              >
                <div className={`sky-thumb ${item.id}`} aria-hidden="true">
                  <i />
                </div>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="card widget">
            <div className="widget-frame">
              <strong>今日</strong>
              今晚的面，比平时咸一点。
            </div>
            <div>
              <h2>锁屏和桌面也能看见自己的岛。</h2>
              <p className="pale-note">
                <Link to="/">点开回到我的岛屿</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <FlyLight token={flight?.token ?? 0} color={flight?.color ?? '#5EA9FF'} from={flight?.from ?? null} to={flight?.to ?? null} />
    </Shell>
  )
}
