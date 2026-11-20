import { motion } from 'framer-motion'
import { islandById, moodById, type CompanionId, type IslandId, type MoodId, type Story } from '../../demo/model'

interface IslandSceneProps {
  islandId: IslandId
  moodId: MoodId
  companion: CompanionId
  stories: Story[]
  pulse: number
}

export default function IslandScene({
  islandId,
  moodId,
  companion,
  stories,
  pulse,
}: IslandSceneProps) {
  const island = islandById(islandId)
  const mood = moodById(moodId)
  const count = stories.length
  const lit = count > 0
  const trees = Math.min(3, count)
  const showBench = count > 1
  const showBloom = count > 2
  const showLight = count > 3

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${mood.sky[0]} 0%, ${mood.sky[1]} 58%, #f7e7d4 100%)` }}
    >
      <div className="absolute left-8 top-6 h-10 w-10 rounded-full bg-white/80 blur-[1px]" />
      <div className="absolute right-10 top-12 h-3 w-16 rounded-full bg-white/70" />
      <div className="absolute right-6 top-16 h-3 w-10 rounded-full bg-white/50" />
      {(moodId === 'low' || moodId === 'uneasy') && (
        <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: 'repeating-linear-gradient(100deg, transparent 0 10px, rgba(255,255,255,0.35) 11px 12px)' }} />
      )}

      <svg viewBox="0 0 320 280" className="absolute inset-x-0 bottom-0 h-[78%] w-full">
        <ellipse cx="160" cy="214" rx="138" ry="28" fill="rgba(126,168,196,0.28)" />
        <path d="M28 206c28-46 62-70 132-70s104 24 132 70c-36 22-82 34-132 34S64 228 28 206z" fill={island.land} />
        <path d="M70 198c22-8 40-8 62 0" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="3" strokeLinecap="round" />
        <path d="M150 190c30 16 58 16 92-2" fill="none" stroke="rgba(255,251,247,0.7)" strokeWidth="4" strokeLinecap="round" />

        <g transform="translate(118 132)">
          <path d="M8 46h52l-4 16H12z" fill="#E7D3BE" />
          <path d="M4 48 L34 22 L64 48Z" fill="#E8A87C" />
          <rect x="22" y="50" width="16" height="18" rx="3" fill="#F6E2CC" />
          <rect x="26" y="28" width="10" height="10" rx="2" fill={lit ? '#FFE7A8' : '#F4E7D8'} />
          {lit && <circle cx="31" cy="33" r="8" fill="#FFE7A8" opacity="0.45" />}
        </g>

        {Array.from({ length: trees }).map((_, index) => (
          <g key={index} transform={`translate(${46 + index * 28} ${150 - index * 4})`}>
            <rect x="8" y="28" width="4" height="16" rx="2" fill="#8C6A45" />
            <circle cx="10" cy="22" r="12" fill={index === 1 ? '#8FB56A' : '#A3C47A'} />
          </g>
        ))}

        {showBench && (
          <g transform="translate(196 176)">
            <rect x="0" y="10" width="28" height="3" rx="1.5" fill="#C4926A" />
            <rect x="3" y="13" width="3" height="8" fill="#A8754E" />
            <rect x="22" y="13" width="3" height="8" fill="#A8754E" />
          </g>
        )}

        {showBloom && (
          <g transform="translate(92 186)">
            <circle cx="0" cy="0" r="4" fill="#F2B6C4" />
            <circle cx="10" cy="3" r="4" fill="#F6D38B" />
            <circle cx="5" cy="9" r="3.5" fill="#E7A0B4" />
          </g>
        )}

        {showLight && (
          <g transform="translate(230 128)">
            <rect x="6" y="18" width="4" height="28" fill="#E7D3BE" />
            <path d="M0 20h16l-3 8H3z" fill="#F3D48A" />
            <circle cx="8" cy="16" r="6" fill="#FFE7A8" opacity="0.85" />
          </g>
        )}

        {stories.slice(0, 5).map((story, index) => (
          <circle
            key={story.id}
            cx={78 + index * 34}
            cy={176 - (index % 2) * 10}
            r="3.2"
            fill={moodById(story.mood).color}
            opacity="0.9"
          />
        ))}
      </svg>

      <motion.div
        className="absolute bottom-[29%] left-[46%]"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <CompanionMark id={companion} />
      </motion.div>

      {pulse > 0 && (
        <motion.span
          key={pulse}
          className="absolute bottom-24 left-1/2 z-10 h-3.5 w-3.5 rounded-full"
          style={{ background: island.color, boxShadow: `0 0 16px ${island.color}` }}
          initial={{ y: 30, x: -30, opacity: 0, scale: 0.4 }}
          animate={{ y: -92, x: 8, opacity: [0, 1, 1, 0], scale: [0.5, 1, 0.8, 0.2] }}
          transition={{ duration: 1.15, ease: 'easeOut' }}
        />
      )}
    </div>
  )
}

function CompanionMark({ id }: { id: CompanionId }) {
  if (id === 'xiao_guangbao') {
    return (
      <svg width="54" height="62" viewBox="0 0 54 62" aria-hidden="true">
        <ellipse cx="27" cy="56" rx="12" ry="3" fill="rgba(90,60,40,0.12)" />
        <path d="M27 16c8 0 12 8 12 16 0 10-6 16-12 20-6-4-12-10-12-20 0-8 4-16 12-16z" fill="#F6E3A4" />
        <circle cx="22" cy="30" r="1.4" fill="#6B5144" />
        <circle cx="32" cy="30" r="1.4" fill="#6B5144" />
        <path d="M24 35c2 1.4 4 1.4 6 0" stroke="#C4845A" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M18 44h18l-2 8H20z" fill="#F7D7C4" />
      </svg>
    )
  }
  return (
    <svg width="54" height="62" viewBox="0 0 54 62" aria-hidden="true">
      <ellipse cx="27" cy="56" rx="12" ry="3" fill="rgba(90,60,40,0.12)" />
      <circle cx="27" cy="24" r="14" fill="#F3C7A1" />
      <circle cx="27" cy="14" r="6" fill="#E7B089" />
      <circle cx="22" cy="25" r="1.4" fill="#6B5144" />
      <circle cx="32" cy="25" r="1.4" fill="#6B5144" />
      <path d="M23 30c2.2 2 5.8 2 8 0" stroke="#C4845A" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M17 40c2 8 18 8 20 0 1 10-6 16-10 16S16 50 17 40z" fill="#F7D7C4" />
      <circle cx="38" cy="18" r="3" fill="#E8A87C" />
    </svg>
  )
}
