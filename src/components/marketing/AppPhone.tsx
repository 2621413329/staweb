import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CompanionArt from './CompanionArt'
import IslandArt from './IslandArt'
import MoodFace from './MoodFace'
import VoiceHoldButton from './VoiceHoldButton'
import {
  chooseIsland,
  companionById,
  growthView,
  islandById,
  islandStage,
  islands,
  memberBenefits,
  memberPlans,
  moodById,
  moods,
  storyBody,
  weekDays,
  type CompanionId,
  type IslandId,
  type MoodId,
  type StoryCard,
} from '../../data/showcase'

type TabId = 'island' | 'records' | 'insights' | 'more'
type MoreId = 'vip' | 'level' | 'companion' | 'remind' | 'audio'

const tabs: { id: TabId; label: string }[] = [
  { id: 'island', label: '我的岛屿' },
  { id: 'records', label: '今日日常' },
  { id: 'insights', label: '成长轨迹' },
  { id: 'more', label: '更多' },
]

const phoneSeeds: StoryCard[] = [
  {
    id: 'phone-life',
    text: '把灯留到很晚，只是想把今天放好。',
    moodId: 'ping_jing',
    islandId: 'life',
    when: 'today',
    seeded: true,
  },
  {
    id: 'phone-health',
    text: '晚风里走了四十分钟，肩膀松下来了。',
    moodId: 'ping_jing',
    islandId: 'health',
    hasVoice: true,
    voiceSeconds: 8,
    when: 'today',
    seeded: true,
  },
  {
    id: 'phone-social',
    text: '妈妈打电话来，只问我吃了没。',
    moodId: 'gan_dong',
    islandId: 'social',
    hasPhoto: true,
    when: 'today',
    seeded: true,
  },
  {
    id: 'phone-work',
    text: '会上有一句没来得及说。',
    moodId: 'ya_li',
    islandId: 'work',
    when: 'today',
    seeded: true,
  },
  {
    id: 'phone-study',
    text: '读完了拖延很久的那一章。',
    moodId: 'kai_xin',
    islandId: 'study',
    when: 'earlier',
    seeded: true,
  },
]

interface AppPhoneProps {
  companionId: CompanionId
}

