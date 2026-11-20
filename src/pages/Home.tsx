import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SiteNav from '../components/SiteNav'
import Archipelago from '../components/showcase/Archipelago'
import PhonePreview from '../components/showcase/PhonePreview'
import StoryRitual from '../components/showcase/StoryRitual'
import {
  featureChapters,
  type AppScreen,
  type FeatureChapter,
} from '../data/product'

export default function Home() {
  const [heroScreen, setHeroScreen] = useState<AppScreen>('island')
  const [chapterId, setChapterId] = useState(featureChapters[0].id)
  const [phoneOverride, setPhoneOverride] = useState<AppScreen | null>(null)
  const chapter = featureChapters.find((item) => item.id === chapterId) ?? featureChapters[0]

  useEffect(() => {
    const nodes = featureChapters
      .map((item) => document.getElementById(`feature-${item.id}`))
      .filter((node): node is HTMLElement => node !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        setChapterId(visible.target.id.replace('feature-', ''))
      },
      { rootMargin: '-30% 0px -40% 0px', threshold: [0.15, 0.4, 0.7] },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setPhoneOverride(null)
  }, [chapterId])

  return (
    <div className="min-h-screen bg-sand text-ink">
      <SiteNav />

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#ffe7d1,_transparent_52%),radial-gradient(ellipse_at_bottom_right,_#e5f0e8,_transparent_46%)]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-20">
            <div>
              <p className="text-xs font-medium tracking-[0.22em] text-accent">星屿 · STAR ISLAND</p>
              <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-[1.25] tracking-tight sm:text-5xl">
                把看不见的人生，
                <br />
                变成可以回去的地方
              </h1>
              <p className="mt-5 max-w-lg text-base leading-8 text-clay">
                记录今天的一点故事，陪伴未来的成长变化。文字、语音或一张照片落进岛上，世界会自己长出灯、路和草地。你回来，是为了看看它。
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/download"
                  className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2c241e]"
                >
                  下载星屿
                </Link>
                <a
                  href="#ritual"
                  className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:border-accent"
                >
                  先安放一句
                </a>
              </div>
              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 text-sm">
                <div>
                  <dt className="text-clay">记下</dt>
                  <dd className="mt-1 font-medium">文字 · 语音 · 照片</dd>
                </div>
                <div>
                  <dt className="text-clay">长成</dt>
                  <dd className="mt-1 font-medium">灯、路、草地</dd>
                </div>
                <div>
                  <dt className="text-clay">回去</dt>
                  <dd className="mt-1 font-medium">去年的今天</dd>
                </div>
              </dl>
            </div>
            <PhonePreview screen={heroScreen} onScreenChange={setHeroScreen} />
          </div>
        </section>

        <section id="ritual" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-medium tracking-[0.18em] text-accent">故事进入世界</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              不必先选分类。说出生活，岛会接住。
            </h2>
          </div>
          <StoryRitual />
        </section>

        <section id="features" className="border-y border-line/80 bg-white/50">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-8">
            <div>
              {featureChapters.map((item) => (
                <article
                  key={item.id}
                  id={`feature-${item.id}`}
                  className="flex min-h-[56vh] flex-col justify-center py-10 lg:min-h-[64vh]"
                >
                  <p className="text-xs font-medium tracking-[0.18em] text-accent">{item.kicker}</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{item.title}</h2>
                  <p className="mt-4 max-w-xl text-base leading-8 text-clay">{item.body}</p>
                  <ul className="mt-6 space-y-2 text-sm text-ink">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 lg:hidden">
                    <ChapterPhone chapter={item} />
                  </div>
                </article>
              ))}
            </div>
            <div className="hidden lg:block">
              <div className="sticky top-24 py-16">
                <PhonePreview
                  screen={phoneOverride ?? chapter.screen}
                  onScreenChange={(screen) => {
                    setPhoneOverride(screen)
                    const match = featureChapters.find((item) => item.screen === screen && !item.witness)
                    if (match) {
                      document.getElementById(`feature-${match.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    }
                  }}
                  witness={!phoneOverride && chapter.witness ? '我看见了，它在这里很安全。' : null}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="islands" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-medium tracking-[0.18em] text-accent">同一片人生</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              十一座岛，都是你回去的路
            </h2>
            <p className="mt-4 text-base leading-8 text-clay">
              学习、健康、生活、人际、工作、财务、创造、情绪、灵感、里程碑、成就。点开任意一座，看看故事会怎样待在那里。
            </p>
          </div>
          <Archipelago />
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-[#3d3229] px-6 py-12 text-[#fff6ee] sm:px-12 sm:py-16">
            <p className="text-xs tracking-[0.2em] text-[#e8a87c]">星屿会员</p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight">
              世界可以更大，记录仍只属于你
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#f3e6da]/80">
              月卡、季卡、年卡在 App Store 里开通。会员可以打开成长统计、AI 心情总结、照片与语音记录、更多伙伴对话，以及更多小岛。价格以结算页为准，可随时在系统订阅里取消。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/download"
                className="rounded-full bg-[#fff6ee] px-5 py-2.5 text-sm font-semibold text-ink"
              >
                获取安装包
              </Link>
              <Link
                to="/terms"
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm text-[#fff6ee]"
              >
                查看订阅说明
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-xs text-clay sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>星屿 · 成长小岛。每一天都值得被安放。</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/download" className="hover:text-ink">下载</Link>
            <Link to="/privacy" className="hover:text-ink">隐私政策</Link>
            <Link to="/terms" className="hover:text-ink">用户协议</Link>
            <a href="mailto:2621413329@qq.com" className="hover:text-ink">2621413329@qq.com</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ChapterPhone({ chapter }: { chapter: FeatureChapter }) {
  const [screen, setScreen] = useState(chapter.screen)
  return (
    <PhonePreview
      screen={screen}
      onScreenChange={setScreen}
      witness={chapter.witness && screen === 'island' ? '我看见了，它在这里很安全。' : null}
    />
  )
}
