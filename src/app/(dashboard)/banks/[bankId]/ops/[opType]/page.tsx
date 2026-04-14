import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBankById } from '@/lib/data'
import { StatusBadge } from '@/components/StatusBadge'
import { ChevronLeft, CheckCircle2, AlertTriangle, Loader2, Clock } from 'lucide-react'

function dur(secs?: number) {
  if (!secs) return '—'
  const m = Math.floor(secs / 60), s = secs % 60
  return m ? `${m}m ${s}s` : `${s}s`
}

function fmt(s?: string) {
  if (!s) return '—'
  return new Date(s).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
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
        <Link href={`/banks/${bank.id}`} className="flex items-center gap-1.5 text-sm text-[#737373] dark:text-[#94a3b8] hover:text-[#18163f] dark:hover:text-[#e2e8f0] mb-3 transition-colors">
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

      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 grid grid-cols-4 divide-x divide-[#e5e5e5] dark:divide-[#334155]">
        {[
          { label: 'Operator',  value: op.initiatedBy ?? '—' },
          { label: 'Started',   value: fmt(op.startedAt) },
          { label: 'Completed', value: fmt(op.completedAt) },
          { label: 'Duration',  value: op.startedAt && op.completedAt
              ? dur(Math.floor((new Date(op.completedAt).getTime() - new Date(op.startedAt).getTime()) / 1000))
              : '—' },
        ].map(m => (
          <div key={m.label} className="px-5 py-4">
            <p className="text-xs uppercase tracking-widest text-[#737373] dark:text-[#94a3b8] mb-1">{m.label}</p>
            <p className="text-sm font-medium text-[#18163f] dark:text-[#e2e8f0] font-mono truncate">{m.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 px-6 py-5">
        <div className="flex items-center justify-between mb-3 text-sm text-[#737373] dark:text-[#94a3b8]">
          <span>Overall progress</span>
          <span className="font-mono font-medium text-[#18163f] dark:text-[#e2e8f0]">{op.progress}%</span>
        </div>
        <div className="h-2.5 bg-[#e5e5e5] dark:bg-[#334155] rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${
            op.status === 'failed'  ? 'bg-red-400'   :
            op.status === 'running' ? 'bg-[#2dd4bf]' : 'bg-emerald-400'
          }`} style={{ width: `${op.progress}%` }} />
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 overflow-hidden divide-y divide-[#e5e5e5] dark:divide-[#334155]">
        {op.procedures.length === 0 && (
          <div className="px-6 py-8 text-center text-sm text-[#737373] dark:text-[#94a3b8]">No procedures recorded.</div>
        )}
        {op.procedures.map((p, i) => (
          <Link
            key={p.id}
            href={`/banks/${bank.id}/ops/${opKey.toLowerCase()}/procedures/${p.id}`}
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
