export type IslandStatus = 'locked' | 'unlocked'

export interface IslandData {
  id: string
  name: string
  description: string
  unlockLevel: number
  status: IslandStatus
  position: { x: number; y: number }
  progress: number
  icon: string
  color: string
  glowColor: string
}

export const islands: IslandData[] = [
  {
    id: 'learning',
    name: '学习岛',
    description: '知识的港湾，在这里积累技能、探索大学、持续成长。每一次阅读与思考，都在点亮这座岛屿。',
    unlockLevel: 1,
    status: 'unlocked',
    position: { x: 16, y: 30 },
    progress: 72,
    icon: '📚',
    color: '#6366f1',
    glowColor: 'rgba(99, 102, 241, 0.6)',
  },
  {
    id: 'health',
    name: '健康岛',
    description: '身体是一切的基础。运动、作息、饮食——在这里守护你的活力与能量。',
    unlockLevel: 2,
    status: 'unlocked',
    position: { x: 38, y: 58 },
    progress: 58,
    icon: '💪',
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.6)',
  },
  {
    id: 'wealth',
    name: '财富岛',
    description: '收入、资产与财务规划。让金钱成为成长的工具，而非束缚。',
    unlockLevel: 3,
    status: 'unlocked',
    position: { x: 72, y: 26 },
    progress: 45,
    icon: '💰',
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.6)',
  },
  {
    id: 'social',
    name: '人际岛',
    description: '关系与社交的桥梁。家人、朋友、伙伴——在这里编织你的人际网络。',
    unlockLevel: 4,
    status: 'locked',
    position: { x: 58, y: 68 },
    progress: 0,
    icon: '🤝',
    color: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.6)',
  },
  {
    id: 'life',
    name: '生活岛',
    description: '日常习惯与生活方式。从小事做起，让每一天都充满意义与秩序。',
    unlockLevel: 5,
    status: 'locked',
    position: { x: 24, y: 72 },
    progress: 0,
    icon: '🏠',
    color: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.6)',
  },
  {
    id: 'events',
    name: '事件岛',
    description: '人生重要节点的记录。里程碑、转折、纪念——你的故事在此汇聚。',
    unlockLevel: 6,
    status: 'locked',
    position: { x: 84, y: 56 },
    progress: 0,
    icon: '⭐',
    color: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.6)',
  },
]

export function getUnlockedCount(islandList: IslandData[]): number {
  return islandList.filter((i) => i.status === 'unlocked').length
}

export function getOverallProgress(islandList: IslandData[]): number {
  const unlocked = islandList.filter((i) => i.status === 'unlocked')
  if (unlocked.length === 0) return 0
  return Math.round(
    unlocked.reduce((sum, i) => sum + i.progress, 0) / unlocked.length,
  )
}
