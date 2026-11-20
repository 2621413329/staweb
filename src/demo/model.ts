export type TabId = 'island' | 'records' | 'insights' | 'more'

export type MoodId =
  | 'calm'
  | 'happy'
  | 'grateful'
  | 'tired'
  | 'low'
  | 'uneasy'
  | 'focused'

export type IslandId = 'life' | 'study' | 'health' | 'social' | 'work' | 'emotion'

export type CompanionId = 'xiao_xingzai' | 'xiao_guangbao' | 'yuan' | 'meng'

export interface MoodDef {
  id: MoodId
  name: string
  color: string
  sky: [string, string]
  weather: string
}

export interface IslandDef {
  id: IslandId
  name: string
  hint: string
  color: string
  land: string
}

export interface CompanionDef {
  id: CompanionId
  name: string
  tagline: string
  premium: boolean
}

export interface Story {
  id: string
  text: string
  mood: MoodId
  island: IslandId
  photo: boolean
  voice: boolean
  createdAt: number
}

export const moods: MoodDef[] = [
  { id: 'calm', name: '平静', color: '#7EA8C8', sky: ['#F6EBDD', '#D5E4F1'], weather: '薄云' },
  { id: 'happy', name: '开心', color: '#E7A15A', sky: ['#FFE6BF', '#FFF7EA'], weather: '晴' },
  { id: 'grateful', name: '感恩', color: '#E8A87C', sky: ['#FFE3CE', '#F8D4C0'], weather: '晚霞' },
  { id: 'tired', name: '疲惫', color: '#B09BB8', sky: ['#EAD6E6', '#F4E4D6'], weather: '黄昏' },
  { id: 'low', name: '低落', color: '#8AA4C4', sky: ['#D7E1EE', '#E8DEE8'], weather: '细雨' },
  { id: 'uneasy', name: '不安', color: '#D09292', sky: ['#F3DCD8', '#E6E0F1'], weather: '风' },
  { id: 'focused', name: '专注', color: '#7DAB8E', sky: ['#DCE8DE', '#F3E6D2'], weather: '晴间' },
]

export const islands: IslandDef[] = [
  { id: 'life', name: '生活岛', hint: '灯、晚饭、住下来的一天', color: '#E8A87C', land: '#C9D7A4' },
  { id: 'study', name: '学习岛', hint: '读过、写过、想明白的', color: '#7EB6D9', land: '#B7D4C4' },
  { id: 'health', name: '健康岛', hint: '走路、睡眠、身体松开的时候', color: '#7DAB8E', land: '#A9C98A' },
  { id: 'social', name: '人际岛', hint: '想被记住的人', color: '#E7A0B4', land: '#E3C3B0' },
  { id: 'work', name: '事务岛', hint: '会议、项目、做完的一件事', color: '#C4A574', land: '#D2C39A' },
  { id: 'emotion', name: '情绪岛', hint: '还没说完的感受', color: '#B7A4D6', land: '#C9B7D4' },
]

export const catalogIslands = [
  '生活',
  '学习',
  '健康',
  '人际',
  '事务',
  '创作',
  '财务',
  '成就',
  '情绪',
  '灵感',
  '里程',
]

export const companions: CompanionDef[] = [
  { id: 'xiao_xingzai', name: '小星仔', tagline: '活泼的行动搭子，先帮你把一句放下。', premium: false },
  { id: 'xiao_guangbao', name: '小光宝', tagline: '温柔的倾听伙伴，先陪你把心情擦亮。', premium: false },
  { id: 'yuan', name: '小愿', tagline: '星屿会员专属，珍藏还没说出口的心愿。', premium: true },
  { id: 'meng', name: '小梦', tagline: '星屿会员专属，把还没实现的梦轻轻收好。', premium: true },
]

export const levelTitles = ['初到的人', '点灯的人', '种树的人', '把路走出来的人', '回去的人', '守着灯的人']

const islandRules: Array<[IslandId, RegExp]> = [
  ['study', /学|书|课|读|考试|论文|笔记/],
  ['health', /走|跑|运动|睡|吃|肩|身体|散步|休息/],
  ['social', /朋友|妈妈|家人|爸|聊|同事|想见/],
  ['work', /会议|工作|项目|上班|结论|待办/],
  ['emotion', /难过|开心|心情|哭|委屈|焦虑|想你|不安/],
]

export function moodById(id: MoodId): MoodDef {
  return moods.find((mood) => mood.id === id) ?? moods[0]
}

export function islandById(id: IslandId): IslandDef {
  return islands.find((island) => island.id === id) ?? islands[0]
}

export function companionById(id: CompanionId): CompanionDef {
  return companions.find((item) => item.id === id) ?? companions[0]
}

export function inferIsland(text: string): IslandId {
  const hit = islandRules.find(([, rule]) => rule.test(text))
  return hit?.[0] ?? 'life'
}

export function growthOf(stories: Story[]) {
  const points = stories.length * 12
  const level = Math.min(levelTitles.length, 1 + Math.floor(points / 24))
  return {
    points,
    level,
    title: levelTitles[level - 1] ?? levelTitles[0],
  }
}

export function witnessLine(companion: CompanionId, mood: MoodId): string {
  if (companion === 'xiao_guangbao') {
    const lines: Record<MoodId, string> = {
      calm: '我听见了。这一小段先放在这里，很安全。',
      happy: '今天的光被留下来了。不必再抓紧它。',
      grateful: '被谢谢过的一天，灯可以慢一点灭。',
      tired: '先歇一歇。我守着，不催你。',
      low: '我看见了。不必马上变好，它先待在这里。',
      uneasy: '我在。乱的部分也可以先被接住。',
      focused: '这件事被认真听见了。',
    }
    return lines[mood]
  }
  const lines: Record<MoodId, string> = {
    calm: '记下了。小岛因此多了一块可以回去的地方。',
    happy: '今天的光落到岛上了，我帮你点着。',
    grateful: '这一句已经装进口袋。明天还能回来看。',
    tired: '先放下这一句就好。灯还亮着。',
    low: '我看见了。它被安放好了，没有被弄丢。',
    uneasy: '先写下来，就已经往前半步。',
    focused: '这件事被放好了。小岛认得路。',
  }
  return lines[mood]
}

export function insightSummary(stories: Story[]): string {
  if (stories.length === 0) return '你的世界还在等第一个瞬间。一行也可以。'
  const latest = stories[0]
  const island = islandById(latest.island).name
  const mood = moodById(latest.mood).name
  return `最近被安放的是「${mood}」。它落在${island}。我看见了这段日子，不会替你下结论。`
}

export const voiceSamples = [
  '今天其实值得被记住，哪怕只是傍晚的风。',
  '有一句没说出口的话，我想先放在这里。',
  '走了一小段路，肩膀比早上松一点。',
]

export const tourLine = '把今天想留下来的那一句话，放在灯还亮着的地方。'

export const seedStories: Story[] = [
  {
    id: 'seed-health',
    text: '晚风里走了二十分钟，肩膀松下来了。',
    mood: 'calm',
    island: 'health',
    photo: false,
    voice: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 26,
  },
  {
    id: 'seed-life',
    text: '晚饭后把今天想说的话写下来，灯还亮着。',
    mood: 'grateful',
    island: 'life',
    photo: true,
    voice: false,
    createdAt: Date.now() - 1000 * 60 * 50,
  },
]
