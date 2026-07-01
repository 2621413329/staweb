import { motion } from 'framer-motion'

interface TopBarProps {
  unlockedCount: number
  totalCount: number
  overallProgress: number
}

export default function TopBar({
  unlockedCount,
  totalCount,
  overallProgress,
}: TopBarProps) {
  return (
    <motion.header
      className="relative z-50 flex shrink-0 items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.2 }}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
          <span className="text-base sm:text-lg">🌍</span>
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-white tracking-wide leading-tight">
            Starland
          </h1>
          <p className="text-[10px] sm:text-xs text-blue-200/70 leading-tight">
            成长世界 · 多岛屿系统
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
          <span className="text-xs text-blue-200/80">已解锁</span>
          <span className="text-sm font-bold text-white">
            {unlockedCount}/{totalCount}
          </span>
          <div className="flex gap-0.5 ml-1">
            {Array.from({ length: totalCount }).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                  i < unlockedCount ? 'bg-emerald-400' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 min-w-[120px] sm:min-w-[140px]">
          <span className="text-[10px] sm:text-xs text-blue-200/80 whitespace-nowrap">总进度</span>
          <div className="flex-1 h-1.5 sm:h-2 rounded-full bg-white/15 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-400 to-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1.2, delay: 0.5 }}
            />
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-white">{overallProgress}%</span>
        </div>
      </div>
    </motion.header>
  )
}
