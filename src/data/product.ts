export type AppScreen = 'island' | 'today' | 'insights' | 'more'

export type MoodId = 'kai_xin' | 'ping_jing' | 'gan_dong' | 'jiao_lv' | 'shi_luo'

export type RitualIslandId = 'study' | 'health' | 'life' | 'emotion'

export interface MoodChoice {
  id: MoodId
  label: string
  color: string
  sky: string
  sea: string
}

export const moods: MoodChoice[] = [
  { id: 'kai_xin', label: '开心', color: '#2A9D8F', sky: '#E7F6F2', sea: '#B7DDD4' },
  { id: 'ping_jing', label: '平静', color: '#5B93C7', sky: '#F4E7D8', sea: '#C5D7E8' },
  { id: 'gan_dong', label: '感动', color: '#6AAA72', sky: '#F8EFE4', sea: '#C9DDC8' },
  { id: 'jiao_lv', label: '焦虑', color: '#6A73B5', sky: '#E7E6F4', sea: '#C9C8E2' },
  { id: 'shi_luo', label: '失落', color: '#E09A45', sky: '#F8E6D4', sea: '#E4CDB4' },
]

export const moodById = Object.fromEntries(moods.map((mood) => [mood.id, mood])) as Record<
  MoodId,
  MoodChoice
>

export interface RitualIsland {
  id: RitualIslandId
  name: string
  x: number
  y: number
  tint: string
  land: string
  change: string
}

export const ritualIslands: RitualIsland[] = [
  {
    id: 'study',
    name: '学习岛',
    x: 24,
    y: 30,
    tint: '#7E9A92',
    land: '#8FB9A4',
    change: '小路又亮了一段',
  },
  {
    id: 'health',
    name: '健康岛',
    x: 74,
    y: 28,
    tint: '#6BAF8D',
    land: '#7DC49A',
    change: '草地长高了一点',
  },
  {
    id: 'emotion',
    name: '情绪岛',
    x: 28,
    y: 68,
    tint: '#8E96C4',
    land: '#A9B0D4',
    change: '潮水变得更缓',
  },
  {
    id: 'life',
    name: '生活岛',
    x: 72,
    y: 66,
    tint: '#E0A37A',
    land: '#E7C09A',
    change: '窗灯点亮了',
  },
]

export const ritualIslandById = Object.fromEntries(
  ritualIslands.map((island) => [island.id, island]),
) as Record<RitualIslandId, RitualIsland>

export interface StoryPreset {
  id: string
  text: string
  island: RitualIslandId
  mood: MoodId
}

export const storyPresets: StoryPreset[] = [
  {
    id: 'study',
    text: '今晚把那章读完了，窗外的灯还亮着。',
    island: 'study',
    mood: 'ping_jing',
  },
  {
    id: 'health',
    text: '跑完三公里，风比预想的温柔。',
    island: 'health',
    mood: 'kai_xin',
  },
  {
    id: 'life',
    text: '妈妈打电话来，只说了一句早点睡。',
    island: 'life',
    mood: 'gan_dong',
  },
  {
    id: 'emotion',
    text: '今天有点沉，但还是愿意写下来。',
    island: 'emotion',
    mood: 'shi_luo',
  },
]

export function witnessFor(mood: MoodId): string {
  switch (mood) {
    case 'kai_xin':
      return '我看见了。世界因为这件事亮了一点。'
    case 'gan_dong':
      return '我看见了，它在这里很安全。'
    case 'shi_luo':
    case 'jiao_lv':
      return '没有一天不值得被留下。先让它在岛上歇一歇。'
    default:
      return '我把它安放好了。你可以随时回来。'
  }
}

export interface LifeIsland {
  id: string
  name: string
  line: string
  tint: string
  x: number
  y: number
}

