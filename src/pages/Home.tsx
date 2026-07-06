import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SiteNav from '../components/SiteNav'
import TopBar from '../components/TopBar'
import IslandMap from '../components/IslandMap'
import SidePanel from '../components/SidePanel'
import {
  islands as initialIslands,
  getUnlockedCount,
  getOverallProgress,
  type IslandData,
} from '../data/islands'

export default function Home() {
  const [islandList, setIslandList] = useState<IslandData[]>(initialIslands)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [focusPosition, setFocusPosition] = useState<{
    x: number
    y: number
  } | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const selectedIsland =
    islandList.find((i) => i.id === selectedId) ?? null

  const unlockedCount = getUnlockedCount(islandList)
  const overallProgress = getOverallProgress(islandList)

  const showToast = useCallback((message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 2500)
  }, [])

  const handleIslandClick = useCallback(
    (id: string) => {
      setSelectedId(id)
      const island = islandList.find((i) => i.id === id)
      if (island) {
        setFocusPosition(island.position)
        setTimeout(() => setFocusPosition(null), 600)
      }
    },
    [islandList],
  )

  const handleClose = useCallback(() => {
    setSelectedId(null)
  }, [])

  const handleUnlock = useCallback(
    (id: string) => {
      setIslandList((prev) =>
        prev.map((island) =>
          island.id === id
            ? {
                ...island,
                status: 'unlocked' as const,
                progress: Math.floor(Math.random() * 20) + 10,
              }
            : island,
        ),
      )
      showToast('🎉 岛屿解锁成功！')
    },
    [showToast],
  )

  const handleEnter = useCallback(
    (id: string) => {
      const island = islandList.find((i) => i.id === id)
      showToast(`🚀 正在进入 ${island?.name ?? '岛屿'}...`)
    },
    [islandList, showToast],
  )

  return (
    <div className="flex flex-col w-full h-full overflow-hidden bg-gradient-to-br from-sky-900 via-blue-900 to-indigo-950">
      <SiteNav />
      <TopBar
        unlockedCount={unlockedCount}
        totalCount={islandList.length}
        overallProgress={overallProgress}
      />

      <main className="relative flex-1 min-h-0">
        <IslandMap
          islands={islandList}
          selectedId={selectedId}
          onIslandClick={handleIslandClick}
          focusPosition={focusPosition}
        />
      </main>

      <SidePanel
        island={selectedIsland}
        onClose={handleClose}
        onEnter={handleEnter}
        onUnlock={handleUnlock}
      />

      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[60] px-5 py-2.5 rounded-xl bg-slate-800/90 backdrop-blur-md border border-white/15 text-sm text-white shadow-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
