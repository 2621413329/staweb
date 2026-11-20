import { Link } from 'react-router-dom'
import Shell from '../components/Shell'

const free = [
  '一座会生长的主岛',
  '六个分类各一座故事岛',
  '用文字记下日常和心情',
  '每天第一条日常的伙伴对话',
  '本地提醒、岛上的天色、背景音乐、桌面小组件',
]

const member = [
  '照片和语音',
  '心情统计，以及按成长标签查看分布',
  '约一百字的 AI 心情总结',
  '更多伙伴对话',
  '每个分类更多座故事岛',
  '会员伙伴：小愿、小梦',
]

const plans = ['月', '季', '年']

export default function Membership() {
  return (
    <Shell>
      <section className="section">
        <div className="wrap">
          <header className="page-head">
            <h1>会员让世界装得下更多日子。</h1>
            <p>价格以 App Store 为准。也可以用激活码开通。</p>
          </header>
          <div className="split">
            <article className="card">
              <h2>一开始就有</h2>
              <ul className="plain-list">
                {free.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="card">
              <h2>开通之后</h2>
              <ul className="plain-list">
                {member.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
          <div className="price-row">
            {plans.map((plan) => (
              <article key={plan} className="card price-card">
                <h2>{plan}</h2>
                <p className="amount">在应用内查看</p>
              </article>
            ))}
          </div>
          <p className="fine" style={{ marginTop: 12 }}>
            也可在会员页输入激活码。
          </p>
          <ul className="trust">
            <li>日常默认只有你能看。</li>
            <li>AI 整理的心情和标签都可以改。</li>
            <li>注销后，账号、记录和会员权益会永久删除。</li>
          </ul>
          <Link className="btn btn-primary" to="/download">
            去应用内开通
          </Link>
        </div>
      </section>
    </Shell>
  )
}