export default function AppPhone({ companionId }: AppPhoneProps) {
  const companion = companionById(companionId)
  const [tab, setTab] = useState<TabId>('island')
  const [stories, setStories] = useState<StoryCard[]>(phoneSeeds)
  const [composer, setComposer] = useState(false)
  const [detailId, setDetailId] = useState<string | null>(null)
  const [more, setMore] = useState<MoreId | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [banner, setBanner] = useState<string | null>(null)
  const [pulseId, setPulseId] = useState<IslandId | null>(null)
  const [filter, setFilter] = useState<'today' | 'earlier'>('today')
  const [islandFilter, setIslandFilter] = useState<IslandId | 'all'>('all')
  const [dayId, setDayId] = useState('thu')
  const [planId, setPlanId] = useState('year')
  const [bgm, setBgm] = useState(true)
  const [sfx, setSfx] = useState(true)
  const [remind, setRemind] = useState(true)
  const [remindAt, setRemindAt] = useState('21:30')
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const added = stories.filter((story) => !story.seeded).length
  const growth = growthView(added)
  const detail = stories.find((story) => story.id === detailId) ?? null

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 2200)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    if (!banner) return
    const timer = window.setTimeout(() => setBanner(null), 2600)
    return () => window.clearTimeout(timer)
  }, [banner])

  useEffect(() => {
    if (!playingId) return
    const started = Date.now()
    const timer = window.setInterval(() => {
      const next = Math.min(1, (Date.now() - started) / 2200)
      setProgress(next)
      if (next >= 1) {
        setPlayingId(null)
        setProgress(0)
      }
    }, 40)
    return () => window.clearInterval(timer)
  }, [playingId])

  const openComposer = () => {
    setDetailId(null)
    setMore(null)
    setComposer(true)
  }

  const addStory = (draft: { text: string; moodId: MoodId; voiceSeconds: number | null; photo: boolean }) => {
    const body = storyBody(draft.text, Boolean(draft.voiceSeconds), draft.photo)
    if (!body) {
      setToast('先写下一句，或留下语音、照片。')
      return
    }
    const islandId = chooseIsland(draft.text, draft.moodId)
    const nextLevel = growthView(added + 1).level
    const story: StoryCard = {
      id: `phone-${Date.now()}`,
      text: body,
      moodId: draft.moodId,
      islandId,
      hasVoice: Boolean(draft.voiceSeconds),
      hasPhoto: draft.photo,
      voiceSeconds: draft.voiceSeconds ?? undefined,
      when: 'today',
    }
    setStories((current) => [story, ...current])
    setComposer(false)
    setTab('island')
    setFilter('today')
    setIslandFilter(islandId)
    setPulseId(islandId)
    setToast(`已安放到${islandById(islandId).name}`)
    if (nextLevel > growth.level) {
      setBanner(`Lv.${nextLevel} ${growthView(added + 1).title}`)
    }
    window.setTimeout(() => setPulseId(null), 1400)
  }

  const removeStory = (id: string) => {
    setStories((current) => current.filter((story) => story.id !== id))
    setDetailId(null)
    setConfirmId(null)
    setToast('这句日常已收回')
  }

  return (
    <div className="mx-auto w-full max-w-[360px]">
      <div
        className="rounded-[42px] bg-[#1d2733] p-2.5 shadow-card"
        onMouseDown={(event) => {
          const target = event.target
          if (!(target instanceof Element)) return
          if (target.closest('textarea, input, select')) return
          if (target.closest('button, a')) event.preventDefault()
        }}
      >
        <div className="relative flex h-[600px] flex-col overflow-hidden rounded-[32px] bg-gradient-to-b from-[#fff4e8] to-[#f5f9ff]">
          <div className="absolute left-1/2 top-2 z-30 h-[22px] w-[92px] -translate-x-1/2 rounded-full bg-[#1d2733]" />
          <div className="flex items-center justify-between px-6 pb-1 pt-3 text-[11px] font-semibold text-ink/70">
            <span>9:41</span>
            <span className="pl-8">星屿</span>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-3 pt-1">
            {tab === 'island' && (
              <IslandScreen
                companionId={companionId}
                companionName={companion.name}
                stories={stories.filter((story) => story.when !== 'earlier')}
                growthLevel={growth.level}
                growthTitle={growth.title}
                growthInto={growth.into}
                growthNeed={growth.need}
                growthValue={growth.value}
                nextLabel={growth.nextLabel}
                pulseId={pulseId}
                islandFilter={islandFilter}
                onFilter={setIslandFilter}
                onOpen={setDetailId}
                onCompose={openComposer}
              />
            )}
            {tab === 'records' && (
              <RecordsScreen
                stories={stories}
                filter={filter}
                onFilter={setFilter}
                onOpen={setDetailId}
              />
            )}
            {tab === 'insights' && <InsightsScreen dayId={dayId} companionName={companion.name} onDay={setDayId} />}
            {tab === 'more' && (
              <MoreScreen
                companionName={companion.name}
                levelLabel={`成长等级：Lv.${growth.level} ${growth.title}`}
                onOpen={setMore}
              />
            )}
          </div>

          <PhoneNav tab={tab} onTab={setTab} onAdd={openComposer} />

          {composer && (
            <ComposerSheet
              companionName={companion.name}
              onClose={() => setComposer(false)}
              onSave={addStory}
            />
          )}
          {detail && (
            <DetailSheet
              story={detail}
              confirm={confirmId === detail.id}
              playing={playingId === detail.id}
              progress={progress}
              onClose={() => {
                setDetailId(null)
                setConfirmId(null)
              }}
              onAskRemove={() => setConfirmId(detail.id)}
              onRemove={() => removeStory(detail.id)}
              onPlay={() => {
                setProgress(0)
                setPlayingId(detail.id)
              }}
            />
          )}
          {more && (
            <MoreSheet
              id={more}
              companionId={companionId}
              growth={growth}
              planId={planId}
              bgm={bgm}
              sfx={sfx}
              remind={remind}
              remindAt={remindAt}
              onPlan={setPlanId}
              onBgm={(next) => {
                setBgm(next)
                setToast(next ? '岛屿音乐已打开' : '岛屿音乐已关上')
              }}
              onSfx={(next) => {
                setSfx(next)
                setToast(next ? '操作音效已打开' : '操作音效已关上')
              }}
              onRemind={setRemind}
              onRemindAt={setRemindAt}
              onClose={() => setMore(null)}
            />
          )}
          {banner && (
            <div className="absolute left-1/2 top-14 z-40 w-[78%] -translate-x-1/2 rounded-2xl bg-white px-3 py-2 text-center text-sm font-semibold shadow-card">
              世界长高了一点 · {banner}
            </div>
          )}
          {toast && (
            <div className="absolute bottom-24 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs text-white">
              {toast}
            </div>
          )}
        </div>
      </div>
      <p className="mt-4 text-center text-xs leading-relaxed text-mist">
        分页、果冻按钮、语音和详情都按当前星屿的结构可点。
      </p>
    </div>
  )
}

