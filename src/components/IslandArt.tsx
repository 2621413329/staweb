import type { IslandId, Sky } from '../data/site'

const storyArt: Record<IslandId, string> = {
  work: '/islands/work.webp',
  study: '/islands/study.webp',
  health: '/islands/health.webp',
  social: '/islands/social.webp',
  life: '/islands/life.webp',
  wealth: '/islands/wealth.webp',
}

function islandFilter(lamp: number, sky: Sky) {
  const skyDim = sky === 'night' ? 0.78 : sky === 'rain' ? 0.9 : sky === 'cloud' ? 0.96 : 1
  const brightness = (0.78 + lamp * 0.28) * skyDim
  return `brightness(${brightness}) drop-shadow(0 10px 12px rgba(80, 140, 190, 0.22))`
}

export function MainIslandArt({
  level = 1,
  lamp = 1,
  sky = 'clear',
  detailed = false,
}: {
  level?: number
  lamp?: number
  sky?: Sky
  detailed?: boolean
}) {
  return (
    <span className="island-stack" aria-hidden="true">
      <img className="island-photo" src="/islands/main.webp" alt="" style={{ filter: islandFilter(lamp, sky) }} />
      {detailed && (
        <>
          <img className={`island-prop prop-plaza bld${level >= 12 ? ' on' : ''}`} src="/islands/plaza.webp" alt="" />
          <img className={`island-prop prop-stone bld${level >= 1 ? ' on' : ''}`} src="/islands/starter-stone.webp" alt="" />
          <img className={`island-prop prop-house bld${level >= 6 ? ' on' : ''}`} src="/islands/growth-house.webp" alt="" />
          <img className={`island-prop prop-fountain bld${level >= 12 ? ' on' : ''}`} src="/islands/fountain.webp" alt="" />
          <img className={`island-prop prop-tree bld${level >= 20 ? ' on' : ''}`} src="/islands/life-tree.webp" alt="" />
        </>
      )}
      <img className="island-prop prop-lamp" src="/islands/lighthouse.webp" alt="" style={{ opacity: 0.45 + lamp * 0.55 }} />
      {detailed && (
        <img className={`island-prop prop-scope bld${level >= 20 ? ' on' : ''}`} src="/islands/observatory.webp" alt="" />
      )}
    </span>
  )
}

export function StoryIslandArt({
  id,
  lamp = 0.85,
  sky = 'clear',
}: {
  id: IslandId
  lamp?: number
  sky?: Sky
}) {
  return <img className="island-photo" src={storyArt[id]} alt="" style={{ filter: islandFilter(lamp, sky) }} />
}

export function AvatarFace({ tint, name }: { tint: string; name: string }) {
  const eyes = name === '小梦' ? 28 : 30
  const mouth = name === '小光宝' ? 'M26 40 Q32 43 38 40' : name === '小愿' ? 'M27 40 H37' : 'M26 39 Q32 45 38 39'
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill={tint} />
      <circle cx="24" cy={eyes} r="2" fill="#2C3E50" />
      <circle cx="40" cy={eyes} r="2" fill="#2C3E50" />
      <path d={mouth} fill="none" stroke="#2C3E50" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
