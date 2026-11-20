import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MainIslandArt } from '../components/IslandArt'
import Shell from '../components/Shell'
import { growthStories, moodById } from '../data/site'

const periods = [
  { id: 'week', label: '本周' },
  { id: 'month', label: '本月' },
  { id: 'quarter', label: '近三个月' },
] as const

type Period = (typeof periods)[number]['id']

export default function Growth() {
  const [period, setPeriod] = useState<Period>('week')
  const [openId, setOpenId] = useState<string | null>(null)
  const story = growthStories[period]
  const open = story.entries.find((entry) => entry.id === openId) ?? null

  return (
    <Shell>
      <section className="section">
        <div className="wrap">
          <header className="page-head">
            <h1>回来看看这段日子。</h1>
            <p>意义比事件重要，事件比数字重要。</p>
          </header>
          <div className="period-row" role="radiogroup" aria-label="回顾的时间">
            {periods.map((item) => (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={period === item.id}
                onClick={() => {
                  setPeriod(item.id)
                  setOpenId(null)
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <article className="card fade-panel" key={period} style={{ marginTop: 18 }}>
            <p>{story.entries.length === 0 ? '这段时间还没有心情留下。记下日常之后，这里会出现一句很轻的回顾。' : story.summary}</p>
            <div className="mood-pills">
              {story.entries.map((entry) => {
                const mood = moodById(entry.mood)
                const expanded = openId === entry.id
                return (
                  <button
                    key={entry.id}
                    type="button"
                    className="mood-pill"
                    aria-expanded={expanded}
                    aria-label={`${entry.when}，${mood.label}，${entry.text}`}
                    onClick={() => setOpenId(expanded ? null : entry.id)}
                  >
                    <i className="color-dot" style={{ background: mood.color }} />
                    {mood.label}
                  </button>
                )
              })}
            </div>
            {open && (
              <p className="entry-open">
                {open.when} · {moodById(open.mood).label} · {open.text}
              </p>
            )}
          </article>

          <article className="card frost" style={{ marginTop: 18 }}>
            <div className="blob-row" aria-hidden="true">
              <span style={{ width: '72%', background: '#5EA9FF' }} />
              <span style={{ width: '40%', background: '#A1887F' }} />
              <span style={{ width: '26%', background: '#4DBA7A' }} />
              <span style={{ width: '54%', background: '#F4A261' }} />
            </div>
            <div className="frost-veil">
              <ul>
                <li>按成长标签看心情分布</li>
                <li>大约一百字的心情总结</li>
              </ul>
              <p>开通星屿会员后，可以看这段日子的心情统计和总结。</p>
              <Link className="btn btn-primary" to="/membership">
                了解会员
              </Link>
            </div>
          </article>

          <Link to="/world" className="card world-link" style={{ marginTop: 18 }}>
            <MainIslandArt level={6} lamp={1} detailed />
            <p>轨迹是回头看，岛是走进去。</p>
          </Link>
        </div>
      </section>
    </Shell>
  )
}
