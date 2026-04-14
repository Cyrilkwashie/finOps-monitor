const fs = require('fs')
const w = (p, c) => { fs.writeFileSync(p, c); console.log('✓', p) }

// ─── StatusBadge ─────────────────────────────────────────────────────────────
w('src/components/StatusBadge.tsx', `import type { OpStatus } from '@/lib/types'

const config: Record<OpStatus, { label: string; dot: string; bg: string; text: string }> = {
  completed:   { label: 'Completed',   dot: 'bg-emerald-400',             bg: 'bg-emerald-50 dark:bg-emerald-500/15', text: 'text-emerald-700 dark:text-emerald-400' },
  running:     { label: 'Running',     dot: 'bg-[#2dd4bf] animate-pulse', bg: 'bg-teal-50 dark:bg-teal-500/15',       text: 'text-teal-700 dark:text-teal-400'       },
  failed:      { label: 'Failed',      dot: 'bg-red-400',                 bg: 'bg-red-50 dark:bg-red-500/15',         text: 'text-red-600 dark:text-red-400'         },
  not_started: { label: 'Not Started', dot: 'bg-[#d4d4d4]',              bg: 'bg-[#f5f5f5] dark:bg-[#334155]/60',    text: 'text-[#737373] dark:text-[#94a3b8]'     },
  pending:     { label: 'Pending',     dot: 'bg-amber-400',               bg: 'bg-amber-50 dark:bg-amber-500/15',     text: 'text-amber-700 dark:text-amber-400'     },
}

export function StatusBadge({ status, size = 'sm' }: { status: OpStatus; size?: 'xs' | 'sm' }) {
  const c = config[status]
  return (
    <span className={\`inline-flex items-center gap-1.5 rounded-full font-medium \${
      size === 'xs' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'
    } \${c.bg} \${c.text}\`}>
      <span className={\`w-1.5 h-1.5 rounded-full shrink-0 \${c.dot}\`} />
      {c.label}
    </span>
  )
}
`)

