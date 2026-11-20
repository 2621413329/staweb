import type { ReactNode } from 'react'

interface PhoneFrameProps {
  children: ReactNode
  label?: string
}

export default function PhoneFrame({ children, label }: PhoneFrameProps) {
  return (
    <figure className="mx-auto w-[min(100%,360px)]">
      <div className="rounded-[2.5rem] bg-[#121a22] p-[11px] shadow-[0_40px_80px_-36px_rgba(36,78,120,0.55)] ring-1 ring-white/40">
        <div className="relative flex h-[min(700px,74vh)] min-h-[560px] flex-col overflow-hidden rounded-[1.95rem] bg-[#f5f9ff]">
          <div className="pointer-events-none absolute left-1/2 top-2 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-[#121a22]" />
          {children}
        </div>
      </div>
      {label && (
        <figcaption className="mt-4 text-center text-xs leading-relaxed text-mist">
          {label}
        </figcaption>
      )}
    </figure>
  )
}