function IslandScreen({
  companionId,
  companionName,
  stories,
  growthLevel,
  growthTitle,
  growthInto,
  growthNeed,
  growthValue,
  nextLabel,
  pulseId,
  islandFilter,
  onFilter,
  onOpen,
  onCompose,
}: {
  companionId: CompanionId
  companionName: string
  stories: StoryCard[]
  growthLevel: number
  growthTitle: string
  growthInto: number
  growthNeed: number
  growthValue: number
  nextLabel: string
  pulseId: IslandId | null
  islandFilter: IslandId | 'all'
  onFilter: (id: IslandId | 'all') => void
  onOpen: (id: string) => void
  onCompose: () => void
}) {
  const visible = islandFilter === 'all' ? stories : stories.filter((story) => story.islandId === islandFilter)
  return (
    <div>
      <div className="rounded-[22px] bg-white p-3 shadow-soft">
        <div className="flex items-center justify-between text-xs text-mist">
          <span>{companionName} · ☀ 平静</span>
          <span>晴 22°</span>
        </div>
        <p className="mt-1 text-sm font-semibold">
          Lv.{growthLevel} {growthTitle}
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
          <div className="h-full rounded-full bg-sky" style={{ width: `${(growthInto / growthNeed) * 100}%` }} />
        </div>
        <p className="mt-1 text-[11px] text-mist">
          成长值 {growthValue} · {nextLabel}
        </p>
      </div>

      <div className="relative mt-3 h-28 overflow-hidden rounded-[24px] bg-gradient-to-b from-[#e7f3ff] to-[#8ec5ff]">
        <PhoneIsland
          id="health"
          stories={stories}
          x={22}
          y={62}
          hot={pulseId === 'health'}
          onFilter={onFilter}
        />
        <PhoneIsland
          id="life"
          stories={stories}
          x={50}
          y={58}
          hot={pulseId === 'life'}
          monument={growthLevel >= 7}
          main
          onFilter={onFilter}
        />
        <PhoneIsland
          id={pulseId && pulseId !== 'life' && pulseId !== 'health' ? pulseId : 'social'}
          stories={stories}
          x={78}
          y={64}
          hot={Boolean(pulseId && pulseId !== 'life' && pulseId !== 'health')}
          onFilter={onFilter}
        />
        <CompanionArt id={companionId} className="pointer-events-none absolute left-1/2 top-[18%] h-8 w-8 -translate-x-1/2" />
      </div>

      <button
        type="button"
        onClick={onCompose}
        className="mt-3 flex w-full items-center gap-3 rounded-[24px] bg-white p-3 text-left shadow-soft"
      >
        <CompanionArt id={companionId} className="h-12 w-12" />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold">记录今天的故事</span>
          <span className="block text-xs text-mist">{companionName}将帮你放入合适的岛屿</span>
        </span>
        <span className="jelly-btn flex h-12 w-12 items-center justify-center rounded-full text-2xl text-white">+</span>
      </button>

      <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
        <FilterChip active={islandFilter === 'all'} onClick={() => onFilter('all')} label="全部" />
        {islands.map((island) => (
          <FilterChip
            key={island.id}
            active={islandFilter === island.id}
            onClick={() => onFilter(island.id)}
            label={`${island.name.replace('岛', '')} ${stories.filter((story) => story.islandId === island.id).length}`}
          />
        ))}
      </div>

      <ul className="mt-2 space-y-2">
        {visible.length === 0 && <li className="rounded-2xl bg-white/70 px-3 py-4 text-sm text-mist">这座岛还在等第一句。</li>}
        {visible.map((story) => (
          <StoryRow key={story.id} story={story} onOpen={onOpen} />
        ))}
      </ul>
    </div>
  )
}