// ─── History page ─────────────────────────────────────────────────────────────
w('src/app/(dashboard)/banks/[bankId]/history/page.tsx', `'use client'
import { use, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react'
import { banks, history } from '@/lib/data'
import { StatusBadge } from '@/components/StatusBadge'

type View = 'history' | 'procedures'

export default function BankHistoryPage({ params }: { params: Promise<{ bankId: string }> }) {
  const { bankId } = use(params)
  const bank = banks.find(b => b.id === bankId)

  const [view, setView] = useState<View>('history')
  const [selectedOpType, setSelectedOpType] = useState<'SOD' | 'POD' | 'EOD' | null>(null)
  const [dateFilter, setDateFilter] = useState('')

  if (!bank) return null

  const dur = (s: number) => { const m = Math.floor(s / 60); return m ? \`\${m}m\` : \`\${s}s\` }

  function selectOp(opType: 'SOD' | 'POD' | 'EOD') {
    setSelectedOpType(opType)
    setView('procedures')
  }

  // ── Screen 2: Procedures ────────────────────────────────────
  if (view === 'procedures' && selectedOpType) {
    const op = bank.operations[selectedOpType]
    const procs = op.procedures

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <button
            onClick={() => setView('history')}
            className="flex items-center gap-1.5 text-sm text-[#737373] dark:text-[#94a3b8] hover:text-[#18163f] dark:hover:text-[#e2e8f0] mb-3 transition-colors"
          >
            <ChevronLeft size={16} /> Operation History
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-[#18163f] dark:text-[#e2e8f0]">{selectedOpType} Procedures</h1>
              <p className="text-sm text-[#737373] dark:text-[#94a3b8] mt-1">{bank.name}</p>
            </div>
            <StatusBadge status={op.status} size="sm" />
          </div>
        </div>

        {/* Summary strip */}
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 px-6 py-5 flex items-center gap-8">
          <div>
            <p className="text-xs text-[#737373] dark:text-[#94a3b8] uppercase tracking-widest">Total</p>
            <p className="text-2xl font-bold text-[#18163f] dark:text-[#e2e8f0] mt-1">{op.procedureCount}</p>
          </div>
          <div>
            <p className="text-xs text-[#737373] dark:text-[#94a3b8] uppercase tracking-widest">Completed</p>
            <p className="text-2xl font-bold text-emerald-500 mt-1">{op.completedCount}</p>
          </div>
          {op.status === 'running' && (
            <div>
              <p className="text-xs text-[#737373] dark:text-[#94a3b8] uppercase tracking-widest">Progress</p>
              <p className="text-2xl font-bold text-teal-500 mt-1">{op.progress}%</p>
            </div>
          )}
          <div className="ml-auto w-32">
            <div className="h-2 bg-[#f5f5f5] dark:bg-[#334155] rounded-full">
              <div
                className="h-2 bg-[#2dd4bf] rounded-full transition-all"
                style={{ width: \`\${op.procedureCount > 0 ? Math.round((op.completedCount / op.procedureCount) * 100) : 0}%\` }}
              />
            </div>
            <p className="text-xs text-[#737373] dark:text-[#94a3b8] mt-1 text-right">
              {op.procedureCount > 0 ? Math.round((op.completedCount / op.procedureCount) * 100) : 0}%
            </p>
          </div>
        </div>

        {/* Procedure list */}
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 overflow-hidden">
          {procs.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm text-[#737373] dark:text-[#94a3b8]">
              No procedure data available for this operation.
            </div>
          ) : (
            <div className="divide-y divide-[#f5f5f5] dark:divide-[#334155]">
              {procs.map((proc, idx) => (
                <Link
                  key={proc.id}
                  href={\`/banks/\${bank.id}/ops/\${selectedOpType.toLowerCase()}/procedures/\${proc.id}\`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-[#fafafa] dark:hover:bg-white/5 transition-colors group"
                >
                  <span className="text-xs font-mono text-[#d4d4d4] dark:text-[#334155] w-5 shrink-0 tabular-nums">{idx + 1}</span>
                  <div className={\`w-2 h-2 rounded-full shrink-0 \${
                    proc.status === 'completed'  ? 'bg-emerald-400' :
                    proc.status === 'running'    ? 'bg-teal-400 animate-pulse' :
                    proc.status === 'failed'     ? 'bg-red-400' :
                    proc.status === 'pending'    ? 'bg-amber-400' :
                    'bg-[#d4d4d4] dark:bg-[#334155]'
                  }\`} />
                  <span className="flex-1 text-sm font-medium text-[#18163f] dark:text-[#e2e8f0] truncate">{proc.name}</span>
                  {proc.duration != null && (
                    <span className="flex items-center gap-1 text-xs text-[#737373] dark:text-[#94a3b8] shrink-0">
                      <Clock size={12} />
                      {dur(proc.duration)}
                    </span>
                  )}
                  {proc.status === 'running' && proc.progress != null && (
                    <span className="text-xs font-medium text-teal-600 dark:text-teal-400 shrink-0">{proc.progress}%</span>
                  )}
                  <StatusBadge status={proc.status} size="xs" />
                  <ChevronRight size={15} className="text-[#d4d4d4] dark:text-[#334155] group-hover:text-[#737373] dark:group-hover:text-[#94a3b8] transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── Screen 1: History ───────────────────────────────────────
  const filtered = history
    .filter(h => h.bankId === bank.id)
    .filter(h => !dateFilter || h.date === dateFilter)
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <Link href={\`/banks/\${bank.id}\`} className="flex items-center gap-1.5 text-sm text-[#737373] dark:text-[#94a3b8] hover:text-[#18163f] dark:hover:text-[#e2e8f0] mb-3 transition-colors">
          <ChevronLeft size={16} /> {bank.name}
        </Link>
        <h1 className="text-xl font-semibold text-[#18163f] dark:text-[#e2e8f0]">Operation History</h1>
        <p className="text-sm text-[#737373] dark:text-[#94a3b8] mt-1">{bank.name} · tap a row to view its procedures</p>
      </div>

      {/* Date filter */}
      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 px-6 py-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 border border-[#e5e5e5] dark:border-[#334155] rounded-xl px-4 py-2">
          <Calendar size={16} className="text-[#737373] dark:text-[#94a3b8]" />
          <input
            type="date"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="text-sm text-[#18163f] dark:text-[#e2e8f0] focus:outline-none bg-transparent [color-scheme:light] dark:[color-scheme:dark]"
          />
        </div>
        {dateFilter && (
          <button
            onClick={() => setDateFilter('')}
            className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      {/* History table */}
      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 overflow-hidden">
        <div className="grid grid-cols-[1fr_80px_110px_80px_100px_32px] text-xs uppercase tracking-widest text-[#737373] dark:text-[#94a3b8] px-6 py-3 border-b border-[#e5e5e5] dark:border-[#334155] bg-[#fafafa] dark:bg-[#0f172a]/50">
          <span>Date</span>
          <span>Type</span>
          <span>Status</span>
          <span>Duration</span>
          <span>Procedures</span>
          <span />
        </div>

        {filtered.length === 0 && (
          <div className="px-6 py-10 text-center text-sm text-[#737373] dark:text-[#94a3b8]">No records for this date.</div>
        )}

        {filtered.map((h, i) => (
          <button
            key={i}
            onClick={() => selectOp(h.opType)}
            className="w-full grid grid-cols-[1fr_80px_110px_80px_100px_32px] items-center px-6 py-4 border-b border-[#e5e5e5] dark:border-[#334155] last:border-0 hover:bg-[#fafafa] dark:hover:bg-white/5 transition-colors text-left group"
          >
            <span className="text-sm text-[#18163f] dark:text-[#e2e8f0] font-mono">{h.date}</span>
            <span className="text-sm font-mono font-semibold text-[#18163f] dark:text-[#e2e8f0]">{h.opType}</span>
            <span><StatusBadge status={h.status} size="xs" /></span>
            <span className="text-sm font-mono text-[#737373] dark:text-[#94a3b8]">{dur(h.duration)}</span>
            <div>
              <span className="text-sm text-[#737373] dark:text-[#94a3b8]">{h.proceduresRun}</span>
              {h.proceduresFailed > 0 && (
                <span className="ml-1 text-xs text-red-400">({h.proceduresFailed} failed)</span>
              )}
            </div>
            <ChevronRight size={15} className="text-[#d4d4d4] dark:text-[#334155] group-hover:text-[#737373] dark:group-hover:text-[#94a3b8] transition-colors justify-self-end" />
          </button>
        ))}
      </div>
    </div>
  )
}
`)

