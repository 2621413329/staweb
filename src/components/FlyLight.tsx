import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import type { Point } from '../lib/geometry'

export default function FlyLight({
  token,
  color,
  from,
  to,
}: {
  token: number
  color: string
  from: Point | null
  to: Point | null
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !from || !to || token === 0) return
    if (reduced) {
      el.style.left = `${to.x}px`
      el.style.top = `${to.y}px`
      el.style.opacity = '0'
      const frame = requestAnimationFrame(() => {
        el.style.opacity = '1'
      })
      return () => cancelAnimationFrame(frame)
    }
    el.style.transition = 'none'
    el.style.opacity = '1'
    el.style.left = `${from.x}px`
    el.style.top = `${from.y}px`
    let frame = 0
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        el.style.transition = 'left 1.2s ease-in-out, top 1.2s ease-in-out'
        el.style.left = `${to.x}px`
        el.style.top = `${to.y}px`
      })
    })
    return () => cancelAnimationFrame(frame)
  }, [token, from, to, reduced])

  if (!from || !to || token === 0) return null
  return <span ref={ref} className="fly-dot" style={{ background: color }} aria-hidden="true" />
}
