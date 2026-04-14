import { banks, history } from '@/lib/data'
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
  return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`
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
          { label: 'Overall Success Rate', value: `${overallRate}%`, sub: `${successfulOps}/${totalOps} runs succeeded`, color: overallRate >= 90 ? '#10b981' : '#f59e0b' },
          { label: 'Avg. Completion Time', value: fmtDuration(avgDurSec), sub: 'successful operations only', color: null },
          { label: 'Active Right Now', value: String(activeOps), sub: 'operations in progress', color: '#2dd4bf' },
          { label: 'Failed in 7 Days', value: String(failedOps), sub: `across ${banks.length} banks`, color: failedOps > 3 ? '#ef4444' : '#f59e0b' },
        ].map(({ label, value, sub, color }) => (
          <div key={label} className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 p-6">
            <p className="text-sm text-[#737373] dark:text-[#94a3b8]">{label}</p>
            <p
              className={`text-3xl font-bold mt-2 ${!color ? 'text-[#18163f] dark:text-[#e2e8f0]' : ''}`}
              style={color ? { color } : undefined}
            >
              {value}
            </p>
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
                          style={{ width: `${total > 0 ? Math.round((done / total) * 100) : 0}%` }}
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
