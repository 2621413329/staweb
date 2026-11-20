import { useState } from 'react'
import { Link } from 'react-router-dom'
import AppPhone from '../showcase/AppPhone'
import IslandWorld from '../showcase/IslandWorld'
import {
  categories,
  categoryById,
  companionById,
  companions,
  growthFrom,
  presets,
  type TabId,
} from '../showcase/model'
import { useShowcase } from '../showcase/useShowcase'
import SiteNav from '../components/SiteNav'

const chapters: Array<{
  id: string
  index: string
  title: string
  body: string
  action: string
  tab: TabId
  openRecord?: boolean
}> = [
  {
    id: 'world',
    index: '01',
    title: '世界就是首页',
    body: '打开星屿，先看见岛。等级、天气、主岛和因故事长出来的小岛，都在「我的岛屿」里。你回来，是为了看看今天的世界，不是为了完成一项任务。',
    action: '打开我的岛屿',
    tab: 'island',
  },
  {
    id: 'record',
    index: '02',
    title: '一行，就够留下今天',
    body: '文字、按住说话、一张照片、一个心情。先选学习、朋友、家庭、运动、兴趣或其它，伙伴再把它放进对应的岛。照片只为你保存，不拿去分析。',
    action: '写一则日常',
    tab: 'island',
    openRecord: true,
  },
  {
    id: 'witness',
    index: '03',
    title: '有人看见，但不评判',
    body: '小星仔或小光宝会理解你写下的内容，标出心情和成长标签。难过的一天也会被留下，回应只有一句：我看见了，它在这里很安全。结果都可以改。',
    action: '看今日日常',
    tab: 'records',
  },
  {
    id: 'trace',
    index: '04',
    title: '轨迹是回头看，不是成绩单',
    body: '成长轨迹把心情摊成胶囊，把标签留在手边，也能生成本周总结和月度报告。数字退到后面，世界的变化才是你能走回去的那一部分。',
    action: '打开成长轨迹',
    tab: 'insights',
  },
]

const dayMarks = [1, 7, 14, 30, 60, 90]

function dayCopy(day: number): { title: string; text: string; richness: number } {
  if (day < 7) {
    return {
      title: '第一天',
      text: '岛上只有刚冒头的草。世界还在等第一个瞬间。',
      richness: 0.08,
    }
  }
  if (day < 14) {
    return {
      title: '一周后',
      text: '岸边长出野趣小花。你开始知道，回来是为了看看它。',
      richness: 0.32,
    }
  }
  if (day < 30) {
    return {
      title: '半个月',
      text: '记忆邮箱立在路边。说出来的、写下来的，都有地方可放。',
      richness: 0.5,
    }
  }
  if (day < 60) {
    return {
      title: '一个月',
      text: '成长小屋亮了灯。家不会每天大变，但灯还在。',
      richness: 0.66,
    }
  }
  if (day < 90) {
    return {
      title: '两个月',
      text: '花田和树影都出来了。另一座小岛开始在远处冒头。',
      richness: 0.82,
    }
  }
  return {
    title: '一个季节',
    text: '温暖灯塔亮着。这些建筑都来自真实留下的日子，而不是签到。',
    richness: 1,
  }
}

