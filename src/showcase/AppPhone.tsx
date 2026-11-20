import { useRef, type RefObject } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import IslandWorld from './IslandWorld'
import {
  categories,
  categoryById,
  companionById,
  companions,
  growthFrom,
  monthReport,
  moodById,
  moods,
  presentCategories,
  voiceLine,
  weekReport,
  type ShowcaseAction,
  type ShowcaseState,
  type Story,
} from './model'

interface AppPhoneProps {
  state: ShowcaseState
  dispatch: (action: ShowcaseAction) => void
}

const tabs = [
  { id: 'island' as const, label: '岛屿', full: '我的岛屿' },
  { id: 'records' as const, label: '日常', full: '今日日常' },
  { id: 'insights' as const, label: '轨迹', full: '成长轨迹' },
  { id: 'more' as const, label: '更多', full: '更多' },
]

export default function AppPhone({ state, dispatch }: AppPhoneProps) {
  const userCount = state.stories.filter((story) => story.source === 'user').length
  const growth = growthFrom(userCount)
  const companion = companionById(state.companion)
  const latest = state.stories[0]
  const richness = Math.min(1, 0.36 + userCount * 0.18)
  const showSpeech = state.phase === 'placing' || state.phase === 'settled'
  const holdStarted = useRef(0)

  const finishVoice = (ok: boolean) => {
    dispatch({ type: 'recording', value: false })
    if (!ok) {
      dispatch({ type: 'hint', hint: '说话时间太短' })
      return
    }
    dispatch({
      type: 'patch-draft',
      patch: { text: voiceLine(state.draft.category), voice: true },
    })
  }

  return (
    <div id="stage" className="mx-auto w-full max-w-[336px]">
      <div className="rounded-[36px] bg-[#1d2833] p-2.5 shadow-[0_30px_70px_rgba(61,120,180,0.22)]">
        <div className="relative flex h-[600px] flex-col overflow-hidden rounded-[28px] bg-[#F5F9FF]">
          <div className="flex shrink-0 items-center justify-between px-5 pt-2.5 pb-1 text-[10px] font-semibold text-[#7B8A9A]">
            <span>9:41</span>
            <span className="rounded-full bg-[#243447]/90 px-6 py-1" />
            <span>星屿</span>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-24">
            {state.tab === 'island' && (
              <IslandTab
                state={state}
                dispatch={dispatch}
                growth={growth}
                richness={richness}
                companionName={companion.name}
                showSpeech={showSpeech}
                latest={latest}
              />
            )}
            {state.tab === 'records' && <RecordsTab state={state} dispatch={dispatch} />}
            {state.tab === 'insights' && <InsightsTab state={state} dispatch={dispatch} />}
            {state.tab === 'more' && <MoreTab state={state} dispatch={dispatch} />}
          </div>

          <PhoneNav
            tab={state.tab}
            onTab={(tab) => dispatch({ type: 'tab', tab })}
            onAdd={() => dispatch({ type: 'open-record' })}
          />

          <AnimatePresence>
            {state.sheet === 'record' && (
              <RecordSheet
                state={state}
                dispatch={dispatch}
                holdStarted={holdStarted}
                finishVoice={finishVoice}
              />
            )}
            {state.sheet === 'story' && (
              <StorySheet state={state} dispatch={dispatch} />
            )}
            {state.sheet === 'report' && (
              <ReportSheet state={state} dispatch={dispatch} name={companion.name} />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {state.phase === 'understanding' && (
              <motion.div
                className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#F5F9FF]/80 px-8 text-center backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CompanionFace id={state.companion} />
                <p className="mt-3 text-sm font-semibold text-[#2C3E50]">
                  {companion.name}正在理解你的日常…
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-[#7B8A9A]">
                  只看见你放进来的这一则，不评判，也不催你。
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] leading-relaxed text-[#7B8A9A]">
        按当前版本重绘的可操作界面 · 我的岛屿 / 今日日常 / 成长轨迹 / 更多
      </p>
    </div>
  )
}

function IslandTab({
  state,
  dispatch,
  growth,
  richness,
  companionName,
  showSpeech,
  latest,
}: {
  state: ShowcaseState
  dispatch: (action: ShowcaseAction) => void
  growth: ReturnType<typeof growthFrom>
  richness: number
  companionName: string
  showSpeech: boolean
  latest: Story | undefined
}) {
  return (
    <div className="space-y-3 pt-1">
      <div className="flex items-center gap-2 rounded-[20px] border border-white/80 bg-[#FFF3EA]/90 px-3 py-2.5 shadow-sm">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-black text-[#5EA9FF]">
            成长等级：Lv.{growth.level} {growth.title}
          </p>
          <p className="mt-0.5 text-[11px] font-bold text-[#6D8B74]">在岛上的第 12 天</p>
          <p className="mt-0.5 truncate text-[10px] font-bold text-[#6D8B74]">
            {growth.next
              ? `下一级 Lv.${growth.next} ${growth.nextTitle}`
              : '已走到这一季的远处'}
          </p>
          <p className="mt-0.5 text-[10px] font-semibold text-[#75A9D6]">岛上 · 晴</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[11px] font-black text-[#5EA9FF] shadow-sm">
          Lv.{growth.level}
        </div>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-[#8EC5FF] transition-all duration-700"
          style={{ width: `${growth.percent}%` }}
        />
      </div>

      <IslandWorld
        categories={presentCategories(state.stories)}
        mood={latest?.mood}
        companion={state.companion}
        richness={richness}
        decorLabel={showSpeech ? state.lastEvent?.decor : null}
        speech={showSpeech ? state.lastEvent?.witness : null}
        flying={state.phase === 'placing'}
      />

      <button
        type="button"
        onClick={() => dispatch({ type: 'open-record' })}
        className="flex w-full items-center gap-2.5 rounded-[24px] bg-white px-3 py-2.5 text-left shadow-[0_8px_24px_rgba(94,169,255,0.12)]"
      >
        <CompanionFace id={state.companion} small />
        <span className="min-w-0 flex-1">
          <span className="block text-[13px] font-bold text-[#2C3E50]">记录今天的故事</span>
          <span className="mt-0.5 block text-[10px] text-[#7B8A9A]">
            {companionName}将帮你放入合适的岛屿
          </span>
        </span>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5EA9FF] text-2xl font-light text-white">
          +
        </span>
      </button>

      <div>
        <div className="mb-1.5 flex items-center justify-between px-1">
          <p className="text-[12px] font-bold text-[#2C3E50]">今日故事</p>
          <button
            type="button"
            className="text-[10px] font-semibold text-[#5EA9FF]"
            onClick={() => dispatch({ type: 'tab', tab: 'records' })}
          >
            全部日常
          </button>
        </div>
        <div className="space-y-2">
          {state.stories.slice(0, 2).map((story) => (
            <StoryRow key={story.id} story={story} onOpen={() => dispatch({ type: 'open-story', id: story.id })} />
          ))}
        </div>
      </div>
    </div>
  )
}

function RecordsTab({
  state,
  dispatch,
}: {
  state: ShowcaseState
  dispatch: (action: ShowcaseAction) => void
}) {
  return (
    <div className="pt-1">
      <p className="px-1 text-[15px] font-black text-[#2C3E50]">今日日常</p>
      <p className="mt-1 px-1 text-[11px] leading-relaxed text-[#7B8A9A]">
        今天值得留下来的，都在这里。点开可以看见它被安放的位置。
      </p>
      <div className="mt-3 space-y-2">
        {state.stories.map((story) => (
          <StoryRow key={story.id} story={story} onOpen={() => dispatch({ type: 'open-story', id: story.id })} />
        ))}
      </div>
    </div>
  )
}

function InsightsTab({
  state,
  dispatch,
}: {
  state: ShowcaseState
  dispatch: (action: ShowcaseAction) => void
}) {
  const total = state.stories.length || 1
  const moodCounts = moods
    .map((mood) => ({
      ...mood,
      count: state.stories.filter((story) => story.mood === mood.id).length,
    }))
    .filter((mood) => mood.count > 0)
  const tagSet = [...new Set(state.stories.flatMap((story) => story.tags))]

  return (
    <div className="space-y-3 pt-1">
      <div>
        <p className="text-[15px] font-black text-[#2C3E50]">成长轨迹</p>
        <p className="mt-1 text-[11px] leading-relaxed text-[#7B8A9A]">
          这里不做成绩单。只把心情和标签轻轻摊开，方便你回头看。
        </p>
      </div>
      <div className="rounded-[20px] bg-white p-3 shadow-sm">
        <p className="text-[11px] font-bold text-[#7B8A9A]">心情胶囊</p>
        <div className="mt-2 space-y-1.5">
          {moodCounts.map((mood) => (
            <div key={mood.id} className="flex items-center gap-2 text-[11px]">
              <span className="w-12 shrink-0 text-[#2C3E50]">
                {mood.face} {mood.label}
              </span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-[#F3F7FB]">
                <span
                  className="block h-full rounded-full bg-[#F3C7A5]"
                  style={{ width: `${Math.max(12, (mood.count / total) * 100)}%` }}
                />
              </span>
              <span className="w-8 text-right font-semibold text-[#7B8A9A]">
                {Math.round((mood.count / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[20px] bg-white p-3 shadow-sm">
        <p className="text-[11px] font-bold text-[#7B8A9A]">被留下的标签</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {tagSet.map((tag) => (
            <span key={tag} className="rounded-full bg-[#EAF4FF] px-2 py-1 text-[10px] font-semibold text-[#3D74B5]">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => dispatch({ type: 'open-report', report: 'week' })}
          className="rounded-2xl bg-white px-3 py-3 text-left text-[12px] font-bold text-[#2C3E50] shadow-sm"
        >
          本周总结
          <span className="mt-1 block text-[10px] font-medium text-[#7B8A9A]">让伙伴复述这一周</span>
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: 'open-report', report: 'month' })}
          className="rounded-2xl bg-white px-3 py-3 text-left text-[12px] font-bold text-[#2C3E50] shadow-sm"
        >
          月度报告
          <span className="mt-1 block text-[10px] font-medium text-[#7B8A9A]">看看岛上留下了什么</span>
        </button>
      </div>
    </div>
  )
}

function MoreTab({
  state,
  dispatch,
}: {
  state: ShowcaseState
  dispatch: (action: ShowcaseAction) => void
}) {
  const current = companionById(state.companion)
  return (
    <div className="space-y-3 pt-1">
      <p className="text-[15px] font-black text-[#2C3E50]">更多</p>
      <div className="rounded-[20px] bg-white p-3 shadow-sm">
        <p className="text-[11px] font-bold text-[#7B8A9A]">陪伴的人</p>
        <p className="mt-1 text-[12px] font-bold text-[#2C3E50]">{current.name}</p>
        <p className="mt-1 text-[10px] leading-relaxed text-[#7B8A9A]">{current.line}</p>
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          {companions.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => dispatch({ type: 'companion', id: item.id })}
              className={`rounded-2xl px-1 py-2 text-center ${
                state.companion === item.id ? 'bg-[#EAF4FF] ring-1 ring-[#5EA9FF]' : 'bg-[#F5F9FF]'
              }`}
            >
              <CompanionFace id={item.id} small />
              <span className="mt-1 block text-[10px] font-bold text-[#2C3E50]">{item.name}</span>
              {item.member && <span className="text-[8px] font-semibold text-[#C97B5A]">会员</span>}
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => dispatch({ type: 'toggle-reminder' })}
        className="flex w-full items-center justify-between rounded-[20px] bg-white px-3 py-3 text-left shadow-sm"
      >
        <span>
          <span className="block text-[12px] font-bold text-[#2C3E50]">每日提醒</span>
          <span className="mt-0.5 block text-[10px] text-[#7B8A9A]">
            {state.reminder ? '今晚 21:30 · 轻轻响一声' : '已关闭，不会催你'}
          </span>
        </span>
        <span className={`h-6 w-10 rounded-full p-0.5 ${state.reminder ? 'bg-[#5EA9FF]' : 'bg-[#D5DEE6]'}`}>
          <span className={`block h-5 w-5 rounded-full bg-white transition-transform ${state.reminder ? 'translate-x-4' : ''}`} />
        </span>
      </button>
      <div className="rounded-[20px] bg-[#FFF6EE] px-3 py-3">
        <p className="text-[12px] font-bold text-[#C97B5A]">星屿会员</p>
        <p className="mt-1 text-[10px] leading-relaxed text-[#8C6B4F]">
          可在 App Store 订阅，或使用激活码。小愿和小梦，以及更多陪伴能力，在会员里。
        </p>
      </div>
      <p className="px-1 text-[10px] leading-relaxed text-[#7B8A9A]">
        日常默认只有你能看。理解结果都能改，也不能代替专业帮助。
      </p>
    </div>
  )
}

function RecordSheet({
  state,
  dispatch,
  holdStarted,
  finishVoice,
}: {
  state: ShowcaseState
  dispatch: (action: ShowcaseAction) => void
  holdStarted: RefObject<number>
  finishVoice: (ok: boolean) => void
}) {
  return (
    <motion.div
      className="absolute inset-0 z-20 flex flex-col justify-end bg-[#243447]/25"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button type="button" className="min-h-8 flex-1" aria-label="关闭记录" onClick={() => dispatch({ type: 'close-sheet' })} />
      <motion.div
        className="max-h-[78%] overflow-y-auto rounded-t-[28px] bg-[#FFFBF7] px-3.5 pt-3 pb-4 shadow-2xl"
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        exit={{ y: 48 }}
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#E7D7C8]" />
        <p className="text-[14px] font-black text-[#3D3229]">今天发生了什么？</p>
        <p className="mt-0.5 text-[10px] text-[#8C7B6B]">不必是大事。先选生活，再选心情，最后留一行。</p>

        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => dispatch({ type: 'patch-draft', patch: { category: item.id } })}
              className="rounded-2xl px-2 py-2 text-[11px] font-bold"
              style={{
                background: state.draft.category === item.id ? item.soft : '#fff',
                color: item.tint,
                boxShadow: state.draft.category === item.id ? `inset 0 0 0 1.5px ${item.tint}` : 'inset 0 0 0 1px #F0E4D8',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-3 flex justify-between gap-1">
          {moods.map((mood) => (
            <button
              key={mood.id}
              type="button"
              onClick={() => dispatch({ type: 'patch-draft', patch: { mood: mood.id } })}
              className={`flex flex-1 flex-col items-center rounded-2xl py-1.5 text-[10px] ${
                state.draft.mood === mood.id ? 'bg-[#FFF0E6] font-bold text-[#C97B5A]' : 'text-[#8C7B6B]'
              }`}
            >
              <span className="text-base">{mood.face}</span>
              {mood.label}
            </button>
          ))}
        </div>

        <div className="mt-2 flex gap-1.5">
          <button
            type="button"
            onClick={() => dispatch({ type: 'patch-draft', patch: { voice: false } })}
            className={`rounded-full px-3 py-1 text-[10px] font-bold ${state.draft.voice ? 'bg-white text-[#8C7B6B]' : 'bg-[#3D3229] text-white'}`}
          >
            文字记录
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: 'patch-draft', patch: { voice: true } })}
            className={`rounded-full px-3 py-1 text-[10px] font-bold ${state.draft.voice ? 'bg-[#3D3229] text-white' : 'bg-white text-[#8C7B6B]'}`}
          >
            语音记录
          </button>
        </div>

        {state.draft.voice ? (
          <button
            type="button"
            className={`mt-3 w-full rounded-2xl py-4 text-sm font-bold ${
              state.recording ? 'bg-[#F3C7A5] text-[#3D3229]' : 'bg-white text-[#3D3229]'
            }`}
            onPointerDown={(event) => {
              holdStarted.current = Date.now()
              event.currentTarget.setPointerCapture(event.pointerId)
              dispatch({ type: 'recording', value: true })
            }}
            onPointerUp={() => finishVoice(Date.now() - holdStarted.current > 450)}
            onPointerCancel={() => dispatch({ type: 'recording', value: false })}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                finishVoice(true)
              }
            }}
          >
            {state.recording ? '正在录音 · 松开完成' : '按住 说话'}
            <span className="mt-1 block text-[10px] font-medium opacity-70">键盘按回车，会填入一句示例</span>
          </button>
        ) : (
          <textarea
            value={state.draft.text}
            maxLength={80}
            onChange={(event) => dispatch({ type: 'patch-draft', patch: { text: event.target.value, voice: false } })}
            placeholder="今天发生了什么？"
            className="mt-3 h-20 w-full resize-none rounded-2xl border border-[#F0E4D8] bg-white px-3 py-2 text-[13px] text-[#3D3229] outline-none placeholder:text-[#C3B5A8]"
          />
        )}

        {state.draft.voice && state.draft.text && (
          <p className="mt-2 rounded-2xl bg-white px-3 py-2 text-[12px] leading-relaxed text-[#3D3229]">{state.draft.text}</p>
        )}

        <div className="mt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => dispatch({ type: 'patch-draft', patch: { photo: !state.draft.photo } })}
            className={`rounded-full px-3 py-1 text-[10px] font-bold ${state.draft.photo ? 'bg-[#E7F6EA] text-[#3E9A72]' : 'bg-white text-[#8C7B6B]'}`}
          >
            {state.draft.photo ? '已附上一张照片' : '添加照片'}
          </button>
          <span className="text-[10px] text-[#C3B5A8]">{state.draft.text.trim().length}/80</span>
        </div>
        <p className="mt-1 text-[10px] text-[#B5A89C]">照片只为你自己保存，不参与文字理解。</p>
        {state.hint && <p className="mt-2 text-[11px] font-semibold text-[#C97B5A]">{state.hint}</p>}
        <button
          type="button"
          onClick={() => dispatch({ type: 'begin-save' })}
          disabled={state.phase === 'understanding' || state.phase === 'placing'}
          className="mt-3 w-full rounded-full bg-[#E8A87C] py-3 text-sm font-bold text-white disabled:opacity-60"
        >
          保存日常
        </button>
      </motion.div>
    </motion.div>
  )
}

function StorySheet({
  state,
  dispatch,
}: {
  state: ShowcaseState
  dispatch: (action: ShowcaseAction) => void
}) {
  const story = state.stories.find((item) => item.id === state.activeStoryId)
  if (!story) return null
  const category = categoryById(story.category)
  return (
    <motion.div
      className="absolute inset-0 z-20 flex flex-col justify-end bg-[#243447]/25"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button type="button" className="flex-1" aria-label="关闭日常" onClick={() => dispatch({ type: 'close-sheet' })} />
      <motion.div
        className="rounded-t-[28px] bg-[#FFFBF7] px-4 pt-4 pb-6"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        exit={{ y: 40 }}
      >
        <p className="text-[10px] font-bold" style={{ color: category.tint }}>
          {category.island} · {story.timeLabel}
        </p>
        <p className="mt-2 text-[15px] font-bold leading-relaxed text-[#3D3229]">{story.text}</p>
        {story.photo && (
          <div className="mt-3 h-16 rounded-2xl bg-gradient-to-br from-[#F7E7C1] to-[#F3C7A5]" aria-hidden="true" />
        )}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {story.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-[#8C7B6B]">
              {tag}
            </span>
          ))}
          <span className="rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-[#8C7B6B]">
            {moodById(story.mood).face} {moodById(story.mood).label}
          </span>
        </div>
        <p className="mt-3 rounded-2xl bg-white px-3 py-2 text-[12px] leading-relaxed text-[#3D3229]">{story.witness}</p>
        <p className="mt-2 text-[10px] text-[#8C7B6B]">世界里多了一处：{story.decor}</p>
      </motion.div>
    </motion.div>
  )
}

function ReportSheet({
  state,
  dispatch,
  name,
}: {
  state: ShowcaseState
  dispatch: (action: ShowcaseAction) => void
  name: string
}) {
  const text =
    state.report === 'month' ? monthReport(state.stories, name) : weekReport(state.stories, name)
  return (
    <motion.div
      className="absolute inset-0 z-20 flex flex-col justify-end bg-[#243447]/25"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button type="button" className="flex-1" aria-label="关闭报告" onClick={() => dispatch({ type: 'close-sheet' })} />
      <motion.div className="rounded-t-[28px] bg-white px-4 pt-4 pb-6" initial={{ y: 24 }} animate={{ y: 0 }} exit={{ y: 24 }}>
        <p className="text-[12px] font-black text-[#5EA9FF]">{state.report === 'month' ? '月度报告' : '本周总结'}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-[#2C3E50]">{text}</p>
      </motion.div>
    </motion.div>
  )
}

function StoryRow({ story, onOpen }: { story: Story; onOpen: () => void }) {
  const category = categoryById(story.category)
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full items-start gap-2 rounded-2xl bg-white px-2.5 py-2 text-left shadow-sm"
    >
      <span className="mt-1 h-8 w-1 shrink-0 rounded-full" style={{ background: category.tint }} />
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold" style={{ color: category.tint }}>
            {category.label}
            {story.voice ? ' · 语音' : ''}
            {story.photo ? ' · 照片' : ''}
          </span>
          <span className="text-[10px] text-[#A0AEC0]">{story.timeLabel}</span>
        </span>
        <span className="mt-0.5 block truncate text-[12px] font-semibold text-[#2C3E50]">{story.text}</span>
      </span>
    </button>
  )
}

function PhoneNav({
  tab,
  onTab,
  onAdd,
}: {
  tab: ShowcaseState['tab']
  onTab: (tab: ShowcaseState['tab']) => void
  onAdd: () => void
}) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 px-2 pb-2">
      <div className="relative h-[62px]">
        <div className="absolute inset-x-0 bottom-0 flex h-[58px] items-end rounded-[22px] bg-white px-1 pb-1 shadow-[0_-8px_24px_rgba(36,52,71,0.06)]">
          {tabs.slice(0, 2).map((item) => (
            <NavButton key={item.id} item={item} active={tab === item.id} onClick={() => onTab(item.id)} />
          ))}
          <span className="w-14 shrink-0" />
          {tabs.slice(2).map((item) => (
            <NavButton key={item.id} item={item} active={tab === item.id} onClick={() => onTab(item.id)} />
          ))}
        </div>
        <button
          type="button"
          aria-label="快速记录今日日常"
          onClick={onAdd}
          className="absolute left-1/2 top-0 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-[#5EA9FF] text-3xl font-light text-white shadow-[0_8px_16px_rgba(94,169,255,0.35)]"
        >
          +
        </button>
      </div>
    </div>
  )
}

function NavButton({
  item,
  active,
  onClick,
}: {
  item: (typeof tabs)[number]
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={item.full}
      onClick={onClick}
      className={`flex flex-1 flex-col items-center pb-1 text-[10px] font-semibold ${active ? 'text-[#5EA9FF]' : 'text-[#243447]/45'}`}
    >
      <TabGlyph id={item.id} />
      {item.label}
    </button>
  )
}

function TabGlyph({ id }: { id: (typeof tabs)[number]['id'] }) {
  const common = 'mb-0.5 h-4 w-4'
  if (id === 'island') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 16c2-3 4-4 6-2s4 2 6 0 4-1 6 2" strokeLinecap="round" />
        <path d="M8 16v-3M12 14V9M16 15v-2" strokeLinecap="round" />
      </svg>
    )
  }
  if (id === 'records') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M7 5h10a1 1 0 0 1 1 1v13l-6-2.5L6 19V6a1 1 0 0 1 1-1z" />
      </svg>
    )
  }
  if (id === 'insights') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 19c4-2 6-5 6-8a6 6 0 1 0-12 0c0 3 2 6 6 8z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 7h14M5 12h14M5 17h14" strokeLinecap="round" />
    </svg>
  )
}

function CompanionFace({ id, small = false }: { id: ShowcaseState['companion']; small?: boolean }) {
  const pal = companionById(id)
  const size = small ? 'h-9 w-9' : 'h-14 w-14'
  return (
    <span className={`inline-flex ${size} items-center justify-center rounded-full`} style={{ background: pal.fill }}>
      <span className={`${small ? 'h-4 w-4' : 'h-6 w-6'} rounded-full bg-[#FFE7C2]`} />
    </span>
  )
}
