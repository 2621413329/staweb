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
        <p className="text-sm leading-relaxed text-[#6b5b4e]">
          请选择对应平台的安装包下载。Android 用户下载 APK 后，需在系统设置中允许「安装未知来源应用」。
          iOS 版本暂未提供公开下载。
        </p>

        {loading && (
          <div className="rounded-2xl border border-[#eadfd4] bg-[#fff8f2] p-6 text-center text-sm text-[#8c7b6b]">
            正在读取安装包信息...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && packages.length === 0 && (
          <div className="rounded-2xl border border-[#eadfd4] bg-[#fff8f2] p-6 text-center text-sm text-[#8c7b6b]">
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
              className="flex flex-col gap-4 rounded-2xl border border-[#eadfd4] bg-[#fff8f2] p-5 sm:flex-row sm:items-center"
            >
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl">
                  {getPlatformIcon(pkg.platform)}
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-base font-bold text-[#3d3229]">
                    {pkg.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#8c7b6b]">
                    {getPlatformLabel(pkg.platform)} · v{pkg.version} · {pkg.size}
                  </p>
                  <p className="mt-1 text-sm text-[#5c4e44]">{pkg.description}</p>
                  <p className="mt-1 truncate text-xs text-[#a89888]" title={pkg.filename}>
                    安装包：{pkg.filename}
                  </p>
                  <p className="mt-0.5 text-xs text-[#a89888]">
                    更新：{pkg.updatedAt}
                  </p>
                </div>
              </div>

              <a
                href={pkg.url}
                download={pkg.filename}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#3d3229] px-5 py-2.5 text-sm font-semibold text-white"
              >
                下载安装包
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
