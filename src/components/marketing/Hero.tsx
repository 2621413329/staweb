import { useState } from 'react'
import { Link } from 'react-router-dom'
import WorldStage from './WorldStage'
import { companionById, islandById, studioSeeds, type CompanionId, type IslandId } from '../../data/showcase'

interface HeroProps {
  companionId: CompanionId
}

export default function Hero({ companionId }: HeroProps) {
  const companion = companionById(companionId)
  const [activeId, setActiveId] = useState<IslandId>('life')
  const island = islandById(activeId)
  const speech = activeId === 'life' ? `${companion.name}：${companion.greeting}` : `${island.name}：${island.sample}`

  return (
    <section id="world" className="scroll-mt-24 relative overflow-hidden px-5 pb-8 pt-28 sm:px-8 sm:pb-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#fff,transparent_52%),radial-gradient(ellipse_at_85%_0%,#d7ecff,transparent_36%),linear-gradient(#fbf6f0,#f4f7fb)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div>
          <p className="text-sm font-medium tracking-[0.18em] text-peachdeep">星屿 · 成长小岛</p>
          <h1 className="mt-4 font-display text-[clamp(2.15rem,3.15vw,3.35rem)] leading-[1.22] text-ink">
            <span className="block">把看不见的人生</span>
            <span className="block">变成可以回去的世界</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist">
            写下今天的故事。{companion.name}会把它安放到对应的岛上。灯、树和屋子，会跟着真实的一天慢慢长出来。
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#record" className="jelly-btn inline-flex h-12 items-center rounded-full px-6 text-sm font-semibold text-white">
              先写下一句
            </a>
            <Link
              to="/download"
              className="inline-flex h-12 items-center rounded-full border border-ink/10 bg-white px-6 text-sm font-semibold text-ink shadow-soft"
            >
              下载安装
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2 text-xs text-mist">
            {['文字 · 语音 · 照片 · 心情', '六座会生长的岛', '四位成长伙伴'].map((item) => (
              <li key={item} className="rounded-full bg-white/80 px-3 py-1.5 shadow-soft">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <WorldStage
          companionId={companionId}
          stories={studioSeeds}
          speech={speech}
          activeId={activeId}
          onIsland={setActiveId}
          parallax
          className="h-[460px] sm:h-[540px]"
          hud={
            <div className="absolute right-3 top-3 z-20 whitespace-nowrap rounded-2xl bg-white/80 px-3 py-2 text-xs text-ink shadow-soft backdrop-blur-md">
              <p>{companion.name} · ☀ 平静</p>
              <p className="text-mist">晴 · 22°</p>
            </div>
          }
        />
      </div>
    </section>
  )
}
