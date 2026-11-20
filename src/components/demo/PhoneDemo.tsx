import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import IslandScene from './IslandScene'
import {
  islandById,
  islands,
  moodById,
  moods,
} from '../../demo/model'
import type { IslandDemo } from '../../demo/useIslandDemo'

const tabs = [
  { id: 'island' as const, label: '我的岛屿' },
  { id: 'records' as const, label: '今日日常' },
  { id: 'insights' as const, label: '成长轨迹' },
  { id: 'more' as const, label: '更多' },
]

function TabButton({
  tab,
  demo,
}: {
  tab: (typeof tabs)[number]
  demo: IslandDemo
}) {
  return (
    <button
      type="button"
      className={`py-1 text-[10px] ${demo.tab === tab.id ? 'font-semibold text-[#C4845A]' : 'text-[#8C7B6B]'}`}
      onClick={() => {
        demo.cancelTour()
        demo.closeComposer()
        demo.setTab(tab.id)
      }}
    >
      {tab.label}
    </button>
  )
}

export default function PhoneDemo({ demo }: { demo: IslandDemo }) {
  return (
    <div className="mx-auto w-full max-w-[360px]">
      <div className="rounded-[2.4rem] bg-[#2A211C] p-2.5 shadow-[0_30px_80px_rgba(90,55,30,0.18)]">
        <div className="relative flex h-[680px] flex-col overflow-hidden rounded-[1.9rem] bg-[#FFF8F2] text-[#3D3229]">
          <div className="absolute left-1/2 top-2 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-[#2A211C]" />
          <div className="relative z-20 flex items-center justify-between px-5 pb-1 pt-8 text-[11px] text-[#8C7B6B]">
            <span>21:30</span>
            <span className="max-w-[9rem] truncate">{demo.step ?? '星屿'}</span>
          </div>

          <div className="relative min-h-0 flex-1">
            {demo.tab === 'island' && <IslandTab demo={demo} />}
            {demo.tab === 'records' && <RecordsTab demo={demo} />}
            {demo.tab === 'insights' && <InsightsTab demo={demo} />}
            {demo.tab === 'more' && <MoreTab demo={demo} />}
            <Composer demo={demo} />
            <AnimatePresence>
              {demo.toast && (
                <motion.div
                  className="absolute left-3 right-3 top-2 z-20 rounded-2xl bg-[#3D3229] px-3 py-2 text-center text-xs leading-5 text-[#FFF6EE]"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                >
                  {demo.toast}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <nav className="relative z-20 grid grid-cols-[1fr_1fr_3.4rem_1fr_1fr] items-center border-t border-[#F0E2D4] bg-white/95 px-1 py-2">
            {tabs.slice(0, 2).map((tab) => (
              <TabButton key={tab.id} tab={tab} demo={demo} />
            ))}
            <button
              type="button"
              aria-label="快速记录今日日常"
              className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#E8A87C] text-2xl leading-none text-white shadow-[0_6px_14px_rgba(232,168,124,0.35)]"
              onClick={() => (demo.composerOpen ? demo.closeComposer() : demo.openComposer('text'))}
            >
              +
            </button>
            {tabs.slice(2).map((tab) => (
              <TabButton key={tab.id} tab={tab} demo={demo} />
            ))}
          </nav>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-[#8C7B6B]">可操作演示 · 写下的内容只留在这台浏览器里</p>
    </div>
  )
}

function IslandTab({ demo }: { demo: IslandDemo }) {
  const mood = moodById(demo.mood)
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-4 pb-2">
        <div>
          <p className="text-[11px] text-[#8C7B6B]">等级 {demo.growth.level} · {demo.growth.title}</p>
          <p className="text-sm font-semibold">{islandById(demo.focus).name}</p>
        </div>
        <div className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] text-[#8C7B6B]">
          {mood.weather} · 成长 {demo.growth.points}
        </div>
      </div>
      <div className="relative min-h-0 flex-1">
        <IslandScene
          islandId={demo.focus}
          moodId={demo.stories[0]?.mood ?? demo.mood}
          companion={demo.companion}
          stories={demo.focusedStories}
          pulse={demo.pulse}
        />
        <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-white/90 px-3 py-2 text-xs leading-5 shadow-sm">
          {demo.witness}
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto px-3 py-3">
        {islands.map((island) => {
          const count = demo.stories.filter((story) => story.island === island.id).length
          const active = demo.focus === island.id
          return (
            <button
              key={island.id}
              type="button"
              onClick={() => demo.setFocus(island.id)}
              className={`shrink-0 rounded-full px-3 py-1 text-[11px] ${active ? 'bg-[#3D3229] text-[#FFF6EE]' : 'bg-white text-[#8C7B6B]'}`}
            >
              {island.name} {count}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function RecordsTab({ demo }: { demo: IslandDemo }) {
  return (
    <div className="h-full overflow-y-auto px-4 pb-8">
      <p className="text-base font-semibold">今日日常</p>
      <p className="mt-1 text-xs text-[#8C7B6B]">今天，有没有一个你想留住的瞬间？</p>
      <div className="mt-4 space-y-3">
        {demo.stories.length === 0 && (
          <button
            type="button"
            onClick={() => demo.openComposer('text')}
            className="w-full rounded-3xl border border-dashed border-[#E8D3C0] bg-white px-4 py-8 text-sm text-[#8C7B6B]"
          >
            你的世界还在等第一个瞬间。
          </button>
        )}
        {demo.stories.map((story) => {
          const mood = moodById(story.mood)
          const island = islandById(story.island)
          return (
            <article key={story.id} className="rounded-3xl bg-white p-3 shadow-sm">
              {story.photo && (
                <div className="mb-3 h-24 rounded-2xl" style={{ background: `linear-gradient(135deg, ${mood.sky[0]}, ${island.land})` }} />
              )}
              <p className="text-sm leading-6">{story.text}</p>
              <p className="mt-2 text-[11px] text-[#8C7B6B]">
                {mood.name} · {island.name}
                {story.voice ? ' · 语音' : ''}
                {story.photo ? ' · 照片' : ''}
              </p>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function InsightsTab({ demo }: { demo: IslandDemo }) {
  const max = Math.max(1, ...moods.map((mood) => demo.stories.filter((story) => story.mood === mood.id).length))
  return (
    <div className="h-full overflow-y-auto px-4 pb-8">
      <p className="text-base font-semibold">成长轨迹</p>
      <p className="mt-1 text-xs leading-5 text-[#8C7B6B]">{demo.summary}</p>
      <div className="mt-4 rounded-3xl bg-white p-3">
        <p className="text-[11px] text-[#8C7B6B]">心情被看见的次数</p>
        <div className="mt-3 space-y-2">
          {moods.map((mood) => {
            const count = demo.stories.filter((story) => story.mood === mood.id).length
            return (
              <div key={mood.id} className="grid grid-cols-[3rem_1fr_1rem] items-center gap-2 text-[11px]">
                <span>{mood.name}</span>
                <div className="h-1.5 overflow-hidden rounded-full bg-[#F6EBE1]">
                  <div className="h-full rounded-full" style={{ width: `${(count / max) * 100}%`, background: mood.color }} />
                </div>
                <span className="text-right">{count}</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="mt-3 rounded-3xl bg-white p-3 text-xs leading-5">
        <p className="text-[11px] text-[#8C7B6B]">岛屿回响</p>
        <ul className="mt-2 space-y-1">
          {islands.map((island) => {
            const count = demo.stories.filter((story) => story.island === island.id).length
            return (
              <li key={island.id} className="flex justify-between">
                <span>{island.name}</span>
                <span className="text-[#8C7B6B]">{count === 0 ? '还在等' : `${count} 个瞬间`}</span>
              </li>
            )
          })}
        </ul>
        <p className="mt-3 text-[11px] text-[#B08968]">这段话由演示页当场写成，用来说明见证者的语气。正式 App 会根据你自己的记录生成心情总结。</p>
      </div>
    </div>
  )
}

function MoreTab({ demo }: { demo: IslandDemo }) {
  return (
    <div className="h-full overflow-y-auto px-4 pb-8">
      <p className="text-base font-semibold">更多</p>
      <p className="mt-1 text-xs text-[#8C7B6B]">等级 {demo.growth.level} · {demo.growth.title}</p>
      <div className="mt-4 space-y-2">
        {demo.companions.map((item) => {
          const active = demo.companion === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => demo.chooseCompanion(item.id)}
              className={`w-full rounded-2xl px-3 py-2 text-left ${active ? 'bg-[#3D3229] text-[#FFF6EE]' : 'bg-white'}`}
            >
              <span className="block text-sm font-medium">{item.name}{item.premium ? ' · 会员' : ''}</span>
              <span className={`mt-0.5 block text-[11px] leading-4 ${active ? 'text-[#F3D7C2]' : 'text-[#8C7B6B]'}`}>{item.tagline}</span>
            </button>
          )
        })}
      </div>
      <label className="mt-3 flex items-center justify-between rounded-2xl bg-white px-3 py-3 text-sm">
        <span>每日提醒 {demo.reminderTime}</span>
        <input
          type="checkbox"
          checked={demo.reminderOn}
          onChange={(event) => {
            demo.setReminderOn(event.target.checked)
            demo.showToast(event.target.checked ? `会在 ${demo.reminderTime} 轻轻提醒你回来看看。` : '提醒先关掉了，岛还在。')
          }}
          className="h-4 w-4 accent-[#E8A87C]"
        />
      </label>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={demo.resetWorld} className="flex-1 rounded-2xl bg-white px-3 py-2 text-xs text-[#8C7B6B]">从第一句开始</button>
        <button type="button" onClick={demo.restoreSample} className="flex-1 rounded-2xl bg-white px-3 py-2 text-xs text-[#8C7B6B]">恢复示例</button>
      </div>
    </div>
  )
}

function Composer({ demo }: { demo: IslandDemo }) {
  const holding = useRef(false)
  const started = useRef(0)
  const draftRef = useRef<HTMLTextAreaElement>(null)
  const [recording, setRecording] = useState(false)
  const [sampleIndex, setSampleIndex] = useState(0)

  const composerOpen = demo.composerOpen
  const composerMode = demo.mode
  const closeComposer = demo.closeComposer

  useEffect(() => {
    if (!composerOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeComposer()
    }
    window.addEventListener('keydown', onKey)
    if (composerMode === 'text') draftRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [composerOpen, composerMode, closeComposer])

  const finishHold = () => {
    if (!holding.current) return
    holding.current = false
    setRecording(false)
    const elapsed = Date.now() - started.current
    if (elapsed < 450) {
      demo.showToast('说话时间太短')
      return
    }
    const line = demo.voiceSamples[sampleIndex % demo.voiceSamples.length]
    setSampleIndex((value) => value + 1)
    demo.applyVoiceLine(line)
  }

  return (
    <AnimatePresence>
      {demo.composerOpen && (
        <>
        <button
          type="button"
          aria-label="关闭记录层"
          className="absolute inset-0 z-30 bg-[#3D3229]/20"
          onClick={demo.closeComposer}
        />
        <motion.form
          className="absolute inset-x-0 bottom-0 z-40 rounded-t-3xl bg-[#FFFBF7] px-4 pb-4 pt-3 shadow-[0_-12px_40px_rgba(90,55,30,0.12)]"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          onSubmit={(event) => {
            event.preventDefault()
            demo.placeStory(demo.draft)
          }}
        >
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">今天发生了什么？</p>
              <p className="text-[11px] text-[#8C7B6B]">不必是大事。一行也可以。</p>
            </div>
            <button type="button" onClick={demo.closeComposer} className="rounded-full bg-[#F6EBE1] px-3 py-1 text-xs text-[#3D3229]">关闭</button>
          </div>
          <div className="mb-2 flex gap-2 text-[11px]">
            <button type="button" onClick={() => demo.setMode('text')} className={`rounded-full px-3 py-1 ${demo.mode === 'text' ? 'bg-[#3D3229] text-white' : 'bg-[#F6EBE1]'}`}>文字记录</button>
            <button type="button" onClick={() => demo.setMode('voice')} className={`rounded-full px-3 py-1 ${demo.mode === 'voice' ? 'bg-[#3D3229] text-white' : 'bg-[#F6EBE1]'}`}>语音记录</button>
            <button type="button" onClick={() => demo.setPhoto(!demo.photo)} className={`rounded-full px-3 py-1 ${demo.photo ? 'bg-[#E8A87C] text-white' : 'bg-[#F6EBE1]'}`}>照片</button>
          </div>
          {demo.mode === 'voice' ? (
            <button
              type="button"
              className={`mb-2 w-full rounded-2xl py-6 text-sm ${recording ? 'bg-[#E8A87C] text-white' : 'bg-[#F6EBE1]'}`}
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(event.pointerId)
                holding.current = true
                started.current = Date.now()
                setRecording(true)
              }}
              onPointerUp={finishHold}
              onPointerCancel={finishHold}
            >
              {recording ? '正在听你说' : '按住 说话'}
            </button>
          ) : (
            <textarea
              ref={draftRef}
              value={demo.draft}
              onChange={(event) => demo.setDraft(event.target.value)}
              placeholder="今天发生了什么？"
              rows={3}
              className="relative z-10 mb-2 w-full resize-none rounded-2xl bg-[#F6EBE1] px-3 py-2 text-sm outline-none placeholder:text-[#B7A898]"
            />
          )}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {moods.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => demo.setMood(item.id)}
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] ${demo.mood === item.id ? 'text-white' : 'bg-white text-[#8C7B6B]'}`}
                style={demo.mood === item.id ? { background: item.color } : undefined}
              >
                {item.name}
              </button>
            ))}
          </div>
          <button type="submit" className="w-full rounded-2xl bg-[#E8A87C] py-2.5 text-sm font-semibold text-white">
            保存日常
          </button>
        </motion.form>
        </>
      )}
    </AnimatePresence>
  )
}
