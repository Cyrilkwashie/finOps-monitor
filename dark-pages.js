const fs = require('fs')
const w = (p, c) => { fs.writeFileSync(p, c); console.log('✓', p) }

// ─── Dashboard layout ─────────────────────────────────────────────────────────
w('src/app/(dashboard)/layout.tsx', `import type { Metadata } from 'next'
import { DashboardNav } from '@/components/DashboardNav'

export const metadata: Metadata = { title: 'FinOps Monitor' }

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0f172a] flex flex-col transition-colors">
      <DashboardNav />
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  )
}
`)

// ─── Dashboard overview page ──────────────────────────────────────────────────
w('src/app/(dashboard)/dashboard/page.tsx', `import Link from 'next/link'
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
      <p className={\`text-2xl font-bold \${color}\`}>{value}</p>
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
            <Link key={bank.id} href={\`/banks/\${bank.id}\`} className="block group">
              <div className={\`bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 transition-all duration-150 overflow-hidden \${
                hasAlert
                  ? 'ring-red-200 dark:ring-red-500/30 hover:ring-red-300 dark:hover:ring-red-500/50'
                  : 'ring-black/5 dark:ring-white/5 hover:ring-[#2dd4bf]/40 hover:shadow-md'
              }\`}>
                <div className="px-6 pt-5 pb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={\`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold font-mono \${
                      hasAlert ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400' : 'bg-[#18163f]/5 dark:bg-white/5 text-[#18163f] dark:text-[#e2e8f0]'
                    }\`}>
                      {bank.code}
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
                      className={\`h-full rounded-full transition-all \${
                        op.status === 'failed' ? 'bg-red-400' :
                        op.status === 'running' ? 'bg-[#2dd4bf]' : 'bg-emerald-400'
                      }\`}
                      style={{ width: \`\${op.progress}%\` }}
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
                        <div className={\`h-full rounded-full \${
                          bank.operations[t].status === 'failed'  ? 'bg-red-400'    :
                          bank.operations[t].status === 'running' ? 'bg-[#2dd4bf]' : 'bg-emerald-400'
                        }\`} style={{ width: \`\${bank.operations[t].progress}%\` }} />
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
`)

