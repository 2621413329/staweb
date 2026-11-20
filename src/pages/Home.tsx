import { useState } from 'react'
import { Link } from 'react-router-dom'
import SiteFooter from '../components/SiteFooter'
import SiteNav from '../components/SiteNav'
import AppPhone from '../components/marketing/AppPhone'
import CompanionPicker from '../components/marketing/CompanionPicker'
import Hero from '../components/marketing/Hero'
import StoryStudio from '../components/marketing/StoryStudio'
import {
  memberBenefits,
  memberPlans,
  principles,
  type CompanionId,
} from '../data/showcase'

export default function Home() {
  const [companionId, setCompanionId] = useState<CompanionId>('xiao_xingzai')

  return (
    <div className="bg-sand text-ink">
      <SiteNav />
      <Hero companionId={companionId} />

      <section className="px-5 py-6 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((item) => (
            <article key={item.n} className="rounded-[24px] bg-white p-5 shadow-soft">
              <p className="text-xs font-medium tracking-[0.16em] text-peachdeep">{item.n}</p>
              <h2 className="mt-3 text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-mist">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <StoryStudio companionId={companionId} />

      <section id="preview" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="text-sm font-medium tracking-[0.16em] text-peachdeep">现在的星屿</p>
            <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              <span className="block">四个分页</span>
              <span className="block">中间记下今天</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-mist">
              我的岛屿、今日日常、成长轨迹、更多。果冻按钮用来快速记录。点进一条日常可以试听语音、看照片，也可以把它收回。
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed">
              <li>岛屿页看等级、天气和今天已经安放的故事。</li>
              <li>成长轨迹按一天天回看这一周的心情。</li>
              <li>更多里有会员、等级、伙伴、提醒和声音。</li>
            </ul>
          </div>
          <AppPhone companionId={companionId} />
        </div>
      </section>

      <CompanionPicker companionId={companionId} onChange={setCompanionId} />

      <section id="member" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium tracking-[0.16em] text-peachdeep">星屿会员</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">月卡、季卡、年卡</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist">
            会员打开成长统计、AI 心情总结、照片与语音、更多对话和更多小岛。价格以应用内结算页为准。
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {memberPlans.map((plan) => (
              <article key={plan.id} className="rounded-[24px] bg-white p-5 shadow-soft">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-mist">{plan.period}</p>
                {plan.hint && <p className="mt-3 text-xs text-peachdeep">{plan.hint}</p>}
              </article>
            ))}
          </div>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {memberBenefits.map((benefit) => (
              <li key={benefit} className="rounded-2xl bg-white px-4 py-3 text-sm shadow-soft">
                {benefit}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/download" className="jelly-btn inline-flex h-12 items-center rounded-full px-6 text-sm font-semibold text-white">
              下载 Android 安装包
            </Link>
            <p className="max-w-sm text-sm text-mist">iOS 公开下载还在准备。安装后可在「更多」里开通会员。</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
