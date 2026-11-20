import { useState } from 'react'
import { artFace, companions, dayIndex, greeting, islandById, levelForEra, moodById, seedMoments, weekDays } from '../../showcase/model'
import type { TabId } from '../../showcase/model'
import { useWorld } from '../../showcase/WorldContext'
import Archipelago from './Archipelago'
import PlaceStory from './PlaceStory'

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'island', label: '我的岛屿', icon: 'isle' },
  { id: 'records', label: '今日日常', icon: 'book' },
  { id: 'insights', label: '成长轨迹', icon: 'leaf' },
  { id: 'more', label: '更多', icon: 'menu' },
]

const seedNow = seedMoments.filter((moment) => moment.era === 'now').length

export default function PhoneApp() {
  const world = useWorld()
  const level = levelForEra(
    world.era,
    Math.max(0, world.moments.filter((moment) => moment.era === 'now').length - seedNow),
  )
  const hello = greeting()

  return (
    <div className="phone-shell mx-auto">
      <div className="phone-screen">
        <div className="relative z-20 flex items-center justify-between px-5 pb-1 pt-3 text-[11px] font-semibold text-[#3d3229]/80">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <i className="block h-1.5 w-3 rounded-sm bg-[#3d3229]/70" />
            <i className="block h-2 w-4 rounded-sm border border-[#3d3229]/50" />
          </span>
        </div>

        <div className="absolute inset-0 pt-7">
          {world.tab === 'island' && <IslandTab hello={hello} levelLabel={`Lv.${level.level} ${level.title}`} progress={level.xp / level.span} />}
          {world.tab === 'records' && <RecordsTab />}
          {world.tab === 'insights' && <InsightsTab levelLabel={`Lv.${level.level} ${level.title}`} xp={level.xp} span={level.span} next={level.nextTitle} />}
          {world.tab === 'more' && <MoreTab levelLabel={`Lv.${level.level} ${level.title}`} />}
        </div>

        {world.composerOpen && (
          <div className="absolute inset-0 z-30 bg-[#3d3229]/25" onClick={() => world.setComposerOpen(false)}>
            <div
              className="absolute inset-x-2 bottom-24 max-h-[78%] overflow-y-auto rounded-[28px] bg-[#fffaf6] p-3 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-2 flex justify-end">
                <button type="button" className="text-xs text-[#8c7b6b]" onClick={() => world.setComposerOpen(false)}>
                  关闭
                </button>
              </div>
              <PlaceStory compact />
            </div>
          </div>
        )}

        <nav className="absolute inset-x-3 bottom-3 z-20 h-[68px]" aria-label="星屿主导航">
          <div className="phone-nav absolute inset-x-0 bottom-0 flex h-[62px] items-end rounded-[22px] bg-white/95 px-1 pb-1 shadow-[0_10px_30px_rgba(80,60,40,0.12)]">
            {tabs.slice(0, 2).map((tab) => (
              <TabButton key={tab.id} tab={tab} active={world.tab === tab.id} onClick={() => {
                world.setComposerOpen(false)
                world.setTab(tab.id)
              }} />
            ))}
            <div className="w-16 shrink-0" />
            {tabs.slice(2).map((tab) => (
              <TabButton key={tab.id} tab={tab} active={world.tab === tab.id} onClick={() => {
                world.setComposerOpen(false)
                world.setTab(tab.id)
              }} />
            ))}
          </div>
          <button
            type="button"
            className="jelly-add absolute left-1/2 top-0 -translate-x-1/2"
            aria-label="快速记录今日日常"
            onClick={() => {
              world.setTab('island')
              world.setComposerOpen(true)
            }}
          >
            +
          </button>
        </nav>
      </div>
    </div>
  )
}

