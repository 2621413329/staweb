import { useCallback, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useTransform, type MotionValue } from 'framer-motion'
import CompanionArt from './CompanionArt'
import IslandArt from './IslandArt'
import {
  islandStage,
  islands,
  type CompanionId,
  type IslandId,
  type StoryCard,
} from '../../data/showcase'

interface WorldStageProps {
  companionId: CompanionId
  stories: StoryCard[]
  speech: string
  activeId?: IslandId | null
  previewId?: IslandId | null
  monument?: boolean
  parallax?: boolean
  hud?: ReactNode
  className?: string
  onIsland?: (id: IslandId) => void
}

export default function WorldStage({
  companionId,
  stories,
  speech,
  activeId,
  previewId,
  monument = false,
  parallax = false,
  hud,
  className = 'h-[480px]',
  onIsland,
}: WorldStageProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const onMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!parallax) return
      const rect = event.currentTarget.getBoundingClientRect()
      mouseX.set(((event.clientX - rect.left) / rect.width) * 2 - 1)
      mouseY.set(((event.clientY - rect.top) / rect.height) * 2 - 1)
    },
    [mouseX, mouseY, parallax],
  )

  return (
    <div
      className={`relative overflow-hidden rounded-[32px] bg-gradient-to-b from-[#eef6ff] via-[#d5ebff] to-[#8ec5ff] shadow-card ${className}`}
      onMouseMove={onMove}
    >
      <div className="pointer-events-none absolute -right-6 top-8 h-24 w-24 rounded-full bg-[#fff1c9] shadow-[0_0_50px_#ffe7a8]" />
      <div className="cloud-layer pointer-events-none absolute top-[8%] flex w-[200%] gap-16 opacity-80">
        {Array.from({ length: 8 }).map((_, index) => (
          <span
            key={index}
            className="mt-3 h-8 rounded-full bg-white/70 blur-md"
            style={{ width: 90 + (index % 3) * 36 }}
          />
        ))}
      </div>
      {hud}
      {islands.map((island) => (
        <IslandPin
          key={island.id}
          islandId={island.id}
          name={island.name}
          land={island.land}
          accent={island.accent}
          x={island.x}
          y={island.y}
          depth={parallax ? island.depth : 0}
          main={island.main}
          stage={islandStage(island.id, stories)}
          monument={Boolean(island.main && monument)}
          count={stories.filter((story) => story.islandId === island.id).length}
          hot={previewId === island.id}
          selected={activeId === island.id}
          companionId={island.main ? companionId : undefined}
          mouseX={mouseX}
          mouseY={mouseY}
          onIsland={onIsland}
        />
      ))}
      <div className="absolute inset-x-3 bottom-3 z-20 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/85 p-3 shadow-soft backdrop-blur-md">
        <CompanionArt id={companionId} className="h-11 w-11 shrink-0" />
        <p className="text-sm leading-snug text-ink" aria-live="polite">
          {speech}
        </p>
      </div>
    </div>
  )
}

interface IslandPinProps {
  islandId: IslandId
  name: string
  land: string
  accent: string
  x: number
  y: number
  depth: number
  main?: boolean
  stage: number
  monument: boolean
  count: number
  hot: boolean
  selected: boolean
  companionId?: CompanionId
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  onIsland?: (id: IslandId) => void
}

function IslandPin({
  islandId,
  name,
  land,
  accent,
  x,
  y,
  depth,
  main,
  stage,
  monument,
  count,
  hot,
  selected,
  companionId,
  mouseX,
  mouseY,
  onIsland,
}: IslandPinProps) {
  const shiftX = useTransform(mouseX, [-1, 1], [-10 * depth, 10 * depth])
  const shiftY = useTransform(mouseY, [-1, 1], [-8 * depth, 8 * depth])

  return (
    <div
      className="absolute z-10"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
    >
      <motion.div style={{ x: shiftX, y: shiftY }}>
        <button
          type="button"
          data-island={islandId}
          className="relative flex flex-col items-center"
          onClick={() => onIsland?.(islandId)}
          aria-label={`${name}${count > 0 ? `，${count} 则故事` : ''}`}
          style={{ filter: hot ? `drop-shadow(0 0 14px ${accent})` : undefined }}
        >
          {hot && (
            <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-ink shadow-soft">
              安放这里
            </span>
          )}
          <span className="float-y relative" style={{ animationDelay: `${x / 40}s` }}>
            <IslandArt
              land={land}
              accent={accent}
              stage={stage}
              monument={monument}
              className={main ? 'h-24 w-32 sm:h-36 sm:w-44' : 'h-16 w-20 sm:h-28 sm:w-32'}
            />
            {companionId && (
              <CompanionArt
                id={companionId}
                className="pointer-events-none absolute left-[58%] top-[22%] h-11 w-11 -translate-x-1/2 sm:h-12 sm:w-12"
              />
            )}
          </span>
          <span
            className={`-mt-2 rounded-full px-2.5 py-0.5 text-[11px] font-semibold shadow-soft ${
              selected ? 'bg-ink text-white' : 'bg-white/90 text-ink'
            }`}
          >
            {name}
            {count > 0 ? ` · ${count}` : ''}
          </span>
        </button>
      </motion.div>
    </div>
  )
}
