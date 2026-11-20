import { useEffect, useRef, type RefObject } from 'react'
import { Link } from 'react-router-dom'
import { DemoProvider, useDemo } from '../showcase/demo-context'
import PhoneStage from '../showcase/PhoneStage'
import type { ScreenId } from '../data/showcase'

const chapters: {
  screen: ScreenId
  index: string
  title: string
  body: string
  points: string[]
}[] = [
  {
    screen: 'island',
    index: '01',
    title: '世界就是首页',
    body: '打开星屿，先看见自己的岛。等级、天气和伙伴都在，但你回来是为了看看这片地方今天有没有长高。',
    points: [
      '主岛是家，故事岛围在旁边',
      '点一座岛，看安放在那里的日常',
      '朋友岛还没亮，等第一段关于朋友的故事',
    ],
  },
  {
    screen: 'today',
    index: '02',
    title: '故事进入世界',
    body: '选一种真实感受，写下一句就够。也可以带上照片或一段语音。伙伴会读懂它，标上标签，再帮你放进对应的小岛。',
    points: [
      '八种感受：开心、平静、兴奋、感动、焦虑、压力、失落、愤怒',
      '点示例句，或自己写。然后按「记录并分析」',
      '可以改标签、换小岛，再看着它落下',
    ],
  },
  {
    screen: 'growth',
    index: '03',
    title: '意义慢慢被看见',
    body: '成长轨迹把心情和标签摊开。切换近 7 天、近 30 天和全部，观察会跟着变。它不评价你好不好。',
    points: [
      '心情分布和标签次数来自你刚写下的故事',
      '一段观察，只描述这段时间发生了什么',
    ],
  },
  {
    screen: 'more',
    index: '04',
    title: '有人见证，但不催你',
    body: '小星仔和小光宝随时可以换。小愿、小梦是会员伙伴，预览里也能听听他们的语气。提醒只在你定的时间出现。',
    points: [
      '改昵称、看等级、开关本周留下过故事的日子',
      '把晚间记录的时间拨早或拨晚',
      '岛屿音乐和操作音效按你的习惯留着',
    ],
  },
]

export default function Home() {
  return (
    <DemoProvider>
      <HomeView />
    </DemoProvider>
  )
}

function HomeView() {
  const scrollerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      id="top"
      ref={scrollerRef}
      className="page-scroll relative bg-[#f4efe6] text-[#3d3229]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-[-8%] h-[420px] w-[420px] rounded-full bg-[#d7ebe3] blur-3xl" />
        <div className="absolute left-[-10%] top-[18%] h-[380px] w-[380px] rounded-full bg-[#f6e3d0] blur-3xl" />
        <div className="absolute bottom-[8%] right-[12%] h-[300px] w-[300px] rounded-full bg-[#e3eef8] blur-3xl" />
      </div>

      <div className="relative">
        <SiteHeader />
        <main className="mx-auto grid max-w-6xl px-5 pb-20 pt-8 lg:grid-cols-[minmax(340px,400px)_minmax(0,1fr)] lg:gap-x-14 lg:px-8">
          <header className="lg:col-start-2 lg:row-start-1">
            <p className="text-[13px] font-medium tracking-[0.18em] text-[#5a9a6e]">
              星屿 · 成长小岛
            </p>
            <h1 className="mt-3 max-w-xl font-serif text-[2.1rem] font-semibold leading-[1.25] text-[#3d3229] sm:text-5xl sm:leading-[1.2]">
              把看不见的人生，变成一个可以回去的世界。
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#6d5e52] sm:text-base">
              写下今天的心情、照片和语音。星屿把它们安放到会生长的小岛上。你回来，是为了看看自己的世界。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/download"
                className="rounded-full bg-[#3d3229] px-5 py-2.5 text-sm font-semibold text-white"
              >
                下载星屿
              </Link>
              <a
                href="#studio"
                className="rounded-full bg-white/80 px-5 py-2.5 text-sm font-semibold text-[#3d3229] ring-1 ring-[#3d3229]/10"
              >
                先在这里试一次
              </a>
            </div>
          </header>

          <div className="mt-10 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:sticky lg:top-20 lg:self-start">
            <PhoneStage />
          </div>

          <div className="mt-14 lg:col-start-2 lg:mt-16">
            <ChapterList root={scrollerRef} />
            <Membership />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#3d3229]/10 bg-[#f4efe6]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#5a9a6e] text-sm font-semibold text-white">
            屿
          </span>
          <span>
            <span className="block text-sm font-semibold leading-tight">星屿</span>
            <span className="block text-[11px] leading-tight text-[#8c7b6b]">成长小岛</span>
          </span>
        </a>
        <nav className="flex items-center gap-1 text-[13px] sm:gap-2">
          <a href="#features" className="rounded-full px-3 py-1.5 text-[#6d5e52] hover:bg-white/70">
            功能
          </a>
          <Link to="/download" className="rounded-full px-3 py-1.5 text-[#6d5e52] hover:bg-white/70">
            下载
          </Link>
          <Link
            to="/download"
            className="hidden rounded-full bg-[#3d3229] px-3.5 py-1.5 font-semibold text-white sm:inline"
          >
            获取应用
          </Link>
        </nav>
      </div>
    </header>
  )
}

