export type TabId = 'island' | 'records' | 'insights' | 'more'
export type MoodId = 'happy' | 'calm' | 'thinking' | 'sad' | 'angry'
export type CategoryId = 'study' | 'friends' | 'family' | 'sport' | 'hobby' | 'other'
export type CompanionId = 'xiao_xingzai' | 'xiao_guangbao' | 'yuan' | 'meng'
export type Phase = 'idle' | 'understanding' | 'placing' | 'settled'
export type Sheet = 'record' | 'story' | 'report' | null
export type ReportKind = 'week' | 'month'

export interface Story {
  id: string
  text: string
  mood: MoodId
  category: CategoryId
  tags: string[]
  witness: string
  decor: string
  timeLabel: string
  photo: boolean
  voice: boolean
  source: 'seed' | 'user'
}

export interface Draft {
  text: string
  mood: MoodId
  category: CategoryId | null
  photo: boolean
  voice: boolean
}

export interface ShowcaseState {
  tab: TabId
  sheet: Sheet
  report: ReportKind | null
  activeStoryId: string | null
  draft: Draft
  stories: Story[]
  phase: Phase
  pending: Draft | null
  companion: CompanionId
  reminder: boolean
  hint: string | null
  recording: boolean
  lastEvent: { decor: string; witness: string; category: CategoryId } | null
}

export interface MoodOption {
  id: MoodId
  label: string
  face: string
}

export interface CategoryOption {
  id: CategoryId
  label: string
  island: string
  tint: string
  soft: string
}

export interface CompanionOption {
  id: CompanionId
  name: string
  line: string
  traits: string[]
  member: boolean
  fill: string
}

export interface Preset {
  id: string
  title: string
  text: string
  mood: MoodId
  category: CategoryId
}

export const moods: MoodOption[] = [
  { id: 'happy', label: '开心', face: '😄' },
  { id: 'calm', label: '平静', face: '😊' },
  { id: 'thinking', label: '思考', face: '🤔' },
  { id: 'sad', label: '难过', face: '😔' },
  { id: 'angry', label: '生气', face: '😡' },
]

export const categories: CategoryOption[] = [
  { id: 'study', label: '学习', island: '学习岛', tint: '#7E6DB7', soft: '#E7E0F7' },
  { id: 'friends', label: '朋友', island: '友谊岛', tint: '#4A8FB8', soft: '#D9EEF8' },
  { id: 'family', label: '家庭', island: '家庭岛', tint: '#C97B5A', soft: '#FFE7D4' },
  { id: 'sport', label: '运动', island: '运动岛', tint: '#3E9A72', soft: '#D9F3E6' },
  { id: 'hobby', label: '兴趣', island: '兴趣岛', tint: '#C45C86', soft: '#FDE3EE' },
  { id: 'other', label: '其它', island: '星屿', tint: '#7B8A9A', soft: '#E7EEF4' },
]

export const companions: CompanionOption[] = [
  {
    id: 'xiao_xingzai',
    name: '小星仔',
    line: '活泼的行动搭子。把今天的小事一颗颗装进小岛。',
    traits: ['行动派', '先写一句', '会加油'],
    member: false,
    fill: '#F6C453',
  },
  {
    id: 'xiao_guangbao',
    name: '小光宝',
    line: '温柔的倾听伙伴。先懂你，再把这一天轻轻安放好。',
    traits: ['倾听', '不催促', '把心情擦亮'],
    member: false,
    fill: '#8EC5FF',
  },
  {
    id: 'yuan',
    name: '小愿',
    line: '星屿会员伙伴。把小小的愿望收好，陪你看见每一步。',
    traits: ['珍藏心愿', '守望', '见证坚持'],
    member: true,
    fill: '#F3A7C2',
  },
  {
    id: 'meng',
    name: '小梦',
    line: '星屿会员伙伴。把还没实现的念头照进岛上的夜里。',
    traits: ['守护梦想', '安静', '望向夜空'],
    member: true,
    fill: '#C4B5FD',
  },
]

export const presets: Preset[] = [
  {
    id: 'study-night',
    title: '夜里写完的题',
    text: '那道卡住的题终于写完了，窗外的灯还亮着。',
    mood: 'thinking',
    category: 'study',
  },
  {
    id: 'friends-walk',
    title: '路边的长谈',
    text: '和很久没见的朋友在路边站着说了很久。',
    mood: 'happy',
    category: 'friends',
  },
  {
    id: 'family-dinner',
    title: '碗里的排骨',
    text: '晚饭时妈妈把最后一块排骨夹到我碗里。',
    mood: 'calm',
    category: 'family',
  },
  {
    id: 'quiet-day',
    title: '没什么成果的一天',
    text: '今天什么都没做成，但还是想把这一天留下来。',
    mood: 'sad',
    category: 'other',
  },
]

