import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import IslandGlyph from './IslandGlyph'
import {
  detectIsland,
  homeRing,
  islandById,
  memoryMoment,
  moods,
  seedMoments,
  storyIslands,
  witnessLine,
  type IslandId,
  type MoodName,
  type StoryIsland,
  type StoryMoment,
} from '../../data/product'

type Screen = 'home' | 'write' | 'island' | 'atlas' | 'mood' | 'memory' | 'more'
type Phase = 'idle' | 'placing' | 'flying' | 'landed'

const ringSpots: Record<string, { x: number; y: number }> = {
  study: { x: 18, y: 24 },
  health: { x: 82, y: 24 },
  social: { x: 18, y: 76 },
  life: { x: 82, y: 74 },
  more: { x: 50, y: 92 },
}

const week = [
  { day: '一', value: 42, mood: '平静' },
  { day: '二', value: 70, mood: '踏实' },
  { day: '三', value: 36, mood: '想念' },
  { day: '四', value: 58, mood: '轻松' },
  { day: '五', value: 80, mood: '欣喜' },
  { day: '六', value: 48, mood: '平静' },
  { day: '日', value: 64, mood: '踏实' },
]

export interface PreviewController {
  screen: Screen
  setScreen: (screen: Screen) => void
  openIsland: (id: IslandId) => void
  draft: string
  setDraft: (value: string) => void
  mood: MoodName
  setMood: (mood: MoodName) => void
  voice: boolean
  setVoice: (value: boolean) => void
  photo: boolean
  setPhoto: (value: boolean) => void
  phase: Phase
  notice: string | null
  place: (text?: string) => void
  islands: StoryIsland[]
  moments: StoryMoment[]
  selectedId: IslandId | null
}