function PhoneIsland({
  id,
  stories,
  x,
  y,
  hot,
  main = false,
  monument = false,
  onFilter,
}: {
  id: IslandId
  stories: StoryCard[]
  x: number
  y: number
  hot: boolean
  main?: boolean
  monument?: boolean
  onFilter: (id: IslandId | 'all') => void
}) {
  const island = islandById(id)
  return (
    <button
      type="button"
      onClick={() => onFilter(id)}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        filter: hot ? `drop-shadow(0 0 10px ${island.accent})` : undefined,
      }}
      aria-label={island.name}
    >
      <IslandArt
        land={island.land}
        accent={island.accent}
        stage={islandStage(id, stories)}
        monument={monument}
        className={main ? 'h-16 w-20' : 'h-12 w-14'}
      />
    </button>
  )
}

function RecordsScreen({
  stories,
  filter,
  onFilter,
  onOpen,
}: {
  stories: StoryCard[]
  filter: 'today' | 'earlier'
  onFilter: (value: 'today' | 'earlier') => void
  onOpen: (id: string) => void
}) {
  const visible = stories.filter((story) => (filter === 'earlier' ? story.when === 'earlier' : story.when !== 'earlier'))
  return (
    <div>
      <h3 className="text-xl font-semibold">今日日常</h3>
      <div className="mt-3 flex gap-2">
        <FilterChip active={filter === 'today'} onClick={() => onFilter('today')} label="今天" />
        <FilterChip active={filter === 'earlier'} onClick={() => onFilter('earlier')} label="更早" />
      </div>
      <ul className="mt-3 space-y-2">
        {visible.length === 0 && (
          <li className="rounded-2xl bg-white px-3 py-6 text-center text-sm text-mist">记录一个瞬间吧</li>
        )}
        {visible.map((story) => (
          <StoryRow key={story.id} story={story} onOpen={onOpen} />
        ))}
      </ul>
    </div>
  )
}

function InsightsScreen({
  dayId,
  companionName,
  onDay,
}: {
  dayId: string
  companionName: string
  onDay: (id: string) => void
}) {
  const selected = weekDays.find((day) => day.id === dayId) ?? weekDays[3]
  const counts = new Map<MoodId, number>()
  weekDays.forEach((day) => counts.set(day.moodId, (counts.get(day.moodId) ?? 0) + 1))
  let top: MoodId = 'ping_jing'
  let best = 0
  counts.forEach((count, id) => {
    if (count > best) {
      best = count
      top = id
    }
  })
  return (
    <div>
      <h3 className="text-xl font-semibold">成长轨迹</h3>
      <p className="mt-1 text-xs text-mist">本周更常出现的是{moodById(top).label}</p>
      <div className="mt-4 flex items-end justify-between gap-1 rounded-[22px] bg-white px-3 py-3 shadow-soft">
        {weekDays.map((day) => {
          const mood = moodById(day.moodId)
          const height = day.moodId === 'ya_li' || day.moodId === 'jiao_lv' ? 42 : day.moodId === 'ping_jing' ? 58 : 78
          const active = day.id === dayId
          return (
            <button key={day.id} type="button" onClick={() => onDay(day.id)} className="flex flex-1 flex-col items-center gap-1">
              <span className="w-full rounded-full" style={{ height, background: mood.color, opacity: active ? 1 : 0.45 }} />
              <span className={`text-[11px] ${active ? 'font-semibold text-ink' : 'text-mist'}`}>{day.label}</span>
            </button>
          )
        })}
      </div>
      <div className="mt-3 rounded-[22px] bg-white p-4 shadow-soft">
        <p className="text-xs text-mist">{companionName}看见 · 周{selected.label}</p>
        <p className="mt-2 text-sm leading-relaxed">{selected.note}</p>
        <p className="mt-3 text-xs leading-relaxed text-mist">心情总结帮你看见这一周。</p>
      </div>
    </div>
  )
}

