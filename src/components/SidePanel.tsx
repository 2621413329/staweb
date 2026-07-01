import { AnimatePresence, motion } from 'framer-motion'
import type { IslandData } from '../data/islands'

interface SidePanelProps {
  island: IslandData | null
  onClose: () => void
  onEnter: (id: string) => void
  onUnlock: (id: string) => void
}

export default function SidePanel({
  island,
  onClose,
  onEnter,
  onUnlock,
}: SidePanelProps) {
  const isLocked = island?.status === 'locked'

  return (
    <AnimatePresence>
      {island && (
        <>
          {/* 遮罩 */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] md:bg-transparent md:backdrop-blur-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed top-0 right-0 z-50 h-full w-full max-w-sm flex flex-col bg-slate-900/90 backdrop-blur-xl border-l border-white/10 shadow-2xl"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* 顶部色条 */}
            <div
              className="h-1.5 w-full"
              style={{
                background: isLocked
                  ? 'linear-gradient(90deg, #6b7280, #4b5563)'
                  : `linear-gradient(90deg, ${island.color}, ${island.color}88)`,
              }}
            />

            <div className="flex-1 flex flex-col p-6 overflow-y-auto">
              <div className="flex items-start justify-between mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
                  className="flex items-center justify-center w-16 h-16 rounded-2xl text-3xl"
                  style={{
                    background: isLocked
                      ? 'linear-gradient(145deg, #4b5563, #374151)'
                      : `linear-gradient(145deg, ${island.color}cc, ${island.color}66)`,
                    boxShadow: isLocked ? 'none' : `0 0 24px ${island.glowColor}`,
                  }}
                >
                  {isLocked ? '🔒' : island.icon}
                </motion.div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="关闭"
                >
                  ✕
                </button>
              </div>

              <motion.h2
                className="text-2xl font-bold text-white mb-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {island.name}
              </motion.h2>

              <motion.p
                className="text-xs text-blue-300/60 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                解锁等级 Lv.{island.unlockLevel}
              </motion.p>

              <motion.p
                className="text-sm text-blue-100/70 leading-relaxed mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                {island.description}
              </motion.p>

              {!isLocked && (
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-blue-200/70">当前进度</span>
                    <span className="text-sm font-bold text-white">
                      {island.progress}%
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: island.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${island.progress}%` }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    />
                  </div>
                </motion.div>
              )}

              {isLocked && (
                <motion.div
                  className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-sm text-blue-200/60 text-center">
                    🔒 此岛屿尚未解锁
                    <br />
                    <span className="text-xs mt-1 inline-block">
                      达到 Lv.{island.unlockLevel} 后可探索
                    </span>
                  </p>
                </motion.div>
              )}

              <div className="mt-auto flex flex-col gap-3">
                {isLocked ? (
                  <motion.button
                    type="button"
                    className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onUnlock(island.id)}
                  >
                    ✨ 解锁岛屿
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    className="w-full py-3 rounded-xl font-semibold text-white transition-all shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${island.color}, ${island.color}aa)`,
                      boxShadow: `0 4px 20px ${island.glowColor}`,
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onEnter(island.id)}
                  >
                    进入岛屿 →
                  </motion.button>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl text-sm text-blue-200/60 hover:text-white hover:bg-white/5 transition-colors"
                >
                  返回世界地图
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
