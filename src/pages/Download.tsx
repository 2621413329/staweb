import { Link } from 'react-router-dom'
import IslandScene from '../components/IslandScene'
import Shell from '../components/Shell'

export default function Download() {
  return (
    <Shell>
      <section className="section">
        <div className="wrap download-grid">
          <div>
            <header className="page-head">
              <h1>回到你的岛。</h1>
            </header>
            <div className="store-actions">
              <div>
                <a className="btn btn-primary" href="#app-store">
                  App Store
                </a>
                <p className="fine">上线地址待填入</p>
                <div className="qr">打包时替换</div>
              </div>
              <div>
                <a className="btn btn-secondary" href="#android">
                  Android
                </a>
                <p className="fine">上线地址待填入</p>
                <div className="qr">打包时替换</div>
              </div>
            </div>
            <ol className="steps">
              <li>1. 下载</li>
              <li>2. 选一个伙伴（小星仔或小光宝）</li>
              <li>3. 写下第一句</li>
            </ol>
            <p style={{ marginTop: 16 }}>今天，有没有一个你想留住的瞬间？不必是大事。一行也可以。</p>
            <p className="fine">
              协议与隐私见 <Link to="/terms">用户协议</Link> 与 <Link to="/privacy">隐私政策</Link>。
            </p>
          </div>
          <IslandScene level={6} lamps={{ main: 1, work: 0.5, study: 0.5, health: 0.7, social: 0.5, life: 0.6, wealth: 0.45 }} />
        </div>
        <div id="app-store" />
        <div id="android" />
      </section>
    </Shell>
  )
}
