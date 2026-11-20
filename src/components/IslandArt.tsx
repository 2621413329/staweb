import type { Sky } from '../data/site'

export function MainIslandArt({
  level,
  lamp = 1,
  sky = 'clear',
}: {
  level: number
  lamp?: number
  sky?: Sky
}) {
  return (
    <svg className="island-svg" viewBox="0 0 220 170" aria-hidden="true">
      {sky === 'night' && (
        <>
          <circle className="firefly" cx="48" cy="36" r="1.6" fill="#F5F9FF" />
          <circle className="firefly d2" cx="168" cy="32" r="1.3" fill="#F5F9FF" />
          <circle className="firefly d3" cx="150" cy="54" r="1.2" fill="#F5F9FF" />
        </>
      )}
      {sky === 'cloud' && (
        <g fill="rgba(255,255,255,0.85)">
          <ellipse cx="58" cy="34" rx="18" ry="7" />
          <ellipse cx="156" cy="28" rx="22" ry="8" />
        </g>
      )}
      {sky === 'rain' && (
        <g stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round">
          <line x1="46" y1="28" x2="42" y2="40" />
          <line x1="78" y1="22" x2="74" y2="36" />
          <line x1="156" y1="26" x2="152" y2="40" />
        </g>
      )}
      <ellipse cx="110" cy="150" rx="78" ry="12" fill="rgba(94,169,255,0.28)" />
      <path d="M28 132 C60 78 162 74 196 132 C158 150 58 152 28 132Z" fill="#C5E8C0" />
      <path d="M48 126 C80 98 148 96 176 126 C148 138 74 140 48 126Z" fill="#A6D9AC" />
      <g className={level >= 1 ? 'bld on' : 'bld'}>
        <path d="M70 118 l4 -16 l4 16" fill="none" stroke="#6EBF78" strokeWidth="2" strokeLinecap="round" />
        <path d="M88 120 l3 -11 l3 11" fill="none" stroke="#86C98C" strokeWidth="2" strokeLinecap="round" />
        <rect x="102" y="98" width="10" height="24" rx="2" fill="#E4EEF6" />
        <rect x="98" y="120" width="18" height="4" rx="1" fill="#D0DEEA" />
      </g>
      <g className={level >= 6 ? 'bld on' : 'bld'}>
        <rect x="60" y="102" width="26" height="18" rx="3" fill="#F7FBFF" />
        <path d="M55 104 L73 86 L91 104Z" fill="#8EC5FF" />
        <line x1="136" y1="86" x2="136" y2="96" stroke="#7B8A9A" strokeWidth="1" />
        <circle cx="132" cy="102" r="3" fill="#5EA9FF" opacity="0.75" />
        <circle cx="140" cy="106" r="2.6" fill="#B8DCFF" />
        <ellipse cx="156" cy="124" rx="14" ry="5" fill="rgba(94,169,255,0.4)" />
      </g>
      <g className={level >= 12 ? 'bld on' : 'bld'}>
        <ellipse cx="110" cy="126" rx="20" ry="5" fill="rgba(255,255,255,0.62)" />
        <ellipse cx="172" cy="112" rx="9" ry="3.5" fill="#8EC5FF" />
        <rect x="170" y="100" width="4" height="12" rx="1" fill="#5EA9FF" />
        <circle cx="172" cy="98" r="2.5" fill="#F5F9FF" />
      </g>
      <g className={level >= 20 ? 'bld on' : 'bld'}>
        <rect x="46" y="96" width="4" height="20" rx="1" fill="#7DAB86" />
        <circle cx="48" cy="90" r="9" fill="#6EBF78" />
        <circle cx="41" cy="96" r="6" fill="#9AD9A0" />
        <rect x="148" y="78" width="16" height="16" rx="2" fill="#F7FBFF" />
        <path d="M146 80 h20 a10 10 0 0 1 -20 0" fill="#5EA9FF" />
      </g>
      <rect x="108" y="64" width="6" height="28" rx="2" fill="#F7FBFF" />
      <path d="M104 66 h14 l-3 8 h-8z" fill="#E7F2FF" />
      <circle className="lamp-glow" cx="111" cy="60" r="9" fill="#FFE7A3" opacity={lamp * 0.35} />
      <circle className="lamp-glow" cx="111" cy="60" r="4.5" fill="#FFE7A3" opacity={lamp} />
    </svg>
  )
}

export function StoryIslandArt({
  color,
  decor,
  lamp = 0.45,
}: {
  color: string
  decor: 'lamp' | 'tree'
  lamp?: number
}) {
  const treeOpacity = 0.55 + lamp * 0.45
  return (
    <svg className="island-svg" viewBox="0 0 120 96" aria-hidden="true">
      <ellipse cx="60" cy="84" rx="40" ry="8" fill="rgba(94,169,255,0.25)" />
      <path d="M16 76 C38 46 84 44 106 76 C82 90 36 90 16 76Z" fill="#C6E8C2" />
      <path d="M30 74 C46 58 78 56 94 74 C76 82 42 84 30 74Z" fill="#A9DBB0" />
      <ellipse cx="60" cy="72" rx="26" ry="7" fill={color} opacity="0.2" />
      {decor === 'tree' ? (
        <g className="lamp-glow" opacity={treeOpacity}>
          <rect x="57" y="50" width="4" height="16" rx="1" fill="#7DAB86" />
          <circle cx="59" cy="44" r="10" fill={color} />
          <circle cx="50" cy="50" r="6" fill="#B7E6BC" />
        </g>
      ) : (
        <>
          <rect x="56" y="48" width="5" height="18" rx="1" fill="#F7FBFF" />
          <circle className="lamp-glow" cx="58.5" cy="44" r="8" fill={color} opacity={lamp * 0.28} />
          <circle className="lamp-glow" cx="58.5" cy="44" r="4" fill={color} opacity={lamp} />
        </>
      )}
    </svg>
  )
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
