export type MoodId =
  | 'kai_xin'
  | 'ping_jing'
  | 'jiao_lv'
  | 'ya_li'
  | 'xing_fen'
  | 'gan_dong'
  | 'shi_luo'
  | 'fen_nu'

export type Era = 'now' | 'lastWeek' | 'lastYear'
export type TabId = 'island' | 'records' | 'insights' | 'more'
export type CompanionId = 'xiao_guangbao' | 'xiao_xingzai' | 'yuan' | 'meng'

export interface Mood {
  id: MoodId
  label: string
  color: string
  wash: string
}

export interface Companion {
  id: CompanionId
  name: string
  title: string
  blurb: string
  member: boolean
}

export interface IslandDef {
  id: string
  name: string
  line: string
  color: string
  home?: boolean
  stage: { x: number; y: number }
  phone: { x: number; y: number }
}

export interface Moment {
  id: string
  text: string
  mood: MoodId
  islandId: string
  era: Era
  day: string
  voice?: boolean
  photo?: boolean
}

export const moods: Mood[] = [
  { id: 'kai_xin', label: '开心', color: '#2A9D8F', wash: 'rgba(42,157,143,0.28)' },
  { id: 'ping_jing', label: '平静', color: '#5EA9FF', wash: 'rgba(94,169,255,0.22)' },
  { id: 'jiao_lv', label: '焦虑', color: '#5C6BC0', wash: 'rgba(92,107,192,0.30)' },
  { id: 'ya_li', label: '压力', color: '#7E57C2', wash: 'rgba(126,87,194,0.28)' },
  { id: 'xing_fen', label: '兴奋', color: '#26A69A', wash: 'rgba(38,166,154,0.26)' },
  { id: 'gan_dong', label: '感动', color: '#66BB6A', wash: 'rgba(102,187,106,0.26)' },
  { id: 'shi_luo', label: '失落', color: '#FF9800', wash: 'rgba(255,152,0,0.24)' },
  { id: 'fen_nu', label: '愤怒', color: '#EF5350', wash: 'rgba(239,83,80,0.24)' },
]

export const companions: Companion[] = [
  {
    id: 'xiao_guangbao',
    name: '小光宝',
    title: '倾听型心情伙伴',
    blurb: '水滴头，先听懂你没说完的话，再把今天轻轻安放好。',
    member: false,
  },
  {
    id: 'xiao_xingzai',
    name: '小星仔',
    title: '行动派成长搭子',
    blurb: '包子头，把今天的小事一颗一颗装进小岛。',
    member: false,
  },
  {
    id: 'yuan',
    name: '小愿',
    title: '会员 · 温柔守望',
    blurb: '把小小的愿望收好，陪你见证每一步。',
    member: true,
  },
  {
    id: 'meng',
    name: '小梦',
    title: '会员 · 治愈陪伴',
    blurb: '望着夜空，把还没实现的梦照进岛上。',
    member: true,
  },
]

