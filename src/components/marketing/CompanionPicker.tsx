import { useEffect, useState } from 'react'
import CompanionArt from './CompanionArt'
import { companionById, companions, type CompanionId } from '../../data/showcase'

interface CompanionPickerProps {
  companionId: CompanionId
  onChange: (id: CompanionId) => void
}

export default function CompanionPicker({ companionId, onChange }: CompanionPickerProps) {
  const companion = companionById(companionId)
  const lines = [companion.greeting, companion.aside, '我看见了。它会好好待在岛上。']
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    setLineIndex(0)
  }, [companionId])

  return (
    <section id="witness" className="scroll-mt-24 bg-[#f7f4ff] px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-medium tracking-[0.16em] text-peachdeep">成长伙伴</p>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">有人看见，世界仍属于你</h2>
          <div className="mt-8 flex flex-col items-start">
            <CompanionArt id={companion.id} className="h-36 w-36" />
            <h3 className="mt-4 text-2xl font-semibold">{companion.name}</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-mist">{companion.tagline}</p>
            <p className="mt-5 max-w-md rounded-2xl bg-white px-4 py-3 text-sm leading-relaxed shadow-soft">
              {lines[lineIndex]}
            </p>
            <button
              type="button"
              onClick={() => setLineIndex((index) => (index + 1) % lines.length)}
              className="mt-3 text-sm font-medium text-sky"
            >
              再听一句
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {companions.map((item) => {
            const selected = item.id === companionId
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange(item.id)}
                aria-pressed={selected}
                className={`rounded-[24px] border bg-white p-4 text-left shadow-soft transition ${
                  selected ? 'border-peach' : 'border-transparent hover:border-ink/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CompanionArt id={item.id} className="h-14 w-14" />
                  <div>
                    <p className="font-semibold">
                      {item.name}
                      {item.premium ? <span className="ml-2 text-xs font-medium text-peachdeep">会员</span> : null}
                    </p>
                    <p className="text-xs text-mist">{item.traits.join(' · ')}</p>
                  </div>
                </div>
              </button>
            )
          })}
          <p className="sm:col-span-2 text-sm leading-relaxed text-mist">
            小星仔和小光宝随时可以选。小愿和小梦随星屿会员出现。选中的伙伴会走进上面的世界，也会走进旁边这部手机。
          </p>
        </div>
      </div>
    </section>
  )
}
