import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  moodById,
  moods,
  phoneTabs,
  type AppScreen,
  type MoodId,
} from '../../data/product'

interface PhonePreviewProps {
  screen: AppScreen
  onScreenChange: (screen: AppScreen) => void
  witness?: string | null
}

type VoiceState = 'idle' | 'recording' | 'saved' | 'short'

export default function PhonePreview({
  screen,
  onScreenChange,
  witness,
}: PhonePreviewProps) {
  const [moodId, setMoodId] = useState<MoodId>('ping_jing')
  const [mode, setMode] = useState<'text' | 'voice'>('text')
  const [voice, setVoice] = useState<VoiceState>('idle')
  const [photoOn, setPhotoOn] = useState(false)
  const [draft, setDraft] = useState('今晚把那章读完了，窗外的灯还亮着。')
  const downAt = useRef(0)
  const mood = moodById[moodId]

  function startVoice(event: React.PointerEvent<HTMLButtonElement>) {
    event.currentTarget.setPointerCapture(event.pointerId)
    downAt.current = Date.now()
    setVoice('recording')
  }

  function endVoice() {
    if (voice !== 'recording') return
    setVoice(Date.now() - downAt.current > 480 ? 'saved' : 'short')
  }

  return (
    <div className="mx-auto w-[292px]">
      <div className="rounded-[2.4rem] bg-[#2a241f] p-[7px] shadow-[0_30px_80px_-36px_rgba(90,60,40,0.55)]">
        <div
          className="relative h-[580px] overflow-hidden rounded-[2rem]"
          style={{ background: `linear-gradient(180deg, ${mood.sky} 0%, #fffaf5 58%, #fff 100%)` }}
        >
          <div className="relative flex items-center justify-between px-5 pt-3 text-[10px] font-medium text-ink/55">
            <span>9:41</span>
            <span className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-black/85" />
            <span>星屿</span>
          </div>

          <div className="absolute inset-x-0 top-9 bottom-[76px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${screen}-${witness ? 'witness' : 'plain'}`}
                className="h-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                {screen === 'island' && (
                  <IslandScreen moodId={moodId} witness={witness} />
                )}
                {screen === 'today' && (
                  <TodayScreen
                    moodId={moodId}
                    onMood={setMoodId}
                    mode={mode}
                    onMode={setMode}
                    draft={draft}
                    onDraft={setDraft}
                    voice={voice}
                    onVoiceDown={startVoice}
                    onVoiceUp={endVoice}
                    photoOn={photoOn}
                    onPhoto={() => setPhotoOn((value) => !value)}
                  />
                )}
                {screen === 'insights' && <InsightsScreen moodId={moodId} />}
                {screen === 'more' && <MoreScreen />}
              </motion.div>
            </AnimatePresence>
          </div>

          <PhoneNav screen={screen} onScreenChange={onScreenChange} />
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] leading-relaxed text-clay">
        按星屿当前四个主页还原 · 可直接点按
      </p>
    </div>
  )
}

function PhoneNav({
  screen,
  onScreenChange,
}: {
  screen: AppScreen
  onScreenChange: (screen: AppScreen) => void
}) {
  const left = phoneTabs.slice(0, 2)
  const right = phoneTabs.slice(2)

  return (
    <div className="absolute inset-x-0 bottom-0 h-[76px]">
      <div className="absolute inset-x-3 bottom-2 h-14 rounded-[1.2rem] bg-white/95 shadow-[0_8px_24px_-16px_rgba(80,50,30,0.5)]" />
      <div className="relative grid h-full grid-cols-5 items-end px-3 pb-4">
        {left.map((tab) => (
          <TabButton key={tab.id} tab={tab} active={screen === tab.id} onScreenChange={onScreenChange} />
        ))}
        <button
          type="button"
          className="z-10 mx-auto -mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b from-[#f0c09a] to-accent text-2xl text-white shadow-[0_8px_16px_-8px_rgba(196,132,90,0.9)]"
          onClick={() => onScreenChange('today')}
          aria-label="快速记录今日日常"
        >
          +
        </button>
        {right.map((tab) => (
          <TabButton key={tab.id} tab={tab} active={screen === tab.id} onScreenChange={onScreenChange} />
        ))}
      </div>
    </div>
  )
}