// ─── Bank detail page ─────────────────────────────────────────────────────────
w('src/app/(dashboard)/banks/[bankId]/page.tsx', `import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBankById } from '@/lib/data'
import { StatusBadge } from '@/components/StatusBadge'
import { ChevronLeft, History, Clock, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react'
import type { Operation } from '@/lib/types'

function fmt(s?: string) {
  if (!s) return '—'
  return new Date(s).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}
function dur(secs?: number) {
  if (!secs) return '—'
  const m = Math.floor(secs / 60), s = secs % 60
  return m ? \`\${m}m \${s}s\` : \`\${s}s\`
}

function OpCard({ op, bankId }: { op: Operation; bankId: string }) {
  return (
    <div className={\`bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 overflow-hidden \${
      op.status === 'failed'  ? 'ring-red-200 dark:ring-red-500/30'  :
      op.status === 'running' ? 'ring-teal-200 dark:ring-teal-500/30' : 'ring-black/5 dark:ring-white/5'
    }\`}>
      <div className="px-6 pt-5 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={\`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold font-mono \${
            op.status === 'failed'    ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'             :
            op.status === 'running'   ? 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400'         :
            op.status === 'completed' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
            'bg-[#f5f5f5] dark:bg-white/5 text-[#737373] dark:text-[#94a3b8]'
          }\`}>{op.type}</div>
          <div>
            <p className="text-base font-medium text-[#18163f] dark:text-[#e2e8f0]">
              {op.type === 'SOD' ? 'Start of Day' : op.type === 'POD' ? 'Pre-End of Day' : 'End of Day'}
            </p>
            <p className="text-sm text-[#737373] dark:text-[#94a3b8] mt-0.5">{op.completedCount} / {op.procedureCount} procedures</p>
          </div>
        </div>
        <StatusBadge status={op.status} />
      </div>

      <div className="px-6 pb-4">
        <div className="h-2 bg-[#e5e5e5] dark:bg-[#334155] rounded-full overflow-hidden">
          <div className={\`h-full rounded-full transition-all \${
            op.status === 'failed'  ? 'bg-red-400'   :
            op.status === 'running' ? 'bg-[#2dd4bf]' : 'bg-emerald-400'
          }\`} style={{ width: \`\${op.progress}%\` }} />
        </div>
        <div className="flex justify-between mt-2 text-sm text-[#737373] dark:text-[#94a3b8]">
          <span>Started: {fmt(op.startedAt)}</span>
          <span>{op.status === 'completed' ? \`Finished: \${fmt(op.completedAt)}\` : \`\${op.progress}%\`}</span>
        </div>
      </div>

      {op.procedures.length > 0 && (
        <div className="border-t border-[#e5e5e5] dark:border-[#334155]">
          {op.procedures.slice(0, 4).map(p => (
            <Link
              key={p.id}
              href={\`/banks/\${bankId}/ops/\${op.type.toLowerCase()}/procedures/\${p.id}\`}
              className="flex items-center justify-between px-6 py-3.5 hover:bg-[#fafafa] dark:hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                {p.status === 'completed'   && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                {p.status === 'running'     && <Loader2 size={16} className="text-teal-400 animate-spin shrink-0" />}
                {p.status === 'failed'      && <AlertTriangle size={16} className="text-red-400 shrink-0" />}
                {p.status === 'not_started' && <Clock size={16} className="text-[#d4d4d4] dark:text-[#334155] shrink-0" />}
                {p.status === 'pending'     && <Clock size={16} className="text-amber-400 shrink-0" />}
                <span className="text-sm text-[#18163f] dark:text-[#e2e8f0]">{p.name}</span>
              </div>
              <div className="flex items-center gap-3">
                {p.duration && <span className="text-xs text-[#737373] dark:text-[#94a3b8] font-mono">{dur(p.duration)}</span>}
                <StatusBadge status={p.status} size="xs" />
              </div>
            </Link>
          ))}
          {op.procedures.length > 4 && (
            <Link
              href={\`/banks/\${bankId}/ops/\${op.type.toLowerCase()}\`}
              className="flex items-center justify-center px-6 py-3.5 text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 border-t border-[#e5e5e5] dark:border-[#334155] hover:bg-[#fafafa] dark:hover:bg-white/5 transition-colors"
            >
              View all {op.procedures.length} procedures →
            </Link>
          )}
        </div>
      )}

      {op.procedures.length === 0 && (
        <div className="border-t border-[#e5e5e5] dark:border-[#334155] px-6 py-4 text-sm text-[#737373] dark:text-[#94a3b8]">
          No procedures recorded yet.
        </div>
      )}
    </div>
  )
}

export default async function BankDetailPage({ params }: { params: Promise<{ bankId: string }> }) {
  const { bankId } = await params
  const bank = getBankById(bankId)
  if (!bank) notFound()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <Link href="/dashboard" className="flex items-center gap-1.5 text-sm text-[#737373] dark:text-[#94a3b8] hover:text-[#18163f] dark:hover:text-[#e2e8f0] mb-3 transition-colors">
            <ChevronLeft size={16} /> All Banks
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#18163f] dark:bg-[#2dd4bf]/10 dark:ring-1 dark:ring-[#2dd4bf]/30 text-[#2dd4bf] flex items-center justify-center text-sm font-bold font-mono">
              {bank.code}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-[#18163f] dark:text-[#e2e8f0]">{bank.name}</h1>
              <p className="text-sm text-[#737373] dark:text-[#94a3b8] mt-0.5 uppercase tracking-widest">{bank.tier} · {bank.country}</p>
            </div>
          </div>
        </div>
        <Link
          href={\`/banks/\${bank.id}/history\`}
          className="flex items-center gap-2 border border-[#e5e5e5] dark:border-[#334155] text-sm font-medium text-[#18163f] dark:text-[#e2e8f0] px-4 py-2.5 rounded-xl hover:bg-[#fafafa] dark:hover:bg-white/5 transition-colors"
        >
          <History size={16} />
          History
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {(['SOD','POD','EOD'] as const).map(t => (
          <OpCard key={t} op={bank.operations[t]} bankId={bank.id} />
        ))}
      </div>
    </div>
  )
}
`)

