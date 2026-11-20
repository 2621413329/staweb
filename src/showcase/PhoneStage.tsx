import { AnimatePresence, motion } from 'framer-motion'
import { tabs, type ScreenId } from '../data/showcase'
import { useDemo } from './demo-context'
import GrowthScreen from './GrowthScreen'
import IslandScreen from './IslandScreen'
import MoreScreen from './MoreScreen'
import Sheets from './Sheets'
import TodayScreen, { Composer } from './TodayScreen'

const icons: Record<ScreenId, string> = {
  island: '岛',
  today: '记',
  growth: '迹',
  more: '多',
}

export default function PhoneStage() {
  const { state, setScreen, dismissNotice, runTour, stopTour, resetDemo } = useDemo()

  return (
    <div id="studio" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-[390px]">
        <div className="rounded-[2.4rem] bg-[#2c261f] p-[10px] shadow-[0_30px_80px_rgba(61,50,41,0.18)]">
          <div className="relative flex h-[min(660px,calc(100vh-12rem))] min-h-[520px] flex-col overflow-hidden rounded-[1.9rem] bg-[linear-gradient(180deg,#f7f3ea_0%,#e7f3ef_100%)]">
            <div className="flex items-center justify-between px-5 pb-1 pt-3 text-[11px] font-semibold text-[#3d3229]">
              <span>9:41</span>
              <span className="text-[10px] font-medium tracking-wide text-[#8c7b6b]">星屿</span>
              <span className="flex items-center gap-1" aria-hidden="true">
                <span className="h-2 w-3 rounded-sm border border-[#3d3229]/50" />
              </span>
            </div>

            {state.notices.length > 0 && (
              <button
                type="button"
                onClick={() => dismissNotice(state.notices[state.notices.length - 1].id)}
                className="mx-3 mb-1 rounded-2xl bg-[#3d3229] px-3 py-2 text-left"
              >
                <span className="block text-[12px] font-semibold text-white">
                  {state.notices[state.notices.length - 1].title}
                </span>
                <span className="mt-0.5 block text-[11px] leading-relaxed text-white/75">
                  {state.notices[state.notices.length - 1].body}
                </span>
              </button>
            )}

            <div className="relative min-h-0 flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={state.screen}
                  className="phone-scroll absolute inset-0 overflow-y-auto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  {state.screen === 'island' && <IslandScreen />}
                  {state.screen === 'today' && <TodayScreen />}
                  {state.screen === 'growth' && <GrowthScreen />}
                  {state.screen === 'more' && <MoreScreen />}
                </motion.div>
              </AnimatePresence>
              {state.screen === 'today' && state.composer.open && <Composer />}
              <Sheets />
            </div>

            <div className="grid grid-cols-4 border-t border-[#3d3229]/10 bg-[#fbf7f2]/95 px-1 py-1.5">
              {tabs.map((tab) => {
                const on = state.screen === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    data-tab={tab.id}
                    onClick={() => setScreen(tab.id)}
                    className={`rounded-xl py-1 text-center ${on ? 'text-[#3f7a52]' : 'text-[#a89888]'}`}
                  >
                    <span
                      className={`mx-auto flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-semibold ${
                        on ? 'bg-[#5a9a6e]/15' : ''
                      }`}
                    >
                      {icons[tab.id]}
                    </span>
                    <span className="mt-0.5 block text-[10px] font-medium">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1">
          <p className="max-w-[15rem] text-[12px] leading-relaxed text-[#8c7b6b]">
            按当前版本还原的可操作界面。写下一句，看它落到岛上。
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={state.tourRunning ? stopTour : runTour}
              className="rounded-full bg-[#3d3229] px-3 py-1.5 text-[12px] font-semibold text-white"
            >
              {state.tourRunning ? '停止' : '播放一次记录'}
            </button>
            <button
              type="button"
              onClick={resetDemo}
              className="rounded-full px-3 py-1.5 text-[12px] text-[#8c7b6b]"
            >
              重置
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
