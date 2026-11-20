export type MoodId =
  | 'kai_xin'
  | 'ping_jing'
  | 'jiao_lv'
  | 'ya_li'
  | 'xing_fen'
  | 'gan_dong'
  | 'shi_luo'
  | 'fen_nu'

export type ScreenId = 'island' | 'today' | 'growth' | 'more'
export type InsightRange = '7' | '30' | 'all'
export type FaceKind = 'rad' | 'good' | 'meh' | 'bad' | 'awful'

export interface EmotionDef {
  id: MoodId
  label: string
  color: string
  face: FaceKind
}

export const emotions: EmotionDef[] = [
  { id: 'kai_xin', label: '开心', color: '#2A9D8F', face: 'rad' },
  { id: 'ping_jing', label: '平静', color: '#42A5F5', face: 'meh' },
  { id: 'xing_fen', label: '兴奋', color: '#26A69A', face: 'rad' },
  { id: 'gan_dong', label: '感动', color: '#66BB6A', face: 'good' },
  { id: 'jiao_lv', label: '焦虑', color: '#5C6BC0', face: 'meh' },
  { id: 'ya_li', label: '压力', color: '#7E57C2', face: 'bad' },
  { id: 'shi_luo', label: '失落', color: '#FF9800', face: 'bad' },
  { id: 'fen_nu', label: '愤怒', color: '#EF5350', face: 'awful' },
]

export function emotionById(id: MoodId): EmotionDef {
  return emotions.find((item) => item.id === id) ?? emotions[0]
}

export const levelTitles = [
  '初心者',
  '探索者',
  '记录者',
  '成长者',
  '践行者',
  '学习者',
  '开拓者',
  '积累者',
  '进阶者',
  '领航者',
  '思考者',
  '创造者',
  '坚持者',
  '影响者',
  '追光者',
  '远行者',
  '筑梦者',
  '星辰使者',
  '群岛守护者',
  '岛屿传说',
] as const

export const xpPerLevel = 800

export function levelTitle(level: number): string {
  return levelTitles[Math.min(Math.max(level, 1), levelTitles.length) - 1]
}

export interface IslandDef {
  id: string
  name: string
  tag: string
  color: string
  progress: number
  unlocked: boolean
  blurb: string
  /** Shown on the world stage, not only in the full list. */
  featured: boolean
}

export interface StoryDef {
  id: string
  text: string
  mood: MoodId
  tags: string[]
  photo: boolean
  voice: boolean
  islandId: string
  /** 0 = today, larger = further in the past. */
  dayOffset: number
  mine?: boolean
}

export interface CompanionDef {
  id: string
  name: string
  tagline: string
  premium: boolean
  hue: string
}

export const companions: CompanionDef[] = [
  {
    id: 'xiao_xingzai',
    name: '小星仔',
    tagline: '活泼的行动搭子，把今天的小事一颗颗装进小岛。',
    premium: false,
    hue: '#E7B15A',
  },
  {
    id: 'xiao_guangbao',
    name: '小光宝',
    tagline: '温柔的倾听伙伴，先懂你，再帮你把今天安放好。',
    premium: false,
    hue: '#7EB6D6',
  },
  {
    id: 'yuan',
    name: '小愿',
    tagline: '星屿会员专属。把小小的愿望认真珍藏。',
    premium: true,
    hue: '#C9847A',
  },
  {
    id: 'meng',
    name: '小梦',
    tagline: '星屿会员专属。安静守着那些还没照进现实的梦。',
    premium: true,
    hue: '#8E7CC3',
  },
]

export function companionById(id: string): CompanionDef {
  return companions.find((item) => item.id === id) ?? companions[0]
}

export interface ReminderDef {
  id: string
  title: string
  time: string
  enabled: boolean
  note: string
}

