import { companionById, emotionById, emotions, formatDayOffset, storySamples } from '../data/showcase'
import { useDemo } from './demo-context'
import { Glass, MoodFace } from './phone-ui'

export default function TodayScreen() {
  const { state, openComposer } = useDemo()
  const today = state.stories.filter((story) => story.dayOffset === 0)

  return (
    <div className="relative min-h-full px-3.5 pb-4 pt-2">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <p className="text-[17px] font-semibold text-[#3d3229]">今日日常</p>
          <p className="text-[11px] text-[#8c7b6b]">记录今天值得记住的一件事</p>
        </div>
        <button
          type="button"
          onClick={openComposer}
          className="rounded-full bg-[#5a9a6e] px-3 py-1.5 text-[12px] font-semibold text-white"
        >
          写一句
        </button>
      </div>

      {today.length === 0 && (
        <Glass className="mb-3 px-3.5 py-4 text-center">
          <p className="text-[13px] text-[#3d3229]">你的世界还在等今天的第一个瞬间。</p>
          <button
            type="button"
            onClick={openComposer}
            className="mt-3 text-[12px] font-semibold text-[#3f7a52]"
          >
            开始记录
          </button>
        </Glass>
      )}

      <div className="space-y-2">
        {state.stories.map((story) => {
          const island = state.islands.find((item) => item.id === story.islandId)
          return (
            <Glass key={story.id} className="px-3 py-2.5">
              <div className="flex items-center gap-2">
                <MoodFace mood={story.mood} size={26} />
                <p className="text-[11px] text-[#8c7b6b]">
                  {formatDayOffset(story.dayOffset)} · {emotionById(story.mood).label}
                  {story.mine ? ' · 刚刚写下' : ''}
                </p>
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#3d3229]">{story.text}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {story.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#5a9a6e]/10 px-2 py-0.5 text-[10px] text-[#3f7a52]"
                  >
                    {tag}
                  </span>
                ))}
                <span className="rounded-full bg-[#4a8fb8]/10 px-2 py-0.5 text-[10px] text-[#3d6f90]">
                  {island?.name}
                </span>
                {story.photo && (
                  <span className="rounded-full bg-[#d4a574]/20 px-2 py-0.5 text-[10px] text-[#8c6b4f]">
                    照片
                  </span>
                )}
                {story.voice && (
                  <span className="rounded-full bg-[#7e6db7]/10 px-2 py-0.5 text-[10px] text-[#5d4e8f]">
                    语音
                  </span>
                )}
              </div>
            </Glass>
          )
        })}
      </div>

    </div>
  )
}

