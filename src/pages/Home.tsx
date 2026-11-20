import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import Archipelago from '../components/showcase/Archipelago'
import PhoneApp from '../components/showcase/PhoneApp'
import PlaceStory from '../components/showcase/PlaceStory'
import { artCompanion, artFace, companions, islandById, islands } from '../showcase/model'
import type { Era } from '../showcase/model'
import { useWorld, WorldProvider } from '../showcase/WorldContext'

const eras: { id: Era; label: string }[] = [
  { id: 'now', label: '此刻' },
  { id: 'lastWeek', label: '上周' },
  { id: 'lastYear', label: '去年今天' },
]

export default function Home() {
  return (
    <WorldProvider>
      <HomePage />
    </WorldProvider>
  )
}

function HomePage() {
  const world = useWorld()
  const selected = islandById(world.selectedId)
  const stories = world.visibleMoments.filter((moment) =>
    selected.id === 'home' ? true : moment.islandId === selected.id,
  )

  return (
    <div className="min-h-screen bg-[#fff8f2] text-[#3d3229]">
      <SiteNav />

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-8 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:pt-16">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-[#c4845a]">星屿 · 成长小岛</p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.2] text-[#3d3229] sm:text-6xl">
            把看不见的人生，变成一个可以回去的世界。
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-[#6b5b4e] sm:text-lg">
            写下今天的一点故事。它会落到生活、学业、健康、人际……那些真正长出来的岛上。你再打开星屿，是为了回家看看。
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#place"
              className="rounded-full bg-[#e8a87c] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(232,168,124,0.4)]"
            >
              安放一个瞬间
            </a>
            <Link
              to="/download"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#3d3229] ring-1 ring-[#eadfd4]"
            >
              下载星屿
            </Link>
          </div>
          <dl className="mt-8 grid max-w-lg grid-cols-3 gap-3 text-sm">
            <Fact title="四页" body="岛屿、日常、轨迹、更多" />
            <Fact title="八座岛" body="故事自己找到位置" />
            <Fact title="四位伙伴" body="看见，不评判" />
          </dl>
        </div>
        <div id="app">
          <PhoneApp />
          <p className="mx-auto mt-4 max-w-sm text-center text-xs leading-relaxed text-[#8c7b6b]">
            这是按当前 App 做的可操作界面：点底部四个页签，或按中间的「＋」写下一句。画面里的岛、伙伴和建筑来自星屿本身。
          </p>
        </div>
      </section>

      <section id="place" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#c4845a]">亲手试一次</p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl">故事飞出去，世界才算收下它。</h2>
          <p className="mt-3 leading-7 text-[#6b5b4e]">
            选一种心情，写一句，或者点一条现成的日常。光点会飞向对应的岛，主岛上的小屋、灯塔会跟着你的记录出现。也可以回到上周、去年今天，看看那时的岛。
          </p>
        </div>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.35fr_0.8fr]">
          <div className="relative h-[640px] overflow-hidden rounded-[32px] shadow-[0_30px_80px_rgba(90,120,160,0.18)] sm:h-[720px]">
            <Archipelago layout="stage" />
            <div className="absolute left-4 top-4 z-10 flex gap-1 rounded-full bg-white/80 p-1 text-xs backdrop-blur">
              {eras.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => world.setEra(item.id)}
                  className={`rounded-full px-3 py-1.5 ${
                    world.era === item.id ? 'bg-[#3d3229] text-white' : 'text-[#5c4e44]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] bg-white p-5 shadow-[0_16px_40px_rgba(80,60,40,0.06)]">
              <PlaceStory />
            </div>
            <div className="rounded-[28px] bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold text-[#c4845a]">{selected.name}</p>
              <p className="mt-1 font-serif text-xl">{selected.line}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#6b5b4e]">{world.witness}</p>
              <ul className="mt-3 space-y-2">
                {stories.length === 0 && (
                  <li className="text-sm text-[#8c7b6b]">这座岛还空着。写下一句，它就会亮起来。</li>
                )}
                {stories.slice(0, 3).map((moment) => (
                  <li key={moment.id} className="rounded-2xl bg-[#fff8f2] px-3 py-2 text-sm leading-relaxed">
                    <span className="text-[11px] text-[#c4845a]">
                      {moment.day}
                      {selected.id === 'home' ? ` · ${islandById(moment.islandId).name}` : ''}
                    </span>
                    <p>{moment.text}</p>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={world.resetDemo} className="mt-3 text-xs text-[#8c7b6b] underline-offset-2 hover:underline">
                回到最初的演示
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/60">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {[
            ['我的岛屿', '世界就是首页。主岛是家，旁边的岛是生活自己长出来的地形。'],
            ['今日日常', '文字、语音、照片和心情。不必是大事，一行也可以。'],
            ['成长轨迹', '一周的心情、本周的光、等级从开拓者慢慢走到积累者。'],
            ['可以回去', '上周、去年今天。岛会变小，伙伴还在，故事还在原来的地方。'],
          ].map(([title, body]) => (
            <article key={title} className="rounded-[24px] bg-[#fff8f2] p-5">
              <h3 className="font-serif text-xl">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#6b5b4e]">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[#c4845a]">成长伙伴</p>
            <h2 className="mt-2 font-serif text-3xl">有人看见，但不催你。</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#8c7b6b]">
            演示里可以直接换伙伴，心情一变，表情也变。应用里，小愿和小梦随星屿会员开放。
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {companions.map((item) => {
            const active = world.companionId === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => world.setCompanionId(item.id)}
                className={`rounded-[28px] p-4 text-left transition ${
                  active ? 'bg-white shadow-[0_16px_40px_rgba(80,60,40,0.08)] ring-1 ring-[#e8a87c]' : 'bg-white/50'
                }`}
              >
                <img
                  src={artCompanion(item.id, world.sceneMood)}
                  alt={item.name}
                  className="mx-auto h-36 object-contain"
                />
                <div className="mt-2 flex items-center gap-2">
                  <img src={artFace(item.id, world.sceneMood)} alt="" className="h-8 w-8 object-contain" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-[11px] text-[#c4845a]">{item.member ? '星屿会员' : '一开始就在'}</p>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#6b5b4e]">{item.blurb}</p>
                <p className="mt-1 text-xs text-[#8c7b6b]">{item.title}</p>
              </button>
            )
          })}
        </div>
      </section>

      <section id="member" className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <div className="overflow-hidden rounded-[32px] bg-[#3d3229] text-[#fff8f2]">
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs tracking-[0.18em] text-[#e8a87c]">星屿会员</p>
              <h2 className="mt-2 font-serif text-3xl">想多留一点的时候，再打开它。</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[#f3e6da]">
                成长统计、AI 心情总结、照片与语音记录、更多伙伴对话、更多小岛。月卡、季卡、年卡的价格以 App Store 展示为准，可随时在 Apple ID 订阅里管理。
              </p>
              <Link
                to="/download"
                className="mt-6 inline-flex rounded-full bg-[#e8a87c] px-5 py-2.5 text-sm font-semibold text-[#3d3229]"
              >
                去下载，在应用里开通
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {islands.filter((island) => !island.home).slice(0, 6).map((island) => (
                <img key={island.id} src={`/art/lands/${island.id}.webp`} alt={island.name} className="w-full" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <img src={artCompanion(world.companionId, world.sceneMood)} alt="" className="mx-auto h-40 object-contain" />
        <h2 className="mt-2 font-serif text-3xl sm:text-5xl">今天，也是值得认真记录的一天。</h2>
        <p className="mx-auto mt-4 max-w-lg text-[#6b5b4e]">Android 公开测试包已放在下载页。iOS 版本还在准备。</p>
        <Link
          to="/download"
          className="mt-6 inline-flex rounded-full bg-[#3d3229] px-6 py-3 text-sm font-semibold text-white"
        >
          获取安装包
        </Link>
      </section>

      <SiteFooter />

      <AnimatePresence>
        {world.notice && (
          <motion.div
            className="fixed bottom-6 left-1/2 z-[70] max-w-[90vw] -translate-x-1/2 rounded-full bg-[#3d3229] px-5 py-2.5 text-sm text-white shadow-2xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
          >
            {world.notice}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Fact({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-white/70 p-3">
      <dt className="font-serif text-lg">{title}</dt>
      <dd className="mt-1 text-xs leading-5 text-[#8c7b6b]">{body}</dd>
    </div>
  )
}