export const islandSeed: IslandDef[] = [
  {
    id: 'home',
    name: '星屿',
    tag: '家',
    color: '#5A9A6E',
    progress: 70,
    unlocked: true,
    blurb: '家不会每天改头换面。你写下的生活，会让这里慢慢更像你。',
    featured: true,
  },
  {
    id: 'study',
    name: '学习岛',
    tag: '学习',
    color: '#7C9A62',
    progress: 62,
    unlocked: true,
    blurb: '读过的、写完的、想通的，都在这里慢慢长高。',
    featured: true,
  },
  {
    id: 'family',
    name: '家人岛',
    tag: '家人',
    color: '#D4A574',
    progress: 40,
    unlocked: true,
    blurb: '和重要的人有关的瞬间，住在最靠近灯火的地方。',
    featured: true,
  },
  {
    id: 'friends',
    name: '朋友岛',
    tag: '朋友',
    color: '#7E6DB7',
    progress: 0,
    unlocked: false,
    blurb: '还在等第一段关于朋友的故事。写下一句，它就会亮起来。',
    featured: true,
  },
  {
    id: 'sport',
    name: '运动岛',
    tag: '运动',
    color: '#4A8FB8',
    progress: 48,
    unlocked: true,
    blurb: '身体走过的路，也会在岛上留下脚印。',
    featured: false,
  },
  {
    id: 'hobby',
    name: '兴趣岛',
    tag: '兴趣',
    color: '#C9847A',
    progress: 28,
    unlocked: true,
    blurb: '喜欢的事不必有用，也可以在这里生长。',
    featured: false,
  },
  {
    id: 'life',
    name: '生活岛',
    tag: '日常',
    color: '#8C6B4F',
    progress: 54,
    unlocked: true,
    blurb: '普通的一天，也值得被安放。',
    featured: false,
  },
]

export const storySeed: StoryDef[] = [
  {
    id: 's1',
    text: '早起把单词背完了，窗边的光刚好铺到桌上。',
    mood: 'ping_jing',
    tags: ['学习'],
    photo: false,
    voice: false,
    islandId: 'study',
    dayOffset: 1,
  },
  {
    id: 's2',
    text: '晚饭后绕着小区走了两圈，步子比前几天轻。',
    mood: 'kai_xin',
    tags: ['运动'],
    photo: false,
    voice: true,
    islandId: 'sport',
    dayOffset: 2,
  },
  {
    id: 's3',
    text: '把桌子收拾干净。明天开始时，会轻松一点。',
    mood: 'ping_jing',
    tags: ['日常'],
    photo: true,
    voice: false,
    islandId: 'life',
    dayOffset: 3,
  },
  {
    id: 's4',
    text: '把搁置的素描本又翻开了，画了一角窗台。',
    mood: 'xing_fen',
    tags: ['兴趣'],
    photo: true,
    voice: false,
    islandId: 'hobby',
    dayOffset: 12,
  },
  {
    id: 's5',
    text: '翻到一张和妈妈的旧照片，在灯下看了很久。',
    mood: 'gan_dong',
    tags: ['家人'],
    photo: true,
    voice: false,
    islandId: 'family',
    dayOffset: 18,
  },
]

export const reminderSeed: ReminderDef[] = [
  {
    id: 'night',
    title: '晚间记录',
    time: '21:30',
    enabled: true,
    note: '今天，有没有一个你想留住的瞬间？',
  },
  {
    id: 'noon',
    title: '午后一小笔',
    time: '13:00',
    enabled: false,
    note: '不必是大事。一行也可以。',
  },
]

export const storySamples: { text: string; mood: MoodId }[] = [
  {
    text: '中午和同学在食堂多坐了一会儿，谁都没急着走。',
    mood: 'kai_xin',
  },
  {
    text: '和妈妈通了十分钟电话，她说饭记得吃。',
    mood: 'gan_dong',
  },
  {
    text: '晚自习写完了最后一道题，窗外的灯还亮着。',
    mood: 'ping_jing',
  },
]

