'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Activity, LogOut, Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export function DashboardNav() {
  const path = usePathname()
  const { dark, toggle } = useTheme()
  const active = (href: string) =>
    path === href || path.startsWith(href + '/')

  return (
    <header className="bg-white dark:bg-[#1e293b] border-b border-[#e5e5e5] dark:border-[#334155] sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="bg-[#18163f] dark:bg-[#0f172a] rounded-lg p-2 inline-flex">
            <Activity size={18} className="text-[#2dd4bf]" />
          </div>
          <span className="text-base font-semibold text-[#18163f] dark:text-[#e2e8f0]">
            FinOps<span className="text-[#2dd4bf]"> Monitor</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/dashboard"
            className={`px-4 py-2 rounded-[0.625rem] text-sm font-medium transition-colors ${
              active('/dashboard')
                ? 'text-[#18163f] dark:text-[#e2e8f0] bg-[#18163f]/5 dark:bg-white/5 border-b-2 border-[#2dd4bf]'
                : 'text-[#737373] dark:text-[#94a3b8] hover:text-[#18163f] dark:hover:text-[#e2e8f0] hover:bg-[#f5f5f5] dark:hover:bg-white/5'
            }`}
          >
            Overview
          </Link>
          <Link
            href="/analytics"
            className={`px-4 py-2 rounded-[0.625rem] text-sm font-medium transition-colors ${
              active('/analytics')
                ? 'text-[#18163f] dark:text-[#e2e8f0] bg-[#18163f]/5 dark:bg-white/5 border-b-2 border-[#2dd4bf]'
                : 'text-[#737373] dark:text-[#94a3b8] hover:text-[#18163f] dark:hover:text-[#e2e8f0] hover:bg-[#f5f5f5] dark:hover:bg-white/5'
            }`}
          >
            Analytics
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-pulse" />
            <span className="text-xs text-[#737373] dark:text-[#94a3b8] font-mono tracking-widest">LIVE</span>
          </div>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-[#737373] dark:text-[#94a3b8] hover:text-[#18163f] dark:hover:text-[#e2e8f0] hover:bg-[#f5f5f5] dark:hover:bg-white/5 transition-colors"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link
            href="/login"
            className="flex items-center gap-2 text-sm text-[#737373] dark:text-[#94a3b8] hover:text-[#18163f] dark:hover:text-[#e2e8f0] transition-colors"
          >
            <LogOut size={16} />
            <span>Sign out</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
