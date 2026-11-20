export type IslandId = 'life' | 'health' | 'work' | 'social' | 'study' | 'emotion'

export type CompanionId = 'xiao_xingzai' | 'xiao_guangbao' | 'yuan' | 'meng'

export type MoodId =
  | 'kai_xin'
  | 'ping_jing'
  | 'jiao_lv'
  | 'ya_li'
  | 'xing_fen'
  | 'gan_dong'
  | 'shi_luo'
  | 'fen_nu'

export type FaceKind = 'rad' | 'good' | 'meh' | 'bad' | 'awful'

export interface Mood {
  id: MoodId
  label: string
  color: string
  face: FaceKind
}

export interface Companion {
  id: CompanionId
  name: string
  tagline: string
  greeting: string
  aside: string
  traits: string[]
  premium: boolean
}

export interface ShowcaseIsland {
  id: IslandId
  name: string
  sample: string
  land: string
  accent: string
  x: number
  y: number
  main?: boolean
  depth: number
}

export interface StoryCard {
  id: string
  text: string
  moodId: MoodId
  islandId: IslandId
  hasVoice?: boolean
  hasPhoto?: boolean
  voiceSeconds?: number
  when?: 'today' | 'earlier'
  seeded?: boolean
}

export interface GrowthView {
  level: number
  title: string
  into: number
  need: number
  remain: number
  nextLabel: string
  value: number
}

export const moods: Mood[] = [
  { id: 'kai_xin', label: '开心', color: '#2A9D8F', face: 'rad' },
  { id: 'ping_jing', label: '平静', color: '#42A5F5', face: 'meh' },
  { id: 'xing_fen', label: '兴奋', color: '#26A69A', face: 'rad' },
  { id: 'gan_dong', label: '感动', color: '#66BB6A', face: 'good' },
  { id: 'jiao_lv', label: '焦虑', color: '#5C6BC0', face: 'meh' },
  { id: 'ya_li', label: '压力', color: '#7E57C2', face: 'bad' },
  { id: 'shi_luo', label: '失落', color: '#FF9800', face: 'bad' },
  { id: 'fen_nu', label: '愤怒', color: '#EF5350', face: 'awful' },
]

export const companions: Companion[] = [
  {
    id: 'xiao_xingzai',
    name: '小星仔',
    tagline: '活泼小包子头 · 行动派成长搭子 · 把今天的小事一颗颗装进小岛',
    greeting: '今天也很好。先写一句，我帮你装进小岛。',
    aside: '认真做完的一件小事，也值得被看见。',
    traits: ['活泼好奇', '行动派', '把小事当宝藏'],
    premium: false,
  },
  {
    id: 'xiao_guangbao',
    name: '小光宝',
    tagline: '温柔水滴头 · 倾听型心情伙伴 · 把心情擦亮，轻轻照亮每一天',
    greeting: '想说的时候我听着。不想说的时候，光也留在这里。',
    aside: '被看见的情绪会轻一点。真实就好。',
    traits: ['细腻温柔', '善于倾听', '不催促'],
    premium: false,
  },
  {
    id: 'yuan',
    name: '小愿',
    tagline: '星屿会员专属的温柔伙伴 · 把小小的愿望认真珍藏',
    greeting: '一次尝试、一句心愿，我都会替你收好。',
    aside: '走得慢也没关系。每一步都算数。',
    traits: ['珍藏心愿', '温柔守望', '见证坚持'],
    premium: true,
  },
  {
    id: 'meng',
    name: '小梦',
    tagline: '星屿会员专属的治愈伙伴 · 替你守着还没实现的光',
    greeting: '平凡的今天里，也藏着下一程的可能。',
    aside: '你写下的时候，我替那些还没发生的事留一盏灯。',
    traits: ['守护梦想', '安静陪伴', '照进未来'],
    premium: true,
  },
]