const tagRules: { test: RegExp; tag: string; islandId: string }[] = [
  { test: /朋友|同学|室友/, tag: '朋友', islandId: 'friends' },
  { test: /妈妈|爸爸|家人|奶奶|爷爷|通电话/, tag: '家人', islandId: 'family' },
  { test: /跑步|走了|运动|锻炼|公里/, tag: '运动', islandId: 'sport' },
  { test: /学习|自习|单词|作业|功课|读书/, tag: '学习', islandId: 'study' },
  { test: /素描|画画|音乐|电影|兴趣/, tag: '兴趣', islandId: 'hobby' },
]

export function inferStory(text: string, mood: MoodId): {
  tags: string[]
  islandId: string
  mood: MoodId
} {
  const tags: string[] = []
  let islandId = 'life'
  for (const rule of tagRules) {
    if (rule.test.test(text)) {
      tags.push(rule.tag)
      if (islandId === 'life') islandId = rule.islandId
    }
  }
  if (tags.length === 0) tags.push('日常')

  let nextMood = mood
  if (/累|疲惫|压力/.test(text)) nextMood = 'ya_li'
  else if (/焦虑|紧张|担心/.test(text)) nextMood = 'jiao_lv'
  else if (/难过|失落|哭/.test(text)) nextMood = 'shi_luo'
  else if (/生气|愤怒|火大/.test(text)) nextMood = 'fen_nu'

  return { tags, islandId, mood: nextMood }
}

export function witnessLine(
  companionId: string,
  mood: MoodId,
  islandName: string,
): string {
  const heavy: MoodId[] = ['shi_luo', 'jiao_lv', 'ya_li', 'fen_nu']
  if (heavy.includes(mood)) {
    switch (companionId) {
      case 'xiao_guangbao':
        return '我看见了，它在这里很安全。'
      case 'yuan':
        return '这一小步，我帮你珍藏着。'
      case 'meng':
        return '难的日子也会在岛上留下灯。'
      default:
        return `我把它收进${islandName}了。今天也不必逞强。`
    }
  }
  switch (companionId) {
    case 'xiao_guangbao':
      return '被写下的故事，会在岛上轻轻发亮。'
    case 'yuan':
      return '我把这个愿望收好了。'
    case 'meng':
      return '这个瞬间，会慢慢照进小岛。'
    default:
      return `今天也很好。我把它放进${islandName}了。`
  }
}

export function islandById(islands: IslandDef[], id: string): IslandDef {
  return islands.find((item) => item.id === id) ?? islands[0]
}

export type SheetState =
  | null
  | { type: 'island'; id: string }
  | { type: 'islands' }
  | { type: 'member' }
  | { type: 'level' }
  | { type: 'companion' }
  | { type: 'reminder'; id: string }

export interface ComposerState {
  open: boolean
  step: 'edit' | 'analyzing' | 'review'
  text: string
  mood: MoodId
  photo: boolean
  voice: boolean
  tags: string[]
  islandId: string
}

export function freshComposer(): ComposerState {
  return {
    open: false,
    step: 'edit',
    text: '',
    mood: 'ping_jing',
    photo: false,
    voice: false,
    tags: [],
    islandId: 'life',
  }
}

export const tabs: { id: ScreenId; label: string }[] = [
  { id: 'island', label: '我的岛屿' },
  { id: 'today', label: '今日日常' },
  { id: 'growth', label: '成长轨迹' },
  { id: 'more', label: '更多' },
]

export function formatDayOffset(offset: number): string {
  if (offset <= 0) return '今天'
  if (offset === 1) return '昨天'
  return `${offset} 天前`
}

export function storiesInRange(stories: StoryDef[], range: InsightRange): StoryDef[] {
  if (range === 'all') return stories
  const limit = range === '7' ? 7 : 30
  return stories.filter((story) => story.dayOffset <= limit)
}

export function topCount(items: string[]): { key: string; count: number } | null {
  if (items.length === 0) return null
  const map = new Map<string, number>()
  for (const item of items) map.set(item, (map.get(item) ?? 0) + 1)
  let best = ''
  let count = 0
  let tied = false
  for (const [key, value] of map) {
    if (value > count) {
      best = key
      count = value
      tied = false
    } else if (value === count) {
      tied = true
    }
  }
  if (!best || tied) return null
  return { key: best, count }
}
