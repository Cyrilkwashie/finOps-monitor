import type { Metadata } from 'next'
import { LoginLeft } from './_components/LoginLeft'
import { LoginRight } from './_components/LoginRight'

export const metadata: Metadata = {
  title: 'Sign In — FinOps Monitor',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f172a] flex items-center justify-center p-4 lg:p-8 transition-colors">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row rounded-2xl shadow-xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden">
        <LoginLeft />
        <LoginRight />
      </div>
    </div>
  )
}
