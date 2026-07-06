export interface DownloadPackage {
  id: string
  name: string
  platform: 'android' | 'ios' | 'other'
  version: string
  size?: string
  description: string
  /** 相对于 public 目录的路径，如 /downloads/staweb.apk */
  url: string
  updatedAt: string
}

export const downloadPackages: DownloadPackage[] = [
  {
    id: 'android-release',
    name: '成长小岛 Android 版',
    platform: 'android',
    version: '1.0.0',
    size: '待上传',
    description: '公开测试版，适用于 Android 手机与平板。',
    url: '/downloads/staweb.apk',
    updatedAt: '2026-07-06',
  },
]

export function getPlatformLabel(platform: DownloadPackage['platform']): string {
  switch (platform) {
    case 'android':
      return 'Android'
    case 'ios':
      return 'iOS'
    default:
      return '其他'
  }
}

export function getPlatformIcon(platform: DownloadPackage['platform']): string {
  switch (platform) {
    case 'android':
      return '🤖'
    case 'ios':
      return '🍎'
    default:
      return '📦'
  }
}
