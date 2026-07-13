import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import {
  fetchDownloadManifest,
  getPlatformIcon,
  getPlatformLabel,
  type DownloadPackage,
} from '../data/downloads'

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
        if (!cancelled) {
          setError(err.message || '加载失败')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <PageShell title="下载安装" subtitle="获取成长小岛最新安装包">
      <div className="space-y-6">
        <p className="text-sm text-blue-200/70 leading-relaxed">
          请选择对应平台的安装包下载。Android 用户下载 APK 后，需在系统设置中允许「安装未知来源应用」。
          iOS 版本暂未提供公开下载，敬请期待。
        </p>

        {loading && (
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-sm text-blue-200/70 text-center">
            正在读取安装包信息...
          </div>
        )}

        {error && (
          <div className="p-6 rounded-xl bg-red-500/10 border border-red-400/20 text-sm text-red-200/90 text-center">
            {error}
          </div>
        )}

        {!loading && !error && packages.length === 0 && (
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-sm text-blue-200/70 text-center">
            暂无可下载的安装包
          </div>
        )}

        <div className="grid gap-4">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-emerald-500/20 border border-white/10 text-2xl shrink-0">
                  {getPlatformIcon(pkg.platform)}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-white truncate">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-blue-200/60 mt-0.5">
                    {getPlatformLabel(pkg.platform)} · v{pkg.version} · {pkg.size}
                  </p>
                  <p className="text-sm text-blue-100/70 mt-1">{pkg.description}</p>
                  <p className="text-xs text-blue-200/40 mt-1 truncate" title={pkg.filename}>
                    安装包：{pkg.filename}
                  </p>
                  <p className="text-xs text-blue-200/40 mt-0.5">
                    更新：{pkg.updatedAt}
                  </p>
                </div>
              </div>

              <a
                href={pkg.url}
                download={pkg.filename}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-400 hover:to-blue-400 transition-all shadow-lg shadow-indigo-500/20 shrink-0"
              >
                ⬇ 下载安装包
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