// ─── Analytics page ───────────────────────────────────────────────────────────
w('src/app/(dashboard)/analytics/page.tsx', `import { banks, history } from '@/lib/data'
import { DurationTrendChart } from '@/components/charts/DurationTrendChart'
import { StatusDonutChart } from '@/components/charts/StatusDonutChart'
import { SuccessRateChart } from '@/components/charts/SuccessRateChart'
import { FailuresBarChart } from '@/components/charts/FailuresBarChart'
import { VolumeTrendChart } from '@/components/charts/VolumeTrendChart'
import { AvgDurationByBankChart } from '@/components/charts/AvgDurationByBankChart'
import { StatusBadge } from '@/components/StatusBadge'

const DAYS = ['Apr 8', 'Apr 9', 'Apr 10', 'Apr 11', 'Apr 12', 'Apr 13', 'Apr 14']
const DATE_KEYS = ['2026-04-08', '2026-04-09', '2026-04-10', '2026-04-11', '2026-04-12', '2026-04-13', '2026-04-14']
const BANK_CODES = ['FNB', 'CTB', 'HCB', 'MRB', 'APB']
const BANK_COLORS: Record<string, string> = {
  FNB: '#18163f',
  CTB: '#2dd4bf',
  HCB: '#f97316',
  MRB: '#6366f1',
  APB: '#10b981',
}

function fmtDuration(s: number) {
  const m = Math.floor(s / 60)
  return m >= 60 ? \`\${Math.floor(m / 60)}h \${m % 60}m\` : \`\${m}m\`
}

const sodDurationTrend = DATE_KEYS.map((dk, i) => {
  const row: Record<string, string | number> = { date: DAYS[i] }
  for (const code of BANK_CODES) {
    const bank = banks.find(b => b.code === code)!
    const entry = history.find(h => h.date === dk && h.bankId === bank.id && h.opType === 'SOD')
    row[code] = entry?.status === 'completed' ? entry.duration : 0
  }
  return row
})

const todayStatuses = { Completed: 0, Running: 0, Failed: 0, Pending: 0, 'Not Started': 0 }
for (const bank of banks) {
  for (const op of Object.values(bank.operations)) {
    if (op.status === 'completed') todayStatuses['Completed']++
    else if (op.status === 'running') todayStatuses['Running']++
    else if (op.status === 'failed') todayStatuses['Failed']++
    else if (op.status === 'pending') todayStatuses['Pending']++
    else todayStatuses['Not Started']++
  }
}
const statusDonutData = Object.entries(todayStatuses).map(([name, value]) => ({ name, value }))

const successRateData = banks.map(bank => {
  const entries = history.filter(h => h.bankId === bank.id)
  const successful = entries.filter(h => h.status === 'completed').length
  const rate = entries.length > 0 ? Math.round((successful / entries.length) * 100) : 0
  const color = rate >= 90 ? '#10b981' : rate >= 75 ? '#f59e0b' : '#ef4444'
  return { bank: bank.code, rate, color }
})

const dailyFailures = DATE_KEYS.map((dk, i) => {
  const day = history.filter(h => h.date === dk && h.status === 'failed')
  return {
    date: DAYS[i],
    SOD: day.filter(h => h.opType === 'SOD').length,
    POD: day.filter(h => h.opType === 'POD').length,
    EOD: day.filter(h => h.opType === 'EOD').length,
  }
})

const volumeTrend = DATE_KEYS.map((dk, i) => {
  const day = history.filter(h => h.date === dk)
  return {
    date: DAYS[i],
    SOD: day.filter(h => h.opType === 'SOD').reduce((a, h) => a + h.proceduresRun, 0),
    POD: day.filter(h => h.opType === 'POD').reduce((a, h) => a + h.proceduresRun, 0),
    EOD: day.filter(h => h.opType === 'EOD').reduce((a, h) => a + h.proceduresRun, 0),
  }
})

const avgDurationByBank = banks.map(bank => {
  function avg(op: 'SOD' | 'POD' | 'EOD') {
    const items = history.filter(h => h.bankId === bank.id && h.opType === op && h.status === 'completed')
    return items.length ? Math.round(items.reduce((a, h) => a + h.duration, 0) / items.length) : 0
  }
  return { bank: bank.code, SOD: avg('SOD'), POD: avg('POD'), EOD: avg('EOD') }
})

const last7 = history
const totalOps = last7.length
const successfulOps = last7.filter(h => h.status === 'completed').length
const failedOps = last7.filter(h => h.status === 'failed').length
const overallRate = Math.round((successfulOps / totalOps) * 100)
const avgDurSec = Math.round(
  last7.filter(h => h.status === 'completed').reduce((a, h) => a + h.duration, 0) /
  (successfulOps || 1)
)
const activeOps = banks.flatMap(b => Object.values(b.operations)).filter(o => o.status === 'running').length

const recentHistory = [...history]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 12)

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#18163f] dark:text-[#e2e8f0]">Analytics</h1>
        <p className="text-sm text-[#737373] dark:text-[#94a3b8] mt-1">7-day operational performance across all banks</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Overall Success Rate', value: \`\${overallRate}%\`, sub: \`\${successfulOps}/\${totalOps} runs succeeded\`, color: overallRate >= 90 ? '#10b981' : '#f59e0b' },
          { label: 'Avg. Completion Time', value: fmtDuration(avgDurSec), sub: 'successful operations only', color: '#18163f' },
          { label: 'Active Right Now', value: String(activeOps), sub: 'operations in progress', color: '#2dd4bf' },
          { label: 'Failed in 7 Days', value: String(failedOps), sub: \`across \${banks.length} banks\`, color: failedOps > 3 ? '#ef4444' : '#f59e0b' },
        ].map(({ label, value, sub, color }) => (
          <div key={label} className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 p-6">
            <p className="text-sm text-[#737373] dark:text-[#94a3b8]">{label}</p>
            <p className="text-3xl font-bold mt-2" style={{ color }}>{value}</p>
            <p className="text-xs text-[#a3a3a3] dark:text-[#475569] mt-1">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 p-6">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-[#18163f] dark:text-[#e2e8f0]">SOD Duration Trend</h2>
            <p className="text-sm text-[#737373] dark:text-[#94a3b8]">Start-of-day run time per bank over 7 days</p>
          </div>
          <DurationTrendChart data={sodDurationTrend} banks={banks.map(b => ({ code: b.code }))} />
        </div>

        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 p-6">
          <div className="mb-1">
            <h2 className="text-base font-semibold text-[#18163f] dark:text-[#e2e8f0]">Today&apos;s Status Breakdown</h2>
            <p className="text-sm text-[#737373] dark:text-[#94a3b8]">Live operation distribution</p>
          </div>
          <StatusDonutChart data={statusDonutData} />
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 justify-center">
            {statusDonutData.filter(d => d.value > 0).map(d => (
              <span key={d.name} className="text-xs text-[#737373] dark:text-[#94a3b8]">
                <span className="font-medium text-[#18163f] dark:text-[#e2e8f0]">{d.value}</span> {d.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 p-6">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-[#18163f] dark:text-[#e2e8f0]">7-Day Success Rate by Bank</h2>
            <p className="text-sm text-[#737373] dark:text-[#94a3b8]">All operation types combined</p>
          </div>
          <SuccessRateChart data={successRateData} />
        </div>

        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 p-6">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-[#18163f] dark:text-[#e2e8f0]">Avg. Duration by Bank &amp; Type</h2>
            <p className="text-sm text-[#737373] dark:text-[#94a3b8]">Successful runs only — SOD / POD / EOD</p>
          </div>
          <AvgDurationByBankChart data={avgDurationByBank} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 p-6">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-[#18163f] dark:text-[#e2e8f0]">Daily Procedure Volume</h2>
            <p className="text-sm text-[#737373] dark:text-[#94a3b8]">Total procedures run per operation type</p>
          </div>
          <VolumeTrendChart data={volumeTrend} />
        </div>

        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 p-6">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-[#18163f] dark:text-[#e2e8f0]">Daily Failure Count</h2>
            <p className="text-sm text-[#737373] dark:text-[#94a3b8]">Failed operations by type per day</p>
          </div>
          <FailuresBarChart data={dailyFailures} />
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 p-6">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-[#18163f] dark:text-[#e2e8f0]">Today&apos;s Operation Matrix</h2>
          <p className="text-sm text-[#737373] dark:text-[#94a3b8]">Live status across all banks and operation types</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e5e5e5] dark:border-[#334155]">
                <th className="text-left font-medium text-[#737373] dark:text-[#94a3b8] pb-3 pr-6">Bank</th>
                {(['SOD', 'POD', 'EOD'] as const).map(t => (
                  <th key={t} className="text-left font-medium text-[#737373] dark:text-[#94a3b8] pb-3 px-4">{t}</th>
                ))}
                <th className="text-left font-medium text-[#737373] dark:text-[#94a3b8] pb-3 pl-4">Procedures</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f5f5f5] dark:divide-[#334155]">
              {banks.map(bank => {
                const ops = bank.operations
                const total = Object.values(ops).reduce((a, o) => a + o.procedureCount, 0)
                const done = Object.values(ops).reduce((a, o) => a + o.completedCount, 0)
                return (
                  <tr key={bank.id} className="hover:bg-[#fafafa] dark:hover:bg-white/5 transition-colors">
                    <td className="py-3.5 pr-6">
                      <div className="font-semibold text-[#18163f] dark:text-[#e2e8f0]">{bank.code}</div>
                      <div className="text-xs text-[#737373] dark:text-[#94a3b8]">{bank.name}</div>
                    </td>
                    {(['SOD', 'POD', 'EOD'] as const).map(t => (
                      <td key={t} className="py-3.5 px-4">
                        <StatusBadge status={ops[t].status} size="xs" />
                        {ops[t].status === 'running' && (
                          <div className="text-xs text-[#737373] dark:text-[#94a3b8] mt-1">{ops[t].progress}%</div>
                        )}
                      </td>
                    ))}
                    <td className="py-3.5 pl-4">
                      <div className="text-sm font-medium text-[#18163f] dark:text-[#e2e8f0]">{done}/{total}</div>
                      <div className="mt-1.5 h-1.5 bg-[#f5f5f5] dark:bg-[#334155] rounded-full w-28">
                        <div
                          className="h-1.5 bg-[#2dd4bf] rounded-full"
                          style={{ width: \`\${total > 0 ? Math.round((done / total) * 100) : 0}%\` }}
                        />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 p-6">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-[#18163f] dark:text-[#e2e8f0]">Recent Run History</h2>
          <p className="text-sm text-[#737373] dark:text-[#94a3b8]">Last 12 operations across all banks</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e5e5e5] dark:border-[#334155]">
                {['Date', 'Bank', 'Type', 'Status', 'Duration', 'Procedures', 'Failures'].map(h => (
                  <th key={h} className="text-left font-medium text-[#737373] dark:text-[#94a3b8] pb-3 pr-6 last:pr-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f5f5f5] dark:divide-[#334155]">
              {recentHistory.map((entry, i) => {
                const bank = banks.find(b => b.id === entry.bankId)
                return (
                  <tr key={i} className="hover:bg-[#fafafa] dark:hover:bg-white/5 transition-colors">
                    <td className="py-3 pr-6 text-[#737373] dark:text-[#94a3b8]">{entry.date}</td>
                    <td className="py-3 pr-6">
                      <span className="font-semibold" style={{ color: BANK_COLORS[bank?.code ?? ''] ?? '#18163f' }}>
                        {bank?.code}
                      </span>
                    </td>
                    <td className="py-3 pr-6">
                      <span className="font-mono text-xs bg-[#f5f5f5] dark:bg-[#334155] text-[#18163f] dark:text-[#e2e8f0] px-2 py-1 rounded-md">
                        {entry.opType}
                      </span>
                    </td>
                    <td className="py-3 pr-6">
                      <StatusBadge status={entry.status} size="xs" />
                    </td>
                    <td className="py-3 pr-6 text-[#737373] dark:text-[#94a3b8]">{fmtDuration(entry.duration)}</td>
                    <td className="py-3 pr-6 text-[#18163f] dark:text-[#e2e8f0] font-medium">{entry.proceduresRun}</td>
                    <td className="py-3">
                      <span className={entry.proceduresFailed > 0 ? 'text-red-500 font-medium' : 'text-[#a3a3a3] dark:text-[#475569]'}>
                        {entry.proceduresFailed > 0 ? entry.proceduresFailed : '—'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
`)

