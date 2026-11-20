import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import IslandScene from '../components/IslandScene'
import Shell from '../components/Shell'
import { fetchDownloadManifest, getPlatformLabel, type DownloadPackage } from '../data/downloads'

export default function Download() {
  const [packages, setPackages] = useState<DownloadPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchDownloadManifest()
      .then((manifest) => {
        if (!cancelled) {
          setPackages(manifest.packages)
          setError(null)
        }
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message || '无法读取安装包列表')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const hasIos = packages.some((pkg) => pkg.platform === 'ios')

  return (
    <Shell>
      <section className="section">
        <div className="wrap download-grid">
          <div>
            <header className="page-head">
              <h1>回到你的岛。</h1>
              <p>Android 安装包在这里。</p>
            </header>

            {loading && <p className="pale-note">正在读取安装包信息。</p>}
            {error && <p className="pale-note">{error}</p>}
            {!loading && !error && packages.length === 0 && (
              <p className="pale-note">暂无可下载的安装包。</p>
            )}

            <div className="package-list">
              {packages.map((pkg) => (
                <article className="card package-card" key={pkg.id}>
                  <h2>{pkg.name}</h2>
                  <p className="pale-note">
                    {getPlatformLabel(pkg.platform)} · v{pkg.version} · {pkg.size}
                  </p>
                  <p>{pkg.description}</p>
                  <p className="fine">更新 {pkg.updatedAt}</p>
                  <a className="btn btn-primary" href={pkg.url} download={pkg.filename}>
                    下载安装包
                  </a>
                </article>
              ))}
            </div>

            <ol className="steps">
              <li>1. 下载</li>
              <li>2. 选一个伙伴（小星仔或小光宝）</li>
              <li>3. 写下第一句</li>
            </ol>
            <p style={{ marginTop: 16 }}>今天，有没有一个你想留住的瞬间？不必是大事。一行也可以。</p>
            <p className="fine">Android 下载后，在系统设置里允许安装未知来源应用。</p>
            {!hasIos && <p className="fine">iOS 暂未提供公开下载。</p>}
            <p className="fine">
              协议与隐私见 <Link to="/terms">用户协议</Link> 与 <Link to="/privacy">隐私政策</Link>。
            </p>
          </div>
          <IslandScene level={6} lamps={{ main: 1, work: 0.5, study: 0.5, health: 0.7, social: 0.5, life: 0.6, wealth: 0.45 }} />
        </div>
      </section>
    </Shell>
  )
}
