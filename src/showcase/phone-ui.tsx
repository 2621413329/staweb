import type { ReactNode } from 'react'
import type { FaceKind, MoodId } from '../data/showcase'
import { emotionById } from '../data/showcase'

export function Glass({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl border border-white/80 bg-white/75 shadow-[0_10px_28px_rgba(61,50,41,0.06)] ${className}`}
    >
      {children}
    </div>
  )
}

export function MoodFace({
  mood,
  size = 36,
}: {
  mood: MoodId
  size?: number
}) {
  const emotion = emotionById(mood)
  return (
    <Face
      color={emotion.color}
      face={emotion.face}
      size={size}
      label={emotion.label}
    />
  )
}

export function Face({
  color,
  face,
  size = 36,
  label,
}: {
  color: string
  face: FaceKind
  size?: number
  label?: string
}) {
  const mouth = mouthPath(face)
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-label={label} role="img">
      <circle cx="20" cy="20" r="18" fill={color} />
      <circle cx="20" cy="20" r="18" fill="white" opacity="0.18" />
      <circle cx="14" cy="17" r="1.7" fill="#3D3229" />
      <circle cx="26" cy="17" r="1.7" fill="#3D3229" />
      <path d={mouth} fill="none" stroke="#3D3229" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function mouthPath(face: FaceKind): string {
  switch (face) {
    case 'rad':
      return 'M12 23c2.2 4 13.8 4 16 0'
    case 'good':
      return 'M13 23c2 2.6 12 2.6 14 0'
    case 'meh':
      return 'M13 24h14'
    case 'bad':
      return 'M13 26c2.4-3 11.6-3 14 0'
    case 'awful':
      return 'M12 27c2.6-4 13.4-4 16 0'
    default:
      return 'M13 24h14'
  }
}

export function IslandGlyph({
  color,
  locked = false,
  progress,
  large = false,
}: {
  color: string
  locked?: boolean
  progress: number
  large?: boolean
}) {
  const land = locked ? '#D5D0C8' : '#F4E7D4'
  const grass = locked ? '#C4BFB6' : color
  const tree = !locked && progress >= 18
  const house = !locked && progress >= 42
  const lamp = !locked && progress >= 68
  return (
    <svg
      viewBox="0 0 120 100"
      className={large ? 'h-[92px] w-[108px]' : 'h-[68px] w-[78px]'}
      aria-hidden="true"
    >
      <ellipse cx="60" cy="84" rx="38" ry="8" fill={grass} opacity="0.28" />
      <path d="M16 72c16-30 72-30 88 0-18 14-70 14-88 0z" fill={land} />
      <path d="M24 68c14-20 58-22 74 0-20 10-54 12-74 0z" fill={grass} />
      {tree && (
        <g>
          <rect x="74" y="46" width="3" height="16" rx="1" fill="#8C6B4F" />
          <circle cx="75.5" cy="42" r="9" fill={locked ? '#B7C3A4' : '#3E7A55'} />
        </g>
      )}
      {house && (
        <g>
          <rect x="46" y="50" width="16" height="14" rx="1.5" fill="#FBF7F1" />
          <path d="M44 51 L54 42 L64 51" fill="#E7D3B4" />
          <rect x="52" y="57" width="4" height="7" fill="#C4A574" />
        </g>
      )}
      {lamp && <circle cx="40" cy="58" r="2.2" fill="#F6E27A" />}
      {locked && (
        <g>
          <circle cx="60" cy="58" r="9" fill="white" opacity="0.92" />
          <rect x="56" y="58" width="8" height="6" rx="1.2" fill="#8C7B6B" />
          <path
            d="M57.5 58v-2a2.5 2.5 0 0 1 5 0v2"
            fill="none"
            stroke="#8C7B6B"
            strokeWidth="1.4"
          />
        </g>
      )}
    </svg>
  )
}

export function ProgressBar({
  value,
  color,
}: {
  value: number
  color: string
}) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-[#3d3229]/10">
      <div
        className="h-full rounded-full transition-[width] duration-700"
        style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: color }}
      />
    </div>
  )
}
