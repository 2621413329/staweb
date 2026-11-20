import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import IslandScene from '../components/IslandScene'
import Shell from '../components/Shell'
import { AvatarFace, StoryIslandArt } from '../components/IslandArt'
import { companions, heroLines, islandById } from '../data/site'

export default function Home() {
  const [line, setLine] = useState(0)
  const [shown, setShown] = useState(true)
  const [hover, setHover] = useState<string | null>(null)
  useEffect(() => {
    const timer = window.setInterval(() => {
      setShown(false)
      window.setTimeout(() => {
        setLine((value) => (value + 1) % heroLines.length)
        setShown(true)
      }, 400)
    }, 4000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <Shell>
      <section className="hero">
        <div className="wrap hero-sea">
          <IslandScene parallax interactive />
        </div>
        <div className="wrap hero-copy">
          <p className="rotator" style={{ opacity: shown ? 1 : 0 }}>
            {heroLines[line]}
          </p>
          <h1>把看不见的人生，变成一个可以回去的世界。</h1>
          <p className="lede">写下今天想留住的一句。它会自己找到岛，世界会因此慢慢长高。</p>
          <div className="btn-row" style={{ marginTop: 22 }}>
            <a className="btn btn-primary" href="#entries">
              先看看这座岛
            </a>
            <Link className="btn btn-secondary" to="/download">
              下载星屿
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="entries">
        <div className="wrap">
          <div className="entry-grid">
            <Link
              to="/world"
              className="card lift-card entry-card"
              onMouseEnter={() => setHover('islands')}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover('islands')}
              onBlur={() => setHover(null)}
            >
              <span className="card-isle" aria-hidden="true">
                <StoryIslandArt color={islandById('life').color} decor="tree" lamp={hover === 'islands' ? 1 : 0.45} />
              </span>
              <p className="entry-kicker">我的岛屿</p>
              <h2>世界就是首页。</h2>
              <p className="pale-note">海、主岛，和六座故事岛。</p>
            </Link>
            <Link
              to="/record"
              className="card lift-card entry-card"
              onMouseEnter={() => setHover('record')}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover('record')}
              onBlur={() => setHover(null)}
            >
              <span className="card-isle" aria-hidden="true">
                <StoryIslandArt color={islandById('life').color} decor="tree" lamp={hover === 'record' ? 1 : 0.45} />
              </span>
              <p className="entry-kicker">今日日常</p>
              <h2>有没有一个想留住的瞬间？</h2>
              <div className="fake-input" aria-hidden="true">
                <span>有没有一个想留住的瞬间？</span>
                <span className="record-key" />
              </div>
            </Link>
            <Link
              to="/growth"
              className="card lift-card entry-card"
              onMouseEnter={() => setHover('growth')}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover('growth')}
              onBlur={() => setHover(null)}
            >
              <span className="card-isle" aria-hidden="true">
                <StoryIslandArt color={islandById('health').color} decor="tree" lamp={hover === 'growth' ? 1 : 0.45} />
              </span>
              <p className="entry-kicker">成长轨迹</p>
              <h2>这段日子，被轻轻收好了。</h2>
              <p className="pale-note">一张很淡的心情摘要，不是图表。</p>
            </Link>
            <article
              className="card lift-card entry-card"
              onMouseEnter={() => setHover('more')}
              onMouseLeave={() => setHover(null)}
            >
              <span className="card-isle" aria-hidden="true">
                <StoryIslandArt color={islandById('wealth').color} decor="lamp" lamp={hover === 'more' ? 1 : 0.45} />
              </span>
              <p className="entry-kicker">更多</p>
              <h2>提醒、音乐、会员、协议。</h2>
              <p className="name-list">
                <span>提醒</span>
                <span>音乐</span>
                <Link to="/membership">会员</Link>
                <Link to="/terms">协议</Link>
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <CausalBand />
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="card people-strip">
            <div>
              <div className="avatar-row">
                {companions.map((person) => (
                  <Link key={person.id} to="/companion" className="avatar-link">
                    <span className="avatar" style={{ background: person.tint }}>
                      <AvatarFace tint={person.tint} name={person.name} />
                    </span>
                    {person.name}
                    {person.member && <span className="member-pill">会员</span>}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p>他们看见，不评判。</p>
              <Link to="/companion">去看看伙伴</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="wrap">
          <IslandScene level={6} lamps={{ main: 1, work: 0.4, study: 0.4, health: 0.4, social: 0.4, life: 0.4, wealth: 0.4 }} />
          <h2>你的世界还在等第一个瞬间。</h2>
          <Link className="btn btn-primary" to="/download">
            下载星屿
          </Link>
        </div>
      </section>
    </Shell>
  )
}

function CausalBand() {
  const ref = useRef<HTMLDivElement>(null)
  const [play, setPlay] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setPlay(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="wrap" ref={ref}>
      <div className="causal-track" aria-hidden="true">
        <span className={`causal-dot${play ? ' play' : ''}`} />
      </div>
      <ol className="causal">
        <li>
          <h3>写下</h3>
          <p>你只说生活。</p>
        </li>
        <li>
          <h3>安放</h3>
          <p>星屿把它放进工作、学业、健康、人际、生活或财富。</p>
        </li>
        <li>
          <h3>回来</h3>
          <p>下次打开，是去看看哪里变了。</p>
        </li>
      </ol>
    </div>
  )
}
