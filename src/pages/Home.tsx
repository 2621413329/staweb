import { Link } from 'react-router-dom'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import IslandGlyph from '../components/showcase/IslandGlyph'
import Studio, { HeroPhone } from '../components/showcase/Studio'
import { storyIslands } from '../data/product'

const features = [
  {
    title: '世界就是首页',
    text: '打开先看见主岛：天气、成长、灯和人。故事岛环在周围，家在中间。回来是为了看看世界，不是为了打卡。',
  },
  {
    title: '故事自己进岛',
    text: '文字、语音、照片和心情收成一则故事。你不必先选分类，见证者按内容把它安放到工作、学习、健康、人际、生活这些岛上。',
  },
  {
    title: '岛会慢慢长高',
    text: '每座故事岛有十级建筑，从外圈的一个小角落，长到中心的地标。变化来自真实记录，而不是连续签到。',
  },
  {
    title: '见证者只看见',
    text: '它记住你放进来的时期，不教训，不追问，不替你解释人生。难过的故事落下时，它只说：我看见了，这里很安全。',
  },
  {
    title: '心情被轻轻看见',
    text: '一周的情绪和碎片会摊开，方便你回头看。它不打分，也不催你变得更积极。',
  },
  {
    title: '可以回到某一天',
    text: '去年的今天还在同一座岛上。故事可以导出带走；世界即使重来，也能从这些故事里再长出来。',
  },
]

const day = [
  ['开口', '写一行，或留下语音和一张照片。'],
  ['安放', '见证者把故事放到它该在的岛。'],
  ['生长', '小路、灯和建筑悄悄往前走一格。'],
  ['回去', '过很久再打开，那天还站在原地。'],
]

export default function Home() {
  return (
    <div className="min-h-full bg-[#f7f4ee] text-ink">
      <SiteNav />

      <main>
        <section id="look" className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,220,255,0.85),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(232,220,196,0.7),transparent_50%)]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:py-20">
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-[#3d7ec4]">温暖陪伴型成长记录</p>
              <h1 className="mt-4 max-w-xl font-display text-4xl leading-[1.18] text-ink sm:text-6xl">
                把看不见的人生，变成一个可以回去的世界。
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">
                成长小岛不是另一本日记。你写下今天，故事会飞向属于它的岛，灯会亮，建筑会往中心长。你再打开，是回家。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#studio" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
                  把一则故事放进岛里
                </a>
                <Link to="/download" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink ring-1 ring-ink/10">
                  下载 Android 版
                </Link>
              </div>
              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 text-sm">
                <div>
                  <dt className="text-mist">故事岛</dt>
                  <dd className="mt-1 font-display text-2xl">11</dd>
                </div>
                <div>
                  <dt className="text-mist">一座岛的建筑</dt>
                  <dd className="mt-1 font-display text-2xl">10 级</dd>
                </div>
                <div>
                  <dt className="text-mist">记录方式</dt>
                  <dd className="mt-1 font-display text-2xl">文/声/图</dd>
                </div>
              </dl>
            </div>
            <HeroPhone />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <ol className="grid gap-3 sm:grid-cols-4">
            {day.map(([title, text], index) => (
              <li key={title} className="rounded-3xl bg-white/70 px-4 py-4 ring-1 ring-ink/5">
                <p className="text-xs text-mist">0{index + 1}</p>
                <p className="mt-1 font-semibold">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-mist">{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="studio" className="scroll-mt-20 border-y border-ink/5 bg-[#f4f8fc]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <Studio />
          </div>
        </section>

        <section id="islands" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#3d7ec4]">十一座故事岛</p>
              <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">人生的不同维度，各自长成一座小镇。</h2>
              <p className="mt-4 text-base leading-relaxed text-mist">
                每条故事对应一座岛。岛是圆形草坪，四周有水。建筑从外圈的小角落往中心地标长，现在先停在起点附近。
              </p>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {storyIslands.map((island) => (
                <li
                  key={island.id}
                  className="group rounded-[28px] bg-white p-4 ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-28px_rgba(36,78,120,0.45)]"
                >
                  <div className="flex items-center gap-2">
                    <IslandGlyph island={island} size={108} />
                    <div>
                      <p className="font-semibold">{island.name}岛</p>
                      <p className="text-sm text-mist">示意 Lv.{island.level} / 10</p>
                      <p className="mt-2 text-xs text-[#3d7ec4]">
                        中心地标 · {island.landmark}
                      </p>
                    </div>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-ink/75">{island.note}</p>
                  <p className="mt-2 text-xs text-mist">现在：{island.firstBuilding}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="features" className="scroll-mt-20 bg-[#243447] text-[#f4f7fb]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <h2 className="max-w-xl font-display text-3xl leading-tight sm:text-4xl">功能都为了同一件事：让你还能回去。</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <article key={feature.title} className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{feature.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="overflow-hidden rounded-[36px] bg-gradient-to-br from-[#d7ebff] via-white to-[#f6ead4] px-6 py-10 sm:px-10 lg:flex lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl leading-tight sm:text-4xl">今天，有没有一个想留住的瞬间？</h2>
              <p className="mt-4 text-base leading-relaxed text-ink/75">
                Android 安装包可以在这里下载。iOS 公开包还在准备。装好之后，从一行开始就够了。
              </p>
            </div>
            <Link
              to="/download"
              className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white lg:mt-0"
            >
              前往下载
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