const decorByCategory: Record<CategoryId, string> = {
  study: '图书种子',
  friends: '野趣小花',
  family: '成长小屋',
  sport: '萌芽小树',
  hobby: '缤纷花田',
  other: '记忆邮箱',
}

const levelTitles: Record<number, string> = {
  4: '成长者',
  5: '践行者',
  6: '学习者',
  7: '开拓者',
}

export function companionById(id: CompanionId): CompanionOption {
  return companions.find((item) => item.id === id) ?? companions[0]
}

export function categoryById(id: CategoryId): CategoryOption {
  return categories.find((item) => item.id === id) ?? categories[5]
}

export function moodById(id: MoodId): MoodOption {
  return moods.find((item) => item.id === id) ?? moods[1]
}

export function emptyDraft(): Draft {
  return { text: '', mood: 'calm', category: null, photo: false, voice: false }
}

function witnessFor(draft: Draft, name: string): string {
  const island = draft.category ? categoryById(draft.category).island : '岛上'
  if (draft.mood === 'sad' || draft.mood === 'angry') return '我看见了，它在这里很安全。'
  if (draft.mood === 'thinking') return `${name}先替你收着。意义可以以后再长出来。`
  if (draft.mood === 'happy') return `这一刻已经落到${island}。`
  return `它被轻轻安放在${island}。`
}

function decorFor(draft: Draft): string {
  if (draft.mood === 'sad') return '静心帐篷'
  if (draft.mood === 'angry') return '情绪风铃'
  if (!draft.category) return '记忆邮箱'
  return decorByCategory[draft.category]
}

export function tagsFor(draft: Draft): string[] {
  const tags = [
    draft.category ? categoryById(draft.category).label : '日常',
    moodById(draft.mood).label,
  ]
  if (draft.voice) tags.push('语音')
  else if (draft.photo) tags.push('照片')
  else if (draft.text.trim().length >= 18) tags.push('值得记住')
  return tags.slice(0, 3)
}

export function voiceLine(category: CategoryId | null): string {
  if (category === 'study') return '今天把没看懂的那页又读了一遍，终于顺了。'
  if (category === 'friends') return '跟朋友通了个短电话，讲完心里轻一点。'
  if (category === 'family') return '回家的路上给妈妈发了消息，她回了一个句号，但我懂。'
  if (category === 'sport') return '晚饭前出去走了二十分钟，风是凉的。'
  if (category === 'hobby') return '画到一半停下来，想把这个没画完的样子也留下。'
  return '今天其实没什么大事，但晚饭很好吃。'
}

export function growthFrom(userCount: number) {
  const xp = 48 + userCount * 22
  const span = 120
  const level = Math.min(7, 4 + Math.floor(xp / span))
  const into = level >= 7 ? span : xp % span
  const next = level >= 7 ? null : level + 1
  return {
    level,
    title: levelTitles[level] ?? '成长者',
    next,
    nextTitle: next ? (levelTitles[next] ?? '') : '',
    into,
    span,
    percent: Math.round((into / span) * 100),
  }
}

export function presentCategories(stories: Story[]): CategoryId[] {
  return [...new Set(stories.map((story) => story.category))]
}

export function weekReport(stories: Story[], name: string): string {
  const tally = new Map<CategoryId, number>()
  for (const story of stories) {
    tally.set(story.category, (tally.get(story.category) ?? 0) + 1)
  }
  let top: CategoryId = 'other'
  let best = -1
  for (const [id, count] of tally) {
    if (count > best) {
      top = id
      best = count
    }
  }
  return `${name}看见你留下了 ${stories.length} 个瞬间。出现最多的是${categoryById(top).label}。没有一天被要求必须精彩。`
}

export function monthReport(stories: Story[], name: string): string {
  const voices = stories.filter((story) => story.voice).length
  const photos = stories.filter((story) => story.photo).length
  return `这个月的岛上有 ${stories.length} 则日常${voices ? `，其中 ${voices} 则是说出来的` : ''}${photos ? `，${photos} 则带着照片` : ''}。${name}不会替你定义它们的意义，只负责让你还能走回去。`
}

function createSeed(): Story[] {
  const study: Draft = {
    text: '上午把笔记补全了，思路终于连上。',
    mood: 'thinking',
    category: 'study',
    photo: false,
    voice: false,
  }
  const friends: Draft = {
    text: '午后和朋友绕着操场走了一圈。',
    mood: 'happy',
    category: 'friends',
    photo: false,
    voice: false,
  }
  const name = '小星仔'
  return [
    {
      id: 'seed-friends',
      text: friends.text,
      mood: friends.mood,
      category: 'friends',
      tags: tagsFor(friends),
      witness: witnessFor(friends, name),
      decor: decorFor(friends),
      timeLabel: '今天 15:40',
      photo: false,
      voice: false,
      source: 'seed',
    },
    {
      id: 'seed-study',
      text: study.text,
      mood: study.mood,
      category: 'study',
      tags: tagsFor(study),
      witness: witnessFor(study, name),
      decor: decorFor(study),
      timeLabel: '今天 11:20',
      photo: false,
      voice: false,
      source: 'seed',
    },
  ]
}

