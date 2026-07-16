import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const navItems = [
  { path: '/', label: '首页' },
  { path: '/download', label: '下载' },
  { path: '/privacy', label: '隐私政策' },
  { path: '/terms', label: '用户协议' },
]

export default function SiteNav() {
  const { pathname } = useLocation()

  return (
    <motion.nav
      className="relative z-50 flex shrink-0 items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 border-b border-white/10 bg-slate-900/40 backdrop-blur-md"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    >
      <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
        <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 border border-white/20 group-hover:bg-white/15 transition-colors">
          <span className="text-base sm:text-lg">🌍</span>
        </div>
        <div>
          <p className="text-base sm:text-lg font-bold text-white tracking-wide leading-tight">
            成长小岛
          </p>
          <p className="text-[10px] sm:text-xs text-blue-200/70 leading-tight">
            Starland · 成长世界
          </p>
        </div>
      </Link>

      <div className="flex items-center gap-1 sm:gap-2">
        {navItems.map((item) => {
          const active =
            item.path === '/'
              ? pathname === '/'
              : pathname.startsWith(item.path)

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                active
                  ? 'bg-white/15 text-white border border-white/20 shadow-sm'
                  : 'text-blue-200/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </motion.nav>
  )
}