export const islands: ShowcaseIsland[] = [
  {
    id: 'health',
    name: '健康岛',
    sample: '晚风里走了四十分钟，肩膀松下来了。',
    land: '#B7E0D2',
    accent: '#2A9D8F',
    x: 14,
    y: 34,
    depth: 1.3,
  },
  {
    id: 'life',
    name: '生活岛',
    sample: '灯还亮着。今天可以回来看看。',
    land: '#C9E8B8',
    accent: '#52B788',
    x: 40,
    y: 40,
    main: true,
    depth: 1,
  },
  {
    id: 'work',
    name: '工作岛',
    sample: '会上有一句没来得及说，先记在这里。',
    land: '#F6D7A8',
    accent: '#E09F3E',
    x: 68,
    y: 30,
    depth: 1.45,
  },
  {
    id: 'emotion',
    name: '情绪岛',
    sample: '有一点沉，也可以先放在这。',
    land: '#F4C9D6',
    accent: '#E5989B',
    x: 86,
    y: 48,
    depth: 1.2,
  },
  {
    id: 'social',
    name: '人际岛',
    sample: '和朋友在路口多站了一会儿。',
    land: '#F8CDB4',
    accent: '#E8A87C',
    x: 22,
    y: 62,
    depth: 0.8,
  },
  {
    id: 'study',
    name: '学习岛',
    sample: '读完了拖延很久的那一章。',
    land: '#D5E2FA',
    accent: '#5EA9FF',
    x: 52,
    y: 64,
    depth: 0.7,
  },
]

export const studioSeeds: StoryCard[] = [
  {
    id: 'seed-life',
    text: '把灯留到很晚，只是想把今天放好。',
    moodId: 'ping_jing',
    islandId: 'life',
    seeded: true,
  },
  {
    id: 'seed-health',
    text: '晚风里走了四十分钟，肩膀松下来了。',
    moodId: 'ping_jing',
    islandId: 'health',
    hasVoice: true,
    voiceSeconds: 8,
    seeded: true,
  },
  {
    id: 'seed-social',
    text: '和朋友在路口多站了一会儿。',
    moodId: 'gan_dong',
    islandId: 'social',
    hasPhoto: true,
    seeded: true,
  },
  {
    id: 'seed-study',
    text: '读完了拖延很久的那一章。',
    moodId: 'kai_xin',
    islandId: 'study',
    seeded: true,
  },
]

export const quickPrompts: { text: string; moodId: MoodId }[] = [
  { text: '晚风里走了很久，肩膀终于松下来。', moodId: 'ping_jing' },
  { text: '妈妈打电话来，只问我吃了没。', moodId: 'gan_dong' },
  { text: '会上有一句没来得及说，先记在工作岛。', moodId: 'ya_li' },
  { text: '把没写完的一段又读了一遍。', moodId: 'ping_jing' },
  { text: '今天有点沉，想把这个心情留下来。', moodId: 'shi_luo' },
]

export const weekDays: { id: string; label: string; moodId: MoodId; note: string }[] = [
  { id: 'mon', label: '一', moodId: 'ping_jing', note: '把桌子收拾了一下，没有多写什么。' },
  { id: 'tue', label: '二', moodId: 'ya_li', note: '会上说得很快，有一句没来得及说出口。' },
  { id: 'wed', label: '三', moodId: 'kai_xin', note: '中午出去走了走，回来时轻了一点。' },
  { id: 'thu', label: '四', moodId: 'gan_dong', note: '有人把热的饭留到了你回来。' },
  { id: 'fri', label: '五', moodId: 'jiao_lv', note: '还没做完，但你还是把它写下来了。' },
  { id: 'sat', label: '六', moodId: 'xing_fen', note: '这个下午的光很好，你想把它留下来。' },
  { id: 'sun', label: '日', moodId: 'ping_jing', note: '今天的世界很安静。一行也可以。' },
]

export const principles = [
  {
    n: '01',
    title: '世界就是首页',
    body: '打开星屿，先看见自己的岛、伙伴，和今天还亮着的光。',
  },
  {
    n: '02',
    title: '故事进入世界',
    body: '你写下生活。伙伴负责把它安放到对应的岛上。',
  },
  {
    n: '03',
    title: '世界因此改变',
    body: '文字、语音、照片和心情留下之后，树、屋子和灯会慢慢长出来。',
  },
  {
    n: '04',
    title: '回来看看',
    body: '等级、连续记录和今日天气都在。你打开它，是为了回到这片世界。',
  },
]

