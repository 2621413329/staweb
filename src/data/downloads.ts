export type DownloadPlatform = 'android' | 'ios' | 'other'

export interface DownloadPackage {
  id: string
  filename: string
  name: string
  platform: DownloadPlatform
  version: string
  size: string
  sizeBytes: number
  description: string
  url: string
  updatedAt: string
}

export interface DownloadManifest {
  generatedAt: string
  packages: DownloadPackage[]
}

export function getPlatformLabel(platform: DownloadPlatform): string {
  switch (platform) {
    case 'android':
      return 'Android'
    case 'ios':
      return 'iOS'
    default:
      return '其他'
  }
}

export async function fetchDownloadManifest(): Promise<DownloadManifest> {
  const response = await fetch(`/downloads/manifest.json?t=${Date.now()}`)
  if (!response.ok) {
    throw new Error('无法读取安装包列表')
  }
  return response.json() as Promise<DownloadManifest>
}
