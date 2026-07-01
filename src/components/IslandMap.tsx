import { useRef, useCallback } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Island from './Island'
import type { IslandData } from '../data/islands'

interface IslandMapProps {
  islands: IslandData[]
  selectedId: string | null
  onIslandClick: (id: string) => void
  focusPosition?: { x: number; y: number } | null
}

function CloudLayer({ opacity, speed }: { opacity: number; speed: number }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity }}
    >
      <div
        className="cloud-layer absolute flex gap-24"
        style={{
          width: '200%',
          top: `${10 + speed * 5}%`,
          animationDuration: `${40 + speed * 20}s`,
        }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="rounded-full bg-white/20 blur-xl"
            style={{
              width: 80 + (i % 3) * 40,
              height: 28 + (i % 2) * 14,
              marginTop: (i % 4) * 20,
            }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <div
            key={`dup-${i}`}
            className="rounded-full bg-white/20 blur-xl"
            style={{
              width: 80 + (i % 3) * 40,
              height: 28 + (i % 2) * 14,
              marginTop: (i % 4) * 20,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function IslandMap({
  islands,
  selectedId,
  onIslandClick,
  focusPosition,
}: IslandMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const parallaxX = useTransform(mouseX, [-1, 1], [-8, 8])
  const parallaxY = useTransform(mouseY, [-1, 1], [-6, 6])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
      mouseX.set(x)
      mouseY.set(y)
    },
    [mouseX, mouseY],
  )

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* 海洋背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-900 via-blue-900 to-indigo-950" />

      {/* 海洋波纹 */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 20% 50%, rgba(56, 189, 248, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 30%, rgba(99, 102, 241, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* 云层 */}
      <CloudLayer opacity={0.4} speed={1} />
      <CloudLayer opacity={0.25} speed={2} />

      {/* 一屏世界地图 — 100% 视口内完整显示 */}
      <motion.div
        className="absolute inset-0"
        style={{ x: parallaxX, y: parallaxY }}
        animate={focusPosition ? { scale: 1.015 } : { scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* 安全边距区域，确保岛屿不贴边 */}
        <div className="absolute inset-[4%_6%_6%_6%]">
          {/* 地图网格装饰 */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* 连接线 */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            {islands.map((island, i) => {
              if (i === 0) return null
              const prev = islands[i - 1]
              return (
                <line
                  key={`line-${island.id}`}
                  x1={`${prev.position.x}%`}
                  y1={`${prev.position.y}%`}
                  x2={`${island.position.x}%`}
                  y2={`${island.position.y}%`}
                  stroke="rgba(147, 197, 253, 0.5)"
                  strokeWidth="1"
                  strokeDasharray="8 6"
                />
              )
            })}
          </svg>

          {/* 岛屿 */}
          {islands.map((island, index) => (
            <Island
              key={island.id}
              data={island}
              isSelected={selectedId === island.id}
              onClick={onIslandClick}
              floatDelay={index}
            />
          ))}
        </div>

        {/* 水印 */}
        <div className="absolute bottom-3 left-6 pointer-events-none select-none">
          <p className="text-white/10 text-3xl font-black tracking-widest">
            WORLD MAP
          </p>
        </div>
      </motion.div>

      {/* 操作提示 */}
      <motion.div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-blue-200/70 pointer-events-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        点击岛屿查看详情 · Hover 探索
      </motion.div>
    </div>
  )
}
