import { notFound } from 'next/navigation'
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
    return m ? `${m}m ${s}s` : `${s}s`
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <Link
          href={`/banks/${bank.id}/ops/${opType}`}
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
            <div className="h-full rounded-full bg-[#2dd4bf]" style={{ width: `${proc.progress}%` }} />
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