function ChapterList({ root }: { root: RefObject<HTMLDivElement | null> }) {
  const { setScreenFromScroll, setScreen } = useDemo()
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollRoot = root.current
    const nodes = listRef.current?.querySelectorAll<HTMLElement>('[data-screen]')
    if (!scrollRoot || !nodes || nodes.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!hit) return
        const screen = hit.target.getAttribute('data-screen') as ScreenId | null
        if (screen) setScreenFromScroll(screen)
      },
      { root: scrollRoot, threshold: [0.45, 0.7] },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [root, setScreenFromScroll])

  return (
    <div id="features" ref={listRef} className="space-y-6">
      {chapters.map((chapter) => (
        <article
          key={chapter.screen}
          data-screen={chapter.screen}
          className="scroll-mt-24 rounded-[1.6rem] border border-white/70 bg-white/55 p-6 shadow-[0_16px_40px_rgba(61,50,41,0.04)] sm:p-8 lg:min-h-[58vh]"
        >
          <p className="font-serif text-sm text-[#c4a574]">{chapter.index}</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold">{chapter.title}</h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#6d5e52]">{chapter.body}</p>
          <ul className="mt-5 space-y-2">
            {chapter.points.map((point) => (
              <li key={point} className="flex gap-2 text-sm leading-relaxed text-[#3d3229]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5a9a6e]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              setScreen(chapter.screen)
              document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }}
            className="mt-6 text-sm font-semibold text-[#3f7a52]"
          >
            在预览里打开
          </button>
        </article>
      ))}
    </div>
  )
}

function Membership() {
  const plans = [
    ['月卡', '订阅 1 个月'],
    ['季卡', '订阅 3 个月'],
    ['年卡', '订阅 12 个月'],
  ]
  return (
    <section className="mt-6 rounded-[1.6rem] bg-[#3d3229] px-6 py-8 text-[#f6f1e8] sm:px-8">
      <p className="text-[13px] tracking-[0.16em] text-[#e7d3b4]">星屿会员</p>
      <h2 className="mt-2 font-serif text-3xl font-semibold">更多小岛，和更完整的回顾。</h2>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75">
        成长统计、AI 心情总结、照片与语音记录、更多伙伴对话、更多小岛数量。价格以 App Store 展示为准。订阅自动续费，可在 Apple ID 的订阅中取消。
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {plans.map(([name, period]) => (
          <div key={name} className="rounded-2xl bg-white/10 px-4 py-4">
            <p className="font-semibold">{name}</p>
            <p className="mt-1 text-xs text-white/60">{period}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <Link to="/terms" className="text-[#e7d3b4] underline-offset-4 hover:underline">
          用户协议
        </Link>
        <Link to="/privacy" className="text-[#e7d3b4] underline-offset-4 hover:underline">
          隐私政策
        </Link>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[#3d3229]/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-[#8c7b6b] sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p>星屿 · 成长小岛。记录默认只给你自己看。</p>
        <div className="flex flex-wrap gap-4">
          <Link to="/download" className="hover:text-[#3d3229]">
            下载
          </Link>
          <Link to="/privacy" className="hover:text-[#3d3229]">
            隐私政策
          </Link>
          <Link to="/terms" className="hover:text-[#3d3229]">
            用户协议
          </Link>
          <span>2621413329@qq.com</span>
        </div>
      </div>
    </footer>
  )
}
