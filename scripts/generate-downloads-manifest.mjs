import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const downloadsDir = join(__dirname, '../public/downloads')
const configPath = join(downloadsDir, 'downloads.config.json')
const manifestPath = join(downloadsDir, 'manifest.json')

function parseVersion(filename) {
  const match = filename.match(/(?:v|version[_-]?)(\d+(?:\.\d+)+)/i)
    ?? filename.match(/(\d+\.\d+(?:\.\d+)?)/)
  return match?.[1] ?? 'latest'
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(0)} MB`
}

function detectPlatform(filename) {
  const lower = filename.toLowerCase()
  if (lower.endsWith('.apk')) return 'android'
  if (lower.endsWith('.ipa')) return 'ios'
  return 'other'
}

function loadConfig() {
  if (!existsSync(configPath)) {
    console.warn(`Config not found: ${configPath}, will auto-scan APK files.`)
    return { packages: [] }
  }

  const raw = readFileSync(configPath, 'utf8')
  return JSON.parse(raw)
}

function buildFromConfigEntry(entry) {
  const filename = entry.filename
  if (!filename) {
    console.warn('Skipped config entry without filename:', entry)
    return null
  }

  const filePath = join(downloadsDir, filename)
  if (!existsSync(filePath)) {
    console.warn(`APK not found, skipped: ${filename}`)
    return null
  }

  const stats = statSync(filePath)
  const platform = entry.platform ?? detectPlatform(filename)

  return {
    id: filename.replace(/\.[^.]+$/, ''),
    filename,
    url: `/downloads/${encodeURIComponent(filename)}`,
    version: entry.version ?? parseVersion(filename),
    size: formatSize(stats.size),
    sizeBytes: stats.size,
    platform,
    name: entry.name ?? filename,
    description: entry.description ?? '公开测试版，适用于 Android 手机与平板。',
    updatedAt: stats.mtime.toISOString().slice(0, 10),
  }
}

function buildFromScan() {
  return readdirSync(downloadsDir)
    .filter((name) => /\.(apk|ipa)$/i.test(name))
    .map((filename) => buildFromConfigEntry({ filename }))
    .filter(Boolean)
}

mkdirSync(downloadsDir, { recursive: true })

const config = loadConfig()
const configured = config.packages?.map(buildFromConfigEntry).filter(Boolean) ?? []
const files = configured.length > 0 ? configured : buildFromScan()

const manifest = {
  generatedAt: new Date().toISOString(),
  packages: files,
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')

console.log(`Generated ${manifestPath} with ${files.length} package(s).`)
files.forEach((pkg) => {
  console.log(`  - ${pkg.filename} (v${pkg.version}, ${pkg.size})`)
})