export function Composer() {
  const {
    state,
    closeComposer,
    setText,
    setMood,
    togglePhoto,
    toggleVoice,
    toggleTag,
    setIsland,
    analyze,
    placeStory,
  } = useDemo()
  const composer = state.composer
  const companion = companionById(state.companionId)
  const storyIslands = state.islands.filter((island) => island.id !== 'home')

  return (
    <div className="absolute inset-0 z-20 flex flex-col bg-[#f6f1e8]/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-3.5 py-2.5">
        <button type="button" onClick={closeComposer} className="text-[12px] text-[#8c7b6b]">
          关闭
        </button>
        <p className="text-[13px] font-semibold text-[#3d3229]">今天发生了什么？</p>
        <span className="w-8" />
      </div>

      <div className="phone-scroll flex-1 space-y-3 overflow-y-auto px-3.5 pb-4">
        <div className="grid grid-cols-4 gap-1.5">
          {emotions.map((emotion) => {
            const active = composer.mood === emotion.id
            return (
              <button
                key={emotion.id}
                type="button"
                onClick={() => setMood(emotion.id)}
                className={`flex flex-col items-center gap-1 rounded-2xl border py-1.5 ${
                  active ? 'border-[#3d3229]/30 bg-white' : 'border-transparent bg-white/40'
                }`}
              >
                <span
                  className="block h-6 w-6 rounded-full"
                  style={{ background: emotion.color }}
                  aria-hidden="true"
                />
                <span className="text-[10px] text-[#3d3229]">{emotion.label}</span>
              </button>
            )
          })}
        </div>

        <textarea
          value={composer.text}
          onChange={(event) => setText(event.target.value)}
          rows={4}
          placeholder="有什么值得留下来？"
          disabled={composer.step !== 'edit'}
          className="w-full resize-none rounded-2xl border border-[#3d3229]/10 bg-white px-3 py-2.5 text-[13px] leading-relaxed text-[#3d3229] outline-none placeholder:text-[#b3a496] focus:border-[#5a9a6e]"
        />

        {composer.step === 'edit' && (
          <div className="flex flex-wrap gap-1.5">
            {storySamples.map((sample) => (
              <button
                key={sample.text}
                type="button"
                onClick={() => {
                  setText(sample.text)
                  setMood(sample.mood)
                }}
                className="rounded-full bg-white px-2.5 py-1 text-left text-[10px] text-[#6d5e52] ring-1 ring-[#3d3229]/10"
              >
                {sample.text.slice(0, 16)}…
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={togglePhoto}
            className={`rounded-2xl px-3 py-2 text-left text-[12px] ${
              composer.photo ? 'bg-[#d4a574] text-white' : 'bg-white text-[#3d3229] ring-1 ring-[#3d3229]/10'
            }`}
          >
            <span className="block font-semibold">照片</span>
            <span className={`block text-[10px] ${composer.photo ? 'text-white/80' : 'text-[#8c7b6b]'}`}>
              {composer.photo ? '会跟着故事一起安放' : '演示一张想留下的画面'}
            </span>
          </button>
          <button
            type="button"
            onClick={toggleVoice}
            className={`rounded-2xl px-3 py-2 text-left text-[12px] ${
              composer.voice ? 'bg-[#7e6db7] text-white' : 'bg-white text-[#3d3229] ring-1 ring-[#3d3229]/10'
            }`}
          >
            <span className="block font-semibold">语音</span>
            <span className={`block text-[10px] ${composer.voice ? 'text-white/80' : 'text-[#8c7b6b]'}`}>
              {composer.voice ? '00:08 · 演示片段' : '按住说话的感觉'}
            </span>
          </button>
        </div>

        {composer.voice && (
          <div className="flex h-8 items-end gap-1 px-1" aria-hidden="true">
            {[8, 16, 12, 22, 10, 18, 14, 20, 9, 15, 11, 19].map((height, index) => (
              <span
                key={index}
                className="w-1.5 rounded-full bg-[#7e6db7]/70 motion-safe:animate-pulse"
                style={{ height, animationDelay: `${index * 80}ms` }}
              />
            ))}
          </div>
        )}

        {composer.step === 'analyzing' && (
          <Glass className="px-3.5 py-3 text-[12px] text-[#3d3229]">
            {companion.name}正在理解你的日常…
          </Glass>
        )}

        {composer.step === 'review' && (
          <Glass className="space-y-3 px-3.5 py-3">
            <p className="text-[12px] leading-relaxed text-[#3d3229]">
              {companion.name}读到的感受是「{emotionById(composer.mood).label}」。标签可以改，小岛也可以换。
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['学习', '运动', '家人', '朋友', '兴趣', '日常'].map((tag) => {
                const on = composer.tags.includes(tag)
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full px-2.5 py-1 text-[11px] ${
                      on ? 'bg-[#5a9a6e] text-white' : 'bg-[#3d3229]/5 text-[#6d5e52]'
                    }`}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {storyIslands.map((island) => {
                const on = composer.islandId === island.id
                return (
                  <button
                    key={island.id}
                    type="button"
                    onClick={() => setIsland(island.id)}
                    className={`rounded-xl px-2 py-1.5 text-left text-[11px] ${
                      on ? 'bg-[#3d3229] text-white' : 'bg-[#3d3229]/5 text-[#3d3229]'
                    }`}
                  >
                    {island.name}
                    {!island.unlocked ? ' · 未亮' : ''}
                  </button>
                )
              })}
            </div>
          </Glass>
        )}
      </div>

      <div className="border-t border-[#3d3229]/10 px-3.5 py-3">
        {composer.step === 'review' ? (
          <button
            type="button"
            onClick={placeStory}
            className="w-full rounded-2xl bg-[#5a9a6e] py-2.5 text-[13px] font-semibold text-white"
          >
            安放到{state.islands.find((island) => island.id === composer.islandId)?.name}
          </button>
        ) : (
          <button
            type="button"
            onClick={analyze}
            disabled={!composer.text.trim() || composer.step === 'analyzing'}
            className="w-full rounded-2xl bg-[#3d3229] py-2.5 text-[13px] font-semibold text-white disabled:opacity-40"
          >
            {composer.step === 'analyzing' ? '理解中…' : '记录并分析'}
          </button>
        )}
      </div>
    </div>
  )
}
