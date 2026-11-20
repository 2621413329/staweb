import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  moods,
  ritualIslandById,
  ritualIslands,
  storyPresets,
  witnessFor,
  type MoodId,
  type RitualIslandId,
} from '../../data/product'

interface Orb {
  fromX: number
  fromY: number
  toX: number
  toY: number
}

interface PlacedStory {
  id: number
  text: string
  island: RitualIslandId
  mood: MoodId
}

const initialCounts: Record<RitualIslandId, number> = {
  study: 2,
  health: 1,
  life: 2,
  emotion: 1,
}

export default function StoryRitual() {
  const [text, setText] = useState(storyPresets[2].text)
  const [mood, setMood] = useState<MoodId>(storyPresets[2].mood)
  const [islandId, setIslandId] = useState<RitualIslandId>(storyPresets[2].island)
  const [counts, setCounts] = useState(initialCounts)
  const [flying, setFlying] = useState(false)
  const [orb, setOrb] = useState<Orb | null>(null)
  const [placed, setPlaced] = useState<PlacedStory[]>([])
  const [note, setNote] = useState<string | null>(null)
  const launchRef = useRef<HTMLButtonElement>(null)
  const islandRefs = useRef<Partial<Record<RitualIslandId, HTMLButtonElement | null>>>({})
  const nextId = useRef(1)
  const pending = useRef<PlacedStory | null>(null)
  const flyingLock = useRef(false)
  const island = ritualIslandById[islandId]

  function applyPreset(presetId: string) {
    const preset = storyPresets.find((item) => item.id === presetId)
    if (!preset || flying) return
    setText(preset.text)
    setMood(preset.mood)
    setIslandId(preset.island)
    setNote(null)
  }

  function finishFlight() {
    const payload = pending.current
    if (!payload) return
    pending.current = null
    flyingLock.current = false
    const line = witnessFor(payload.mood)
    const change = ritualIslandById[payload.island].change
    setCounts((current) => ({
      ...current,
      [payload.island]: current[payload.island] + 1,
    }))
    setPlaced((current) => [payload, ...current].slice(0, 4))
    setNote(`${line} ${change}。`)
    setOrb(null)
    setFlying(false)
  }

  function placeStory() {
    const story = text.trim()
    if (!story || flying || flyingLock.current) return
    flyingLock.current = true
    pending.current = {
      id: nextId.current++,
      text: story,
      island: islandId,
      mood,
    }
    const from = launchRef.current?.getBoundingClientRect()
    const target = islandRefs.current[islandId]?.getBoundingClientRect()
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!from || !target || reduce) {
      finishFlight()
      return
    }
    setFlying(true)
    setNote(null)
    setOrb({
      fromX: from.left + from.width / 2,
      fromY: from.top + from.height / 2,
      toX: target.left + target.width / 2,
      toY: target.top + target.height / 2,
    })
  }

  return (
    <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
      <div className="rounded-[1.8rem] border border-line bg-card/90 p-5 shadow-[0_20px_50px_-36px_rgba(90,60,40,0.45)] sm:p-7">
        <p className="text-xs font-medium tracking-[0.18em] text-accent">亲手试一次</p>
        <h3 className="mt-2 font-sans text-2xl font-semibold tracking-tight text-ink">
          写下一句，看它落到岛上
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-clay">
          这是星屿里故事进入世界的方式：一句话化作光，飞向它该在的岛，世界因此起一点变化。
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {storyPresets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className={`rounded-full px-3 py-1.5 text-xs transition ${
                text === preset.text
                  ? 'bg-ink text-white'
                  : 'bg-sand text-clay hover:text-ink'
              }`}
              onClick={() => applyPreset(preset.id)}
            >
              {ritualIslandById[preset.island].name.replace('岛', '')}
            </button>
          ))}
        </div>

        <label className="mt-4 block text-xs text-clay" htmlFor="story-draft">
          今天想留下的瞬间
        </label>
        <textarea
          id="story-draft"
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={3}
          maxLength={80}
          className="mt-2 w-full resize-none rounded-2xl border border-line bg-white px-4 py-3 text-sm leading-relaxed text-ink outline-none focus:border-accent"
          placeholder="不必是大事。一行也可以。"
        />

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="此刻的心情">
          {moods.map((item) => (
            <button
              key={item.id}
              type="button"
              className="rounded-full px-3 py-1.5 text-xs"
              style={
                mood === item.id
                  ? { background: item.color, color: '#fff' }
                  : { background: '#fff6ee', color: '#8c7b6b' }
              }
              onClick={() => setMood(item.id)}
              aria-pressed={mood === item.id}
            >
              {item.label}
            </button>
          ))}
        </div>

        <p className="mt-4 text-xs text-clay">
          将安放到 <span className="font-semibold text-ink">{island.name}</span>
          。也可以直接点右侧的岛。
        </p>

        <button
          ref={launchRef}
          type="button"
          disabled={!text.trim() || flying}
          onClick={placeStory}
          className="mt-4 inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition enabled:hover:bg-[#b47548] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {flying ? '正在飞向岛屿…' : '安放到岛上'}
        </button>

        <div className="mt-5 min-h-16" aria-live="polite">
          <AnimatePresence mode="wait">
            {note && (
              <motion.p
                key={note}
                className="rounded-2xl bg-sand px-4 py-3 text-sm leading-relaxed text-ink"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {note}
              </motion.p>
            )}
          </AnimatePresence>
          {placed.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {placed.map((item) => (
                <li key={item.id} className="truncate text-xs text-clay">
                  {ritualIslandById[item.island].name} · {item.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="relative min-h-[420px] overflow-hidden rounded-[1.8rem] border border-line bg-[radial-gradient(ellipse_at_top,_#fff8f1,_#f3e4d4_42%,_#d5e4ef_100%)]">
        <div className="pointer-events-none absolute inset-x-8 bottom-10 h-24 rounded-[50%] bg-white/30 blur-2xl" />
        <p className="absolute left-5 top-5 text-xs text-clay">你的世界 · 点一座岛选定落点</p>
        {ritualIslands.map((item) => {
          const count = counts[item.id]
          const active = item.id === islandId
          return (
            <button
              key={item.id}
              type="button"
              ref={(node) => {
                islandRefs.current[item.id] = node
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              onClick={() => setIslandId(item.id)}
              aria-pressed={active}
              aria-label={item.name}
            >
              <motion.span
                className="relative mx-auto block h-24 w-28"
                animate={active ? { y: [0, -4, 0] } : { y: 0 }}
                transition={active ? { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
              >
                <span
                  className="absolute inset-x-4 bottom-1 h-8 rounded-[50%] opacity-70"
                  style={{ background: item.land }}
                />
                <span
                  className="absolute inset-x-2 bottom-3 h-14 rounded-[50%]"
                  style={{
                    background: `radial-gradient(circle at 50% 40%, #fff, ${item.land} 70%)`,
                    boxShadow: active ? `0 0 0 6px ${item.tint}33` : undefined,
                  }}
                />
                <motion.span
                  className="absolute left-1/2 top-3 h-8 w-7 -translate-x-1/2 rounded-md bg-white"
                  animate={{ scale: 0.9 + Math.min(count, 5) * 0.06 }}
                  style={{ transformOrigin: 'bottom center' }}
                >
                  <span
                    className="absolute -top-3 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[14px] border-b-[12px] border-x-transparent"
                    style={{ borderBottomColor: item.tint }}
                  />
                </motion.span>
                {active && (
                  <span className="absolute bottom-6 right-3 h-3 w-3 rounded-full bg-[#f3d2b5] ring-2 ring-white" />
                )}
              </motion.span>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-medium text-ink">
                {item.name}
                <span className="text-clay">{count}</span>
              </span>
            </button>
          )
        })}
      </div>

      <AnimatePresence>
        {orb && (
          <motion.span
            className="pointer-events-none fixed z-[80] h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_18px_8px_rgba(232,168,124,0.85)]"
            style={{ left: 0, top: 0 }}
            initial={{ x: orb.fromX, y: orb.fromY, scale: 0.7, opacity: 1 }}
            animate={{ x: orb.toX, y: orb.toY, scale: [1, 1.4, 0.3], opacity: [1, 1, 0.2] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={finishFlight}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