export const islands: IslandDef[] = [
  {
    id: 'home',
    name: '主岛',
    line: '家。灯还亮着，你可以回来。',
    color: '#E8A87C',
    home: true,
    stage: { x: 50, y: 62 },
    phone: { x: 50, y: 58 },
  },
  {
    id: 'life',
    name: '生活岛',
    line: '日常被安放的地方。',
    color: '#E7B07A',
    stage: { x: 18, y: 74 },
    phone: { x: 22, y: 78 },
  },
  {
    id: 'study',
    name: '学业岛',
    line: '读完的那一章，会留在这里。',
    color: '#7E9FE0',
    stage: { x: 78, y: 40 },
    phone: { x: 78, y: 40 },
  },
  {
    id: 'health',
    name: '健康岛',
    line: '身体记得的路。',
    color: '#6FBF9B',
    stage: { x: 80, y: 74 },
    phone: { x: 78, y: 76 },
  },
  {
    id: 'social',
    name: '人际岛',
    line: '想一起回去的人。',
    color: '#E7A0B4',
    stage: { x: 22, y: 42 },
    phone: { x: 20, y: 40 },
  },
  {
    id: 'work',
    name: '工作岛',
    line: '做完的那一件事。',
    color: '#8EB4D6',
    stage: { x: 48, y: 86 },
    phone: { x: 50, y: 82 },
  },
  {
    id: 'creation',
    name: '创作岛',
    line: '自己做出来的东西。',
    color: '#E2B15A',
    stage: { x: 88, y: 56 },
    phone: { x: 84, y: 56 },
  },
  {
    id: 'emotion',
    name: '情绪岛',
    line: '不必解释的感受。',
    color: '#B7A6E0',
    stage: { x: 12, y: 58 },
    phone: { x: 16, y: 58 },
  },
  {
    id: 'inspiration',
    name: '灵感岛',
    line: '突然亮起的一点。',
    color: '#7EC8C3',
    stage: { x: 62, y: 34 },
    phone: { x: 56, y: 36 },
  },
]

export const seedMoments: Moment[] = [
  {
    id: 'seed-health',
    text: '晚饭后沿着江边走了二十分钟，风是凉的，人是轻的。',
    mood: 'ping_jing',
    islandId: 'health',
    era: 'now',
    day: '周三',
  },
  {
    id: 'seed-study',
    text: '把卡住三天的那一章终于读完，在空白处画了一颗很小的星。',
    mood: 'kai_xin',
    islandId: 'study',
    era: 'now',
    day: '周四',
  },
  {
    id: 'seed-social',
    text: '妈妈打电话来，只说了一句「吃饭了吗」。',
    mood: 'gan_dong',
    islandId: 'social',
    era: 'now',
    day: '周五',
  },
  {
    id: 'seed-week',
    text: '会开得比预想短，下楼买了杯热可可，站在门口喝完。',
    mood: 'ping_jing',
    islandId: 'work',
    era: 'lastWeek',
    day: '上周四',
  },
  {
    id: 'seed-year',
    text: '搬家的第一晚，箱子还没拆，窗外星星离得很近。',
    mood: 'gan_dong',
    islandId: 'life',
    era: 'lastYear',
    day: '去年今天',
    photo: true,
  },
]

export const prompts: { text: string; mood: MoodId }[] = [
  { text: '晨跑的时候天还没完全亮，呼吸一下就顺了。', mood: 'xing_fen' },
  { text: '项目评审通过了，我在会议室里又坐了一会儿。', mood: 'kai_xin' },
  { text: '想给这首没写完的曲子留一个开头。', mood: 'gan_dong' },
  { text: '今天有点焦虑，还是把桌子收拾干净了。', mood: 'jiao_lv' },
  { text: '突然想到一句想记住的话，先放在这里。', mood: 'ping_jing' },
]

const rules: { islandId: string; words: string[] }[] = [
  { islandId: 'health', words: ['晨跑', '跑步', '散步', '运动', '锻炼', '早起', '江边', '睡觉', '身体', '走了'] },
  { islandId: 'study', words: ['读完', '读书', '学习', '章节', '考试', '论文', '作业', '复习', '上课'] },
  { islandId: 'work', words: ['评审', '会议', '项目', '工作', '同事', '上班', '客户', '加班', '汇报'] },
  { islandId: 'social', words: ['妈妈', '爸爸', '朋友', '家人', '电话', '聊天', '见面'] },
  { islandId: 'creation', words: ['曲子', '画画', '设计', '创作', '音乐', '拍照'] },
  { islandId: 'inspiration', words: ['灵感', '突然想到', '一句'] },
  { islandId: 'emotion', words: ['焦虑', '难过', '失落', '压力', '想哭', '心情'] },
]

export function classifyStory(text: string): string {
  for (const rule of rules) {
    if (rule.words.some((word) => text.includes(word))) return rule.islandId
  }
  return 'life'
}

