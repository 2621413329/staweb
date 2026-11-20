import { companionById, formatDayOffset, levelTitle } from '../data/showcase'
import { useDemo } from './demo-context'
import { Glass, IslandGlyph, MoodFace, ProgressBar } from './phone-ui'

export default function IslandScreen() {
  const { state, openComposer, openSheet, setScreen } = useDemo()
  const companion = companionById(state.companionId)
  const featured = state.islands.filter((island) => island.featured && island.id !== 'home')
  const home = state.islands.find((island) => island.id === 'home')!
  const recent = state.stories.slice(0, 3)

  return (
    <div className="space-y-3 px-3.5 pb-4 pt-2">
      <Glass className="px-3.5 py-3">
        <div className="flex items-center gap-3">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-2xl text-lg"
            style={{ background: companion.hue }}
            aria-hidden="true"
          >
            {companion.name.slice(1, 2)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-[#3d3229]">
              {companion.name} · {state.nickname}
            </p>
            <p className="mt-0.5 text-[11px] text-[#8c7b6b]">
              Lv.{state.level} {levelTitle(state.level)} · 晴 22°
            </p>
          </div>
          <button
            type="button"
            onClick={() => openSheet({ type: 'level' })}
            className="rounded-full bg-[#5a9a6e]/10 px-2.5 py-1 text-[11px] font-semibold text-[#3f7a52]"
          >
            {state.xp}/{800}
          </button>
        </div>
        <div className="mt-2.5">
          <ProgressBar value={(state.xp / 800) * 100} color="#5A9A6E" />
        </div>
      </Glass>

      {state.line && (
        <div className="rounded-2xl bg-[#3d3229] px-3.5 py-2.5 text-[12px] leading-relaxed text-[#f6f1e8]">
          {companion.name}：{state.line}
        </div>
      )}

      <Glass className="relative overflow-hidden px-2 pb-3 pt-2">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(90,154,110,0.16),transparent_62%)]" />
        <div className="relative grid grid-cols-3 items-end justify-items-center">
          <IslandSpot island={featured[0]} flashId={state.flashIslandId} onOpen={openSheet} />
          <span />
          <IslandSpot island={featured[1]} flashId={state.flashIslandId} onOpen={openSheet} />
          <span />
          <button
            type="button"
            onClick={() => openSheet({ type: 'island', id: 'home' })}
            className="z-10 text-center"
          >
            <span className={state.flashIslandId === 'home' ? 'block animate-pulse' : 'block'}>
              <IslandGlyph color={home.color} progress={home.progress} large />
            </span>
            <span className="inline-block rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-semibold text-[#3d3229]">
              {home.name}
            </span>
          </button>
          <span />
          <span />
          <IslandSpot island={featured[2]} flashId={state.flashIslandId} onOpen={openSheet} />
          <span />
        </div>
        <button
          type="button"
          onClick={() => openSheet({ type: 'islands' })}
          className="relative mx-auto mt-1 block rounded-full border border-[#3d3229]/10 bg-white/80 px-3 py-1 text-[11px] font-medium text-[#6d5e52]"
        >
          全部小岛
        </button>
      </Glass>

      <button type="button" onClick={openComposer} className="block w-full text-left">
        <Glass className="px-3.5 py-3 transition hover:bg-white">
          <p className="text-[13px] font-semibold text-[#3d3229]">
            今天，有没有一个你想留住的瞬间？
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-[#8c7b6b]">
            不必是大事。一行也可以。
          </p>
          <span className="mt-2 inline-flex rounded-full bg-[#5a9a6e] px-3 py-1 text-[11px] font-semibold text-white">
            写下今天
          </span>
        </Glass>
      </button>

      <div>
        <div className="mb-1.5 flex items-center justify-between px-1">
          <p className="text-[12px] font-semibold text-[#3d3229]">最近安放</p>
          <button
            type="button"
            onClick={() => setScreen('today')}
            className="text-[11px] text-[#4a8fb8]"
          >
            今日日常
          </button>
        </div>
        <div className="space-y-2">
          {recent.map((story) => {
            const island = state.islands.find((item) => item.id === story.islandId)
            return (
              <button
                key={story.id}
                type="button"
                onClick={() => openSheet({ type: 'island', id: story.islandId })}
                className="block w-full text-left"
              >
                <Glass className="flex items-start gap-2.5 px-3 py-2.5">
                  <MoodFace mood={story.mood} size={28} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12px] leading-relaxed text-[#3d3229]">
                      {story.text}
                    </span>
                    <span className="mt-1 block text-[10px] text-[#8c7b6b]">
                      {formatDayOffset(story.dayOffset)} · {island?.name}
                      {story.photo ? ' · 照片' : ''}
                      {story.voice ? ' · 语音' : ''}
                    </span>
                  </span>
                </Glass>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function IslandSpot({
  island,
  flashId,
  onOpen,
}: {
  island?: { id: string; name: string; color: string; progress: number; unlocked: boolean }
  flashId: string | null
  onOpen: (sheet: { type: 'island'; id: string }) => void
}) {
  if (!island) return null
  return (
    <button
      type="button"
      onClick={() => onOpen({ type: 'island', id: island.id })}
      className="text-center"
    >
      <span className={flashId === island.id ? 'block animate-pulse' : 'block'}>
        <IslandGlyph color={island.color} progress={island.progress} locked={!island.unlocked} />
      </span>
      <span className="inline-block rounded-full bg-[#3d3229]/75 px-2 py-0.5 text-[10px] font-medium text-white">
        {island.unlocked ? island.name : `${island.name} · 未亮`}
      </span>
    </button>
  )
}
