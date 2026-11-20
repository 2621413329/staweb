import { useId } from 'react'
import type { CategoryId, CompanionId, MoodId } from './model'
import { companionById } from './model'

interface IslandWorldProps {
  categories: CategoryId[]
  mood?: MoodId
  companion: CompanionId
  richness: number
  decorLabel?: string | null
  speech?: string | null
  flying?: boolean
}

export default function IslandWorld({
  categories,
  mood = 'calm',
  companion,
  richness,
  decorLabel,
  speech,
  flying = false,
}: IslandWorldProps) {
  const rawId = useId().replace(/:/g, '')
  const has = (id: CategoryId) => categories.includes(id)
  const heavy = mood === 'sad' || mood === 'angry'
  const showFlowers = has('friends') || richness > 0.28
  const showTree = has('study') || has('sport') || richness > 0.3
  const showHouse = has('family') || richness > 0.46
  const showField = has('hobby') || richness > 0.6
  const showMail = has('other') || richness > 0.52
  const showLight = richness > 0.74
  const showTent = heavy
  const showIslet = richness > 0.58 || has('sport')
  const showBook = has('study')
  const pal = companionById(companion)

  return (
    <div className="relative overflow-hidden rounded-[22px] bg-[#d7ecff]">
      <svg viewBox="0 0 320 188" className="block w-full h-auto" role="img" aria-label="成长小岛预览">
        <defs>
          <linearGradient id={`${rawId}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={heavy ? '#C9D7E6' : '#C5E4FF'} />
            <stop offset="100%" stopColor={heavy ? '#E7EEF4' : '#F7FBFF'} />
          </linearGradient>
          <linearGradient id={`${rawId}-sea`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9FD4FF" />
            <stop offset="100%" stopColor="#6EB6F5" />
          </linearGradient>
          <radialGradient id={`${rawId}-sand`} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFE7BF" />
            <stop offset="100%" stopColor="#F0D09A" />
          </radialGradient>
        </defs>

        <rect width="320" height="188" fill={`url(#${rawId}-sky)`} />
        <circle cx={heavy ? 250 : 258} cy={heavy ? 46 : 36} r={heavy ? 14 : 16} fill={heavy ? '#F4E7C8' : '#FFE38A'} opacity={heavy ? 0.7 : 1} />
        <g fill="#fff" opacity="0.85">
          <ellipse cx="54" cy="32" rx="22" ry="8" />
          <ellipse cx="70" cy="30" rx="14" ry="7" />
          <ellipse cx="188" cy="24" rx="18" ry="7" />
        </g>

        <g className="sea-shift">
          <ellipse cx="150" cy="168" rx="180" ry="28" fill={`url(#${rawId}-sea)`} />
          <ellipse cx="200" cy="162" rx="70" ry="8" fill="#fff" opacity="0.28" />
        </g>

        {showIslet && (
          <g>
            <ellipse cx="46" cy="132" rx="22" ry="8" fill="#F6E2B8" />
            <ellipse cx="46" cy="128" rx="16" ry="6" fill="#9ED39A" />
            <rect x="44" y="112" width="3" height="16" rx="1.5" fill="#7EAA74" />
            <circle cx="45" cy="110" r="6" fill="#8FCB8A" />
          </g>
        )}

        <ellipse cx="176" cy="146" rx="108" ry="28" fill={`url(#${rawId}-sand)`} />
        {richness > 0.14 ? (
          <>
            <ellipse cx="176" cy="136" rx="92" ry="24" fill="#B7E3A4" />
            <ellipse cx="168" cy="132" rx="70" ry="16" fill="#C9EEB8" opacity="0.85" />
          </>
        ) : (
          <ellipse cx="176" cy="138" rx="28" ry="8" fill="#C9EEB8" />
        )}

        <path d="M150 142 C162 136, 176 148, 196 140" fill="none" stroke="#E7D3A4" strokeWidth="4" strokeLinecap="round" />

        {showField && (
          <g>
            <ellipse cx="214" cy="128" rx="22" ry="8" fill="#F7C3D6" opacity="0.85" />
            <circle cx="206" cy="124" r="2.2" fill="#fff" />
            <circle cx="216" cy="122" r="2.2" fill="#FFE38A" />
            <circle cx="224" cy="126" r="2" fill="#fff" />
          </g>
        )}

        {showFlowers && (
          <g>
            <circle cx="132" cy="128" r="3" fill="#F7A8C4" />
            <circle cx="140" cy="124" r="2.4" fill="#FFE38A" />
            <circle cx="124" cy="122" r="2.2" fill="#fff" />
          </g>
        )}

        {showTree && (
          <g>
            <rect x="214" y="96" width="5" height="28" rx="2" fill="#C9855A" />
            <circle cx="216" cy="90" r="14" fill="#6FBF78" />
            <circle cx="206" cy="98" r="10" fill="#8ED48F" />
            <circle cx="226" cy="100" r="9" fill="#5EAE72" />
          </g>
        )}

        {showHouse && (
          <g>
            <rect x="146" y="104" width="34" height="24" rx="3" fill="#FFF7EE" />
            <path d="M142 106 L163 90 L184 106" fill="#E7A07A" />
            <rect x="159" y="114" width="8" height="14" rx="1.5" fill="#E7B089" />
            <rect x="150" y="110" width="7" height="6" rx="1" fill="#FFE38A" />
          </g>
        )}

        {showMail && (
          <g>
            <rect x="108" y="118" width="3" height="16" fill="#C9855A" />
            <rect x="102" y="112" width="14" height="9" rx="2" fill="#F2C14E" />
          </g>
        )}

        {showBook && (
          <g>
            <rect x="188" y="124" width="12" height="8" rx="1.5" fill="#7E6DB7" />
            <path d="M194 124 v8" stroke="#fff" strokeWidth="1" />
          </g>
        )}

        {showLight && (
          <g>
            <rect x="248" y="86" width="6" height="34" rx="2" fill="#F4EDE3" />
            <rect x="244" y="78" width="14" height="10" rx="2" fill="#F7D56A" />
            <circle cx="251" cy="83" r="10" fill="#FFE38A" opacity="0.45" />
          </g>
        )}

        {showTent && (
          <g>
            <path d="M118 126 L132 104 L146 126 Z" fill="#F7F1E8" stroke="#E1D3C2" />
            <path d="M132 104 V126" stroke="#E7A07A" strokeWidth="1.4" />
          </g>
        )}

        <g className="island-bob">
          <ellipse cx="170" cy="132" rx="12" ry="3" fill="#000" opacity="0.08" />
          <rect x="164" y="114" width="12" height="14" rx="6" fill={pal.fill} />
          <circle cx="170" cy="108" r="8" fill="#FFE7C2" />
          <circle cx="167" cy="107" r="1" fill="#3D3229" />
          <circle cx="173" cy="107" r="1" fill="#3D3229" />
          <path d="M167 111 Q170 113 173 111" fill="none" stroke="#C97B5A" strokeWidth="1" strokeLinecap="round" />
          {companion === 'xiao_xingzai' && <circle cx="170" cy="101" r="4.5" fill="#F6C453" />}
          {companion === 'xiao_guangbao' && <ellipse cx="170" cy="100" rx="4" ry="5" fill="#8EC5FF" />}
          {companion === 'yuan' && <circle cx="170" cy="101" r="3.5" fill="#F3A7C2" />}
          {companion === 'meng' && <path d="M164 102 L170 96 L176 102" fill="#C4B5FD" />}
        </g>
      </svg>

      {flying && <span className="land-orb" aria-hidden="true" />}

      {speech && (
        <p className="absolute left-3 right-3 top-2 rounded-2xl bg-white/90 px-3 py-2 text-[11px] leading-snug text-[#3D3229] shadow-sm">
          {speech}
        </p>
      )}

      {decorLabel && (
        <p className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#3E7A52] shadow-sm">
          新长出 · {decorLabel}
        </p>
      )}
    </div>
  )
}
