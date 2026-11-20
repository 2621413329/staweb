import { useEffect, useRef, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import MoodFace from './MoodFace'
import VoiceHoldButton from './VoiceHoldButton'
import WorldStage from './WorldStage'
import {
  chooseIsland,
  companionById,
  growthView,
  islandById,
  moods,
  quickPrompts,
  storyBody,
  studioSeeds,
  witnessLine,
  type CompanionId,
  type IslandId,
  type MoodId,
  type StoryCard,
} from '../../data/showcase'

const FLIGHT_MS = 980

interface Flight {
  id: number
  x: number
  y: number
  tx: number
  ty: number
  color: string
}

interface StoryStudioProps {
  companionId: CompanionId
}

export default function StoryStudio({ companionId }: StoryStudioProps) {
  const companion = companionById(companionId)
  const rootRef = useRef<HTMLDivElement>(null)
  const alive = useRef(true)
  const [text, setText] = useState('')
  const [moodId, setMoodId] = useState<MoodId>('ping_jing')
  const [voiceSeconds, setVoiceSeconds] = useState<number | null>(null)
  const [photoOn, setPhotoOn] = useState(false)
  const [hint, setHint] = useState('按住说话，松手后会留下一段语音。一行字也可以。')
  const [mine, setMine] = useState<StoryCard[]>([])
  const [pendingId, setPendingId] = useState<IslandId | null>(null)
  const [busy, setBusy] = useState(false)
  const [flight, setFlight] = useState<Flight | null>(null)
  const [lastWitness, setLastWitness] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<IslandId | null>('life')
  const [banner, setBanner] = useState<string | null>(null)
  const levelBefore = useRef(6)

  const stories = [...mine, ...studioSeeds]
  const growth = growthView(mine.length)
  const typedPreview =
    text.trim().length >= 2 || voiceSeconds || photoOn ? chooseIsland(text, moodId) : null
  const previewId = pendingId ?? typedPreview
  const mood = moods.find((item) => item.id === moodId) ?? moods[0]

  let speech = `${companion.name}在。今天想留下的，一行就可以。`
  if (busy) speech = `${companion.name}正在理解你的日常…`
  else if (previewId && (text.trim().length >= 2 || voiceSeconds || photoOn)) {
    speech = `${companion.name}准备把这句放到${islandById(previewId).name}。`
  } else if (lastWitness) speech = lastWitness

  useEffect(() => {
    alive.current = true
    return () => {
      alive.current = false
    }
  }, [])

  useEffect(() => {
    if (!banner) return
    const timer = window.setTimeout(() => setBanner(null), 2800)
    return () => window.clearTimeout(timer)
  }, [banner])

  useEffect(() => {
    if (growth.level > levelBefore.current) {
      const line = growth.level === 7 ? '灯塔亮了。' : '世界还在慢慢长高。'
      setBanner(`世界长高了一点 · Lv.${growth.level} ${growth.title}。${line}`)
    }
    levelBefore.current = growth.level
  }, [growth.level, growth.title])

  const place = async () => {
    const body = storyBody(text, Boolean(voiceSeconds), photoOn)
    if (!body || busy) {
      setHint('先写下一句，或按住说一段。')
      return
    }
    const islandId = chooseIsland(text, moodId)
    const island = islandById(islandId)
    const root = rootRef.current
    const from = root?.querySelector<HTMLElement>('[data-place]')
    const to = root?.querySelector<HTMLElement>(`[data-island="${islandId}"]`)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setPendingId(islandId)
    setBusy(true)
    setActiveId(islandId)
    if (root && from && to && !reduce) {
      const box = root.getBoundingClientRect()
      const start = from.getBoundingClientRect()
      const end = to.getBoundingClientRect()
      setFlight({
        id: Date.now(),
        x: start.left - box.left + start.width / 2 - 7,
        y: start.top - box.top + start.height / 2 - 7,
        tx: end.left - box.left + end.width / 2 - 7,
        ty: end.top - box.top + end.height / 2 - 7,
        color: mood.color,
      })
      await wait(FLIGHT_MS)
    } else {
      await wait(280)
    }
    if (!alive.current) return
    const story: StoryCard = {
      id: `mine-${Date.now()}`,
      text: body,
      moodId,
      islandId,
      hasVoice: Boolean(voiceSeconds),
      hasPhoto: photoOn,
      voiceSeconds: voiceSeconds ?? undefined,
    }
    setMine((current) => [story, ...current])
    setLastWitness(witnessLine(companion.name, island.name, mood.label, body.length + mine.length))
    setText('')
    setVoiceSeconds(null)
    setPhotoOn(false)
    setFlight(null)
    setPendingId(null)
    setBusy(false)
    setHint('它已经在岛上了。还可以再留一句。')
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    void place()
  }

  return (
    <section id="record" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium tracking-[0.16em] text-peachdeep">可以亲手做一次</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight text-ink sm:text-5xl">
          写下今天，看它飞向对应的岛
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist">
          这是星屿里最重要的动作。输入时，伙伴会先判断落点；保存之后，这句话变成一点光，树、屋子和灯会跟着长出来。
        </p>

        <div
          ref={rootRef}
          className="relative mt-8 lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:items-start lg:gap-6"
        >
          <div className="relative lg:sticky lg:top-24">
          <WorldStage
            companionId={companionId}
            stories={stories}
            speech={speech}
            activeId={activeId}
            previewId={previewId}
            monument={growth.level >= 7}
            className="h-[420px] sm:h-[480px] lg:h-[640px]"
            onIsland={setActiveId}
            hud={
              <div className="absolute left-3 top-3 z-20 rounded-2xl border border-white/70 bg-white/85 px-3 py-2 shadow-soft backdrop-blur-md sm:left-4 sm:top-4">
                <p className="text-[11px] text-mist">成长等级 · 成长值 {growth.value}</p>
                <p className="text-sm font-semibold text-ink">
                  Lv.{growth.level} {growth.title}
                </p>
                <div className="mt-1.5 h-1.5 w-32 overflow-hidden rounded-full bg-ink/10">
                  <div
                    className="h-full rounded-full bg-sky transition-all duration-700"
                    style={{ width: `${Math.min(100, (growth.into / growth.need) * 100)}%` }}
                  />
                </div>
                <p className="mt-1 text-[11px] text-mist">{growth.nextLabel}</p>
              </div>
            }
          />

          {banner && (
            <div className="absolute left-1/2 top-16 z-30 w-[min(92%,320px)] -translate-x-1/2 rounded-2xl bg-white/95 px-4 py-3 text-center shadow-card">
              <p className="text-sm font-semibold text-ink">{banner}</p>
            </div>
          )}
          </div>

          <div className="mt-5 space-y-5 lg:mt-0">
            <form
              onSubmit={onSubmit}
              className="rounded-[28px] border border-ink/5 bg-white p-5 shadow-soft"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">记录今天的故事</h3>
                  <p className="mt-1 text-sm text-mist">{companion.name}将帮你放入合适的岛屿</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2" role="listbox" aria-label="此刻的感受">
                {moods.map((item) => {
                  const selected = item.id === moodId
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => setMoodId(item.id)}
                      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium ${
                        selected ? 'border-transparent text-white' : 'border-ink/10 bg-sand text-ink'
                      }`}
                      style={selected ? { background: item.color } : undefined}
                    >
                      <MoodFace face={item.face} color={item.color} className="h-5 w-5" />
                      {item.label}
                    </button>
                  )
                })}
              </div>

              <label className="mt-4 block text-xs font-medium text-mist" htmlFor="story-draft">
                今天发生了什么？
              </label>
              <textarea
                id="story-draft"
                value={text}
                onChange={(event) => setText(event.target.value)}
                onKeyDown={(event) => {
                  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                    event.preventDefault()
                    void place()
                  }
                }}
                rows={3}
                placeholder="有什么想法想留下来？"
                className="mt-2 w-full resize-none rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base leading-relaxed text-ink outline-none focus:border-sky"
              />

              <div className="mt-3 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt.text}
                    type="button"
                    onClick={() => {
                      setText(prompt.text)
                      setMoodId(prompt.moodId)
                    }}
                    className="rounded-full bg-foam px-3 py-1.5 text-left text-xs text-ink hover:bg-ocean/40"
                  >
                    {prompt.text}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <VoiceHoldButton
                  onClip={(seconds) => {
                    setVoiceSeconds(seconds)
                    setHint(`语音 ${seconds} 秒已留下。保存后会一起飞到岛上。`)
                  }}
                  onShort={() => setHint('说话时间太短。')}
                />
                <button
                  type="button"
                  aria-pressed={photoOn}
                  onClick={() => setPhotoOn((value) => !value)}
                  className={`rounded-full border px-4 py-2.5 text-sm ${
                    photoOn ? 'border-peach bg-peach/15' : 'border-ink/10 bg-white'
                  }`}
                >
                  {photoOn ? '照片已选' : '相册 / 拍摄'}
                </button>
                {voiceSeconds && (
                  <span className="rounded-full bg-sand px-3 py-1.5 text-xs text-ink">
                    语音 {voiceSeconds} 秒
                  </span>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  data-place
                  disabled={busy}
                  className="jelly-btn h-12 rounded-full px-6 text-sm font-semibold text-white"
                >
                  {busy ? '安放中…' : '保存日常'}
                </button>
                {mine.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setMine([])
                      setLastWitness(null)
                      setBanner(null)
                      setHint('写下的句子已清空。岛上原本的故事还在。')
                    }}
                    className="text-sm text-mist hover:text-ink"
                  >
                    清空我写下的
                  </button>
                )}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-mist">{hint} Ctrl / ⌘ + Enter 也可以安放。</p>
            </form>

            <div className="rounded-[28px] border border-ink/5 bg-white p-5 shadow-soft">
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold">已经在岛上的故事</h3>
                <span className="text-xs text-mist">{stories.length} 则</span>
              </div>
              <ul className="mt-4 space-y-3">
                {stories
                  .filter((story) => (activeId ? story.islandId === activeId : true))
                  .slice(0, 6)
                  .map((story) => {
                    const storyMood = moods.find((item) => item.id === story.moodId) ?? moods[0]
                    const island = islandById(story.islandId)
                    return (
                      <li key={story.id}>
                        <button
                          type="button"
                          onClick={() => setActiveId(story.islandId)}
                          className="flex w-full gap-3 rounded-2xl bg-sand px-3 py-3 text-left hover:bg-foam"
                        >
                          <MoodFace face={storyMood.face} color={storyMood.color} className="h-9 w-9 shrink-0" />
                          <span>
                            <span className="block text-sm leading-relaxed text-ink">{story.text}</span>
                            <span className="mt-1 block text-xs text-mist">
                              {island.name} · {storyMood.label}
                              {story.hasVoice ? ' · 语音' : ''}
                              {story.hasPhoto ? ' · 照片' : ''}
                            </span>
                          </span>
                        </button>
                      </li>
                    )
                  })}
              </ul>
              {activeId && (
                <button
                  type="button"
                  onClick={() => setActiveId(null)}
                  className="mt-3 text-xs text-sky"
                >
                  查看全部岛屿的故事
                </button>
              )}
            </div>
          </div>

          {flight && (
            <motion.span
              key={flight.id}
              className="pointer-events-none absolute left-0 top-0 z-40 h-3.5 w-3.5 rounded-full"
              initial={{ x: flight.x, y: flight.y, opacity: 0.3, scale: 0.5 }}
              animate={{ x: flight.tx, y: flight.ty, opacity: 1, scale: 1.15 }}
              transition={{ duration: FLIGHT_MS / 1000, ease: 'easeInOut' }}
              style={{ background: flight.color, boxShadow: `0 0 22px 8px ${flight.color}` }}
            />
          )}
        </div>
      </div>
    </section>
  )
}

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}
