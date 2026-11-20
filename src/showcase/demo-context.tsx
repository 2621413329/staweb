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
  companionById,
  freshComposer,
  inferStory,
  islandById,
  islandSeed,
  levelTitle,
  reminderSeed,
  storySeed,
  witnessLine,
  xpPerLevel,
  type ComposerState,
  type InsightRange,
  type IslandDef,
  type MoodId,
  type ReminderDef,
  type ScreenId,
  type SheetState,
  type StoryDef,
} from '../data/showcase'

export interface Notice {
  id: number
  title: string
  body: string
}

interface DemoState {
  screen: ScreenId
  stories: StoryDef[]
  islands: IslandDef[]
  companionId: string
  nickname: string
  reminders: ReminderDef[]
  musicOn: boolean
  sfxOn: boolean
  level: number
  xp: number
  composer: ComposerState
  sheet: SheetState
  range: InsightRange
  growthTab: 'mood' | 'tag'
  notices: Notice[]
  tourRunning: boolean
  flashIslandId: string | null
  line: string | null
}

function createState(): DemoState {
  return {
    screen: 'island',
    stories: storySeed.map((story) => ({ ...story, tags: [...story.tags] })),
    islands: islandSeed.map((island) => ({ ...island })),
    companionId: 'xiao_xingzai',
    nickname: '星屿旅人',
    reminders: reminderSeed.map((item) => ({ ...item })),
    musicOn: true,
    sfxOn: true,
    level: 6,
    xp: 740,
    composer: freshComposer(),
    sheet: null,
    range: '7',
    growthTab: 'mood',
    notices: [],
    tourRunning: false,
    flashIslandId: null,
    line: null,
  }
}

interface DemoApi {
  state: DemoState
  setScreen: (screen: ScreenId) => void
  setScreenFromScroll: (screen: ScreenId) => void
  openComposer: () => void
  closeComposer: () => void
  setText: (text: string) => void
  setMood: (mood: MoodId) => void
  togglePhoto: () => void
  toggleVoice: () => void
  toggleTag: (tag: string) => void
  setIsland: (islandId: string) => void
  analyze: () => void
  placeStory: () => void
  openSheet: (sheet: SheetState) => void
  closeSheet: () => void
  setRange: (range: InsightRange) => void
  setGrowthTab: (tab: 'mood' | 'tag') => void
  setCompanion: (id: string) => void
  setNickname: (nickname: string) => void
  toggleReminder: (id: string) => void
  setReminderTime: (id: string, time: string) => void
  toggleMusic: () => void
  toggleSfx: () => void
  dismissNotice: (id: number) => void
  runTour: () => void
  stopTour: () => void
  resetDemo: () => void
}

