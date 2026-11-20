import { motion } from 'framer-motion'
import {
  artCompanion,
  artLand,
  companionById,
  homeBuildings,
  islandById,
  islands,
  levelForEra,
  moodById,
  seedMoments,
} from '../../showcase/model'
import { useWorld } from '../../showcase/WorldContext'

const seedNow = seedMoments.filter((moment) => moment.era === 'now').length

export default function Archipelago({ layout }: { layout: 'stage' | 'phone' }) {
  const world = useWorld()
  const pos = layout === 'stage' ? 'stage' : 'phone'
  const homeWidth = layout === 'stage' ? 250 : 132
  const storyWidth = layout === 'stage' ? 112 : 62
  const level = levelForEra(
    world.era,
    Math.max(0, world.moments.filter((moment) => moment.era === 'now').length - seedNow),
  )
  const buildings = homeBuildings(world.storyCount, world.era === 'now' ? level.level : world.storyCount >= 3 ? 7 : 3)
  const mood = moodById(world.sceneMood)
  const dusk = world.era === 'lastYear'
  const week = world.era === 'lastWeek'
  const target = world.flight ? islandById(world.flight.islandId)[pos] : null

  return (
    <div className="absolute inset-0">
      <img
        src="/art/sea.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{ background: mood.wash, mixBlendMode: 'soft-light' }}
      />
      {dusk && (
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/35 via-orange-200/10 to-slate-900/25" />
      )}
      {week && <div className="absolute inset-0 bg-sky-100/25" />}
      <div className="sea-fade absolute inset-x-0 bottom-0 h-[58%]" />

      {islands.map((island) => {
        const point = island[pos]
        const width = island.home ? homeWidth : storyWidth
        const count = world.visibleMoments.filter((moment) => moment.islandId === island.id).length
        const selected = world.selectedId === island.id
        const arrived = world.arrivedId === island.id
        return (
          <button
            key={island.id}
            type="button"
            className="group absolute -translate-x-1/2 -translate-y-1/2 text-center"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              width,
              zIndex: island.home ? 3 : selected ? 4 : 2,
            }}
            onClick={() => world.selectIsland(island.id)}
            aria-label={island.name}
          >
            <motion.div
              animate={
                arrived
                  ? { y: [0, -10, 0], scale: [1, 1.06, 1] }
                  : { y: [0, island.home ? -6 : -4, 0] }
              }
              transition={
                arrived
                  ? { duration: 0.7 }
                  : { duration: 4.2 + (point.x % 5) * 0.15, repeat: Infinity, ease: 'easeInOut' }
              }
              className="relative"
            >
              {selected && (
                <span
                  className="absolute left-1/2 top-1/2 -z-10 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
                  style={{ background: island.color, opacity: 0.75 }}
                />
              )}
              <img
                src={artLand(island.id)}
                alt=""
                draggable={false}
                className="w-full select-none drop-shadow-[0_16px_16px_rgba(40,80,120,0.28)]"
              />
              {island.home && (
                <>
                  {buildings.observatory && (
                    <img src="/art/buildings/dream_observatory.webp" alt="" className="sticker right-[2%] top-[0%] w-[34%]" />
                  )}
                  {buildings.light && (
                    <img src="/art/buildings/lighthouse.webp" alt="" className="sticker right-[4%] top-[8%] w-[32%]" />
                  )}
                  {buildings.house && (
                    <img src="/art/buildings/growth_house.webp" alt="" className="sticker left-[8%] top-[30%] w-[34%]" />
                  )}
                  {buildings.mailbox && (
                    <img src="/art/buildings/memory_mailbox.webp" alt="" className="sticker left-[2%] top-[52%] w-[24%]" />
                  )}
                  {buildings.flower && (
                    <img src="/art/buildings/habit_flowerbed.webp" alt="" className="sticker right-[18%] top-[48%] w-[26%]" />
                  )}
                  <img
                    src={artCompanion(world.companionId, world.sceneMood)}
                    alt={companionById(world.companionId).name}
                    draggable={false}
                    className="absolute bottom-[16%] left-1/2 w-[24%] -translate-x-1/2 drop-shadow-md"
                  />
                </>
              )}
            </motion.div>
            <span
              className={`absolute left-1/2 top-full z-10 mt-1 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold shadow-sm backdrop-blur ${
                selected ? 'bg-white text-[#3d3229]' : 'bg-white/85 text-[#5c4e44]'
              }`}
            >
              <i className="h-1.5 w-1.5 rounded-full" style={{ background: island.color }} />
              {island.name}
              {count > 0 && <em className="not-italic text-[#c4845a]">{count}</em>}
            </span>
          </button>
        )
      })}

      {world.flight && target && (
        <motion.span
          key={world.flight.token}
          className="pointer-events-none absolute z-30 h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_18px_8px_rgba(255,214,150,0.95)]"
          initial={{ left: '50%', top: '92%', x: '-50%', y: '-50%', scale: 0.4, opacity: 0 }}
          animate={{
            left: `${target.x}%`,
            top: `${target.y}%`,
            x: '-50%',
            y: '-50%',
            scale: [0.4, 1.3, 0.7],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      {world.soundOn && layout === 'stage' && (
        <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/70 px-2.5 py-1 text-[11px] text-[#5c4e44] backdrop-blur">
          岛屿音乐开着
        </span>
      )}
    </div>
  )
}