function MoreScreen({
  companionName,
  levelLabel,
  onOpen,
}: {
  companionName: string
  levelLabel: string
  onOpen: (id: MoreId) => void
}) {
  const items: { id: MoreId; title: string; sub: string }[] = [
    { id: 'vip', title: '星屿会员', sub: '月卡 · 季卡 · 年卡' },
    { id: 'level', title: '我的等级', sub: levelLabel },
    { id: 'companion', title: `成长伙伴${companionName}`, sub: '你的成长小伙伴' },
    { id: 'remind', title: '记录提醒', sub: '自定义时间与文案' },
    { id: 'audio', title: '声音设置', sub: '岛屿音乐与操作音效' },
  ]
  return (
    <div>
      <h3 className="text-xl font-semibold">更多</h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onOpen(item.id)}
              className="flex w-full items-center justify-between rounded-2xl bg-white px-3 py-3 text-left shadow-soft"
            >
              <span>
                <span className="block text-sm font-medium">{item.title}</span>
                <span className="block text-xs text-mist">{item.sub}</span>
              </span>
              <span className="text-mist">›</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ComposerSheet({
  companionName,
  onClose,
  onSave,
}: {
  companionName: string
  onClose: () => void
  onSave: (draft: { text: string; moodId: MoodId; voiceSeconds: number | null; photo: boolean }) => void
}) {
  const [text, setText] = useState('')
  const [moodId, setMoodId] = useState<MoodId>('ping_jing')
  const [voiceSeconds, setVoiceSeconds] = useState<number | null>(null)
  const [photo, setPhoto] = useState(false)
  const [hint, setHint] = useState('按住说话，或从相册留下一张。')
  const preview = text.trim().length >= 2 || voiceSeconds || photo ? chooseIsland(text, moodId) : null

  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end bg-ink/25">
      <div className="max-h-[86%] overflow-y-auto rounded-t-[28px] bg-[#fffaf6] px-4 pb-6 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">今天发生了什么？</h3>
          <button type="button" onClick={onClose} className="text-sm text-mist">
            取消
          </button>
        </div>
        <p className="mt-1 text-xs text-mist">{companionName}将帮你放入合适的岛屿</p>
        <div className="mt-3 flex gap-1.5 overflow-x-auto">
          {moods.map((mood) => (
            <button
              key={mood.id}
              type="button"
              onClick={() => setMoodId(mood.id)}
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs ${moodId === mood.id ? 'text-white' : 'bg-white text-ink'}`}
              style={moodId === mood.id ? { background: mood.color } : undefined}
            >
              {mood.label}
            </button>
          ))}
        </div>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={4}
          placeholder="有什么想法想留下来？"
          className="mt-3 w-full resize-none rounded-2xl border border-ink/10 bg-white px-3 py-2 text-base outline-none"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <VoiceHoldButton
            onClip={(seconds) => {
              setVoiceSeconds(seconds)
              setHint(`语音 ${seconds} 秒`)
            }}
            onShort={() => setHint('说话时间太短。')}
          />
          <button
            type="button"
            onClick={() => setPhoto((value) => !value)}
            className={`rounded-full border px-3 py-2 text-sm ${photo ? 'border-peach bg-peach/15' : 'border-ink/10 bg-white'}`}
          >
            {photo ? '照片已选' : '相册'}
          </button>
        </div>
        <p className="mt-2 text-xs text-mist">
          {preview ? `将安放到${islandById(preview).name}` : hint}
        </p>
        <button
          type="button"
          onClick={() => onSave({ text, moodId, voiceSeconds, photo })}
          className="jelly-btn mt-3 h-11 w-full rounded-full text-sm font-semibold text-white"
        >
          保存日常
        </button>
      </div>
    </div>
  )
}

function DetailSheet({
  story,
  confirm,
  playing,
  progress,
  onClose,
  onAskRemove,
  onRemove,
  onPlay,
}: {
  story: StoryCard
  confirm: boolean
  playing: boolean
  progress: number
  onClose: () => void
  onAskRemove: () => void
  onRemove: () => void
  onPlay: () => void
}) {
  const mood = moodById(story.moodId)
  const island = islandById(story.islandId)
  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-[#fffaf6]">
      <div className="flex items-center justify-between px-4 pb-2 pt-8">
        <button type="button" onClick={onClose} className="text-sm text-sky">
          返回
        </button>
        <p className="text-sm font-semibold">日常详情</p>
        <span className="w-8" />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6">
        <div className="flex items-center gap-2">
          <MoodFace face={mood.face} color={mood.color} />
          <div>
            <p className="text-sm font-semibold">{mood.label}</p>
            <p className="text-xs text-mist">{island.name}</p>
          </div>
        </div>
        <p className="mt-4 text-base leading-relaxed">{story.text}</p>
        {story.hasVoice && (
          <button type="button" onClick={onPlay} className="mt-4 w-full rounded-2xl bg-white px-3 py-3 text-left shadow-soft">
            <span className="text-sm font-medium">{playing ? '正在试听' : '试听语音'}</span>
            <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-ink/10">
              <span className="block h-full rounded-full bg-peach" style={{ width: `${playing ? progress * 100 : 0}%` }} />
            </span>
          </button>
        )}
        {story.hasPhoto && (
          <div className="mt-4 h-28 rounded-2xl bg-gradient-to-br from-[#ffe7c2] via-[#f7c1b1] to-[#c9dcff]" />
        )}
        <p className="mt-4 text-sm leading-relaxed text-mist">这句被安放在{island.name}。它在这里很安全。</p>
        {confirm ? (
          <button type="button" onClick={onRemove} className="mt-6 text-sm font-semibold text-[#c4524a]">
            确认收回
          </button>
        ) : (
          <button type="button" onClick={onAskRemove} className="mt-6 text-sm text-mist">
            收回这句日常
          </button>
        )}
      </div>
    </div>
  )
}

function MoreSheet(props: {
  id: MoreId
  companionId: CompanionId
  growth: ReturnType<typeof growthView>
  planId: string
  bgm: boolean
  sfx: boolean
  remind: boolean
  remindAt: string
  onPlan: (id: string) => void
  onBgm: (next: boolean) => void
  onSfx: (next: boolean) => void
  onRemind: (next: boolean) => void
  onRemindAt: (value: string) => void
  onClose: () => void
}) {
  const companion = companionById(props.companionId)
  const title = {
    vip: '星屿会员',
    level: '我的等级',
    companion: companion.name,
    remind: '记录提醒',
    audio: '声音设置',
  }[props.id]

  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-[#fffaf6]">
      <div className="flex items-center justify-between px-4 pb-2 pt-8">
        <button type="button" onClick={props.onClose} className="text-sm text-sky">
          返回
        </button>
        <p className="text-sm font-semibold">{title}</p>
        <span className="w-8" />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8">
        {props.id === 'vip' && (
          <div>
            <p className="text-sm leading-relaxed text-mist">
              开通后可使用成长统计、AI 心情总结、照片与语音记录、更多伙伴对话、更多小岛数量。
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {memberPlans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => props.onPlan(plan.id)}
                  className={`rounded-2xl px-2 py-3 text-center text-xs ${
                    props.planId === plan.id ? 'bg-peach text-white' : 'bg-white text-ink'
                  }`}
                >
                  <span className="block font-semibold">{plan.name}</span>
                  <span className="mt-1 block">{plan.period}</span>
                </button>
              ))}
            </div>
            <ul className="mt-3 space-y-1 text-sm">
              {memberBenefits.map((benefit) => (
                <li key={benefit}>· {benefit}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-mist">价格以应用内结算页为准。</p>
            <Link to="/download" className="mt-3 inline-flex text-sm font-semibold text-sky">
              去下载页安装
            </Link>
          </div>
        )}
        {props.id === 'level' && (
          <div className="rounded-2xl bg-white p-4 shadow-soft">
            <p className="text-3xl font-semibold">
              Lv.{props.growth.level}
            </p>
            <p className="text-sm">{props.growth.title}</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/10">
              <div
                className="h-full rounded-full bg-sky"
                style={{ width: `${(props.growth.into / props.growth.need) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-mist">{props.growth.nextLabel}</p>
            <p className="mt-3 text-sm">已连续记录 6 天</p>
          </div>
        )}
        {props.id === 'companion' && (
          <div>
            <CompanionArt id={companion.id} className="h-28 w-28" />
            <p className="mt-3 text-sm leading-relaxed">{companion.tagline}</p>
            <p className="mt-3 text-sm text-mist">{companion.traits.join(' · ')}</p>
          </div>
        )}
        {props.id === 'remind' && (
          <div>
            <button
              type="button"
              onClick={() => props.onRemind(!props.remind)}
              className="flex w-full items-center justify-between rounded-2xl bg-white px-3 py-3 text-sm shadow-soft"
            >
              <span>每日提醒</span>
              <span>{props.remind ? '已开启' : '已关闭'}</span>
            </button>
            <div className="mt-3 flex gap-2">
              {['08:30', '21:30', '22:30'].map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => props.onRemindAt(time)}
                  className={`rounded-full px-3 py-1.5 text-xs ${props.remindAt === time ? 'bg-ink text-white' : 'bg-white'}`}
                >
                  {time}
                </button>
              ))}
            </div>
            <p className="mt-4 rounded-2xl bg-white px-3 py-3 text-sm leading-relaxed shadow-soft">
              {props.remindAt} · 今天，有没有一个你想留住的瞬间？
            </p>
          </div>
        )}
        {props.id === 'audio' && (
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => props.onBgm(!props.bgm)}
              className="flex w-full items-center justify-between rounded-2xl bg-white px-3 py-3 text-sm shadow-soft"
            >
              <span>岛屿音乐</span>
              <span>{props.bgm ? '开' : '关'}</span>
            </button>
            <button
              type="button"
              onClick={() => props.onSfx(!props.sfx)}
              className="flex w-full items-center justify-between rounded-2xl bg-white px-3 py-3 text-sm shadow-soft"
            >
              <span>操作音效</span>
              <span>{props.sfx ? '开' : '关'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function PhoneNav({ tab, onTab, onAdd }: { tab: TabId; onTab: (id: TabId) => void; onAdd: () => void }) {
  const left = tabs.slice(0, 2)
  const right = tabs.slice(2)
  return (
    <div className="relative z-20 mx-3 mb-2 h-16 shrink-0">
      <div className="grid h-full grid-cols-5 rounded-[22px] bg-white shadow-soft">
        {left.map((item) => (
          <NavButton key={item.id} item={item} active={tab === item.id} onClick={() => onTab(item.id)} />
        ))}
        <span />
        {right.map((item) => (
          <NavButton key={item.id} item={item} active={tab === item.id} onClick={() => onTab(item.id)} />
        ))}
      </div>
      <button
        type="button"
        onClick={onAdd}
        aria-label="快速记录今日日常"
        className="jelly-btn absolute left-1/2 top-0 flex h-14 w-14 -translate-x-1/2 -translate-y-4 items-center justify-center rounded-full text-3xl text-white"
      >
        +
      </button>
    </div>
  )
}

function NavButton({
  item,
  active,
  onClick,
}: {
  item: { id: TabId; label: string }
  active: boolean
  onClick: () => void
}) {
  return (
    <button type="button" onClick={onClick} className={`flex flex-col items-center justify-center text-[10px] ${active ? 'font-semibold text-peachdeep' : 'text-ink/45'}`}>
      <NavIcon id={item.id} />
      <span className="mt-0.5">{item.label}</span>
    </button>
  )
}

function NavIcon({ id }: { id: TabId }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7 }
  if (id === 'island') {
    return (
      <svg {...common} aria-hidden>
        <path d="M4 16c3 2 5 2 8 0s5-2 8 0" strokeLinecap="round" />
        <path d="M8 16c1-3 2.4-5 4-5s3 2 4 5" />
      </svg>
    )
  }
  if (id === 'records') {
    return (
      <svg {...common} aria-hidden>
        <path d="M7 5h8l3 3v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
        <path d="M9 12h6M9 16h4" strokeLinecap="round" />
      </svg>
    )
  }
  if (id === 'insights') {
    return (
      <svg {...common} aria-hidden>
        <path d="M6 16c2-4 3-6 6-6s4 2 6 6" strokeLinecap="round" />
        <path d="M12 6v2" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg {...common} aria-hidden>
      <path d="M6 8h12M6 12h12M6 16h12" strokeLinecap="round" />
    </svg>
  )
}

function StoryRow({ story, onOpen }: { story: StoryCard; onOpen: (id: string) => void }) {
  const mood = moodById(story.moodId)
  return (
    <li>
      <button type="button" onClick={() => onOpen(story.id)} className="flex w-full gap-2 rounded-2xl bg-white px-3 py-2.5 text-left shadow-soft">
        <MoodFace face={mood.face} color={mood.color} className="h-8 w-8 shrink-0" />
        <span className="min-w-0">
          <span className="block truncate text-sm">{story.text}</span>
          <span className="mt-0.5 block text-[11px] text-mist">
            {islandById(story.islandId).name}
            {story.hasVoice ? ' · 语音' : ''}
            {story.hasPhoto ? ' · 照片' : ''}
          </span>
        </span>
      </button>
    </li>
  )
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] ${active ? 'bg-ink text-white' : 'bg-white text-ink'}`}
    >
      {label}
    </button>
  )
}
