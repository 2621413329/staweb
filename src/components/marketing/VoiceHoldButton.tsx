import { useRef, useState } from 'react'

interface VoiceHoldButtonProps {
  onClip: (seconds: number) => void
  onShort: () => void
}

export default function VoiceHoldButton({ onClip, onShort }: VoiceHoldButtonProps) {
  const [holding, setHolding] = useState(false)
  const started = useRef(0)

  const begin = () => {
    started.current = Date.now()
    setHolding(true)
  }

  const finish = () => {
    if (!holding && started.current === 0) return
    const elapsed = Date.now() - started.current
    started.current = 0
    setHolding(false)
    if (elapsed < 450) {
      onShort()
      return
    }
    onClip(Math.min(12, Math.max(1, Math.round(elapsed / 1000))))
  }

  return (
    <button
      type="button"
      className={`touch-none inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition ${
        holding
          ? 'border-peach bg-peach/15 text-ink'
          : 'border-ink/10 bg-white text-ink hover:border-peach/50'
      }`}
      aria-pressed={holding}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId)
        begin()
      }}
      onPointerUp={finish}
      onPointerCancel={finish}
      onKeyDown={(event) => {
        if ((event.key === ' ' || event.key === 'Enter') && !event.repeat) {
          event.preventDefault()
          begin()
        }
      }}
      onKeyUp={(event) => {
        if (event.key === ' ' || event.key === 'Enter') {
          event.preventDefault()
          finish()
        }
      }}
    >
      <span className="flex h-4 items-end gap-0.5" aria-hidden>
        {[0, 1, 2, 3].map((bar) => (
          <span
            key={bar}
            className={`w-0.5 rounded-full bg-peachdeep ${holding ? 'wave-bar h-4' : 'h-1.5'}`}
            style={{ animationDelay: `${bar * 0.12}s` }}
          />
        ))}
      </span>
      {holding ? '松开完成' : '按住 说话'}
    </button>
  )
}