export function usePreview(): PreviewController {
  const [screen, setScreen] = useState<Screen>('home')
  const [islands, setIslands] = useState<StoryIsland[]>(storyIslands)
  const [moments, setMoments] = useState<StoryMoment[]>(seedMoments)
  const [selectedId, setSelectedId] = useState<IslandId | null>('life')
  const [draft, setDraft] = useState('')
  const [mood, setMood] = useState<MoodName>('平静')
  const [voice, setVoice] = useState(false)
  const [photo, setPhoto] = useState(false)
  const [phase, setPhase] = useState<Phase>('idle')
  const [notice, setNotice] = useState<string | null>(null)
  const [flightTarget, setFlightTarget] = useState<IslandId | null>(null)
  const timers = useRef<number[]>([])
  const reduced = useReducedMotion()

  useEffect(() => {
    return () => {
      timers.current.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  const place = (text?: string) => {
    const content = (text ?? draft).trim()
    if (!content || phase === 'placing' || phase === 'flying') return
    const islandId = detectIsland(content)
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
    setSelectedId(islandId)
    setFlightTarget(islandId)
    setScreen('home')
    setNotice(null)

    const commit = () => {
      setIslands((prev) =>
        prev.map((island) =>
          island.id === islandId
            ? { ...island, level: Math.min(10, island.level + 1) }
            : island,
        ),
      )
      setMoments((prev) => [
        {
          id: `live-${Date.now()}`,
          text: content,
          islandId,
          mood,
          when: '刚刚',
        },
        ...prev,
      ])
      setDraft('')
      setVoice(false)
      setPhoto(false)
      setPhase('landed')
      setNotice(`${witnessLine(mood)} 它落在${islandById(islandId).name}岛。`)
      if (!homeRing.includes(islandId)) setScreen('island')
    }

    if (reduced) {
      commit()
      return
    }

    setPhase('placing')
    timers.current.push(window.setTimeout(() => setPhase('flying'), 520))
    timers.current.push(
      window.setTimeout(() => {
        commit()
      }, 1380),
    )
    timers.current.push(
      window.setTimeout(() => {
        setPhase('idle')
        setFlightTarget(null)
      }, 4200),
    )
  }

  const openIsland = (id: IslandId) => {
    setSelectedId(id)
    setScreen('island')
  }

  return {
    screen,
    setScreen,
    openIsland,
    draft,
    setDraft,
    mood,
    setMood,
    voice,
    setVoice,
    photo,
    setPhoto,
    phase,
    notice,
    place,
    islands,
    moments,
    selectedId,
    ...{ flightTarget },
  }
}

interface AppPreviewProps {
  preview: PreviewController & { flightTarget?: IslandId | null }
}

export default function AppPreview({ preview }: AppPreviewProps) {
  const flightTarget = preview.flightTarget ?? null
  const spot = flightTarget
    ? (ringSpots[flightTarget] ?? ringSpots.more)
    : ringSpots.life

  return (
    <div className="flex h-full flex-col text-ink">
      <div className="flex items-center justify-between px-5 pb-1 pt-8 text-[11px] text-mist">
        <span>9:41</span>
        <span className="font-semibold tracking-[0.18em] text-ink/70">星屿</span>
        <span>多云</span>
      </div>

      <div className="soft-scroll relative min-h-0 flex-1 overflow-y-auto px-3.5 pb-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={preview.screen}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
          >
            {preview.screen === 'home' && (
              <HomeScreen preview={preview} spot={spot} flightTarget={flightTarget} />
            )}
            {preview.screen === 'write' && <WriteScreen preview={preview} />}
            {preview.screen === 'atlas' && <AtlasScreen preview={preview} />}
            {preview.screen === 'island' && <IslandScreen preview={preview} />}
            {preview.screen === 'mood' && <MoodScreen />}
            {preview.screen === 'memory' && <MemoryScreen preview={preview} />}
            {preview.screen === 'more' && <MoreScreen />}
          </motion.div>
        </AnimatePresence>
      </div>

      <nav className="grid grid-cols-4 border-t border-sky/15 bg-white/80 px-2 py-2 text-[11px] backdrop-blur">
        {(
          [
            ['home', '小岛'],
            ['write', '记录'],
            ['mood', '心情'],
            ['more', '更多'],
          ] as const
        ).map(([id, label]) => {
          const active = preview.screen === id || (id === 'home' && (preview.screen === 'island' || preview.screen === 'atlas' || preview.screen === 'memory'))
          return (
            <button
              key={id}
              type="button"
              onClick={() => preview.setScreen(id)}
              className={`rounded-xl py-1.5 ${active ? 'bg-sky/15 font-semibold text-ink' : 'text-mist'}`}
            >
              {label}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

function HomeScreen({
  preview,
  spot,
  flightTarget,
}: {
  preview: PreviewController & { flightTarget?: IslandId | null }
  spot: { x: number; y: number }
  flightTarget: IslandId | null
}) {
  const visible = homeRing.map((id) => islandById(id, preview.islands))
  return (
    <div className="space-y-3">
      <section className="rounded-[22px] bg-white p-3.5 shadow-[0_10px_30px_-18px_rgba(94,169,255,0.9)]">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e7f3ff] text-sm font-semibold text-[#3d7ec4]">
            Lv.6
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">主岛今天很安静</p>
            <p className="text-[11px] text-mist">成长来自真实写下的故事</p>
          </div>
          <div className="text-right text-[11px] text-mist">
            <p>多云</p>
            <p className="text-sm font-semibold text-ink">22°</p>
          </div>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#e7f1fb]">
          <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-[#8ec5ff] to-[#5ea9ff]" />
        </div>
      </section>

      <section className="relative h-[252px] overflow-hidden rounded-[22px] bg-gradient-to-b from-[#d7ecff] to-[#edf6ff]">
        <div className="absolute inset-x-6 top-8 h-24 rounded-[50%] bg-white/40 blur-md" />
        <button
          type="button"
          onClick={() => preview.setScreen('memory')}
          className="absolute left-1/2 top-[46%] z-10 -translate-x-1/2 -translate-y-1/2 text-center"
          aria-label="查看主岛"
        >
          <span className="island-float block">
            <IslandGlyph island={{ ...islandById('life'), name: '主岛', level: 6, accent: '#e7b84a' }} size={118} />
          </span>
          <span className="block text-[10px] font-semibold text-ink/80">主岛</span>
        </button>
        {visible.map((island) => {
          const pos = ringSpots[island.id]
          const hot = flightTarget === island.id && preview.phase !== 'idle'
          return (
            <button
              key={island.id}
              type="button"
              onClick={() => preview.openIsland(island.id)}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 text-center"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <span className={hot ? 'inline-block scale-110 transition' : 'inline-block'}>
                <IslandGlyph island={island} size={68} hot={hot} />
              </span>
              <span className="block text-[10px] font-medium text-ink/80">
                {island.name} · Lv.{island.level}
              </span>
            </button>
          )
        })}
        <button
          type="button"
          onClick={() => preview.setScreen('atlas')}
          className="absolute right-2 top-2 z-10 rounded-full bg-white/85 px-2.5 py-1 text-[10px] text-ink shadow-sm"
        >
          全部岛屿
        </button>
        {(preview.phase === 'placing' || preview.phase === 'flying') && (
          <motion.span
            className="absolute z-20 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff8df] shadow-[0_0_18px_8px_rgba(255,236,180,0.85)]"
            initial={{ left: '50%', top: '92%', opacity: 0.4, scale: 0.6 }}
            animate={
              preview.phase === 'flying'
                ? { left: `${spot.x}%`, top: `${spot.y}%`, opacity: 1, scale: 1 }
                : { left: '50%', top: '84%', opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
        <AnimatePresence>
          {preview.notice && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute left-3 right-3 top-2 z-30 rounded-2xl bg-white/90 px-3 py-2 text-[11px] leading-relaxed text-ink shadow-sm"
            >
              {preview.notice}
            </motion.p>
          )}
        </AnimatePresence>
      </section>

      <button
        type="button"
        onClick={() => preview.setScreen('write')}
        className="w-full rounded-[22px] bg-white px-4 py-3 text-left shadow-[0_10px_30px_-20px_rgba(36,52,71,0.45)]"
      >
        <p className="text-sm font-semibold">今天，有没有一个想留住的瞬间？</p>
        <p className="mt-1 text-[11px] text-mist">不必是大事。一行、一段语音或一张照片都可以。</p>
        <span className="mt-2 inline-flex rounded-full bg-[#5ea9ff] px-3 py-1 text-[11px] font-semibold text-white">
          写下
        </span>
      </button>

      <section>
        <div className="mb-1.5 flex items-center justify-between px-1">
          <p className="text-xs font-semibold">今天的故事</p>
          <span className="text-[10px] text-mist">{preview.moments.length} 则</span>
        </div>
        <div className="space-y-2">
          {preview.moments.slice(0, 3).map((moment) => (
            <StoryRow key={moment.id} moment={moment} islands={preview.islands} onOpen={preview.openIsland} />
          ))}
        </div>
      </section>
    </div>
  )
}

function StoryRow({
  moment,
  islands,
  onOpen,
}: {
  moment: StoryMoment
  islands: StoryIsland[]
  onOpen: (id: IslandId) => void
}) {
  const island = islandById(moment.islandId, islands)
  return (
    <button
      type="button"
      onClick={() => onOpen(moment.islandId)}
      className="flex w-full gap-2 rounded-2xl bg-white px-3 py-2.5 text-left"
    >
      <span className="mt-0.5 h-8 w-1.5 shrink-0 rounded-full" style={{ background: island.accent }} />
      <span className="min-w-0">
        <span className="block truncate text-[12px] leading-snug text-ink">{moment.text}</span>
        <span className="mt-0.5 block text-[10px] text-mist">
          {island.name}岛 · {moment.mood} · {moment.when}
        </span>
      </span>
    </button>
  )
}

function WriteScreen({ preview }: { preview: PreviewController }) {
  const guess = preview.draft.trim() ? detectIsland(preview.draft) : null
  const target = guess ? islandById(guess, preview.islands) : null
  return (
    <div className="space-y-3">
      <div>
        <p className="text-base font-semibold">留住这个瞬间</p>
        <p className="mt-1 text-[11px] leading-relaxed text-mist">
          你不用选岛。说出生活，见证者会把它安放到该去的地方。
        </p>
      </div>
      <textarea
        value={preview.draft}
        onChange={(event) => preview.setDraft(event.target.value)}
        placeholder="一行也可以。"
        rows={4}
        className="w-full resize-none rounded-2xl border border-sky/20 bg-white px-3 py-2.5 text-sm leading-relaxed outline-none ring-sky/30 placeholder:text-mist/70 focus:ring-2"
      />
      <div className="flex flex-wrap gap-1.5">
        {moods.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => preview.setMood(item)}
            className={`rounded-full px-2.5 py-1 text-[11px] ${
              preview.mood === item ? 'bg-ink text-white' : 'bg-white text-mist'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Toggle
          on={preview.voice}
          label={preview.voice ? '语音已留下' : '加一段语音'}
          onClick={() => preview.setVoice(!preview.voice)}
        />
        <Toggle
          on={preview.photo}
          label={preview.photo ? '照片已附上' : '加一张照片'}
          onClick={() => preview.setPhoto(!preview.photo)}
        />
      </div>
      {preview.voice && (
        <div className="flex h-8 items-center gap-1 rounded-xl bg-white px-3">
          {Array.from({ length: 18 }).map((_, index) => (
            <span
              key={index}
              className="w-1 rounded-full bg-sky"
              style={{ height: 6 + ((index * 7) % 16) }}
            />
          ))}
          <span className="ml-2 text-[10px] text-mist">8 秒</span>
        </div>
      )}
      {preview.photo && (
        <div className="flex items-center gap-2 rounded-xl bg-white p-2">
          <span className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#f6e2b5] via-[#f3c7cf] to-[#b9d7f5]" />
          <span className="text-[11px] text-mist">窗边的光 · 只留在你的故事里</span>
        </div>
      )}
      <p className="min-h-4 text-[11px] text-mist">
        {target ? `见证者会把它放到${target.name}岛，靠近「${target.firstBuilding}」。` : '先写一行，岛屿会自己出现。'}
      </p>
      <button
        type="button"
        disabled={!preview.draft.trim() || preview.phase === 'placing' || preview.phase === 'flying'}
        onClick={() => preview.place()}
        className="w-full rounded-2xl bg-[#5ea9ff] py-2.5 text-sm font-semibold text-white disabled:opacity-40"
      >
        {preview.phase === 'placing' || preview.phase === 'flying' ? '正在安放…' : '安放进世界'}
      </button>
    </div>
  )
}

function Toggle({ on, label, onClick }: { on: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl px-3 py-2 text-left text-[11px] ${on ? 'bg-[#e5f3e8] text-ink' : 'bg-white text-mist'}`}
    >
      {label}
    </button>
  )
}

function AtlasScreen({ preview }: { preview: PreviewController }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-semibold">十一座故事岛</p>
        <button type="button" className="text-[11px] text-mist" onClick={() => preview.setScreen('home')}>
          返回
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {preview.islands.map((island) => (
          <button
            key={island.id}
            type="button"
            onClick={() => preview.openIsland(island.id)}
            className="rounded-2xl bg-white p-2 text-left"
          >
            <IslandGlyph island={island} size={84} />
            <p className="px-1 text-[12px] font-semibold">{island.name}</p>
            <p className="px-1 text-[10px] text-mist">Lv.{island.level} / 10</p>
          </button>
        ))}
      </div>
    </div>
  )
}

function IslandScreen({ preview }: { preview: PreviewController }) {
  const island = islandById(preview.selectedId ?? 'life', preview.islands)
  const related = preview.moments.filter((moment) => moment.islandId === island.id)
  const steps = useMemo(() => Array.from({ length: 10 }, (_, index) => index < island.level), [island.level])
  return (
    <div className="space-y-3">
      <button type="button" className="text-[11px] text-mist" onClick={() => preview.setScreen('atlas')}>
        ← 群岛
      </button>
      <div className="rounded-[22px] bg-gradient-to-b from-[#d7ecff] to-white px-3 pb-3 pt-2 text-center">
        <IslandGlyph island={island} size={150} />
        <p className="text-base font-semibold">{island.name}岛</p>
        <p className="text-[11px] text-mist">Lv.{island.level} / 10 · 外圈是{island.firstBuilding}</p>
      </div>
      <div className="grid grid-cols-10 gap-1">
        {steps.map((on, index) => (
          <span
            key={index}
            className={`h-1.5 rounded-full ${on ? 'bg-sky' : 'bg-white'}`}
          />
        ))}
      </div>
      <p className="text-[12px] leading-relaxed text-ink/80">
        还在往中心长。走到第十级时，这里会是「{island.landmark}」。现在先让故事把路点亮。
      </p>
      <div className="space-y-2">
        {related.length === 0 && <p className="text-[11px] text-mist">这座岛还在等第一个瞬间。</p>}
        {related.map((moment) => (
          <StoryRow key={moment.id} moment={moment} islands={preview.islands} onOpen={preview.openIsland} />
        ))}
      </div>
    </div>
  )
}

function MoodScreen() {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-base font-semibold">这一周的心情</p>
        <p className="mt-1 text-[11px] leading-relaxed text-mist">看见即可。这里不打分，也不催你变好。</p>
      </div>
      <div className="flex h-36 items-end gap-1.5 rounded-[22px] bg-white px-3 py-3">
        {week.map((item) => (
          <div key={item.day} className="flex flex-1 flex-col items-center gap-1">
            <div className="flex h-24 w-full items-end">
              <div
                className="w-full rounded-full bg-gradient-to-t from-[#8ec5ff] to-[#d7ebff]"
                style={{ height: `${item.value}%` }}
              />
            </div>
            <span className="text-[10px] text-mist">{item.day}</span>
          </div>
        ))}
      </div>
      <article className="rounded-2xl bg-white p-3">
        <p className="text-[11px] text-mist">情绪碎片</p>
        <p className="mt-1 text-[13px] leading-relaxed">这周更多的是踏实。周四那通短电话，被轻轻留在人际岛。</p>
      </article>
      <article className="rounded-2xl bg-[#fff8ee] p-3 text-[12px] leading-relaxed text-ink/80">
        见证者只保留你放进来的故事。它记得「那是一段忙的日子」，不会替你下结论。
      </article>
    </div>
  )
}

function MemoryScreen({ preview }: { preview: PreviewController }) {
  const now = islandById(memoryMoment.islandId, preview.islands)
  const then = { ...now, level: memoryMoment.thenLevel }
  return (
    <div className="space-y-3">
      <p className="text-base font-semibold">回到去年的今天</p>
      <p className="text-[12px] leading-relaxed text-mist">{memoryMoment.text}</p>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-white p-2 text-center">
          <IslandGlyph island={then} size={96} quiet />
          <p className="text-[11px] font-semibold">那时 · Lv.{then.level}</p>
          <p className="text-[10px] text-mist">{memoryMoment.when}</p>
        </div>
        <div className="rounded-2xl bg-white p-2 text-center">
          <IslandGlyph island={now} size={96} />
          <p className="text-[11px] font-semibold">现在 · Lv.{now.level}</p>
          <p className="text-[10px] text-mist">同一座生活岛</p>
        </div>
      </div>
      <p className="text-[12px] leading-relaxed">
        世界可以重长，故事可以带走。你回来，是为了走进当时的那天，而不只是把条目读完。
      </p>
    </div>
  )
}

function MoreScreen() {
  const rows = [
    ['提醒', '21:30，一句很轻的话。不打卡，不惩罚。'],
    ['陪伴', '岛上的人会看见你写下的故事，用气泡回应。'],
    ['带走', '故事可以导出。世界关了，人生还在。'],
    ['多端', '同一座岛，手机与电脑都能回去。'],
  ]
  return (
    <div className="space-y-2">
      <p className="text-base font-semibold">更多</p>
      {rows.map(([title, text]) => (
        <div key={title} className="rounded-2xl bg-white px-3 py-2.5">
          <p className="text-[13px] font-semibold">{title}</p>
          <p className="mt-0.5 text-[11px] leading-relaxed text-mist">{text}</p>
        </div>
      ))}
    </div>
  )
}
