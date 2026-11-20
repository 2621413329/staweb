interface IslandArtProps {
  land: string
  accent: string
  stage: number
  monument?: boolean
  className?: string
}

export default function IslandArt({
  land,
  accent,
  stage,
  monument = false,
  className = 'h-28 w-36',
}: IslandArtProps) {
  const showTree = stage >= 1
  const showCabin = stage >= 2
  const showLight = stage >= 3 || monument

  return (
    <svg viewBox="28 40 148 108" className={className} aria-hidden>
      <ellipse cx="100" cy="136" rx="62" ry="8" fill="#8ec5ff" opacity="0.45" />
      <path d="M36 96c16 26 112 26 128 0-10 16-34 26-64 28S46 112 36 96z" fill="#ead7b7" />
      <ellipse cx="100" cy="92" rx="72" ry="28" fill={land} />
      <ellipse cx="92" cy="84" rx="48" ry="14" fill="#fff" opacity="0.28" />
      {showTree && (
        <g>
          <rect x="58" y="78" width="5" height="16" rx="1.5" fill="#8d6a45" />
          <circle cx="60" cy="70" r="14" fill={accent} />
          <circle cx="72" cy="76" r="9" fill={accent} opacity="0.85" />
        </g>
      )}
      {showCabin && (
        <g>
          <rect x="108" y="78" width="30" height="20" rx="3" fill="#fffdf9" />
          <path d="M104 80 L123 64 L142 80" fill={accent} />
          <rect x="119" y="86" width="8" height="12" rx="1.5" fill="#e8a87c" />
        </g>
      )}
      <g style={{ opacity: showLight ? 1 : 0, transition: 'opacity 700ms ease' }}>
        <rect x="148" y="58" width="8" height="30" rx="2" fill="#fffdf9" />
        <rect x="145" y="54" width="14" height="6" rx="1" fill={accent} />
        <circle cx="152" cy="50" r="4" fill="#ffe08a" />
      </g>
    </svg>
  )
}
