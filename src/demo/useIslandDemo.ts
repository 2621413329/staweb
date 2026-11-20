import { useCallback, useMemo, useRef, useState } from 'react'
import {
  companionById,
  companions,
  growthOf,
  inferIsland,
  insightSummary,
  islandById,
  seedStories,
  tourLine,
  voiceSamples,
  witnessLine,
  type CompanionId,
  type IslandId,
  type MoodId,
  type Story,
  type TabId,
} from './model'

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

export function useIslandDemo() {
  const [stories, setStories] = useState<Story[]>(seedStories)
  const [tab, setTab] = useState<TabId>('island')
  const [focus, setFocus] = useState<IslandId>('life')
  const [companion, setCompanion] = useState<CompanionId>('xiao_xingzai')
  const [composerOpen, setComposerOpen] = useState(false)
  const [mode, setMode] = useState<'text' | 'voice'>('text')
  const [draft, setDraft] = useState('')
  const [mood, setMood] = useState<MoodId>('grateful')
  const [photo, setPhoto] = useState(false)
  const [voice, setVoice] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [witness, setWitness] = useState('灯还亮着。你可以随时回来看看。')
  const [pulse, setPulse] = useState(0)
  const [reminderOn, setReminderOn] = useState(true)
  const [reminderTime, setReminderTime] = useState('21:30')
  const [playing, setPlaying] = useState(false)
  const [step, setStep] = useState<string | null>(null)
  const runId = useRef(0)
  const toastTimer = useRef(0)

  const showToast = useCallback((message: string) => {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 2400)
  }, [])

  const cancelTour = useCallback(() => {
    runId.current += 1
    setPlaying(false)
    setStep(null)
  }, [])

  const openComposer = useCallback((next: 'text' | 'voice') => {
    cancelTour()
    setMode(next)
    setComposerOpen(true)
    setTab('records')
  }, [cancelTour])

  const closeComposer = useCallback(() => {
    cancelTour()
    setComposerOpen(false)
  }, [cancelTour])

  const placeStory = useCallback(
    (text: string, options?: { fromTour?: boolean; mood?: MoodId; photo?: boolean; voice?: boolean }) => {
      const content = text.trim()
      if (!content) {
        showToast('先写下一句，一行也可以。')
        return false
      }
      if (!options?.fromTour) cancelTour()
      const nextMood = options?.mood ?? mood
      const nextPhoto = options?.photo ?? photo
      const nextVoice = options?.voice ?? voice
      const island = inferIsland(content)
      const story: Story = {
        id: `story-${Date.now()}`,
        text: content,
        mood: nextMood,
        island,
        photo: nextPhoto,
        voice: nextVoice,
        createdAt: Date.now(),
      }
      setStories((current) => [story, ...current])
      setFocus(island)
      setTab('island')
      setComposerOpen(false)
      setDraft('')
      setPhoto(false)
      setVoice(false)
      setMood(nextMood)
      setPulse((value) => value + 1)
      setWitness(witnessLine(companion, nextMood))
      showToast(`已安放到${islandById(island).name}`)
      return true
    },
    [cancelTour, companion, mood, photo, showToast, voice],
  )

  const applyVoiceLine = useCallback((line: string) => {
    setDraft(line)
    setVoice(true)
    setMode('text')
    showToast('这句话已转成文字，确认后就会落到岛上。')
  }, [showToast])

  const chooseCompanion = useCallback((id: CompanionId) => {
    const item = companionById(id)
    if (item.premium) {
      showToast(`${item.name}是星屿会员伙伴。这里可以先认识，正式选择在 App 内完成。`)
      return
    }
    setCompanion(id)
    setWitness(id === 'xiao_guangbao' ? '我在。你想说的时候，我听着。' : '今天也很好。先写一句就行。')
  }, [showToast])

  const resetWorld = useCallback(() => {
    cancelTour()
    setStories([])
    setFocus('life')
    setTab('island')
    setComposerOpen(false)
    setDraft('')
    setPhoto(false)
    setVoice(false)
    setWitness('你的世界还在等第一个瞬间。')
    showToast('岛屿安静下来了。第一句可以很小。')
  }, [cancelTour, showToast])

  const restoreSample = useCallback(() => {
    cancelTour()
    setStories(seedStories)
    setFocus('life')
    setTab('island')
    setWitness('灯还亮着。你可以随时回来看看。')
  }, [cancelTour])

  const playTour = useCallback(async () => {
    const id = ++runId.current
    const alive = () => runId.current === id
    setPlaying(true)
    setStep('写下这一句')
    setTab('records')
    setComposerOpen(true)
    setMode('text')
    setDraft('')
    setMood('grateful')
    setPhoto(true)
    setVoice(false)
    for (let index = 1; index <= tourLine.length; index += 1) {
      await wait(46)
      if (!alive()) return
      setDraft(tourLine.slice(0, index))
    }
    await wait(420)
    if (!alive()) return
    setStep('落到岛上')
    placeStory(tourLine, { fromTour: true, mood: 'grateful', photo: true, voice: false })
    await wait(1500)
    if (!alive()) return
    setStep('看看轨迹')
    setTab('insights')
    await wait(2600)
    if (!alive()) return
    setStep(null)
    setTab('island')
    setPlaying(false)
  }, [placeStory])

  const growth = useMemo(() => growthOf(stories), [stories])
  const summary = useMemo(() => insightSummary(stories), [stories])
  const focusedStories = stories.filter((story) => story.island === focus)

  return {
    stories,
    focusedStories,
    tab,
    setTab,
    focus,
    setFocus,
    companion,
    companions,
    composerOpen,
    mode,
    setMode,
    draft,
    setDraft,
    mood,
    setMood,
    photo,
    setPhoto,
    voice,
    reminderOn,
    setReminderOn,
    reminderTime,
    setReminderTime,
    toast,
    witness,
    pulse,
    playing,
    step,
    growth,
    summary,
    voiceSamples,
    openComposer,
    closeComposer,
    placeStory,
    applyVoiceLine,
    chooseCompanion,
    resetWorld,
    restoreSample,
    playTour,
    cancelTour,
    showToast,
  }
}

export type IslandDemo = ReturnType<typeof useIslandDemo>