export default function Home() {
  const { state, dispatch } = useShowcase()
  const [day, setDay] = useState(30)
  const preview = dayCopy(day)
  const userCount = state.stories.filter((story) => story.source === 'user').length
  const growth = growthFrom(userCount)
  const companion = companionById(state.companion)
  const last = state.lastEvent

  const openChapter = (tab: TabId, openRecord?: boolean) => {
    if (openRecord) dispatch({ type: 'open-record' })
    else dispatch({ type: 'tab', tab })
    if (window.innerWidth < 1024) {
      document.getElementById('stage')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="page-scroll bg-[#f4f8fc] text-[#243447]">
      <SiteNav />
      <main>
        <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-8 pb-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-x-14 lg:pt-14">
          <header>
            <p className="text-xs font-bold tracking-[0.18em] text-[#5EA9FF]">星屿 · 成长小岛</p>
            <h1 className="mt-3 max-w-xl text-4xl font-black leading-[1.15] tracking-tight text-[#1d3348] sm:text-5xl">
              把看不见的人生，变成一个可以回去的世界。
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#5c7084] sm:text-lg">
              写下今天真正发生的事。伙伴把它安放到会生长的小岛上——树、小屋、灯塔，都从真实的一天里长出来。你回来，不是为了打卡。
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/download"
                className="rounded-full bg-[#2f7dce] px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(47,125,206,0.25)]"
              >
                下载安装
              </Link>
              <a
                href="#try"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#2f7dce] shadow-sm"
              >
                先安放一个瞬间
              </a>
            </div>
            <dl className="mt-8 grid max-w-lg grid-cols-3 gap-3">
              <Stat k="主界面" v="四页" />
              <Stat k="记录" v="文字 / 语音 / 照片" />
              <Stat k="此刻等级" v={`Lv.${growth.level} ${growth.title}`} />
            </dl>
          </header>

          <div className="lg:row-span-3">
            <div className="lg:sticky lg:top-20">
              <AppPhone state={state} dispatch={dispatch} />
            </div>
          </div>

          <section id="try" className="scroll-mt-24">
            <h2 className="text-2xl font-black text-[#1d3348]">亲手走一遍</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#5c7084]">
              选一个现成的瞬间，或在手机里自己写。保存之后，伙伴会先理解，再把这一则放上岛，岛上长出对应的景物。
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => dispatch({ type: 'load-preset', id: preset.id })}
                  className="rounded-2xl bg-white px-3.5 py-3 text-left shadow-sm transition hover:-translate-y-0.5"
                >
                  <span className="text-[11px] font-bold text-[#5EA9FF]">
                    {categoryById(preset.category).label} · {preset.title}
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-[#243447]">{preset.text}</span>
                </button>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  dispatch({ type: 'load-preset', id: 'study-night' })
                  window.setTimeout(() => dispatch({ type: 'begin-save' }), 650)
                }}
                className="rounded-full bg-[#1d3348] px-4 py-2 text-xs font-bold text-white"
              >
                自动走一遍主路径
              </button>
              <button
                type="button"
                onClick={() => dispatch({ type: 'open-record' })}
                className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#1d3348] shadow-sm"
              >
                自己写一行
              </button>
            </div>
            <p className="mt-3 min-h-6 text-sm text-[#3E7A52]">
              {last
                ? `上一则落在${categoryById(last.category).island}，长出了${last.decor}。${last.witness}`
                : '还没有新的瞬间。岛上已有两则今天的日常，可以先点开看看。'}
            </p>
            <ol className="mt-4 grid gap-2 text-sm text-[#5c7084] sm:grid-cols-4">
              {['写下', '理解', '安放', '回去看'].map((step, index) => (
                <li key={step} className="rounded-2xl bg-white/80 px-3 py-2">
                  <span className="mr-2 font-black text-[#5EA9FF]">0{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section id="features" className="scroll-mt-24 space-y-4 pb-4">
            <h2 className="text-2xl font-black text-[#1d3348]">现在就能用到的能力</h2>
            {chapters.map((chapter) => (
              <article key={chapter.id} id={chapter.id} className="scroll-mt-24 rounded-3xl bg-white p-5 shadow-sm">
                <p className="text-xs font-black tracking-widest text-[#5EA9FF]">{chapter.index}</p>
                <h3 className="mt-1 text-xl font-black text-[#1d3348]">{chapter.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5c7084]">{chapter.body}</p>
                <button
                  type="button"
                  onClick={() => openChapter(chapter.tab, chapter.openRecord)}
                  className="mt-3 text-sm font-bold text-[#2f7dce]"
                >
                  {chapter.action} →
                </button>
              </article>
            ))}
            <div className="grid gap-2 sm:grid-cols-3">
              {categories.map((item) => (
                <div key={item.id} className="rounded-2xl px-3 py-3" style={{ background: item.soft }}>
                  <p className="text-sm font-black" style={{ color: item.tint }}>
                    {item.island}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#5c7084]">故事靠近「{item.label}」时，会被安放在这里。</p>
                </div>
              ))}
            </div>
          </section>
        </section>

        <section id="companions" className="scroll-mt-24 border-t border-[#e4eef6] bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="text-2xl font-black text-[#1d3348]">陪伴你的人</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5c7084]">
              现在站在岛上的是{companion.name}。点一个名字，右侧手机会换成这个伙伴。小愿和小梦是会员角色，预览里也可以先认识。
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {companions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => dispatch({ type: 'companion', id: item.id })}
                  className={`rounded-3xl p-4 text-left shadow-sm ${
                    state.companion === item.id ? 'bg-[#f4f8fc] ring-2 ring-[#5EA9FF]' : 'bg-[#f7fbff]'
                  }`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: item.fill }}>
                    <span className="h-5 w-5 rounded-full bg-[#FFE7C2]" />
                  </span>
                  <span className="mt-3 flex items-center gap-2">
                    <span className="font-black text-[#1d3348]">{item.name}</span>
                    {item.member && (
                      <span className="rounded-full bg-[#FFF0E6] px-2 py-0.5 text-[10px] font-bold text-[#C97B5A]">会员</span>
                    )}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-[#5c7084]">{item.line}</span>
                  <span className="mt-2 block text-[11px] font-semibold text-[#7B8A9A]">{item.traits.join(' · ')}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="return" className="scroll-mt-24">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] text-[#5EA9FF]">如果一直回来</p>
              <h2 className="mt-2 text-2xl font-black text-[#1d3348]">岛会跟着日子长，不跟着积分长。</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#5c7084]">
                拖动时间，看一座空岛怎样变成有灯的家。这是产品里的生长预览，和你刚才写下的日常分开，不会把它盖掉。
              </p>
              <label className="mt-6 block text-sm font-bold text-[#1d3348]" htmlFor="day-range">
                第 {day} 天 · {preview.title}
              </label>
              <input
                id="day-range"
                type="range"
                min={1}
                max={90}
                value={day}
                onChange={(event) => setDay(Number(event.target.value))}
                className="mt-3 w-full accent-[#2f7dce]"
              />
              <div className="mt-2 flex justify-between text-[11px] font-semibold text-[#8aa0b3]">
                {dayMarks.map((mark) => (
                  <button key={mark} type="button" onClick={() => setDay(mark)} className="hover:text-[#2f7dce]">
                    {mark}天
                  </button>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#3e5164]">{preview.text}</p>
            </div>
            <IslandWorld
              categories={[]}
              companion={state.companion}
              richness={preview.richness}
              mood="calm"
            />
          </div>
        </section>

        <section className="bg-[#1d3348] text-white">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-3xl font-black leading-tight">今天，有没有一个你想留住的瞬间？</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                不必是大事。日记默认只给你自己看。Android 安装包在下载页，iOS 可通过 App Store 获取。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/download" className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#1d3348]">
                去下载
              </Link>
              <Link to="/privacy" className="rounded-full px-5 py-2.5 text-sm font-bold text-white/80">
                隐私政策
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-[#e4eef6] px-4 py-6 text-center text-xs text-[#8aa0b3]">
        <Link to="/privacy" className="hover:text-[#2f7dce]">隐私政策</Link>
        <span className="mx-2">·</span>
        <Link to="/terms" className="hover:text-[#2f7dce]">用户协议</Link>
        <span className="mx-2">·</span>
        <a href="mailto:2621413329@qq.com" className="hover:text-[#2f7dce]">2621413329@qq.com</a>
      </footer>
    </div>
  )
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl bg-white px-3 py-3 shadow-sm">
      <dt className="text-[10px] font-bold tracking-wide text-[#8aa0b3]">{k}</dt>
      <dd className="mt-1 text-sm font-black text-[#1d3348]">{v}</dd>
    </div>
  )
}