export function createInitialState(): ShowcaseState {
  return {
    tab: 'island',
    sheet: null,
    report: null,
    activeStoryId: null,
    draft: emptyDraft(),
    stories: createSeed(),
    phase: 'idle',
    pending: null,
    companion: 'xiao_xingzai',
    reminder: true,
    hint: null,
    recording: false,
    lastEvent: null,
  }
}

export type ShowcaseAction =
  | { type: 'tab'; tab: TabId }
  | { type: 'open-record' }
  | { type: 'close-sheet' }
  | { type: 'open-story'; id: string }
  | { type: 'open-report'; report: ReportKind }
  | { type: 'patch-draft'; patch: Partial<Draft> }
  | { type: 'load-preset'; id: string }
  | { type: 'companion'; id: CompanionId }
  | { type: 'toggle-reminder' }
  | { type: 'recording'; value: boolean }
  | { type: 'hint'; hint: string | null }
  | { type: 'begin-save' }
  | { type: 'commit' }
  | { type: 'settle' }
  | { type: 'clear-phase' }

function busy(phase: Phase): boolean {
  return phase === 'understanding' || phase === 'placing'
}

export function showcaseReducer(state: ShowcaseState, action: ShowcaseAction): ShowcaseState {
  switch (action.type) {
    case 'tab':
      if (busy(state.phase)) return state
      return { ...state, tab: action.tab, sheet: null, hint: null, recording: false }
    case 'open-record':
      if (busy(state.phase)) return state
      return {
        ...state,
        tab: 'island',
        sheet: 'record',
        hint: null,
        phase: state.phase === 'settled' ? 'idle' : state.phase,
      }
    case 'close-sheet':
      if (busy(state.phase)) return state
      return { ...state, sheet: null, recording: false, hint: null }
    case 'open-story':
      if (busy(state.phase)) return state
      return { ...state, sheet: 'story', activeStoryId: action.id, tab: state.tab }
    case 'open-report':
      if (busy(state.phase)) return state
      return { ...state, sheet: 'report', report: action.report, tab: 'insights' }
    case 'patch-draft':
      return { ...state, draft: { ...state.draft, ...action.patch }, hint: null }
    case 'load-preset': {
      if (busy(state.phase)) return state
      const preset = presets.find((item) => item.id === action.id)
      if (!preset) return state
      return {
        ...state,
        tab: 'island',
        sheet: 'record',
        phase: 'idle',
        hint: null,
        recording: false,
        draft: {
          text: preset.text,
          mood: preset.mood,
          category: preset.category,
          photo: false,
          voice: false,
        },
      }
    }
    case 'companion':
      return { ...state, companion: action.id }
    case 'toggle-reminder':
      return { ...state, reminder: !state.reminder, tab: 'more', sheet: null }
    case 'recording':
      return { ...state, recording: action.value }
    case 'hint':
      return { ...state, hint: action.hint }
    case 'begin-save': {
      if (busy(state.phase)) return state
      const text = state.draft.text.trim()
      if (!state.draft.category) {
        return { ...state, hint: '先选这件事更靠近哪一种生活。', sheet: 'record' }
      }
      if (!text) return { ...state, hint: '一行也可以。', sheet: 'record' }
      return {
        ...state,
        phase: 'understanding',
        pending: { ...state.draft, text },
        hint: null,
        recording: false,
        sheet: 'record',
      }
    }
    case 'commit': {
      if (!state.pending?.category) return { ...state, phase: 'idle', pending: null }
      const name = companionById(state.companion).name
      const story: Story = {
        id: `user-${Date.now()}`,
        text: state.pending.text,
        mood: state.pending.mood,
        category: state.pending.category,
        tags: tagsFor(state.pending),
        witness: witnessFor(state.pending, name),
        decor: decorFor(state.pending),
        timeLabel: '刚刚',
        photo: state.pending.photo,
        voice: state.pending.voice,
        source: 'user',
      }
      return {
        ...state,
        stories: [story, ...state.stories],
        phase: 'placing',
        pending: null,
        sheet: null,
        tab: 'island',
        draft: emptyDraft(),
        lastEvent: {
          decor: story.decor,
          witness: story.witness,
          category: story.category,
        },
      }
    }
    case 'settle':
      return { ...state, phase: 'settled' }
    case 'clear-phase':
      return { ...state, phase: 'idle' }
    default:
      return state
  }
}