export function moodById(id: MoodId): Mood {
  return moods.find((mood) => mood.id === id) ?? moods[1]
}

export function islandById(id: string): IslandDef {
  return islands.find((island) => island.id === id) ?? islands[0]
}

export function companionById(id: CompanionId): Companion {
  return companions.find((item) => item.id === id) ?? companions[0]
}

const seenLine: Record<MoodId, string> = {
  kai_xin: '这份开心，已经被看见。',
  ping_jing: '平静的一刻，也留在这里了。',
  jiao_lv: '先放在这里。此刻不必解决它。',
  ya_li: '今天有一点重。它在岛上，很安全。',
  xing_fen: '这一点亮，已经落到岛上。',
  gan_dong: '这一下被轻轻收好了。',
  shi_luo: '失落也可以在这里待一会儿。',
  fen_nu: '我看见了，并不评判。',
}

export function witnessLine(companion: Companion, mood: MoodId, islandName: string): string {
  return `${companion.name}说：「${seenLine[mood]}」它在${islandName}。`
}

export interface LevelView {
  level: number
  title: string
  xp: number
  span: number
  nextTitle: string
}

export function levelForNow(extraStories: number): LevelView {
  const xp = 58 + extraStories * 16
  if (xp >= 129) {
    return {
      level: 8,
      title: '积累者',
      xp: xp - 129,
      span: 131,
      nextTitle: '进阶者',
    }
  }
  return {
    level: 7,
    title: '开拓者',
    xp,
    span: 129,
    nextTitle: '积累者',
  }
}

export function levelForEra(era: Era, extraStories: number): LevelView {
  if (era === 'lastWeek') {
    return { level: 6, title: '学习者', xp: 80, span: 125, nextTitle: '开拓者' }
  }
  if (era === 'lastYear') {
    return { level: 3, title: '记录者', xp: 36, span: 114, nextTitle: '成长者' }
  }
  return levelForNow(extraStories)
}

export function homeBuildings(storyCount: number, level: number) {
  return {
    house: storyCount >= 2,
    light: storyCount >= 3,
    mailbox: storyCount >= 4,
    flower: storyCount >= 5,
    observatory: level >= 8,
  }
}

export function artLand(id: string): string {
  return id === 'home' ? '/art/lands/home.webp' : `/art/lands/${id}.webp`
}

export function artCompanion(id: CompanionId, mood: MoodId): string {
  return `/art/companions/${id}_${mood}.webp`
}

export function artFace(id: CompanionId, mood: MoodId): string {
  return `/art/faces/${id}_${mood}.webp`
}

export function greeting(date = new Date()): string {
  const hour = date.getHours()
  if (hour < 5) return '夜深了'
  if (hour < 11) return '早上好'
  if (hour < 14) return '中午好'
  if (hour < 18) return '下午好'
  return '晚上好'
}

export function insightCopy(moments: Moment[], era: Era): string {
  if (era === 'lastYear') {
    return '去年的今天，主岛还很小。你留下了搬家的第一晚。那一点光，现在还在。'
  }
  if (era === 'lastWeek') {
    return '上周的工作岛记得一杯热可可，和会议结束后多出来的那几分钟。'
  }
  if (moments.length === 0) return '你的世界还在等第一个瞬间。一行也可以。'
  const names = [...new Set(moments.map((moment) => islandById(moment.islandId).name))]
  const feelings = [...new Set(moments.map((moment) => moodById(moment.mood).label))]
  return `这些天，故事落在${names.join('、')}。伙伴看见了你的${feelings.join('、')}，世界因此多了一点可以回去的形状。`
}

export const weekDays = ['一', '二', '三', '四', '五', '六', '日'] as const

export function dayIndex(day: string, date = new Date()): number {
  if (day === '今天') {
    const weekday = date.getDay()
    return weekday === 0 ? 6 : weekday - 1
  }
  return weekDays.findIndex((label) => day.endsWith(label))
}