function TabButton({
  tab,
  active,
  onScreenChange,
}: {
  tab: { id: AppScreen; label: string }
  active: boolean
  onScreenChange: (screen: AppScreen) => void
}) {
  return (
    <button
      type="button"
      className={`flex h-14 w-full flex-col items-center justify-end gap-1 whitespace-nowrap pb-0.5 text-[10px] leading-none ${active ? 'font-semibold text-accent' : 'text-ink/50'}`}
      onClick={() => onScreenChange(tab.id)}
    >
      <span className={`h-1 w-1 rounded-full ${active ? 'bg-accent' : 'bg-transparent'}`} />
      {tab.label}
    </button>
  )
}

function IslandScreen({ moodId, witness }: { moodId: MoodId; witness?: string | null }) {
  const mood = moodById[moodId]
  return (
    <div className="flex h-full flex-col px-4 pt-1">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] text-clay">欢迎回来</p>
          <p className="text-[15px] font-semibold text-ink">今天的岛还亮着</p>
        </div>
        <div className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] text-clay shadow-sm">
          晴 · {mood.label}
        </div>
      </div>
      <div className="relative mt-2 flex-1">
        <MiniWorld tint={mood.color} sea={mood.sea} />
        <AnimatePresence>
          {witness && (
            <motion.p
              className="absolute left-3 right-3 top-2 rounded-2xl bg-white/90 px-3 py-2 text-[11px] leading-relaxed text-ink shadow-sm"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              小星 · {witness}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function MiniWorld({ tint, sea }: { tint: string; sea: string }) {
  return (
    <svg viewBox="0 0 260 340" className="h-full w-full" aria-hidden="true">
      <ellipse cx="130" cy="250" rx="108" ry="28" fill={sea} opacity="0.55" />
      <ellipse cx="130" cy="236" rx="92" ry="46" fill="#f3d7b8" />
      <ellipse cx="130" cy="226" rx="86" ry="40" fill="#b7d7b0" />
      <ellipse cx="130" cy="220" rx="70" ry="28" fill="#cfe6c4" />
      <g>
        <rect x="118" y="168" width="28" height="24" rx="3" fill="#fff7ef" />
        <path d="M112 170 L132 150 L152 170 Z" fill={tint} />
        <rect x="128" y="178" width="8" height="14" rx="1" fill="#e7c4a2" />
      </g>
      <g>
        <rect x="78" y="186" width="16" height="18" rx="2" fill="#fff7ef" />
        <path d="M74 188 L86 176 L98 188 Z" fill="#d7b089" />
      </g>
      <circle cx="168" cy="196" r="10" fill="#7eaa78" />
      <rect x="166" y="196" width="4" height="14" fill="#c4a27a" />
      <g className="companion-bob">
        <circle cx="146" cy="206" r="7" fill="#f3d2b5" />
        <rect x="140" y="212" width="12" height="16" rx="6" fill={tint} />
      </g>
      <ellipse cx="130" cy="262" rx="70" ry="8" fill="#000" opacity="0.04" />
    </svg>
  )
}

function TodayScreen({
  moodId,
  onMood,
  mode,
  onMode,
  draft,
  onDraft,
  voice,
  onVoiceDown,
  onVoiceUp,
  photoOn,
  onPhoto,
}: {
  moodId: MoodId
  onMood: (id: MoodId) => void
  mode: 'text' | 'voice'
  onMode: (mode: 'text' | 'voice') => void
  draft: string
  onDraft: (value: string) => void
  voice: VoiceState
  onVoiceDown: (event: React.PointerEvent<HTMLButtonElement>) => void
  onVoiceUp: () => void
  photoOn: boolean
  onPhoto: () => void
}) {
  return (
    <div className="flex h-full flex-col px-3.5 pt-1">
      <p className="text-[15px] font-semibold text-ink">今天发生了什么？</p>
      <p className="mt-0.5 text-[11px] text-clay">记录今天值得记住的一件事</p>
      <div className="mt-3 grid grid-cols-2 gap-1 rounded-full bg-white/70 p-1 text-[11px]">
        <button
          type="button"
          className={`rounded-full py-1 ${mode === 'text' ? 'bg-white font-semibold text-ink shadow-sm' : 'text-clay'}`}
          onClick={() => onMode('text')}
        >
          文字记录
        </button>
        <button
          type="button"
          className={`rounded-full py-1 ${mode === 'voice' ? 'bg-white font-semibold text-ink shadow-sm' : 'text-clay'}`}
          onClick={() => onMode('voice')}
        >
          语音记录
        </button>
      </div>

      {mode === 'text' ? (
        <textarea
          value={draft}
          onChange={(event) => onDraft(event.target.value)}
          className="mt-3 h-[92px] w-full resize-none rounded-2xl border border-white bg-white/80 px-3 py-2 text-[12px] leading-relaxed text-ink outline-none"
          aria-label="今天的日常"
        />
      ) : (
        <div className="mt-3 flex h-[92px] flex-col items-center justify-center rounded-2xl bg-white/75">
          <button
            type="button"
            className={`flex h-12 w-12 items-center justify-center rounded-full text-[11px] text-white ${voice === 'recording' ? 'scale-110 bg-[#c46a5a]' : 'bg-accent'}`}
            onPointerDown={onVoiceDown}
            onPointerUp={onVoiceUp}
            onPointerCancel={onVoiceUp}
            onContextMenu={(event) => event.preventDefault()}
            aria-label="按住说话"
          >
            {voice === 'recording' ? '•••' : '说'}
          </button>
          <p className="mt-2 text-[10px] text-clay">
            {voice === 'recording' && '松开完成 · 上滑取消'}
            {voice === 'saved' && '语音记录已留下'}
            {voice === 'short' && '说话时间太短，再按久一点'}
            {voice === 'idle' && '按住说话，松开后保存'}
          </p>
        </div>
      )}

      <div className="mt-3 flex gap-1.5">
        {moods.map((mood) => (
          <button
            key={mood.id}
            type="button"
            className={`flex-1 rounded-full py-1 text-[10px] ${moodId === mood.id ? 'text-white' : 'bg-white/80 text-clay'}`}
            style={moodId === mood.id ? { background: mood.color } : undefined}
            onClick={() => onMood(mood.id)}
          >
            {mood.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="mt-3 flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-2 text-left text-[11px] text-clay"
        onClick={onPhoto}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-peach text-accent">
          {photoOn ? '✓' : '+'}
        </span>
        {photoOn ? '已放入一张窗边的照片' : '添加照片 · 相册或拍摄'}
      </button>
      <p className="mt-auto pb-2 text-center text-[10px] text-clay/80">
        切到「我的岛屿」，天空会跟着心情变
      </p>
    </div>
  )
}

function InsightsScreen({ moodId }: { moodId: MoodId }) {
  const mood = moodById[moodId]
  const week = ['一', '二', '三', '四', '五', '六', '日']
  return (
    <div className="h-full space-y-2.5 overflow-y-auto px-3.5 pt-1 pb-2">
      <p className="text-[15px] font-semibold text-ink">这一周的光</p>
      <div className="rounded-2xl bg-white/80 p-3">
        <div className="flex justify-between">
          {week.map((day, index) => (
            <div key={day} className="flex flex-col items-center gap-1">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  background: index === 6 ? mood.color : '#e7d3c0',
                  opacity: 0.45 + (index % 4) * 0.15,
                }}
              />
              <span className="text-[9px] text-clay">{day}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-ink">
          今天停在「{mood.label}」。小星没有把它当成需要改正的分数。
        </p>
      </div>
      <div className="rounded-2xl bg-white/80 p-3">
        <p className="text-[10px] text-clay">本周总结</p>
        <p className="mt-1 text-[12px] leading-relaxed text-ink">
          学习岛的灯亮得更久。有一句关于家人的话，被安放在生活岛的窗边。
        </p>
      </div>
      <div className="rounded-2xl border border-dashed border-[#e4d3c4] bg-white/50 p-3">
        <p className="text-[10px] text-accent">去年今天</p>
        <p className="mt-1 text-[12px] leading-relaxed text-ink">
          「第一次自己煮面，有点咸，但是热的。」
        </p>
      </div>
    </div>
  )
}

function MoreScreen() {
  const rows = [
    ['我的等级', '世界长高的痕迹'],
    ['日常提醒', '轻轻敲一下，不追问'],
    ['陪伴形象', '站在岛上的那个人'],
    ['星屿会员', '更多岛、照片与语音'],
    ['应用说明', '隐私与协议'],
  ]
  return (
    <div className="h-full px-3.5 pt-1">
      <p className="text-[15px] font-semibold text-ink">更多</p>
      <div className="mt-3 space-y-1.5">
        {rows.map(([title, hint]) => (
          <div key={title} className="flex items-center justify-between rounded-2xl bg-white/80 px-3 py-2.5">
            <span>
              <span className="block text-[12px] font-medium text-ink">{title}</span>
              <span className="block text-[10px] text-clay">{hint}</span>
            </span>
            <span className="text-clay/60">›</span>
          </div>
        ))}
      </div>
    </div>
  )
}
