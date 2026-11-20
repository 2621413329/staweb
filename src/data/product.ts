export type IslandId =
  | 'work'
  | 'study'
  | 'health'
  | 'social'
  | 'life'
  | 'finance'
  | 'milestone'
  | 'inspiration'
  | 'creation'
  | 'emotion'
  | 'achievement'

export interface StoryIsland {
  id: IslandId
  name: string
  level: number
  accent: string
  grass: string
  firstBuilding: string
  landmark: string
  note: string
}

export interface StoryMoment {
  id: string
  text: string
  islandId: IslandId
  mood: string
  when: string
}

export const storyIslands: StoryIsland[] = [
  {
    id: 'work',
    name: '工作',
    level: 2,
    accent: '#d7a15e',
    grass: '#d7e7c8',
    firstBuilding: '工作角',
    landmark: '公司总部',
    note: '评审、通勤、楼梯间里站一会儿的那些时刻。',
  },
  {
    id: 'study',
    name: '学习',
    level: 4,
    accent: '#6aa6e6',
    grass: '#d5ead4',
    firstBuilding: '学习角',
    landmark: '大学主教学楼',
    note: '读完的一章，写通的一道题，都会留在这里。',
  },
  {
    id: 'health',
    name: '健康',
    level: 3,
    accent: '#6fbf8b',
    grass: '#cfe8c4',
    firstBuilding: '健康角',
    landmark: '自然疗愈中心',
    note: '睡眠、跑步、身体慢慢好起来的痕迹。',
  },
  {
    id: 'social',
    name: '人际',
    level: 3,
    accent: '#e7a0b0',
    grass: '#e7f0cf',
    firstBuilding: '友谊长椅',
    landmark: '社区会堂',
    note: '家人、朋友、一通不想挂断的电话。',
  },
  {
    id: 'life',
    name: '生活',
    level: 5,
    accent: '#e3b15a',
    grass: '#dcecc8',
    firstBuilding: '生活角',
    landmark: '温馨生活之家',
    note: '窗台、晚饭、把一天轻轻放好的地方。',
  },
  {
    id: 'finance',
    name: '财富',
    level: 1,
    accent: '#d2b15a',
    grass: '#e4ecc4',
    firstBuilding: '收获角',
    landmark: '商会大厅',
    note: '收入与安排，成为生活的工具，而不是分数。',
  },
  {
    id: 'milestone',
    name: '重要事件',
    level: 2,
    accent: '#8eb0d8',
    grass: '#d7e6d4',
    firstBuilding: '回忆角',
    landmark: '回忆纪念馆',
    note: '搬家、毕业、第一次，值得以后回去看的节点。',
  },
  {
    id: 'inspiration',
    name: '灵感',
    level: 1,
    accent: '#b9a0e0',
    grass: '#e4ead0',
    firstBuilding: '灵感角',
    landmark: '创意殿堂',
    note: '突然亮一下的念头，先安放，不必立刻完成。',
  },
  {
    id: 'creation',
    name: '创造',
    level: 1,
    accent: '#e09a78',
    grass: '#e5ebc8',
    firstBuilding: '创作角',
    landmark: '创造工坊',
    note: '写、画、做出一点点属于自己的东西。',
  },
  {
    id: 'emotion',
    name: '情感',
    level: 2,
    accent: '#e7b0c4',
    grass: '#e6efd0',
    firstBuilding: '暖心角',
    landmark: '心灵花园',
    note: '开心、难过、说不清的一天，都可以留下。',
  },
  {
    id: 'achievement',
    name: '成就',
    level: 1,
    accent: '#7ec4c0',
    grass: '#d4ead0',
    firstBuilding: '起点纪念角',
    landmark: '荣耀殿堂',
    note: '做成的事被记住，而不是被拿来比较。',
  },
]

export const homeRing: IslandId[] = ['study', 'health', 'social', 'life']

export const seedMoments: StoryMoment[] = [
  {
    id: 'seed-social',
    text: '晚饭后和妈妈打了二十分钟电话，她说风铃花开了。',
    islandId: 'social',
    mood: '想念',
    when: '今天 19:40',
  },
  {
    id: 'seed-study',
    text: '把卡住一周的那道题写通了，窗外刚好亮起来。',
    islandId: 'study',
    mood: '踏实',
    when: '今天 11:20',
  },
  {
    id: 'seed-life',
    text: '把桌子挪到窗边。以后想在这里把一天放下来。',
    islandId: 'life',
    mood: '平静',
    when: '昨天',
  },
]

export const promptMoments: { label: string; text: string }[] = [
  { label: '窗台的花', text: '下班路上买了一束很小的花，放在窗台。' },
  { label: '写通的题', text: '今天把卡住一周的那道题写通了。' },
  { label: '三公里', text: '跑完三公里，风是凉的，人是轻的。' },
  { label: '妈妈的电话', text: '晚饭后和妈妈打了二十分钟电话。' },
  { label: '说不清的一天', text: '有点想哭，但还是把今天写下来了。' },
  { label: '楼梯间', text: '项目终于过了评审，我在楼梯间站了一会儿。' },
]

export const moods = ['平静', '踏实', '欣喜', '想念', '难过', '轻松'] as const
export type MoodName = (typeof moods)[number]

export const memoryMoment = {
  when: '去年的今天',
  text: '第一次把桌子搬到窗边，跟自己说，以后要有一个可以回去的地方。',
  islandId: 'life' as IslandId,
  thenLevel: 1,
}

export function islandById(id: IslandId, list: StoryIsland[] = storyIslands) {
  const found = list.find((island) => island.id === id)
  if (!found) throw new Error(`unknown island ${id}`)
  return found
}

export function detectIsland(text: string): IslandId {
  const rules: [RegExp, IslandId][] = [
    [/跑|运动|睡|公里|身体|散步/, 'health'],
    [/学|题|书|课|论文|复习/, 'study'],
    [/妈妈|爸爸|朋友|电话|一起|见面/, 'social'],
    [/工资|存|花钱|账单|理财/, 'finance'],
    [/画|歌|做了|写了首|创作/, 'creation'],
    [/灵感|突然想到|念头/, 'inspiration'],
    [/毕业|搬家|第一次|纪念|婚礼/, 'milestone'],
    [/难过|想哭|心情|委屈|想你/, 'emotion'],
    [/上班|项目|评审|工作|同事/, 'work'],
    [/完成|做到|终于/, 'achievement'],
  ]
  for (const [pattern, id] of rules) {
    if (pattern.test(text)) return id
  }
  return 'life'
}

export function witnessLine(mood: string) {
  if (mood === '难过' || mood === '想念') return '我看见了。它在这里很安全。'
  if (mood === '欣喜' || mood === '轻松') return '这个瞬间已经落在岛上了。'
  return '故事找到了它的位置。不必再选一次。'
}
