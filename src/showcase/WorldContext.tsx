import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  classifyStory,
  companionById,
  insightCopy,
  islandById,
  levelForNow,
  seedMoments,
  witnessLine,
  type CompanionId,
  type Era,
  type Moment,
  type MoodId,
  type TabId,
} from './model'

interface Flight {
  token: number
  islandId: string
}

interface WorldValue {
  moments: Moment[]
  mood: MoodId
  setMood: (mood: MoodId) => void
  companionId: CompanionId
  setCompanionId: (id: CompanionId) => void
  era: Era
  setEra: (era: Era) => void
  tab: TabId
  setTab: (tab: TabId) => void
  selectedId: string
  selectIsland: (id: string) => void
  composerOpen: boolean
  setComposerOpen: (open: boolean) => void
  draft: string
  setDraft: (value: string) => void
  attachVoice: boolean
  setAttachVoice: (value: boolean) => void
  attachPhoto: boolean
  setAttachPhoto: (value: boolean) => void
  nickname: string
  setNickname: (value: string) => void
  reminderOn: boolean
  setReminderOn: (value: boolean) => void
  soundOn: boolean
  setSoundOn: (value: boolean) => void
  flight: Flight | null
  arrivedId: string | null
  notice: string | null
  placeStory: (text?: string, mood?: MoodId) => void
  resetDemo: () => void
  visibleMoments: Moment[]
  sceneMood: MoodId
  storyCount: number
  witness: string
  insight: string
}

const WorldContext = createContext<WorldValue | null>(null)

const seedNowCount = seedMoments.filter((moment) => moment.era === 'now').length

export function WorldProvider({ children }: { children: ReactNode }) {
  const [moments, setMoments] = useState<Moment[]>(seedMoments)
  const [mood, setMood] = useState<MoodId>('ping_jing')
  const [companionId, setCompanionId] = useState<CompanionId>('xiao_guangbao')
  const [era, setEraState] = useState<Era>('now')
  const [tab, setTab] = useState<TabId>('island')
  const [selectedId, setSelectedId] = useState('home')
  const [composerOpen, setComposerOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [attachVoice, setAttachVoice] = useState(false)
  const [attachPhoto, setAttachPhoto] = useState(false)
  const [nickname, setNickname] = useState('旅人')
  const [reminderOn, setReminderOn] = useState(true)
  const [soundOn, setSoundOn] = useState(true)
  const [flight, setFlight] = useState<Flight | null>(null)
  const [arrivedId, setArrivedId] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const noticeTimer = useRef<number | null>(null)

  const setEra = useCallback((next: Era) => {
    setEraState(next)
    setSelectedId(next === 'lastYear' ? 'life' : next === 'lastWeek' ? 'work' : 'home')
    setTab('island')
  }, [])

  const showNotice = useCallback((message: string) => {
    setNotice(message)
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current)
    noticeTimer.current = window.setTimeout(() => setNotice(null), 3200)
  }, [])

  const placeStory = useCallback(
    (text?: string, nextMood?: MoodId) => {
      if (era !== 'now') {
        showNotice('先回到「此刻」，再安放今天的故事。')
        setEra('now')
        return
      }
      const body = (text ?? draft).trim()
      if (!body && !attachVoice && !attachPhoto) {
        showNotice('一行也可以。写下来，或留下一段语音、一张照片。')
        return
      }
      const content = body || (attachVoice ? '一段语音里的日常' : '一张刚留下的照片')
      const feeling = nextMood ?? mood
      const islandId = classifyStory(content)
      const island = islandById(islandId)
      const before = levelForNow(moments.filter((item) => item.era === 'now').length - seedNowCount)
      const moment: Moment = {
        id: `m-${Date.now()}`,
        text: content,
        mood: feeling,
        islandId,
        era: 'now',
        day: '今天',
        voice: attachVoice || undefined,
        photo: attachPhoto || undefined,
      }
      setMoments((prev) => [moment, ...prev])
      setMood(feeling)
      setSelectedId(islandId)
      setTab('island')
      setComposerOpen(false)
      setDraft('')
      setAttachVoice(false)
      setAttachPhoto(false)
      const token = Date.now()
      setFlight({ token, islandId })
      setArrivedId(null)
      window.setTimeout(() => setArrivedId(islandId), 900)
      window.setTimeout(() => {
        setFlight(null)
        setArrivedId(null)
      }, 2200)
      const after = levelForNow(
        moments.filter((item) => item.era === 'now').length - seedNowCount + 1,
      )
      if (after.level > before.level) {
        showNotice(`主岛长高了一点。现在是 Lv.${after.level} ${after.title}，梦想天文台亮了。`)
      } else {
        showNotice(`已安放到${island.name}。世界轻轻变了一点。`)
      }
    },
    [attachPhoto, attachVoice, draft, era, moments, mood, setEra, showNotice],
  )

  const resetDemo = useCallback(() => {
    setMoments(seedMoments)
    setMood('ping_jing')
    setCompanionId('xiao_guangbao')
    setEra('now')
    setTab('island')
    setSelectedId('home')
    setDraft('')
    setAttachVoice(false)
    setAttachPhoto(false)
    setFlight(null)
    setArrivedId(null)
    showNotice('演示已回到最初的岛。')
  }, [setEra, showNotice])

  const visibleMoments = useMemo(
    () => moments.filter((moment) => moment.era === era),
    [era, moments],
  )

  const storyCount = visibleMoments.length
  const sceneMood: MoodId =
    era === 'now' ? mood : (visibleMoments[0]?.mood ?? 'ping_jing')
  const companion = companionById(companionId)
  const selected = islandById(selectedId)
  const selectedStory = visibleMoments.find((moment) => moment.islandId === selectedId)
  const witness =
    selectedId === 'home'
      ? era === 'now'
        ? `${companion.name}在主岛上。故事会从这里飞向它该去的岛。`
        : `${companion.name}还在。你回来的时候，家没有变。`
      : selectedStory
        ? witnessLine(companion, selectedStory.mood, selected.name)
        : `${selected.name}还在等第一个瞬间。`

  const value = useMemo<WorldValue>(
    () => ({
      moments,
      mood,
      setMood,
      companionId,
      setCompanionId,
      era,
      setEra,
      tab,
      setTab,
      selectedId,
      selectIsland: setSelectedId,
      composerOpen,
      setComposerOpen,
      draft,
      setDraft,
      attachVoice,
      setAttachVoice,
      attachPhoto,
      setAttachPhoto,
      nickname,
      setNickname,
      reminderOn,
      setReminderOn,
      soundOn,
      setSoundOn,
      flight,
      arrivedId,
      notice,
      placeStory,
      resetDemo,
      visibleMoments,
      sceneMood,
      storyCount,
      witness,
      insight: insightCopy(visibleMoments, era),
    }),
    [
      arrivedId,
      attachPhoto,
      attachVoice,
      companionId,
      composerOpen,
      draft,
      era,
      flight,
      moments,
      mood,
      nickname,
      notice,
      placeStory,
      reminderOn,
      resetDemo,
      sceneMood,
      selectedId,
      setEra,
      soundOn,
      witness,
      storyCount,
      tab,
      visibleMoments,
    ],
  )

  return <WorldContext.Provider value={value}>{children}</WorldContext.Provider>
}

export function useWorld(): WorldValue {
  const value = useContext(WorldContext)
  if (!value) throw new Error('useWorld 需要放在 WorldProvider 里')
  return value
}
