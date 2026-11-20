import { Link } from 'react-router-dom'

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#eadfd4] bg-[#fff8f2]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-[#8c7b6b] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-serif text-lg text-[#3d3229]">星屿</p>
          <p className="mt-1 max-w-md leading-relaxed">
            记录今天的一点故事，陪伴未来的成长变化。情绪陪伴与 AI 内容仅供参考，不能替代专业帮助。
          </p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <Link to="/download" className="hover:text-[#3d3229]">下载</Link>
          <Link to="/privacy" className="hover:text-[#3d3229]">隐私政策</Link>
          <Link to="/terms" className="hover:text-[#3d3229]">用户协议</Link>
          <a href="mailto:2621413329@qq.com" className="hover:text-[#3d3229]">2621413329@qq.com</a>
        </div>
      </div>
    </footer>
  )
}
