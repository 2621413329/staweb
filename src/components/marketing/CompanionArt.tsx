import type { CompanionId } from '../../data/showcase'

interface CompanionArtProps {
  id: CompanionId
  className?: string
}

export default function CompanionArt({ id, className = 'h-16 w-16' }: CompanionArtProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden>
      {id === 'xiao_xingzai' && <Xingzai />}
      {id === 'xiao_guangbao' && <Guangbao />}
      {id === 'yuan' && <Yuan />}
      {id === 'meng' && <Meng />}
    </svg>
  )
}

function Xingzai() {
  return (
    <g>
      <ellipse cx="40" cy="70" rx="10" ry="3" fill="#2c3e50" opacity="0.08" />
      <path d="M30 58 Q28 70 34 72 H46 Q52 70 50 58" fill="#f3b48a" />
      <circle cx="40" cy="40" r="18" fill="#f6c7a1" />
      <ellipse cx="40" cy="26" rx="12" ry="8" fill="#f3b48a" />
      <circle cx="40" cy="16" r="4" fill="#f4d35e" />
      <circle cx="33" cy="40" r="2" fill="#2c3e50" />
      <circle cx="47" cy="40" r="2" fill="#2c3e50" />
      <path d="M34 48 Q40 53 46 48" fill="none" stroke="#2c3e50" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="28" cy="46" r="2.4" fill="#f4a3a3" opacity="0.75" />
      <circle cx="52" cy="46" r="2.4" fill="#f4a3a3" opacity="0.75" />
    </g>
  )
}

function Guangbao() {
  return (
    <g>
      <ellipse cx="40" cy="70" rx="10" ry="3" fill="#2c3e50" opacity="0.08" />
      <path d="M31 56 Q29 70 35 72 H45 Q51 70 49 56" fill="#ffe08a" />
      <ellipse cx="40" cy="38" rx="16" ry="18" fill="#ffe08a" />
      <ellipse cx="40" cy="22" rx="7" ry="8" fill="#fff4c4" />
      <circle cx="34" cy="38" r="1.8" fill="#2c3e50" />
      <circle cx="46" cy="38" r="1.8" fill="#2c3e50" />
      <path d="M35 46 Q40 50 45 46" fill="none" stroke="#2c3e50" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  )
}

function Yuan() {
  return (
    <g>
      <ellipse cx="40" cy="70" rx="10" ry="3" fill="#2c3e50" opacity="0.08" />
      <path d="M31 54 Q29 70 35 72 H45 Q51 70 49 54" fill="#f8c9b0" />
      <circle cx="40" cy="38" r="16" fill="#f8c9b0" />
      <path d="M30 28 Q40 18 50 28" fill="none" stroke="#e8a87c" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="34" cy="38" r="1.8" fill="#2c3e50" />
      <circle cx="46" cy="38" r="1.8" fill="#2c3e50" />
      <path d="M35 46 Q40 50 45 46" fill="none" stroke="#2c3e50" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  )
}

function Meng() {
  return (
    <g>
      <ellipse cx="40" cy="70" rx="10" ry="3" fill="#2c3e50" opacity="0.08" />
      <path d="M31 54 Q29 70 35 72 H45 Q51 70 49 54" fill="#d9c8f5" />
      <circle cx="40" cy="38" r="16" fill="#d9c8f5" />
      <path d="M48 16 a8 8 0 1 0 0 14 a5 5 0 1 1 0-14z" fill="#f7f1ff" />
      <path d="M32 38 q2.4 1.6 5 0" fill="none" stroke="#2c3e50" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M43 38 q2.4 1.6 5 0" fill="none" stroke="#2c3e50" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M35 47 Q40 51 45 47" fill="none" stroke="#2c3e50" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  )
}
