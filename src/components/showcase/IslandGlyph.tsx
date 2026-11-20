import type { StoryIsland } from '../../data/product'

interface IslandGlyphProps {
  island: StoryIsland
  size?: number
  quiet?: boolean
  hot?: boolean
}

export default function IslandGlyph({
  island,
  size = 112,
  quiet = false,
  hot = false,
}: IslandGlyphProps) {
  const buildings = Math.min(5, Math.max(1, Math.ceil(island.level / 2)))
  const spots = [
    { x: 34, y: 40 },
    { x: 58, y: 36 },
    { x: 46, y: 28 },
    { x: 28, y: 30 },
    { x: 66, y: 30 },
  ].slice(0, buildings)

  return (
    <svg
      viewBox="0 0 100 86"
      width={size}
      height={size * 0.86}
      className={hot ? 'drop-shadow-[0_8px_12px_rgba(94,169,255,0.35)]' : undefined}
      aria-hidden="true"
    >
      <ellipse cx="50" cy="70" rx="34" ry="9" fill="#c5e2fb" opacity={quiet ? 0.45 : 0.9} />
      <ellipse cx="50" cy="64" rx="30" ry="12" fill="#9dcfb0" />
      <ellipse cx="50" cy="60" rx="26" ry="14" fill={island.grass} />
      <ellipse cx="50" cy="58" rx="18" ry="9" fill="#f4fbe9" />
      <path d="M22 58c2-8 6-12 8-12s2 4 0 8c3-7 8-9 10-6 1 6-4 10-8 10-2-4-6-4-10 0z" fill="#8fbf86" />
      <path d="M72 56c-1-7-5-10-7-8 0 4 2 6 1 8 4-4 7-2 6 0z" fill="#79b07a" />
      {spots.map((spot, index) => {
        const height = 8 + index * 2 + (index === buildings - 1 ? island.level : 0)
        return (
          <g key={`${spot.x}-${spot.y}`}>
            <rect
              x={spot.x}
              y={spot.y - height + 8}
              width="9"
              height={height}
              rx="1.5"
              fill={index === buildings - 1 ? island.accent : '#f7f1e4'}
              stroke="#e7d7bf"
              strokeWidth="0.6"
            />
            <path
              d={`M${spot.x - 1} ${spot.y - height + 9} L${spot.x + 4.5} ${spot.y - height + 4} L${spot.x + 10} ${spot.y - height + 9} Z`}
              fill={index === buildings - 1 ? '#f3d7a2' : '#ead8bf'}
            />
          </g>
        )
      })}
      {island.level >= 3 && (
        <circle cx="62" cy="48" r="1.6" fill="#ffe7a8">
          <animate attributeName="opacity" values="0.45;1;0.45" dur="2.8s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  )
}