export const memberPlans = [
  { id: 'month', name: '月卡', period: '1 个月' },
  { id: 'quarter', name: '季卡', period: '3 个月' },
  { id: 'year', name: '年卡', period: '12 个月', hint: '应用内默认停在这里' },
]

export const memberBenefits = [
  '成长统计与等级轨迹',
  'AI 心情总结',
  '照片与语音记录',
  '更多伙伴对话',
  '更多小岛数量',
  '会员伙伴小愿、小梦',
]

const islandRules: { id: IslandId; words: string[] }[] = [
  { id: 'health', words: ['跑', '散步', '睡觉', '睡眠', '运动', '瑜伽', '身体', '肩膀', '早起', '走路', '出汗', '晚风'] },
  { id: 'social', words: ['妈妈', '爸爸', '朋友', '家人', '电话', '见面', '一起', '同事'] },
  { id: 'work', words: ['工作', '开会', '项目', '上班', '加班', '汇报', '客户', '邮件', '会上'] },
  { id: 'study', words: ['学习', '读书', '读完', '读了', '课程', '笔记', '考试', '章节', '一段'] },
  { id: 'emotion', words: ['哭', '难过', '委屈', '心情', '焦虑', '生气', '低落', '想哭', '有点沉'] },
]

export function moodById(id: MoodId): Mood {
  return moods.find((mood) => mood.id === id) ?? moods[0]
}

export function companionById(id: CompanionId): Companion {
  return companions.find((item) => item.id === id) ?? companions[0]
}

export function islandById(id: IslandId): ShowcaseIsland {
  return islands.find((island) => island.id === id) ?? islands[1]
}

export function chooseIsland(text: string, moodId: MoodId): IslandId {
  const normalized = text.replace(/\s/g, '')
  for (const rule of islandRules) {
    if (rule.words.some((word) => normalized.includes(word))) return rule.id
  }
  if (moodId === 'shi_luo' || moodId === 'jiao_lv' || moodId === 'fen_nu' || moodId === 'ya_li') {
    return 'emotion'
  }
  if (moodId === 'gan_dong') return 'social'
  return 'life'
}

export function witnessLine(name: string, islandName: string, moodLabel: string, seed: number): string {
  const lines = [
    `${name}看见了。这句${moodLabel}，安放在${islandName}。`,
    `${name}把它留在${islandName}。在这里很安全。`,
    `${islandName}因此亮了一点。${name}会记得这是真实的一天。`,
  ]
  return lines[Math.abs(seed) % lines.length]
}

export function growthView(placed: number): GrowthView {
  let xp = 78 + placed * 16
  const ladder = [
    { level: 6, title: '学习者', need: 125, next: 'Lv.7 开拓者' },
    { level: 7, title: '开拓者', need: 129, next: 'Lv.8 积累者' },
    { level: 8, title: '积累者', need: 131, next: 'Lv.9 进阶者' },
  ]
  for (let index = 0; index < ladder.length; index += 1) {
    const step = ladder[index]
    const last = index === ladder.length - 1
    if (xp < step.need || last) {
      const into = Math.min(xp, step.need)
      const remain = Math.max(step.need - xp, 0)
      return {
        level: step.level,
        title: step.title,
        into,
        need: step.need,
        remain,
        nextLabel: remain === 0 ? '这一级的光已经满了' : `距离 ${step.next} · 还需 ${remain}`,
        value: 634 + placed * 16,
      }
    }
    xp -= step.need
  }
  return {
    level: 6,
    title: '学习者',
    into: 78,
    need: 125,
    remain: 47,
    nextLabel: '距离 Lv.7 开拓者 · 还需 47',
    value: 634,
  }
}

export function islandStage(id: IslandId, stories: StoryCard[]): number {
  const count = stories.filter((story) => story.islandId === id).length
  if (id === 'life') return Math.min(3, Math.max(2, count))
  if (count <= 0) return 1
  if (count === 1) return 2
  return 3
}

export function storyBody(text: string, hasVoice: boolean, hasPhoto: boolean): string {
  const trimmed = text.trim()
  if (trimmed) return trimmed
  if (hasVoice) return '（语音记录）'
  if (hasPhoto) return '（照片记录）'
  return ''
}