// ─── Op procedures list ───────────────────────────────────────────────────────
w('src/app/(dashboard)/banks/[bankId]/ops/[opType]/page.tsx', `import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBankById } from '@/lib/data'
import { StatusBadge } from '@/components/StatusBadge'
import { ChevronLeft, CheckCircle2, AlertTriangle, Loader2, Clock } from 'lucide-react'

function dur(secs?: number) {
  if (!secs) return '—'
  const m = Math.floor(secs / 60), s = secs % 60
  return m ? \`\${m}m \${s}s\` : \`\${s}s\`
}

export default async function OpProceduresPage({
  params,
}: {
  params: Promise<{ bankId: string; opType: string }>
}) {
  const { bankId, opType } = await params
  const bank  = getBankById(bankId)
  const opKey = opType.toUpperCase() as 'SOD' | 'POD' | 'EOD'
  if (!bank || !['SOD','POD','EOD'].includes(opKey)) notFound()

  const op = bank.operations[opKey]

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <Link href={\`/banks/\${bank.id}\`} className="flex items-center gap-1.5 text-sm text-[#737373] dark:text-[#94a3b8] hover:text-[#18163f] dark:hover:text-[#e2e8f0] mb-3 transition-colors">
          <ChevronLeft size={16} /> {bank.name}
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-[#18163f] dark:text-[#e2e8f0]">
              {opKey === 'SOD' ? 'Start of Day' : opKey === 'POD' ? 'Pre-End of Day' : 'End of Day'}
            </h1>
            <p className="text-sm text-[#737373] dark:text-[#94a3b8] mt-1">{op.completedCount} / {op.procedureCount} procedures · {bank.name}</p>
          </div>
          <StatusBadge status={op.status} />
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 px-6 py-5">
        <div className="flex items-center justify-between mb-3 text-sm text-[#737373] dark:text-[#94a3b8]">
          <span>Overall progress</span>
          <span className="font-mono font-medium text-[#18163f] dark:text-[#e2e8f0]">{op.progress}%</span>
        </div>
        <div className="h-2.5 bg-[#e5e5e5] dark:bg-[#334155] rounded-full overflow-hidden">
          <div className={\`h-full rounded-full \${
            op.status === 'failed'  ? 'bg-red-400'   :
            op.status === 'running' ? 'bg-[#2dd4bf]' : 'bg-emerald-400'
          }\`} style={{ width: \`\${op.progress}%\` }} />
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 overflow-hidden divide-y divide-[#e5e5e5] dark:divide-[#334155]">
        {op.procedures.length === 0 && (
          <div className="px-6 py-8 text-center text-sm text-[#737373] dark:text-[#94a3b8]">No procedures recorded.</div>
        )}
        {op.procedures.map((p, i) => (
          <Link
            key={p.id}
            href={\`/banks/\${bank.id}/ops/\${opKey.toLowerCase()}/procedures/\${p.id}\`}
            className="flex items-center justify-between px-6 py-4 hover:bg-[#fafafa] dark:hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-[#d4d4d4] dark:text-[#334155] w-5 text-right shrink-0">{i + 1}</span>
              {p.status === 'completed'   && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
              {p.status === 'running'     && <Loader2 size={16} className="text-teal-400 animate-spin shrink-0" />}
              {p.status === 'failed'      && <AlertTriangle size={16} className="text-red-400 shrink-0" />}
              {p.status === 'not_started' && <Clock size={16} className="text-[#d4d4d4] dark:text-[#334155] shrink-0" />}
              {p.status === 'pending'     && <Clock size={16} className="text-amber-400 shrink-0" />}
              <span className="text-base text-[#18163f] dark:text-[#e2e8f0]">{p.name}</span>
            </div>
            <div className="flex items-center gap-4">
              {p.status === 'running' && p.progress !== undefined && (
                <span className="text-xs text-[#737373] dark:text-[#94a3b8] font-mono">{p.progress}%</span>
              )}
              <span className="text-xs text-[#737373] dark:text-[#94a3b8] font-mono">{dur(p.duration)}</span>
              <StatusBadge status={p.status} size="xs" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
`)

