import type { FaceKind } from '../../data/showcase'

interface MoodFaceProps {
  face: FaceKind
  color: string
  className?: string
}

export default function MoodFace({ face, color, className = 'h-8 w-8' }: MoodFaceProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx="24" cy="24" r="20" fill={color} opacity="0.18" />
      <circle cx="24" cy="24" r="16" fill="#fffdf9" />
      {face === 'awful' ? (
        <>
          <path d="M15 18 L20 21" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M33 18 L28 21" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="18" cy="21" r="1.6" fill={color} />
          <circle cx="30" cy="21" r="1.6" fill={color} />
        </>
      )}
      {face === 'rad' && (
        <path d="M16 27 Q24 36 32 27" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      )}
      {face === 'good' && (
        <path d="M17 28 Q24 34 31 28" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      )}
      {face === 'meh' && (
        <path d="M17 30 H31" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      )}
      {(face === 'bad' || face === 'awful') && (
        <path d="M17 33 Q24 27 31 33" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      )}
    </svg>
  )
}