function TabButton({
  tab,
  active,
  onClick,
}: {
  tab: { id: TabId; label: string; icon: string }
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 flex-col items-center gap-0.5 pb-1 text-[10px] ${active ? 'font-bold text-[#d4926a]' : 'text-[#3d3229]/45'}`}
    >
      <TabGlyph name={tab.icon} />
      {tab.label}
    </button>
  )
}

function TabGlyph({ name }: { name: string }) {
  const common = 'h-[18px] w-[18px]'
  if (name === 'book') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H20v16H7.5A2.5 2.5 0 0 0 5 21.5Z" />
        <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3" />
      </svg>
    )
  }
  if (name === 'leaf') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 19c8-1 12-8 13-14-6 1-13 5-13 14Z" />
        <path d="M9 14c2-2 4-4 7-6" />
      </svg>
    )
  }
  if (name === 'menu') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 7h14M5 12h14M5 17h14" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 16c2-6 4-8 8-8s6 2 8 8" />
      <path d="M8 16c1.2-2.4 2.4-3.2 4-3.2S14.8 13.6 16 16" />
    </svg>
  )
}

function IslandTab({ hello, levelLabel, progress }: { hello: string; levelLabel: string; progress: number }) {
  const world = useWorld()
  const island = islandById(world.selectedId)
  const stories = world.visibleMoments.filter((moment) => moment.islandId === world.selectedId)
  return (
    <div className="flex h-full flex-col">
      <div className="relative min-h-0 flex-1">
        <Archipelago layout="phone" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/80 to-transparent" />
        <div className="relative z-10 px-4 pt-1">
          <p className="font-serif text-[22px] leading-tight text-[#3d3229]">
            {hello}，{world.nickname}
          </p>
          <p className="mt-1 text-[11px] text-[#6b5b4e]">今天，也是值得认真记录的一天。</p>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/80 px-2.5 py-1 text-[10px] text-[#5c4e44] shadow-sm">
            <span>{levelLabel}</span>
            <span className="h-1 w-14 overflow-hidden rounded-full bg-[#f0e4d8]">
              <span className="block h-full rounded-full bg-[#e8a87c]" style={{ width: `${Math.round(progress * 100)}%` }} />
            </span>
          </div>
        </div>
      </div>
      <div className="relative z-10 mx-3 mb-[76px] rounded-2xl bg-white/95 p-3 text-left shadow-lg">
        <p className="text-[11px] font-semibold text-[#c4845a]">{island.name}</p>
        <p className="mt-0.5 line-clamp-2 text-[12px] leading-relaxed text-[#3d3229]">{world.witness}</p>
        {stories[0] && (
          <p className="mt-1 line-clamp-2 text-[11px] text-[#8c7b6b]">「{stories[0].text}」</p>
        )}
      </div>
    </div>
  )
}

function RecordsTab() {
  const world = useWorld()
  return (
    <div className="flex h-full flex-col bg-[#fff8f2] px-4 pb-24 pt-2">
      <h2 className="font-serif text-xl text-[#3d3229]">今日日常</h2>
      <p className="mt-1 text-[11px] text-[#8c7b6b]">
        {world.era === 'now' ? '文字、语音、照片，都会留在当天。' : '你正在回看这一天留下的故事。'}
      </p>
      <div className="mt-3 flex-1 space-y-2 overflow-y-auto pr-1">
        {world.visibleMoments.length === 0 && (
          <button
            type="button"
            onClick={() => world.setComposerOpen(true)}
            className="w-full rounded-2xl bg-white p-4 text-left text-sm text-[#8c7b6b] shadow-sm"
          >
            你的世界还在等第一个瞬间。
          </button>
        )}
        {world.visibleMoments.map((moment) => {
          const mood = moodById(moment.mood)
          return (
            <article key={moment.id} className="rounded-2xl bg-white p-3 shadow-sm">
              <div className="flex items-center gap-2">
                <img src={artFace(world.companionId, moment.mood)} alt="" className="h-8 w-8 object-contain" />
                <div>
                  <p className="text-xs font-semibold text-[#3d3229]">{islandById(moment.islandId).name}</p>
                  <p className="text-[10px] text-[#8c7b6b]">
                    {moment.day} · {mood.label}
                    {moment.voice ? ' · 语音' : ''}
                    {moment.photo ? ' · 照片' : ''}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-[#3d3229]">{moment.text}</p>
              {moment.photo && (
                <div className="mt-2 h-16 overflow-hidden rounded-xl">
                  <img src="/art/sea.webp" alt="记录中的照片" className="h-full w-full object-cover" />
                </div>
              )}
              {moment.voice && (
                <div className="mt-2 flex h-7 items-center gap-0.5 rounded-full bg-[#fff1e4] px-3">
                  {Array.from({ length: 18 }).map((_, index) => (
                    <i
                      key={index}
                      className="w-0.5 rounded-full bg-[#e8a87c]"
                      style={{ height: 6 + ((index * 5) % 12) }}
                    />
                  ))}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}

function InsightsTab({
  levelLabel,
  xp,
  span,
  next,
}: {
  levelLabel: string
  xp: number
  span: number
  next: string
}) {
  const world = useWorld()
  const counts = new Map<string, number>()
  for (const moment of world.visibleMoments) {
    counts.set(moment.islandId, (counts.get(moment.islandId) ?? 0) + 1)
  }
  const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1])
  return (
    <div className="h-full overflow-y-auto bg-[#fff8f2] px-4 pb-24 pt-2">
      <h2 className="font-serif text-xl text-[#3d3229]">成长轨迹</h2>
      <p className="mt-1 text-[11px] text-[#8c7b6b]">看见这一段时间的形状，而不催你完成。</p>
      <div className="mt-3 rounded-2xl bg-white p-3 shadow-sm">
        <div className="flex justify-between text-[11px] text-[#8c7b6b]">
          <span>这一周的心情</span>
          <span>{levelLabel}</span>
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1">
          {weekDays.map((label, index) => {
            const moment = world.visibleMoments.find((item) => dayIndex(item.day) === index)
            return (
              <div key={label} className="text-center">
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#fff6ee]">
                  {moment ? (
                    <img src={artFace(world.companionId, moment.mood)} alt="" className="h-7 w-7 object-contain" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#eadfd4]" />
                  )}
                </div>
                <p className="mt-1 text-[10px] text-[#8c7b6b]">{label}</p>
              </div>
            )
          })}
        </div>
      </div>
      <div className="mt-2 rounded-2xl bg-white p-3 shadow-sm">
        <p className="text-[11px] font-semibold text-[#c4845a]">本周的光</p>
        <p className="mt-1 text-[12px] leading-relaxed text-[#3d3229]">{world.insight}</p>
      </div>
      <div className="mt-2 rounded-2xl bg-white p-3 shadow-sm">
        <div className="flex items-center justify-between text-[12px]">
          <span className="font-semibold text-[#3d3229]">{levelLabel}</span>
          <span className="text-[#8c7b6b]">
            {xp}/{span} · 下一级 {next}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#f3e7dc]">
          <div className="h-full rounded-full bg-[#e8a87c]" style={{ width: `${Math.min(100, Math.round((xp / span) * 100))}%` }} />
        </div>
        <div className="mt-3 space-y-2">
          {ranked.map(([id, count]) => (
            <div key={id}>
              <div className="flex justify-between text-[11px] text-[#5c4e44]">
                <span>{islandById(id).name}</span>
                <span>{count}</span>
              </div>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#f6eee6]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(count / Math.max(...ranked.map((item) => item[1]))) * 100}%`,
                    background: islandById(id).color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MoreTab({ levelLabel }: { levelLabel: string }) {
  const world = useWorld()
  const [editing, setEditing] = useState(false)
  const [nickDraft, setNickDraft] = useState(world.nickname)
  return (
    <div className="h-full overflow-y-auto bg-[#fff8f2] px-4 pb-24 pt-2">
      <h2 className="font-serif text-xl text-[#3d3229]">更多</h2>
      <div className="mt-3 space-y-2">
        <div className="rounded-2xl bg-white p-3 shadow-sm">
          <p className="text-[10px] text-[#8c7b6b]">我的昵称</p>
          {editing ? (
            <form
              className="mt-1 flex gap-2"
              onSubmit={(event) => {
                event.preventDefault()
                const next = nickDraft.trim()
                if (next) world.setNickname(next)
                setEditing(false)
              }}
            >
              <input
                value={nickDraft}
                onChange={(event) => setNickDraft(event.target.value)}
                className="flex-1 rounded-xl border border-[#eadfd4] px-2 py-1 text-sm outline-none"
                maxLength={12}
                autoFocus
              />
              <button type="submit" className="text-xs font-semibold text-[#c4845a]">
                保存
              </button>
            </form>
          ) : (
            <button type="button" className="mt-0.5 text-sm font-semibold text-[#3d3229]" onClick={() => setEditing(true)}>
              {world.nickname}
            </button>
          )}
        </div>
        <InfoCard title="星屿会员" body="成长统计、AI 心情总结、照片与语音、更多伙伴与小岛。" />
        <InfoCard title="我的等级" body={levelLabel} />
        <div className="rounded-2xl bg-white p-3 shadow-sm">
          <p className="text-sm font-semibold text-[#3d3229]">成长伙伴</p>
          <div className="mt-2 grid grid-cols-4 gap-1">
            {companions.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => world.setCompanionId(item.id)}
                className={`rounded-xl p-1 ${world.companionId === item.id ? 'bg-[#fff1e4] ring-1 ring-[#e8a87c]' : ''}`}
              >
                <img src={artFace(item.id, world.sceneMood)} alt="" className="mx-auto h-10 w-10 object-contain" />
                <p className="truncate text-[10px] text-[#5c4e44]">{item.name}</p>
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => world.setReminderOn(!world.reminderOn)}
          className="block w-full rounded-2xl bg-white p-3 text-left shadow-sm"
        >
          <p className="text-sm font-semibold text-[#3d3229]">记录提醒</p>
          <p className="text-[11px] text-[#8c7b6b]">{world.reminderOn ? '每晚 21:30 · 已打开' : '已关闭'}</p>
        </button>
        <button
          type="button"
          onClick={() => world.setSoundOn(!world.soundOn)}
          className="block w-full rounded-2xl bg-white p-3 text-left shadow-sm"
        >
          <p className="text-sm font-semibold text-[#3d3229]">声音设置</p>
          <p className="text-[11px] text-[#8c7b6b]">{world.soundOn ? '岛屿音乐开着' : '岛屿音乐关着'}</p>
        </button>
      </div>
    </div>
  )
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-white p-3 shadow-sm">
      <p className="text-sm font-semibold text-[#3d3229]">{title}</p>
      <p className="text-[11px] leading-relaxed text-[#8c7b6b]">{body}</p>
    </div>
  )
}
