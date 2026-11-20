import { companionById, levelTitle } from '../data/showcase'
import { useDemo } from './demo-context'
import { Glass } from './phone-ui'

export default function MoreScreen() {
  const {
    state,
    openSheet,
    setNickname,
    toggleReminder,
    toggleMusic,
    toggleSfx,
  } = useDemo()
  const companion = companionById(state.companionId)
  const days = ['一', '二', '三', '四', '五', '六', '日']
  const today = new Date().getDay()
  const mondayIndex = today === 0 ? 6 : today - 1

  return (
    <div className="space-y-2.5 px-3.5 pb-4 pt-2">
      <p className="text-[17px] font-semibold text-[#3d3229]">更多</p>

      <Glass className="px-3.5 py-3">
        <p className="text-[11px] text-[#8c7b6b]">本周留下过故事的日子</p>
        <div className="mt-2 grid grid-cols-7 gap-1">
          {days.map((label, index) => {
            const offset = mondayIndex - index
            const hit =
              offset >= 0 && state.stories.some((story) => story.dayOffset === offset)
            return (
              <div key={label} className="text-center">
                <span
                  className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full text-[10px] ${
                    hit ? 'bg-[#5a9a6e] text-white' : 'bg-[#3d3229]/5 text-[#8c7b6b]'
                  }`}
                >
                  {label}
                </span>
              </div>
            )
          })}
        </div>
      </Glass>

      <Glass className="px-3.5 py-3">
        <label className="block text-[11px] text-[#8c7b6b]" htmlFor="nickname">
          我的昵称
        </label>
        <input
          id="nickname"
          value={state.nickname}
          onChange={(event) => setNickname(event.target.value)}
          className="mt-1 w-full bg-transparent text-[14px] font-semibold text-[#3d3229] outline-none"
        />
      </Glass>

      <Row
        title="星屿会员"
        subtitle="成长统计、心情总结、照片与语音、更多小岛"
        onClick={() => openSheet({ type: 'member' })}
      />
      <Row
        title="我的等级"
        subtitle={`成长等级：Lv.${state.level} ${levelTitle(state.level)}`}
        onClick={() => openSheet({ type: 'level' })}
      />
      <Row
        title={`成长伙伴${companion.name}`}
        subtitle={companion.premium ? '会员伙伴 · 预览里也可以听听语气' : '你的成长小伙伴'}
        onClick={() => openSheet({ type: 'companion' })}
      />

      <Glass className="divide-y divide-[#3d3229]/10 px-3.5">
        {state.reminders.map((reminder) => (
          <div key={reminder.id} className="flex items-center gap-2 py-2.5">
            <button
              type="button"
              onClick={() => openSheet({ type: 'reminder', id: reminder.id })}
              className="min-w-0 flex-1 text-left"
            >
              <span className="block text-[13px] font-medium text-[#3d3229]">
                {reminder.title}
              </span>
              <span className="block text-[11px] text-[#8c7b6b]">
                {reminder.time} · {reminder.note}
              </span>
            </button>
            <button
              type="button"
              role="switch"
              aria-checked={reminder.enabled}
              onClick={() => toggleReminder(reminder.id)}
              className={`h-6 w-11 rounded-full p-0.5 transition ${
                reminder.enabled ? 'bg-[#5a9a6e]' : 'bg-[#3d3229]/15'
              }`}
            >
              <span
                className={`block h-5 w-5 rounded-full bg-white transition ${
                  reminder.enabled ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>
        ))}
      </Glass>

      <Glass className="divide-y divide-[#3d3229]/10 px-3.5">
        <Toggle label="岛屿音乐" on={state.musicOn} onClick={toggleMusic} />
        <Toggle label="操作音效" on={state.sfxOn} onClick={toggleSfx} />
      </Glass>
    </div>
  )
}

function Row({
  title,
  subtitle,
  onClick,
}: {
  title: string
  subtitle: string
  onClick: () => void
}) {
  return (
    <button type="button" onClick={onClick} className="block w-full text-left">
      <Glass className="flex items-center gap-2 px-3.5 py-3">
        <span className="min-w-0 flex-1">
          <span className="block text-[13px] font-semibold text-[#3d3229]">{title}</span>
          <span className="mt-0.5 block text-[11px] leading-relaxed text-[#8c7b6b]">{subtitle}</span>
        </span>
        <span className="text-[#c4b8ab]" aria-hidden="true">
          ›
        </span>
      </Glass>
    </button>
  )
}

function Toggle({
  label,
  on,
  onClick,
}: {
  label: string
  on: boolean
  onClick: () => void
}) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-[13px] text-[#3d3229]">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={onClick}
        className={`h-6 w-11 rounded-full p-0.5 ${on ? 'bg-[#5a9a6e]' : 'bg-[#3d3229]/15'}`}
      >
        <span className={`block h-5 w-5 rounded-full bg-white ${on ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  )
}
