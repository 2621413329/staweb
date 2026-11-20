import {
  emotionById,
  emotions,
  storiesInRange,
  topCount,
  type InsightRange,
} from '../data/showcase'
import { useDemo } from './demo-context'
import { Glass } from './phone-ui'

const ranges: { id: InsightRange; label: string }[] = [
  { id: '7', label: '近 7 天' },
  { id: '30', label: '近 30 天' },
  { id: 'all', label: '全部' },
]

export default function GrowthScreen() {
  const { state, setRange, setGrowthTab } = useDemo()
  const stories = storiesInRange(state.stories, state.range)
  const rangeLabel = ranges.find((item) => item.id === state.range)?.label ?? ''
  const moodCounts = emotions
    .map((emotion) => ({
      ...emotion,
      count: stories.filter((story) => story.mood === emotion.id).length,
    }))
    .filter((emotion) => emotion.count > 0)
  const maxMood = Math.max(1, ...moodCounts.map((emotion) => emotion.count))
  const tagMap = new Map<string, number>()
  for (const story of stories) {
    for (const tag of story.tags) tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1)
  }
  const tags = [...tagMap.entries()].sort((a, b) => b[1] - a[1])
  const moodTop = topCount(stories.map((story) => emotionById(story.mood).label))
  const tagTop = topCount(stories.flatMap((story) => story.tags))
  const islandTop = topCount(
    stories.map(
      (story) => state.islands.find((island) => island.id === story.islandId)?.name ?? '小岛',
    ),
  )

  const focus = [
    moodTop ? `「${moodTop.key}」出现得最多。` : '',
    tagTop ? `标签多半是「${tagTop.key}」。` : '',
    islandTop ? `它们主要安放在${islandTop.key}。` : '',
  ].join('')
  const observation =
    stories.length === 0
      ? `${rangeLabel}还没有故事。世界在等你的下一句。`
      : `${rangeLabel}你留下了 ${stories.length} 段日常。${
          focus || '心情和岛屿都还比较分散。'
        }星屿只把这些摊开，不给这段生活打分。`

  return (
    <div className="space-y-3 px-3.5 pb-4 pt-2">
      <div>
        <p className="text-[17px] font-semibold text-[#3d3229]">成长轨迹</p>
        <p className="text-[11px] text-[#8c7b6b]">心情、标签，和它们落在哪一座岛</p>
      </div>

      <div className="grid grid-cols-3 gap-1 rounded-full bg-white/70 p-1">
        {ranges.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setRange(item.id)}
            className={`rounded-full py-1.5 text-[11px] font-semibold ${
              state.range === item.id ? 'bg-[#3d3229] text-white' : 'text-[#6d5e52]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-1 rounded-2xl bg-white/50 p-1">
        {(
          [
            ['mood', '心情'],
            ['tag', '标签'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setGrowthTab(id)}
            className={`rounded-xl py-1.5 text-[12px] font-semibold ${
              state.growthTab === id ? 'bg-white text-[#3d3229] shadow-sm' : 'text-[#8c7b6b]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {state.growthTab === 'mood' ? (
        <Glass className="space-y-2.5 px-3.5 py-3">
          {moodCounts.length === 0 && (
            <p className="text-[12px] text-[#8c7b6b]">这段时间还没有心情记录。</p>
          )}
          {moodCounts.map((emotion) => (
            <div key={emotion.id} className="grid grid-cols-[3rem_1fr_1.5rem] items-center gap-2">
              <span className="text-[11px] text-[#3d3229]">{emotion.label}</span>
              <span className="h-2 overflow-hidden rounded-full bg-[#3d3229]/10">
                <span
                  className="block h-full rounded-full transition-[width] duration-500"
                  style={{
                    width: `${(emotion.count / maxMood) * 100}%`,
                    background: emotion.color,
                  }}
                />
              </span>
              <span className="text-right text-[11px] text-[#8c7b6b]">{emotion.count}</span>
            </div>
          ))}
        </Glass>
      ) : (
        <Glass className="px-3.5 py-3">
          {tags.length === 0 && <p className="text-[12px] text-[#8c7b6b]">还没有标签。</p>}
          <div className="flex flex-wrap gap-2">
            {tags.map(([tag, count]) => (
              <span
                key={tag}
                className="rounded-full bg-[#f6f1e8] px-2.5 py-1 text-[12px] text-[#3d3229]"
              >
                {tag}
                <span className="ml-1 text-[#8c7b6b]">{count}</span>
              </span>
            ))}
          </div>
        </Glass>
      )}

      <Glass className="px-3.5 py-3">
        <p className="text-[11px] font-semibold tracking-wide text-[#5a9a6e]">这段时间的观察</p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-[#3d3229]">{observation}</p>
      </Glass>
    </div>
  )
}
