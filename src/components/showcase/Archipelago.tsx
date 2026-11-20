import { useState } from 'react'
import { lifeIslands } from '../../data/product'

export default function Archipelago() {
  const [activeId, setActiveId] = useState(lifeIslands[3].id)
  const active = lifeIslands.find((island) => island.id === activeId) ?? lifeIslands[0]

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.7fr)]">
      <div className="relative h-[460px] overflow-hidden rounded-[1.8rem] border border-line bg-[linear-gradient(180deg,_#f7efe6_0%,_#e7f0f6_100%)] sm:h-[520px]">
        <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden="true">
          {lifeIslands.slice(1).map((island, index) => {
            const prev = lifeIslands[index]
            return (
              <line
                key={island.id}
                x1={`${prev.x}%`}
                y1={`${prev.y}%`}
                x2={`${island.x}%`}
                y2={`${island.y}%`}
                stroke="#c4b2a2"
                strokeDasharray="4 7"
              />
            )
          })}
        </svg>
        {lifeIslands.map((island) => {
          const selected = island.id === activeId
          return (
            <button
              key={island.id}
              type="button"
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${island.x}%`, top: `${island.y}%` }}
              onClick={() => setActiveId(island.id)}
              aria-pressed={selected}
            >
              <span className="flex flex-col items-center">
                <span
                  className={`block rounded-[50%] transition ${selected ? 'h-11 w-16' : 'h-7 w-11'}`}
                  style={{
                    background: `radial-gradient(circle at 50% 35%, #fff, ${island.tint})`,
                    boxShadow: selected ? `0 10px 24px -12px ${island.tint}` : undefined,
                  }}
                />
                <span className={`mt-1 whitespace-nowrap text-[11px] ${selected ? 'font-semibold text-ink' : 'text-clay'}`}>
                  {island.name}
                </span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="rounded-[1.8rem] border border-line bg-card p-6 sm:p-8">
        <p className="text-xs tracking-[0.16em] text-accent">故事会自己找到位置</p>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight text-ink">{active.name}</h3>
        <p className="mt-4 text-sm leading-7 text-clay">{active.line}</p>
        <p className="mt-6 text-sm leading-7 text-ink">
          你不用先选好分类再生活。说出今天，星屿负责安放。学习、健康、工作、关系、情绪，都是同一片可以回去的地方。
        </p>
      </div>
    </div>
  )
}
