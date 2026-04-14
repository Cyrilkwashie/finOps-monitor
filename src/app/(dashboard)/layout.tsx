import type { Metadata } from 'next'
import { DashboardNav } from '@/components/DashboardNav'
import { ThemeLayout } from '@/components/ThemeProvider'
import { AlertToast } from '@/components/AlertToast'

export const metadata: Metadata = { title: 'FinOps Monitor' }

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeLayout className="min-h-screen bg-[#fafafa] dark:bg-[#0f172a] flex flex-col transition-colors">
      <DashboardNav />
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
      <AlertToast />
    </ThemeLayout>
  )
}
