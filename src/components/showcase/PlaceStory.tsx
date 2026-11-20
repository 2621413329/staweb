import { artFace, moods, prompts } from '../../showcase/model'
import { useWorld } from '../../showcase/WorldContext'

export default function PlaceStory({ compact = false }: { compact?: boolean }) {
  const world = useWorld()
  const past = world.era !== 'now'
  const choices = compact ? prompts.slice(0, 3) : prompts

  return (
    <div className={compact ? 'space-y-3' : 'space-y-4'}>
      <div>
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#c4845a]">
          今天的瞬间
        </p>
        <h3 className={`font-serif text-[#3d3229] ${compact ? 'mt-1 text-lg' : 'mt-1 text-2xl'}`}>
          有没有一个你想留住的瞬间？
        </h3>
      </div>

      <textarea
        id={compact ? 'story-input-phone' : 'story-input'}
        value={world.draft}
        disabled={past}
        onChange={(event) => world.setDraft(event.target.value)}
        rows={compact ? 3 : 4}
        placeholder="不必是大事。一行也可以。"
        className="w-full resize-none rounded-2xl border border-[#eadfd4] bg-white/80 px-3.5 py-3 text-sm leading-relaxed text-[#3d3229] outline-none placeholder:text-[#b3a496] focus:border-[#e8a87c] disabled:opacity-60"
      />

      <div className="flex flex-wrap gap-1.5">
        {choices.map((prompt) => (
          <button
            key={prompt.text}
            type="button"
            disabled={past}
            onClick={() => {
              world.setDraft(prompt.text)
              world.setMood(prompt.mood)
            }}
            className="rounded-full bg-[#fff1e4] px-2.5 py-1 text-left text-[11px] text-[#6b5b4e] transition hover:bg-[#ffe4cf] disabled:opacity-50"
          >
            {prompt.text}
          </button>
        ))}
      </div>

      <div>
        <p className="mb-1.5 text-[11px] text-[#8c7b6b]">心情会立刻改变天空和伙伴</p>
        <div className="flex flex-wrap gap-1.5">
          {moods.map((item) => {
            const active = world.mood === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => world.setMood(item.id)}
                className={`flex items-center gap-1 rounded-full border px-1.5 py-1 pr-2 text-[11px] ${
                  active
                    ? 'border-[#e8a87c] bg-[#ffe3cc] shadow-sm'
                    : 'border-transparent bg-[#fff1e4]'
                }`}
                aria-pressed={active}
              >
                <img
                  src={artFace(world.companionId, item.id)}
                  alt=""
                  className="h-6 w-6 object-contain"
                />
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={past}
          onClick={() => world.setAttachVoice(!world.attachVoice)}
          className={`rounded-full px-3 py-1.5 text-xs ${
            world.attachVoice ? 'bg-[#3d3229] text-white' : 'bg-white text-[#5c4e44] ring-1 ring-[#eadfd4]'
          }`}
          aria-pressed={world.attachVoice}
        >
          语音
        </button>
        <button
          type="button"
          disabled={past}
          onClick={() => world.setAttachPhoto(!world.attachPhoto)}
          className={`rounded-full px-3 py-1.5 text-xs ${
            world.attachPhoto ? 'bg-[#3d3229] text-white' : 'bg-white text-[#5c4e44] ring-1 ring-[#eadfd4]'
          }`}
          aria-pressed={world.attachPhoto}
        >
          照片
        </button>
        <button
          type="button"
          onClick={() => world.placeStory()}
          className="ml-auto rounded-full bg-[#e8a87c] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(232,168,124,0.45)] transition hover:bg-[#dfa06c]"
        >
          安放到岛上
        </button>
      </div>
      {past && (
        <p className="text-xs text-[#8c7b6b]">正在回看过去。回到「此刻」后，才能安放今天。</p>
      )}
    </div>
  )
}