// ─── Login page ───────────────────────────────────────────────────────────────
w('src/app/(auth)/login/page.tsx', `import type { Metadata } from 'next'
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
`)

// ─── LoginRight ───────────────────────────────────────────────────────────────
w('src/app/(auth)/login/_components/LoginRight.tsx', `'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertTriangle, Activity } from 'lucide-react'

export function LoginRight() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearError = () => setError(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields to continue.')
      return
    }
    setIsLoading(true)
    await new Promise<void>((r) => setTimeout(r, 1200))
    router.push('/dashboard')
  }

  return (
    <div className="flex-1 bg-white dark:bg-[#1e293b] flex flex-col justify-center px-8 py-12 lg:px-12 transition-colors">
      {/* Mobile-only logo */}
      <div className="flex items-center gap-2.5 mb-10 lg:hidden">
        <div className="bg-[#002244] dark:bg-[#2dd4bf]/10 rounded-lg p-1.5 inline-flex">
          <Activity size={18} className="text-white dark:text-[#2dd4bf]" />
        </div>
        <span className="text-sm font-semibold text-[#002244] dark:text-[#e2e8f0]">
          FinOps<span className="text-teal-600 dark:text-teal-400"> Monitor</span>
        </span>
      </div>

      <div className="w-full max-w-sm mx-auto">
        {/* Heading */}
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-widest text-teal-600 dark:text-teal-400 font-medium mb-2">
            Welcome Back
          </p>
          <h1 className="text-3xl font-extrabold text-[#002244] dark:text-[#e2e8f0]">
            Sign in to your account
          </h1>
          <p className="text-sm text-[#737373] dark:text-[#94a3b8] mt-2">
            Enter your credentials to access the platform.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4">
            {/* Error banner */}
            {error && (
              <div
                className="flex items-start gap-2 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-[0.625rem] px-3 py-2.5"
                role="alert"
              >
                <AlertTriangle size={14} className="text-red-500 shrink-0 mt-0.5" />
                <span className="text-xs text-red-600 dark:text-red-400">{error}</span>
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-[#0a0a0a] dark:text-[#e2e8f0] mb-1.5"
              >
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373] dark:text-[#94a3b8] pointer-events-none"
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@finops.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearError() }}
                  className="w-full h-11 pl-9 pr-3 text-sm text-[#0a0a0a] dark:text-[#e2e8f0] bg-white dark:bg-[#0f172a] border border-[#e5e5e5] dark:border-[#334155] rounded-[0.625rem] placeholder:text-gray-400 dark:placeholder:text-[#475569] focus:outline-none focus:border-[#002244] dark:focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#002244]/20 dark:focus:ring-[#2dd4bf]/20 transition-all duration-150"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-[#0a0a0a] dark:text-[#e2e8f0]"
                >
                  Password
                </label>
                <a href="#" className="text-[10px] text-[#002244] dark:text-teal-400 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373] dark:text-[#94a3b8] pointer-events-none"
                />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError() }}
                  className="w-full h-11 pl-9 pr-10 text-sm text-[#0a0a0a] dark:text-[#e2e8f0] bg-white dark:bg-[#0f172a] border border-[#e5e5e5] dark:border-[#334155] rounded-[0.625rem] placeholder:text-gray-400 dark:placeholder:text-[#475569] focus:outline-none focus:border-[#002244] dark:focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#002244]/20 dark:focus:ring-[#2dd4bf]/20 transition-all duration-150"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] dark:text-[#94a3b8] hover:text-[#0a0a0a] dark:hover:text-[#e2e8f0] transition-colors duration-150 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={\`mt-2 w-full h-11 rounded-[0.625rem] text-sm font-semibold text-white flex items-center justify-center gap-2 transition-colors duration-150 \${
                isLoading
                  ? 'bg-[#002244]/70 cursor-not-allowed'
                  : 'bg-[#002244] hover:bg-[#001833] cursor-pointer'
              }\`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[#e5e5e5] dark:bg-[#334155]" />
          <span className="text-[10px] text-[#737373] dark:text-[#94a3b8] uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-[#e5e5e5] dark:bg-[#334155]" />
        </div>

        {/* Google button */}
        <button
          type="button"
          className="w-full h-11 rounded-[0.625rem] border border-[#e5e5e5] dark:border-[#334155] flex items-center justify-center gap-2.5 text-sm font-medium text-[#0a0a0a] dark:text-[#e2e8f0] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-150 cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853" />
            <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>

        {/* Footer note */}
        <p className="text-center text-[10px] text-[#a3a3a3] dark:text-[#475569] mt-8">
          By signing in, you agree to our{' '}
          <a href="#" className="underline hover:text-[#737373] dark:hover:text-[#94a3b8]">Terms</a> and
          {' '}
          <a href="#" className="underline hover:text-[#737373] dark:hover:text-[#94a3b8]">Privacy Policy</a>.
        </p>
      </div>
    </div>
  )
}
`)

console.log('\nAll remaining pages written.')
