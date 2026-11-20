import { companionById, companions, levelTitle } from '../data/showcase'
import { useDemo } from './demo-context'
import { IslandGlyph, ProgressBar } from './phone-ui'

export default function Sheets() {
  const { state, closeSheet, setCompanion, setReminderTime } = useDemo()
  const sheet = state.sheet
  if (!sheet) return null

  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end bg-[#3d3229]/25">
      <button type="button" className="flex-1" aria-label="关闭" onClick={closeSheet} />
      <div className="phone-scroll max-h-[78%] overflow-y-auto rounded-t-3xl bg-[#fbf7f2] px-4 pb-5 pt-3 shadow-2xl">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#3d3229]/15" />
        {sheet.type === 'island' && <IslandSheet id={sheet.id} />}
        {sheet.type === 'islands' && <IslandList />}
        {sheet.type === 'member' && <MemberSheet />}
        {sheet.type === 'level' && (
          <div>
            <p className="text-[16px] font-semibold text-[#3d3229]">
              Lv.{state.level} {levelTitle(state.level)}
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-[#8c7b6b]">
              等级跟着真实记录走。它不是成绩单，只是世界长大时的刻度。
            </p>
            <div className="mt-3">
              <ProgressBar value={(state.xp / 800) * 100} color="#5A9A6E" />
              <p className="mt-1 text-[11px] text-[#8c7b6b]">
                距离下一级还差 {800 - state.xp} 点成长
              </p>
            </div>
          </div>
        )}
        {sheet.type === 'companion' && (
          <div className="space-y-2">
            <p className="text-[16px] font-semibold text-[#3d3229]">成长伙伴</p>
            {companions.map((item) => {
              const on = state.companionId === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setCompanion(item.id)
                    closeSheet()
                  }}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left ${
                    on ? 'bg-white ring-1 ring-[#5a9a6e]' : 'bg-white/70'
                  }`}
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-semibold text-[#3d3229]"
                    style={{ background: item.hue }}
                  >
                    {item.name.slice(1, 2)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-semibold text-[#3d3229]">
                      {item.name}
                      {item.premium ? ' · 会员' : ''}
                    </span>
                    <span className="mt-0.5 block text-[11px] leading-relaxed text-[#8c7b6b]">
                      {item.tagline}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        )}
        {sheet.type === 'reminder' && (
          <ReminderSheet id={sheet.id} onTime={setReminderTime} />
        )}
      </div>
    </div>
  )
}

function IslandSheet({ id }: { id: string }) {
  const { state } = useDemo()
  const island = state.islands.find((item) => item.id === id)
  if (!island) return null
  const stories = state.stories.filter((story) =>
    island.id === 'home' ? true : story.islandId === island.id,
  )
  const companion = companionById(state.companionId)

  return (
    <div>
      <div className="flex items-center gap-3">
        <IslandGlyph
          color={island.color}
          progress={island.progress}
          locked={!island.unlocked}
          large
        />
        <div>
          <p className="text-[16px] font-semibold text-[#3d3229]">{island.name}</p>
          <p className="mt-1 text-[12px] leading-relaxed text-[#8c7b6b]">
            {island.unlocked && stories.length > 0
              ? `这里安放了 ${island.id === 'home' ? state.stories.length : stories.length} 段日常。`
              : island.blurb}
          </p>
        </div>
      </div>
      <div className="mt-3">
        <ProgressBar value={island.progress} color={island.unlocked ? island.color : '#C4BFB6'} />
        <p className="mt-1 text-[11px] text-[#8c7b6b]">
          {island.unlocked ? `繁茂 ${island.progress}%` : '写下第一段故事后亮起'}
        </p>
      </div>
      <div className="mt-3 space-y-2">
        {stories.length === 0 && (
          <p className="text-[12px] text-[#8c7b6b]">
            {companion.name}还在等你把生活放到这里。
          </p>
        )}
        {stories.slice(0, 4).map((story) => (
          <p key={story.id} className="text-[12px] leading-relaxed text-[#3d3229]">
            {story.text}
          </p>
        ))}
      </div>
    </div>
  )
}

function IslandList() {
  const { state, openSheet } = useDemo()
  return (
    <div className="space-y-2">
      <p className="text-[16px] font-semibold text-[#3d3229]">全部小岛</p>
      {state.islands
        .filter((island) => island.id !== 'home')
        .map((island) => (
          <button
            key={island.id}
            type="button"
            onClick={() => openSheet({ type: 'island', id: island.id })}
            className="flex w-full items-center gap-2 rounded-2xl bg-white px-2 py-1.5 text-left"
          >
            <IslandGlyph color={island.color} progress={island.progress} locked={!island.unlocked} />
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-semibold text-[#3d3229]">
                {island.name}
                {!island.unlocked ? ' · 未亮' : ''}
              </span>
              <span className="block text-[11px] text-[#8c7b6b]">{island.blurb}</span>
            </span>
          </button>
        ))}
    </div>
  )
}

function MemberSheet() {
  const plans = [
    ['月卡', '1 个月'],
    ['季卡', '3 个月'],
    ['年卡', '12 个月'],
  ]
  return (
    <div>
      <p className="text-[16px] font-semibold text-[#3d3229]">星屿会员</p>
      <p className="mt-1 text-[12px] leading-relaxed text-[#8c7b6b]">
        开通后可以使用成长统计、AI 心情总结、照片与语音记录、更多伙伴对话、更多小岛数量。价格以 App Store 展示为准，订阅会自动续费，可在 Apple ID 的订阅里取消。
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {plans.map(([title, period]) => (
          <div key={title} className="rounded-2xl bg-white px-2 py-3 text-center">
            <p className="text-[13px] font-semibold text-[#3d3229]">{title}</p>
            <p className="mt-1 text-[11px] text-[#8c7b6b]">{period}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReminderSheet({
  id,
  onTime,
}: {
  id: string
  onTime: (id: string, time: string) => void
}) {
  const { state } = useDemo()
  const reminder = state.reminders.find((item) => item.id === id)
  if (!reminder) return null
  const [hourText, minuteText] = reminder.time.split(':')
  const hour = Number(hourText)
  const minute = Number(minuteText)

  const set = (nextHour: number, nextMinute: number) => {
    const h = (nextHour + 24) % 24
    const m = (nextMinute + 60) % 60
    onTime(id, `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
  }

  return (
    <div>
      <p className="text-[16px] font-semibold text-[#3d3229]">{reminder.title}</p>
      <p className="mt-1 text-[12px] text-[#8c7b6b]">{reminder.note}</p>
      <div className="mt-4 flex items-center justify-center gap-3">
        <Stepper label="小时" value={hour} onUp={() => set(hour + 1, minute)} onDown={() => set(hour - 1, minute)} />
        <span className="text-2xl font-semibold text-[#3d3229]">:</span>
        <Stepper
          label="分钟"
          value={minute}
          onUp={() => set(hour, minute + 5)}
          onDown={() => set(hour, minute - 5)}
        />
      </div>
      <p className="mt-3 text-center text-[11px] leading-relaxed text-[#8c7b6b]">
        只在你设定的时间轻轻敲一下。预览不会真的发送系统通知。
      </p>
    </div>
  )
}

function Stepper({
  label,
  value,
  onUp,
  onDown,
}: {
  label: string
  value: number
  onUp: () => void
  onDown: () => void
}) {
  return (
    <div className="text-center">
      <button type="button" onClick={onUp} className="h-8 w-14 rounded-xl bg-white text-[#3d3229]" aria-label={`${label}增加`}>
        +
      </button>
      <p className="my-1 text-[22px] font-semibold tabular-nums text-[#3d3229]">
        {String(value).padStart(2, '0')}
      </p>
      <button type="button" onClick={onDown} className="h-8 w-14 rounded-xl bg-white text-[#3d3229]" aria-label={`${label}减少`}>
        −
      </button>
    </div>
  )
}
