export type IslandId = 'work' | 'study' | 'health' | 'social' | 'life' | 'wealth'

export type Sky = 'clear' | 'cloud' | 'rain' | 'night'

export interface StoryIsland {
  id: IslandId
  name: string
  color: string
  days: string
  example: string
  decor: 'lamp' | 'tree'
  x: number
  y: number
}

export const storyIslands: StoryIsland[] = [
  {
    id: 'work',
    name: '工作',
    color: '#FF6658',
    days: '还亮着的路灯、做完的一件事。',
    example: '加班到很晚，路灯还亮着。',
    decor: 'lamp',
    x: 16,
    y: 36,
  },
  {
    id: 'study',
    name: '学业',
    color: '#5DADEC',
    days: '看完的一章、没想通的一道题。',
    example: '把一章看完了。',
    decor: 'tree',
    x: 38,
    y: 16,
  },
  {
    id: 'health',
    name: '健康',
    color: '#4DBA7A',
    days: '睡够的一晚、出门走的那段路。',
    example: '出门走的那段路。',
    decor: 'tree',
    x: 84,
    y: 30,
  },
  {
    id: 'social',
    name: '人际',
    color: '#F48FB1',
    days: '一起吃饭、一通没有说完的电话。',
    example: '和家人坐到饭吃完。',
    decor: 'lamp',
    x: 22,
    y: 72,
  },
  {
    id: 'life',
    name: '生活',
    color: '#F4A261',
    days: '咸一点的面、搬家后的第一个晚上。',
    example: '今晚的面，比平时咸一点。',
    decor: 'tree',
    x: 78,
    y: 68,
  },
  {
    id: 'wealth',
    name: '财富',
    color: '#A1887F',
    days: '一笔认真记下的支出、一个很小的决定。',
    example: '一笔认真记下的支出。',
    decor: 'lamp',
    x: 50,
    y: 78,
  },
]

export function islandById(id: IslandId) {
  return storyIslands.find((island) => island.id === id) ?? storyIslands[0]
}

export function islandName(id: IslandId) {
  return `${islandById(id).name}岛`
}

const keywordRules: Array<[IslandId, string[]]> = [
  ['work', ['加班', '路灯', '上班', '工作', '会议']],
  ['study', ['一章', '题目', '作业', '课堂', '学习']],
  ['health', ['睡', '走路', '出门', '跑步']],
  ['social', ['家人', '电话', '朋友', '吃饭']],
  ['life', ['面', '搬家', '咸', '晚饭']],
  ['wealth', ['支出', '账单', '工资', '钱']],
]

export function classifySentence(text: string, fallback: IslandId): IslandId {
  const trimmed = text.trim()
  for (const [id, keys] of keywordRules) {
    if (keys.some((key) => trimmed.includes(key))) return id
  }
  return fallback
}

export const worldPresets: Array<{ text: string; island: IslandId }> = [
  { text: '加班到很晚，路灯还亮着。', island: 'work' },
  { text: '把一章看完了。', island: 'study' },
  { text: '和家人坐到饭吃完。', island: 'social' },
]

export const heroLines = [
  '健康岛这边，灯亮着。',
  '有一句话，落在了生活岛。',
  '灯塔还在，你随时可以回来。',
]

export const moods = [
  { id: 'calm', label: '平静', color: '#5EA9FF' },
  { id: 'happy', label: '开心', color: '#4DBA7A' },
  { id: 'sad', label: '难过', color: '#5DADEC' },
  { id: 'annoyed', label: '烦躁', color: '#F4A261' },
  { id: 'tired', label: '累', color: '#A1887F' },
] as const

export type MoodId = (typeof moods)[number]['id']

export function moodById(id: MoodId) {
  return moods.find((mood) => mood.id === id) ?? moods[0]
}

const tagIslands: Record<string, IslandId> = {
  生活: 'life',
  家人: 'social',
  工作: 'work',
  学业: 'study',
  健康: 'health',
  人际: 'social',
  财富: 'wealth',
}

export function islandForTags(tags: string[], sentence: string): IslandId {
  for (const tag of tags) {
    if (tagIslands[tag]) return tagIslands[tag]
  }
  return classifySentence(sentence, 'life')
}

export interface DiaryEntry {
  id: string
  when: string
  mood: MoodId
  text: string
}

