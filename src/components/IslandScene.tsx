import { useEffect, useId, useRef, useState, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { islandName, storyIslands, type IslandId, type Sky } from '../data/site'
import { useFinePointer, usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { MainIslandArt, StoryIslandArt } from './IslandArt'

const floatDelays = ['0s', '0.4s', '0.8s', '1.2s', '1.6s', '2s']

export default function IslandScene({
  sky = 'clear',
  level = 1,
  lamps,
  interactive = false,
  parallax = false,
  showMain = true,
  className = '',
  dim = false,
}: {
  sky?: Sky
  level?: number
  lamps?: Partial<Record<IslandId | 'main', number>>
  interactive?: boolean
  parallax?: boolean
  showMain?: boolean
  className?: string
  dim?: boolean
}) {
  const reduced = usePrefersReducedMotion()
  const fine = useFinePointer()
  const groupRef = useRef<HTMLDivElement>(null)
  const [shift, setShift] = useState({ x: 0, y: 0 })
  const [openId, setOpenId] = useState<IslandId | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const titleId = useId()

  function lampOf(id: IslandId | 'main', fallback: number) {
    if (lamps && lamps[id] !== undefined) return lamps[id] as number
    return dim && id !== 'main' ? 0.45 : fallback
  }

  function onMove(event: MouseEvent<HTMLDivElement>) {
    if (!parallax || !fine || reduced) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = Math.max(-8, Math.min(8, (event.clientX - rect.left) / rect.width * 16 - 8))
    const y = Math.max(-8, Math.min(8, (event.clientY - rect.top) / rect.height * 16 - 8))
    setShift({ x, y })
  }

  const openIsland = storyIslands.find((island) => island.id === openId) ?? null

  return (
    <div
      className={`sea ${sky === 'clear' ? '' : `sky-${sky}`} ${className}`.trim()}
      onMouseMove={onMove}
      onMouseLeave={() => setShift({ x: 0, y: 0 })}
    >
      <div
        ref={groupRef}
        className="island-group"
        style={parallax && !reduced ? { transform: `translate(${shift.x}px, ${shift.y}px)` } : undefined}
        aria-hidden={interactive ? undefined : true}
      >
        {showMain && (
          <div className="island-anchor" style={{ left: '50%', top: '48%' }} data-island="main">
            <div className="island-float main">
              <div className="island-main" role="img" aria-label="主岛，灯还亮着">
                <MainIslandArt level={level} lamp={lampOf('main', 1)} sky={sky} />
              </div>
            </div>
          </div>
        )}
        {storyIslands.map((island, index) => {
          const label = `${island.name}岛，示例：${island.example}`
          const art = (
            <StoryIslandArt id={island.id} lamp={lampOf(island.id, dim ? 0.45 : 0.85)} sky={sky} />
          )
          return (
            <div
              key={island.id}
              className="island-anchor"
              style={{ left: `${island.x}%`, top: `${island.y}%` }}
              data-island={island.id}
            >
              <div className="island-float" style={{ animationDelay: floatDelays[index], animationDuration: `${3.2 + index * 0.2}s` }}>
                {interactive ? (
                  <button
                    type="button"
                    className="island-btn"
                    aria-label={label}
                    onClick={(event) => {
                      triggerRef.current = event.currentTarget
                      setOpenId(island.id)
                    }}
                  >
                    {art}
                    <span className="island-label">
                      <i style={{ background: island.color }} />
                      {island.name}
                    </span>
                  </button>
                ) : (
                  <div className="island-btn">
                    {art}
                    <span className="island-label">
                      <i style={{ background: island.color }} />
                      {island.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      {openIsland && (
        <StoryPopover
          island={openIsland}
          titleId={titleId}
          anchor={triggerRef.current}
          onClose={() => {
            setOpenId(null)
            triggerRef.current?.focus()
          }}
        />
      )}
    </div>
  )
}

function StoryPopover({
  island,
  titleId,
  anchor,
  onClose,
}: {
  island: (typeof storyIslands)[number]
  titleId: string
  anchor: HTMLButtonElement | null
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ top: 80, left: 16 })

  useEffect(() => {
    function place() {
      if (!anchor) return
      const rect = anchor.getBoundingClientRect()
      const width = 280
      let left = rect.left + rect.width / 2 - width / 2
      left = Math.max(16, Math.min(left, window.innerWidth - width - 16))
      let top = rect.bottom + 10
      if (top + 210 > window.innerHeight) top = Math.max(16, rect.top - 210)
      setPos({ top, left })
    }
    place()
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => {
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
    }
  }, [anchor])

  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    const dialog = dialogRef.current
    const closeBtn = dialog?.querySelector<HTMLButtonElement>('button')
    closeBtn?.focus()
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeRef.current()
        return
      }
      if (event.key !== 'Tab' || !dialog) return
      const items = dialog.querySelectorAll<HTMLElement>('button, a')
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    function onPointer(event: PointerEvent) {
      const target = event.target as Node
      if (dialog?.contains(target) || anchor?.contains(target)) return
      closeRef.current()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [anchor, island.id])

  return createPortal(
    <div
      ref={dialogRef}
      className="card story-pop"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      style={{ top: pos.top, left: pos.left }}
    >
      <div className="pop-top">
        <span className="color-dot" style={{ background: island.color }} />
        <button type="button" className="icon-btn" onClick={onClose} aria-label="关闭">
          ×
        </button>
      </div>
      <h2 id={titleId}>{islandName(island.id)}</h2>
      <p>「{island.example}」</p>
      <p className="muted">它会落在这座岛。</p>
    </div>,
    document.body,
  )
}
