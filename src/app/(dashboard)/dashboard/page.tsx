import Link from 'next/link'
import Image from 'next/image'
import { banks } from '@/lib/data'
import { StatusBadge } from '@/components/StatusBadge'
import { BarChart2, AlertTriangle, CheckCircle2, Loader2, Clock } from 'lucide-react'
import type { Bank, OpStatus } from '@/lib/types'

function activeOp(bank: Bank) {
  const order: Array<'EOD' | 'POD' | 'SOD'> = ['EOD', 'POD', 'SOD']
  for (const t of order) {
    if (['running', 'failed'].includes(bank.operations[t].status)) return t
  }
  for (const t of order) {
    if (bank.operations[t].status === 'completed') return t
  }
  return 'SOD'
}

function SummaryCard({ label, value, sub, color }: { label: string; value: number; sub: string; color: string }) {
  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 px-6 py-5">
      <p className="text-xs uppercase tracking-widest text-[#737373] dark:text-[#94a3b8] mb-2">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-sm text-[#737373] dark:text-[#94a3b8] mt-1">{sub}</p>
    </div>
  )
}

function opIcon(status: OpStatus) {
  if (status === 'completed') return <CheckCircle2 size={15} className="text-emerald-500" />
  if (status === 'running')   return <Loader2 size={15} className="text-teal-500 animate-spin" />
  if (status === 'failed')    return <AlertTriangle size={15} className="text-red-500" />
  return <Clock size={15} className="text-[#d4d4d4] dark:text-[#334155]" />
}

export default function DashboardPage() {
  const running  = banks.filter(b => Object.values(b.operations).some(o => o.status === 'running')).length
  const failed   = banks.filter(b => Object.values(b.operations).some(o => o.status === 'failed')).length
  const allClear = banks.filter(b =>
    Object.values(b.operations).every(o => ['completed','not_started','pending'].includes(o.status)) &&
    !Object.values(b.operations).some(o => o.status === 'failed')
  ).length

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#18163f] dark:text-[#e2e8f0]">Operations Overview</h1>
          <p className="text-sm text-[#737373] dark:text-[#94a3b8] mt-1">
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <Link
          href="/analytics"
          className="flex items-center gap-2 bg-[#18163f] dark:bg-[#2dd4bf] dark:text-[#0f172a] text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-[#0e0c2a] dark:hover:bg-[#14b8a6] transition-colors"
        >
          <BarChart2 size={16} />
          Analytics
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard label="Total Banks"        value={banks.length} sub="monitored institutions" color="text-[#18163f] dark:text-[#e2e8f0]" />
        <SummaryCard label="Operations Running" value={running}      sub="currently active"       color="text-teal-600 dark:text-teal-400"    />
        <SummaryCard label="Alerts"             value={failed}       sub="need attention"          color="text-red-500"                         />
        <SummaryCard label="All Clear"          value={allClear}     sub="no active issues"        color="text-emerald-600 dark:text-emerald-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {banks.map(bank => {
          const focus    = activeOp(bank)
          const op       = bank.operations[focus]
          const hasAlert = Object.values(bank.operations).some(o => o.status === 'failed')

          return (
            <Link key={bank.id} href={`/banks/${bank.id}`} className="block group">
              <div className={`bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 transition-all duration-150 overflow-hidden ${
                hasAlert
                  ? 'ring-red-200 dark:ring-red-500/30 hover:ring-red-300 dark:hover:ring-red-500/50'
                  : 'ring-black/5 dark:ring-white/5 hover:ring-[#2dd4bf]/40 hover:shadow-md'
              }`}>
                <div className="px-6 pt-5 pb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-white dark:bg-white/10 p-0.5 ring-1 ring-black/5 dark:ring-white/10 shrink-0">
                      <Image src={bank.logo} alt={bank.name} width={40} height={40} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <p className="text-base font-medium text-[#18163f] dark:text-[#e2e8f0] leading-tight">{bank.name}</p>
                      <p className="text-xs text-[#737373] dark:text-[#94a3b8] mt-0.5 uppercase tracking-wider">{bank.tier}</p>
                    </div>
                  </div>
                  {hasAlert && <AlertTriangle size={16} className="text-red-400 mt-0.5 shrink-0" />}
                </div>

                <div className="px-6 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-medium text-[#737373] dark:text-[#94a3b8] uppercase tracking-wider">{focus} — Last Run</span>
                    <StatusBadge status={op.status} size="xs" />
                  </div>
                  <div className="h-2 bg-[#e5e5e5] dark:bg-[#334155] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        op.status === 'failed' ? 'bg-red-400' :
                        op.status === 'running' ? 'bg-[#2dd4bf]' : 'bg-emerald-400'
                      }`}
                      style={{ width: `${op.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-[#737373] dark:text-[#94a3b8] mt-1.5">{op.completedCount} / {op.procedureCount} procedures</p>
                </div>

                <div className="border-t border-[#e5e5e5] dark:border-[#334155] px-6 py-4 grid grid-cols-3 gap-2 bg-[#fafafa] dark:bg-[#0f172a]/50">
                  {(['SOD','POD','EOD'] as const).map(t => (
                    <div key={t} className="flex flex-col items-center gap-1.5">
                      <div className="flex items-center gap-1.5">
                        {opIcon(bank.operations[t].status)}
                        <span className="text-xs font-mono text-[#737373] dark:text-[#94a3b8]">{t}</span>
                      </div>
                      <div className="w-full h-1 bg-[#e5e5e5] dark:bg-[#334155] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${
                          bank.operations[t].status === 'failed'  ? 'bg-red-400'    :
                          bank.operations[t].status === 'running' ? 'bg-[#2dd4bf]' : 'bg-emerald-400'
                        }`} style={{ width: `${bank.operations[t].progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