export const lifeIslands: LifeIsland[] = [
  { id: 'study', name: '学习岛', line: '读过的章节和想通的一道题，会在这里慢慢长成小路。', tint: '#7E9A92', x: 18, y: 22 },
  { id: 'health', name: '健康岛', line: '睡眠、步伐和身体的信号，落成草地与风。', tint: '#6BAF8D', x: 42, y: 18 },
  { id: 'emotion', name: '情绪岛', line: '开心、平静、失落都可以停留。这里不打分。', tint: '#8E96C4', x: 68, y: 22 },
  { id: 'life', name: '生活岛', line: '一顿饭、一通电话、一个回家的晚上。', tint: '#E0A37A', x: 86, y: 36 },
  { id: 'social', name: '人际岛', line: '与人相处的瞬间，在这里连成桥。', tint: '#D9899A', x: 16, y: 48 },
  { id: 'work', name: '工作岛', line: '做成的事和没做成的事，都有地方放。', tint: '#C4A36A', x: 42, y: 46 },
  { id: 'creation', name: '创造岛', line: '写过、画过、做过的东西，在这里发芽。', tint: '#7EA8C4', x: 68, y: 50 },
  { id: 'finance', name: '财务岛', line: '钱的来去被轻轻记下，不变成催促。', tint: '#C49A72', x: 22, y: 72 },
  { id: 'inspiration', name: '灵感岛', line: '忽然想起来的一句，不必立刻变成计划。', tint: '#A98BC4', x: 48, y: 70 },
  { id: 'milestone', name: '里程碑岛', line: '搬家、毕业、入职。那些跨过门槛的日子。', tint: '#6AA8B0', x: 74, y: 72 },
  { id: 'achievement', name: '成就岛', line: '世界因真实的故事变化，而不是因为打卡。', tint: '#D4A056', x: 86, y: 56 },
]

export interface FeatureChapter {
  id: string
  screen: AppScreen
  witness: boolean
  kicker: string
  title: string
  body: string
  points: string[]
}

export const featureChapters: FeatureChapter[] = [
  {
    id: 'island',
    screen: 'island',
    witness: false,
    kicker: '我的岛屿',
    title: '世界就是首页',
    body: '打开星屿，先看见自己的岛。人物在，灯亮着，天气会跟着心情轻轻变。你回来，不是为了完成任务，是为了看看今天的世界。',
    points: ['岛屿、建筑与陪伴人物', '心情会染上天空和海', '底部四个主页：岛屿、日常、轨迹、更多'],
  },
  {
    id: 'today',
    screen: 'today',
    witness: false,
    kicker: '今日日常',
    title: '一行，也可以',
    body: '文字、按住说话，或放进一张照片。今天发生了什么、值得记住的一件事——小星会接住，不必写完整。',
    points: ['文字记录 / 语音记录', '相册与拍摄，只保存你选中的那张', '开心、平静、感动、焦虑、失落'],
  },
  {
    id: 'insights',
    screen: 'insights',
    witness: false,
    kicker: '成长轨迹',
    title: '回头，还能走进去',
    body: '一周的感受不会被收成成绩。本周总结、心情片段和去年的今天，是为了重新触到当时的意义。',
    points: ['心情分布与周期回顾', '小星写下的成长观察', '回到某一天的那座岛'],
  },
  {
    id: 'witness',
    screen: 'island',
    witness: true,
    kicker: '星屿见证者',
    title: '看见，安放，不评判',
    body: '小星不是来督促你变好的。它只在你把故事放进来时轻轻回应，并帮这句话找到岛上的位置。世界始终属于你。',
    points: ['不追问，不每日施压', '脆弱的句子会被轻轻接住', '提醒、陪伴形象与会员都在「更多」里'],
  },
]

export const phoneTabs: { id: AppScreen; label: string }[] = [
  { id: 'island', label: '我的岛屿' },
  { id: 'today', label: '今日日常' },
  { id: 'insights', label: '成长轨迹' },
  { id: 'more', label: '更多' },
]
