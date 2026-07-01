import { motion } from 'framer-motion'
import type { IslandData } from '../data/islands'

interface IslandProps {
  data: IslandData
  isSelected: boolean
  onClick: (id: string) => void
  floatDelay?: number
}

export default function Island({
  data,
  isSelected,
  onClick,
  floatDelay = 0,
}: IslandProps) {
  const isLocked = data.status === 'locked'

  return (
    <motion.button
      type="button"
      className="absolute z-10 flex flex-col items-center cursor-pointer outline-none"
      style={{
        left: `${data.position.x}%`,
        top: `${data.position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      initial={isLocked ? { opacity: 0.5, scale: 0.9 } : { opacity: 0, scale: 0 }}
      animate={
        isLocked
          ? { opacity: 0.55, scale: 1, filter: 'grayscale(80%) blur(1px)' }
          : { opacity: 1, scale: 1, filter: 'grayscale(0%) blur(0px)' }
      }
      whileHover={
        isLocked
          ? { scale: 1.02 }
          : { scale: 1.1, transition: { type: 'spring', stiffness: 400, damping: 15 } }
      }
      whileTap={isLocked ? {} : { scale: 0.95 }}
      transition={
        isLocked
          ? { duration: 0.3 }
          : { type: 'spring', stiffness: 260, damping: 20, delay: floatDelay * 0.1 }
      }
      onClick={() => onClick(data.id)}
      aria-label={data.name}
    >
      <motion.div
        animate={isLocked ? {} : { y: [0, -6, 0] }}
        transition={
          isLocked
            ? {}
            : {
                duration: 3 + floatDelay * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: floatDelay * 0.2,
              }
        }
        className="relative flex flex-col items-center"
      >
        {!isLocked && (
          <motion.div
            className="absolute rounded-full glow-pulse w-[clamp(4rem,7vw,5.5rem)] h-[clamp(4rem,7vw,5.5rem)]"
            style={{
              background: `radial-gradient(circle, ${data.glowColor} 0%, transparent 70%)`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={
              isSelected
                ? { scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }
                : { scale: 1, opacity: 0.5 }
            }
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        <motion.div
          className="relative flex items-center justify-center rounded-full border-2 shadow-xl w-[clamp(3.25rem,5.5vw,4.25rem)] h-[clamp(3.25rem,5.5vw,4.25rem)]"
          style={{
            background: isLocked
              ? 'linear-gradient(145deg, #4b5563, #374151)'
              : `linear-gradient(145deg, ${data.color}dd, ${data.color}88)`,
            borderColor: isSelected
              ? '#fff'
              : isLocked
                ? '#6b7280'
                : `${data.color}`,
            boxShadow: isSelected
              ? `0 0 24px ${data.glowColor}, 0 0 48px ${data.glowColor}`
              : isLocked
                ? '0 4px 16px rgba(0,0,0,0.3)'
                : `0 4px 20px ${data.glowColor}`,
          }}
        >
          <span className="text-[clamp(1.25rem,2.5vw,1.75rem)] select-none leading-none">
            {isLocked ? '🔒' : data.icon}
          </span>
        </motion.div>

        <div
          className="mt-0.5 h-2 rounded-[50%] opacity-40 w-[clamp(2.5rem,4.5vw,3.25rem)]"
          style={{
            background: isLocked ? '#374151' : data.color,
            filter: 'blur(3px)',
          }}
        />

        <motion.span
          className="mt-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold text-white whitespace-nowrap"
          style={{
            background: isLocked
              ? 'rgba(55, 65, 81, 0.85)'
              : 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)',
            border: isSelected ? '1px solid rgba(255,255,255,0.5)' : '1px solid transparent',
          }}
        >
          {data.name}
        </motion.span>

        {!isLocked && data.progress > 0 && (
          <div className="mt-0.5 w-12 sm:w-14 h-1 rounded-full bg-white/20 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: data.color }}
              initial={{ width: 0 }}
              animate={{ width: `${data.progress}%` }}
              transition={{ duration: 1, delay: 0.5 + floatDelay * 0.1 }}
            />
          </div>
        )}
      </motion.div>
    </motion.button>
  )
}