const DemoContext = createContext<DemoApi | null>(null)

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(createState)
  const lockUntil = useRef(0)
  const tourToken = useRef(0)
  const noticeSeq = useRef(1)
  const analyzeToken = useRef(0)

  const pushNotice = useCallback((title: string, body: string) => {
    const id = noticeSeq.current++
    setState((prev) => ({
      ...prev,
      notices: [...prev.notices, { id, title, body }].slice(-3),
    }))
    window.setTimeout(() => {
      setState((prev) => ({
        ...prev,
        notices: prev.notices.filter((item) => item.id !== id),
      }))
    }, 4200)
  }, [])

  const hold = useCallback((ms: number) => {
    lockUntil.current = Date.now() + ms
  }, [])

  const setScreen = useCallback(
    (screen: ScreenId) => {
      hold(14000)
      setState((prev) => ({
        ...prev,
        screen,
        notices: [],
        sheet: null,
        composer: screen === 'today' ? prev.composer : { ...prev.composer, open: false },
      }))
    },
    [hold],
  )

  const setScreenFromScroll = useCallback((screen: ScreenId) => {
    if (Date.now() < lockUntil.current) return
    setState((prev) => {
      if (prev.tourRunning || prev.screen === screen) return prev
      return { ...prev, screen, sheet: null }
    })
  }, [])

  const openComposer = useCallback(() => {
    hold(14000)
    setState((prev) => ({
      ...prev,
      screen: 'today',
      sheet: null,
      composer: { ...freshComposer(), open: true },
    }))
  }, [hold])

  const closeComposer = useCallback(() => {
    analyzeToken.current += 1
    setState((prev) => ({ ...prev, composer: freshComposer() }))
  }, [])

  const patchComposer = useCallback((patch: Partial<ComposerState>) => {
    setState((prev) => ({ ...prev, composer: { ...prev.composer, ...patch } }))
  }, [])

  const setText = useCallback(
    (text: string) => patchComposer({ text: text.slice(0, 140) }),
    [patchComposer],
  )
  const setMood = useCallback(
    (mood: MoodId) => patchComposer({ mood }),
    [patchComposer],
  )
  const togglePhoto = useCallback(() => {
    setState((prev) => ({
      ...prev,
      composer: { ...prev.composer, photo: !prev.composer.photo },
    }))
  }, [])
  const toggleVoice = useCallback(() => {
    setState((prev) => ({
      ...prev,
      composer: { ...prev.composer, voice: !prev.composer.voice },
    }))
  }, [])

  const toggleTag = useCallback((tag: string) => {
    setState((prev) => {
      const has = prev.composer.tags.includes(tag)
      const tags = has
        ? prev.composer.tags.filter((item) => item !== tag)
        : [...prev.composer.tags, tag]
      const island = prev.islands.find((item) => item.tag === tag)
      return {
        ...prev,
        composer: {
          ...prev.composer,
          tags,
          islandId: island ? island.id : prev.composer.islandId,
        },
      }
    })
  }, [])

  const setIsland = useCallback((islandId: string) => {
    setState((prev) => {
      const island = islandById(prev.islands, islandId)
      const tags = prev.composer.tags.includes(island.tag)
        ? prev.composer.tags
        : [island.tag, ...prev.composer.tags.filter((tag) => tag !== '日常')]
      return {
        ...prev,
        composer: { ...prev.composer, islandId, tags },
      }
    })
  }, [])

  const analyze = useCallback(() => {
    const token = ++analyzeToken.current
    setState((prev) => {
      if (!prev.composer.text.trim()) return prev
      return { ...prev, composer: { ...prev.composer, step: 'analyzing' } }
    })
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    void wait(reduce ? 200 : 900).then(() => {
      if (analyzeToken.current !== token) return
      setState((prev) => {
        if (prev.composer.step !== 'analyzing') return prev
        const inferred = inferStory(prev.composer.text, prev.composer.mood)
        return {
          ...prev,
          composer: {
            ...prev.composer,
            step: 'review',
            tags: inferred.tags,
            islandId: inferred.islandId,
            mood: inferred.mood,
          },
        }
      })
    })
  }, [])

  const placeStory = useCallback(() => {
    hold(16000)
    setState((prev) => {
      const text = prev.composer.text.trim()
      if (!text) return prev
      const island = islandById(prev.islands, prev.composer.islandId)
      const wasLocked = !island.unlocked && island.id !== 'home'
      const story: StoryDef = {
        id: `mine-${Date.now()}`,
        text,
        mood: prev.composer.mood,
        tags: prev.composer.tags.length > 0 ? prev.composer.tags : [island.tag],
        photo: prev.composer.photo,
        voice: prev.composer.voice,
        islandId: island.id === 'home' ? 'life' : island.id,
        dayOffset: 0,
        mine: true,
      }
      const targetId = story.islandId
      const islands = prev.islands.map((item) => {
        if (item.id !== targetId) return item
        return {
          ...item,
          unlocked: true,
          progress: Math.min(100, item.progress + (item.unlocked ? 10 : 24)),
        }
      })
      const gained = prev.xp + 80
      const level = Math.min(20, prev.level + (gained >= xpPerLevel ? 1 : 0))
      const xp = gained >= xpPerLevel ? gained - xpPerLevel : gained
      const leveled = level > prev.level
      const companion = companionById(prev.companionId)
      const target = islandById(islands, targetId)
      const title = wasLocked
        ? `${target.name}亮了`
        : leveled
          ? `Lv.${level} ${levelTitle(level)}`
          : `已安放到${target.name}`
      const body = wasLocked
        ? leveled
          ? `第一段故事落在这里。世界到了 Lv.${level} ${levelTitle(level)}。`
          : '第一段故事落到这里，小岛开始属于你。'
        : witnessLine(companion.id, story.mood, target.name)
      const notices = [
        ...prev.notices,
        { id: noticeSeq.current++, title, body },
      ]
      return {
        ...prev,
        stories: [story, ...prev.stories],
        islands,
        level,
        xp,
        screen: 'island' as const,
        sheet: { type: 'island', id: targetId },
        composer: freshComposer(),
        flashIslandId: targetId,
        line: witnessLine(companion.id, story.mood, target.name),
        notices: notices.slice(-3),
      }
    })
    window.setTimeout(() => {
      setState((prev) => ({ ...prev, flashIslandId: null }))
    }, 2600)
  }, [hold])

  const openSheet = useCallback((sheet: SheetState) => {
    hold(12000)
    setState((prev) => ({ ...prev, sheet }))
  }, [hold])

  const closeSheet = useCallback(() => {
    setState((prev) => ({ ...prev, sheet: null }))
  }, [])

  const setRange = useCallback((range: InsightRange) => {
    setState((prev) => ({ ...prev, range }))
  }, [])

  const setGrowthTab = useCallback((growthTab: 'mood' | 'tag') => {
    setState((prev) => ({ ...prev, growthTab }))
  }, [])

  const setCompanion = useCallback(
    (companionId: string) => {
      const companion = companionById(companionId)
      setState((prev) => ({
        ...prev,
        companionId,
        line:
          companion.id === 'xiao_guangbao'
            ? '我在。你想说的时候，我听着。'
            : companion.id === 'yuan'
              ? '你的愿望，我会一颗颗收好。'
              : companion.id === 'meng'
                ? '未完成的梦，也可以先放在岛上。'
                : '今天也很好。先写一句就行。',
      }))
      pushNotice(`成长伙伴换成了${companion.name}`, companion.tagline)
    },
    [pushNotice],
  )

  const setNickname = useCallback((nickname: string) => {
    setState((prev) => ({ ...prev, nickname: nickname.slice(0, 16) }))
  }, [])

  const toggleReminder = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      reminders: prev.reminders.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    }))
  }, [])

  const setReminderTime = useCallback((id: string, time: string) => {
    setState((prev) => ({
      ...prev,
      reminders: prev.reminders.map((item) =>
        item.id === id ? { ...item, time } : item,
      ),
    }))
  }, [])

  const toggleMusic = useCallback(() => {
    setState((prev) => ({ ...prev, musicOn: !prev.musicOn }))
  }, [])
  const toggleSfx = useCallback(() => {
    setState((prev) => ({ ...prev, sfxOn: !prev.sfxOn }))
  }, [])

  const dismissNotice = useCallback((id: number) => {
    setState((prev) => ({
      ...prev,
      notices: prev.notices.filter((item) => item.id !== id),
    }))
  }, [])

  const stopTour = useCallback(() => {
    tourToken.current += 1
    analyzeToken.current += 1
    lockUntil.current = Date.now() + 1200
    setState((prev) => ({ ...prev, tourRunning: false }))
  }, [])

  const runTour = useCallback(() => {
    const token = ++tourToken.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const alive = () => tourToken.current === token
    hold(60000)
    setState((prev) => ({
      ...prev,
      tourRunning: true,
      screen: 'today',
      sheet: null,
      composer: {
        ...freshComposer(),
        open: true,
        text: '',
        mood: 'kai_xin',
      },
    }))

    const text = '中午和同学在食堂多坐了一会儿，谁都没急着走。'
    void (async () => {
      await wait(reduce ? 40 : 360)
      if (!alive()) return
      if (reduce) {
        setState((prev) => ({ ...prev, composer: { ...prev.composer, text } }))
      } else {
        for (let i = 1; i <= text.length; i += 1) {
          if (!alive()) return
          const slice = text.slice(0, i)
          setState((prev) => ({
            ...prev,
            composer: { ...prev.composer, text: slice, open: true, step: 'edit' },
          }))
          await wait(36)
        }
      }
      if (!alive()) return
      setState((prev) => ({
        ...prev,
        composer: { ...prev.composer, mood: 'kai_xin', voice: true },
      }))
      await wait(reduce ? 40 : 520)
      if (!alive()) return
      const tokenAnalyze = ++analyzeToken.current
      setState((prev) => ({
        ...prev,
        composer: { ...prev.composer, step: 'analyzing' },
      }))
      await wait(reduce ? 180 : 980)
      if (!alive() || analyzeToken.current !== tokenAnalyze) return
      setState((prev) => {
        if (prev.composer.step !== 'analyzing') return prev
        const inferred = inferStory(prev.composer.text, prev.composer.mood)
        return {
          ...prev,
          composer: {
            ...prev.composer,
            step: 'review',
            ...inferred,
          },
        }
      })
      await wait(reduce ? 80 : 1100)
      if (!alive()) return
      setState((prev) => ({ ...prev, tourRunning: false }))
      placeStory()
    })()
  }, [hold, placeStory])

  const resetDemo = useCallback(() => {
    tourToken.current += 1
    analyzeToken.current += 1
    lockUntil.current = 0
    setState(createState())
  }, [])

  const api = useMemo<DemoApi>(
    () => ({
      state,
      setScreen,
      setScreenFromScroll,
      openComposer,
      closeComposer,
      setText,
      setMood,
      togglePhoto,
      toggleVoice,
      toggleTag,
      setIsland,
      analyze,
      placeStory,
      openSheet,
      closeSheet,
      setRange,
      setGrowthTab,
      setCompanion,
      setNickname,
      toggleReminder,
      setReminderTime,
      toggleMusic,
      toggleSfx,
      dismissNotice,
      runTour,
      stopTour,
      resetDemo,
    }),
    [
      state,
      setScreen,
      setScreenFromScroll,
      openComposer,
      closeComposer,
      setText,
      setMood,
      togglePhoto,
      toggleVoice,
      toggleTag,
      setIsland,
      analyze,
      placeStory,
      openSheet,
      closeSheet,
      setRange,
      setGrowthTab,
      setCompanion,
      setNickname,
      toggleReminder,
      setReminderTime,
      toggleMusic,
      toggleSfx,
      dismissNotice,
      runTour,
      stopTour,
      resetDemo,
    ],
  )

  return <DemoContext.Provider value={api}>{children}</DemoContext.Provider>
}

export function useDemo(): DemoApi {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error('useDemo must be used within DemoProvider')
  return ctx
}