export const growthStories: Record<'week' | 'month' | 'quarter', { summary: string; entries: DiaryEntry[] }> = {
  week: {
    summary: '这周更多时候是平静的，中间有两个有点累的晚上。',
    entries: [
      { id: 'w1', when: '周一', mood: 'calm', text: '出门走的那段路。' },
      { id: 'w2', when: '周二', mood: 'calm', text: '把一章看完了。' },
      { id: 'w3', when: '周三', mood: 'tired', text: '加班到很晚，路灯还亮着。' },
      { id: 'w4', when: '周四', mood: 'happy', text: '和家人坐到饭吃完。' },
      { id: 'w5', when: '周五', mood: 'annoyed', text: '没想通的一道题。' },
      { id: 'w6', when: '周日', mood: 'tired', text: '一通没有说完的电话。' },
    ],
  },
  month: {
    summary: '这个月多数日子是平静的，偶尔有一点烦躁，也被轻轻放过了。',
    entries: [
      { id: 'm1', when: '月初', mood: 'calm', text: '今晚的面，比平时咸一点。' },
      { id: 'm2', when: '第二周', mood: 'happy', text: '和家人坐到饭吃完。' },
      { id: 'm3', when: '第三周', mood: 'tired', text: '加班到很晚，路灯还亮着。' },
      { id: 'm4', when: '上周', mood: 'annoyed', text: '没想通的一道题。' },
      { id: 'm5', when: '昨天', mood: 'calm', text: '把一章看完了。' },
    ],
  },
  quarter: {
    summary: '近三个月，日子被收成一段安静的海。开心不多，但都记得住。',
    entries: [
      { id: 'q1', when: '三月前', mood: 'calm', text: '搬家后的第一个晚上。' },
      { id: 'q2', when: '二月前', mood: 'sad', text: '一通没有说完的电话。' },
      { id: 'q3', when: '上个月', mood: 'happy', text: '睡够的一晚。' },
      { id: 'q4', when: '这周', mood: 'calm', text: '一笔认真记下的支出。' },
    ],
  },
}

export const companions = [
  {
    id: 'xing',
    name: '小星仔',
    member: false,
    eyebrow: '活泼',
    line: '把今天的小事，一颗一颗装进岛。',
    traits: ['活泼好奇', '行动派', '把小事当宝藏'],
    intro: '小星仔把今天的小事当成宝藏，一颗一颗装进岛里。他好奇，也爱先动手，但不会催你再做一点。',
    tint: '#FFE3A3',
  },
  {
    id: 'guang',
    name: '小光宝',
    member: false,
    eyebrow: '倾听',
    line: '先把心情擦亮，再轻轻安放。',
    traits: ['细腻', '不催促', '懂你没说完的话'],
    intro: '小光宝先听你把心情说完，再轻轻放到岛上。他细腻，不催促，也懂你没说完的那句。',
    tint: '#D6EBFF',
  },
  {
    id: 'yuan',
    name: '小愿',
    member: true,
    eyebrow: '',
    line: '把小小的愿望珍藏起来。',
    traits: [],
    intro: '小愿把小小的愿望收好。不急着兑现，只是让它在岛上有一个安静的位置。',
    tint: '#F8D7E6',
  },
  {
    id: 'meng',
    name: '小梦',
    member: true,
    eyebrow: '',
    line: '守护还没实现的那段想象。',
    traits: [],
    intro: '小梦守着还没实现的那段想象。它还只是想象，也可以先在这里待着。',
    tint: '#E4DCF8',
  },
] as const

export const growthLevels = [
  { level: 1, title: 'Lv.1', names: '起始石碑、春日矮草' },
  { level: 6, title: 'Lv.6 前后', names: '成长小屋、情绪风铃' },
  { level: 12, title: 'Lv.12 前后', names: '故事广场、记忆喷泉' },
  { level: 20, title: 'Lv.20', names: '梦想天文台、生命之树' },
] as const

export const skies: Array<{ id: Sky; label: string }> = [
  { id: 'clear', label: '晴' },
  { id: 'cloud', label: '云' },
  { id: 'rain', label: '雨' },
  { id: 'night', label: '夜与萤火' },
]

export const navItems = [
  { to: '/world', label: '世界' },
  { to: '/record', label: '记录' },
  { to: '/growth', label: '轨迹' },
  { to: '/companion', label: '伙伴' },
  { to: '/membership', label: '会员' },
  { to: '/download', label: '下载' },
] as const
