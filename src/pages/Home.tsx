import { Link } from 'react-router-dom'
import SiteNav from '../components/SiteNav'
import PhoneDemo from '../components/demo/PhoneDemo'
import { catalogIslands, islands } from '../demo/model'
import { useIslandDemo } from '../demo/useIslandDemo'

const actions = [
  {
    title: '写下一句',
    text: '文字会按内容自己找到岛。学习、走路、想见的人、做完的事，都有地方。',
    run: 'text' as const,
  },
  {
    title: '按住说话',
    text: '按住大约一秒，演示会把一句语音转成可以修改的文字，再由你决定要不要安放。',
    run: 'voice' as const,
  },
  {
    title: '看它落下',
    text: '保存之后，光点会飞向对应的岛。小屋亮灯，树和长椅随真实记录慢慢出现。',
    run: 'tour' as const,
  },
  {
    title: '回来看看',
    text: '点不同的岛回访瞬间，或打开成长轨迹，看心情被安放了几次。',
    run: 'insights' as const,
  },
]

export default function Home() {
  const demo = useIslandDemo()

  return (
    <div className="min-h-screen bg-[#FFF6EE] text-[#3D3229]">
      <SiteNav />
      <main>
        <section id="demo" className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div>
            <p className="text-sm tracking-[0.18em] text-[#C4845A]">星屿 · 成长小岛</p>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              把看不见的人生，变成一个可以回去的世界。
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#6F5C4E]">
              写下今天的一句话、按住说一段，或留下一张照片。星屿把它安放到属于你的岛上：房子会亮灯，树会慢慢长高。陪伴的人会看见，但不评判。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => demo.playTour()}
                className="rounded-full bg-[#E8A87C] px-5 py-3 text-sm font-semibold text-white"
              >
                {demo.playing ? '正在演示这一句…' : '看一句话如何落到岛上'}
              </button>
              <Link to="/download" className="rounded-full border border-[#E4CFBC] bg-white px-5 py-3 text-sm font-semibold">
                下载 Android 版
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {actions.map((action) => (
                <button
                  key={action.title}
                  type="button"
                  onClick={() => {
                    if (action.run === 'tour') demo.playTour()
                    else if (action.run === 'insights') demo.setTab('insights')
                    else demo.openComposer(action.run)
                  }}
                  className="rounded-3xl bg-white/80 p-4 text-left shadow-[0_10px_30px_rgba(120,80,40,0.04)]"
                >
                  <span className="block text-sm font-semibold">{action.title}</span>
                  <span className="mt-1 block text-xs leading-5 text-[#8C7B6B]">{action.text}</span>
                </button>
              ))}
            </div>
          </div>
          <PhoneDemo demo={demo} />
        </section>

        <section id="features" className="border-y border-[#F0E2D4] bg-[#FFFBF7]">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <p className="text-sm text-[#C4845A]">App 里每天会打开的四个地方</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold">世界就是首页，故事自己走进去。</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Feature
                kicker="我的岛屿"
                title="回来，是为了看看世界变了没有。"
                text="岛屿上有陪伴的人、会亮的窗、随记录长出的树、长椅和灯。天气跟着心情轻轻变化。演示里可以点六座常用岛来回访。"
              />
              <Feature
                kicker="今日日常"
                title="不必选岛。你只管说出今天。"
                text="文字、按住说话、照片和七种心情。保存时，星屿按内容把这件事安放到生活、学习、健康、人际、事务或情绪。"
              />
              <Feature
                kicker="成长轨迹"
                title="意义被看见，比数字更先被看见。"
                text="心情次数、每座岛上的瞬间，以及一句不替你下结论的话。正式 App 还会做周期总结；这里的句子只在浏览器里生成。"
              />
              <Feature
                kicker="更多"
                title="伙伴、提醒，和可以慢下来的等级。"
                text="小星仔先陪你动起来，小光宝先听你说完。小愿和小梦是星屿会员伙伴。提醒只是请你回来看看，不制造没完成的压力。"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm text-[#C4845A]">真实生活长出的地形</p>
              <h2 className="mt-2 font-serif text-3xl font-semibold">一座岛对应一种被安放的生活。</h2>
              <p className="mt-4 text-sm leading-7 text-[#6F5C4E]">
                应用里准备了十一类岛屿。官网演示先打开最常回去的六座，方便直接操作。建筑不会因为签到出现，只会因为你真的留下过什么。
              </p>
            </div>
            <div>
              <div className="flex flex-wrap gap-2">
                {catalogIslands.map((name) => (
                  <span key={name} className="rounded-full bg-white px-3 py-1.5 text-sm text-[#6F5C4E]">{name}</span>
                ))}
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {islands.map((island) => (
                  <button
                    key={island.id}
                    type="button"
                    onClick={() => {
                      demo.setFocus(island.id)
                      demo.setTab('island')
                      document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                    className="rounded-3xl bg-white p-4 text-left"
                  >
                    <span className="block h-2 w-8 rounded-full" style={{ background: island.color }} />
                    <span className="mt-3 block text-sm font-semibold">{island.name}</span>
                    <span className="mt-1 block text-xs leading-5 text-[#8C7B6B]">{island.hint}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#3D3229] text-[#FFF6EE]">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm text-[#E8A87C]">见证者</p>
              <h2 className="mt-2 font-serif text-3xl font-semibold">看见，安放，等待。不教训。</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#F3E4D6]">
                星屿里的陪伴不是每天催你打卡的人。小星仔会帮你把小事装进岛上，小光宝会先听完你没说完的话。心情总结、语音转写只供自己回看，不能代替医疗或心理咨询。
              </p>
            </div>
            <div className="rounded-[2rem] bg-[#4A3B32] p-6">
              <p className="text-xs text-[#E8A87C]">小星仔</p>
              <p className="mt-2 text-lg leading-8">记下了。小岛因此多了一块可以回去的地方。</p>
              <p className="mt-6 text-xs text-[#E8A87C]">小光宝</p>
              <p className="mt-2 text-lg leading-8">我看见了。不必马上变好，它先待在这里。</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="rounded-[2rem] bg-white px-6 py-10 sm:px-10">
            <p className="text-sm text-[#C4845A]">带去手机里</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold">Android 可以现在下载。iOS 仍在准备公开包。</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6F5C4E]">
              星屿会员包含成长统计、AI 心情总结、照片与语音记录、更多伙伴对话和更多小岛。月卡、季卡、年卡的价格以 App 内展示为准。上面的手机是按当前版本交互重绘的演示，方便先感受主流程。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/download" className="rounded-full bg-[#3D3229] px-5 py-3 text-sm font-semibold text-[#FFF6EE]">前往下载</Link>
              <Link to="/privacy" className="rounded-full border border-[#E4CFBC] px-5 py-3 text-sm">隐私政策</Link>
              <Link to="/terms" className="rounded-full border border-[#E4CFBC] px-5 py-3 text-sm">用户协议</Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-[#F0E2D4] px-5 py-8 text-center text-xs text-[#8C7B6B]">
        星屿 · 成长小岛
        <span className="mx-2">·</span>
        <Link to="/privacy" className="underline">隐私政策</Link>
        <span className="mx-2">·</span>
        <Link to="/terms" className="underline">用户协议</Link>
        <span className="mx-2">·</span>
        <a href="mailto:2621413329@qq.com" className="underline">2621413329@qq.com</a>
      </footer>
    </div>
  )
}

function Feature({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return (
    <article className="rounded-[1.8rem] bg-[#FFF6EE] p-6">
      <p className="text-xs text-[#C4845A]">{kicker}</p>
      <h3 className="mt-2 font-serif text-2xl font-semibold leading-snug">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#6F5C4E]">{text}</p>
    </article>
  )
}