// ─── Procedure detail page ────────────────────────────────────────────────────
w('src/app/(dashboard)/banks/[bankId]/ops/[opType]/procedures/[procId]/page.tsx', `import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBankById } from '@/lib/data'
import { StatusBadge } from '@/components/StatusBadge'
import { ChevronLeft, Terminal } from 'lucide-react'

export default async function ProcedureDetailPage({
  params,
}: {
  params: Promise<{ bankId: string; opType: string; procId: string }>
}) {
  const { bankId, opType, procId } = await params
  const bank  = getBankById(bankId)
  const opKey = opType.toUpperCase() as 'SOD' | 'POD' | 'EOD'
  if (!bank || !['SOD','POD','EOD'].includes(opKey)) notFound()

  const op   = bank.operations[opKey]
  const proc = op.procedures.find(p => p.id === procId)
  if (!proc) notFound()

  const fmt = (s?: string) =>
    s ? new Date(s).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '—'
  const dur = (secs?: number) => {
    if (!secs) return '—'
    const m = Math.floor(secs / 60), s = secs % 60
    return m ? \`\${m}m \${s}s\` : \`\${s}s\`
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <Link
          href={\`/banks/\${bank.id}/ops/\${opType}\`}
          className="flex items-center gap-1.5 text-sm text-[#737373] dark:text-[#94a3b8] hover:text-[#18163f] dark:hover:text-[#e2e8f0] mb-3 transition-colors"
        >
          <ChevronLeft size={16} /> {opKey} Procedures
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-[#18163f] dark:text-[#e2e8f0]">{proc.name}</h1>
          <StatusBadge status={proc.status} />
        </div>
        <p className="text-sm text-[#737373] dark:text-[#94a3b8] mt-1">{bank.name} · {opKey}</p>
      </div>

      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 grid grid-cols-3 divide-x divide-[#e5e5e5] dark:divide-[#334155]">
        {[
          { label: 'Started',   value: fmt(proc.startedAt) },
          { label: 'Completed', value: fmt(proc.completedAt) },
          { label: 'Duration',  value: dur(proc.duration) },
        ].map(m => (
          <div key={m.label} className="px-6 py-5">
            <p className="text-xs uppercase tracking-widest text-[#737373] dark:text-[#94a3b8] mb-2">{m.label}</p>
            <p className="text-base font-medium text-[#18163f] dark:text-[#e2e8f0] font-mono">{m.value}</p>
          </div>
        ))}
      </div>

      {proc.status === 'running' && proc.progress !== undefined && (
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-teal-200 dark:ring-teal-500/30 px-6 py-5">
          <div className="flex items-center justify-between mb-3 text-sm text-[#737373] dark:text-[#94a3b8]">
            <span>Progress</span>
            <span className="font-mono font-medium text-teal-600 dark:text-teal-400">{proc.progress}%</span>
          </div>
          <div className="h-2.5 bg-[#e5e5e5] dark:bg-[#334155] rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-[#2dd4bf]" style={{ width: \`\${proc.progress}%\` }} />
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 overflow-hidden">
        <div className="flex items-center gap-2.5 px-6 py-4 border-b border-[#e5e5e5] dark:border-[#334155]">
          <Terminal size={16} className="text-[#737373] dark:text-[#94a3b8]" />
          <span className="text-sm font-medium text-[#18163f] dark:text-[#e2e8f0]">Execution Log</span>
        </div>
        <div className="bg-[#0a0a0a] dark:bg-[#020617] rounded-b-2xl p-5 font-mono text-sm leading-relaxed min-h-[140px]">
          {proc.status === 'completed' && (
            <div className="space-y-2">
              <p className="text-[#2dd4bf]">▶ Procedure initialized</p>
              <p className="text-[#737373]">  ✓ Pre-checks passed</p>
              <p className="text-[#737373]">  ✓ Execution completed in {dur(proc.duration)}</p>
              <p className="text-emerald-400">✓ SUCCESS — {proc.name}</p>
            </div>
          )}
          {proc.status === 'failed' && (
            <div className="space-y-2">
              {(proc.logs ?? ['Procedure failed']).map((l: string, i: number) => (
                <p key={i} className="text-red-400">✖ {l}</p>
              ))}
            </div>
          )}
          {proc.status === 'running' && (
            <div className="space-y-2">
              <p className="text-[#2dd4bf]">▶ Procedure running...</p>
              <p className="text-[#737373]">  ↻ Processing ({proc.progress}% complete)</p>
            </div>
          )}
          {proc.status === 'not_started' && (
            <p className="text-[#737373]">— Awaiting execution</p>
          )}
        </div>
      </div>
    </div>
  )
}
`)

console.log('\nAll dashboard pages written.')
