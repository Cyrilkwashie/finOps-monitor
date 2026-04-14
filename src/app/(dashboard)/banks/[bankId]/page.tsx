import { notFound } from 'next/navigation'
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
  return m ? `${m}m ${s}s` : `${s}s`
}

function OpCard({ op, bankId }: { op: Operation; bankId: string }) {
  return (
    <div className={`bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 overflow-hidden ${
      op.status === 'failed'  ? 'ring-red-200 dark:ring-red-500/30'  :
      op.status === 'running' ? 'ring-teal-200 dark:ring-teal-500/30' : 'ring-black/5 dark:ring-white/5'
    }`}>
      <div className="px-6 pt-5 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold font-mono ${
            op.status === 'failed'    ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'             :
            op.status === 'running'   ? 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400'         :
            op.status === 'completed' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
            'bg-[#f5f5f5] dark:bg-white/5 text-[#737373] dark:text-[#94a3b8]'
          }`}>{op.type}</div>
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
          <div className={`h-full rounded-full transition-all ${
            op.status === 'failed'  ? 'bg-red-400'   :
            op.status === 'running' ? 'bg-[#2dd4bf]' : 'bg-emerald-400'
          }`} style={{ width: `${op.progress}%` }} />
        </div>
        <div className="flex justify-between mt-2 text-sm text-[#737373] dark:text-[#94a3b8]">
          <span>Started: {fmt(op.startedAt)}</span>
          <span>{op.status === 'completed' ? `Finished: ${fmt(op.completedAt)}` : `${op.progress}%`}</span>
        </div>
      </div>

      {op.procedures.length > 0 && (
        <div className="border-t border-[#e5e5e5] dark:border-[#334155]">
          {op.procedures.slice(0, 4).map(p => (
            <Link
              key={p.id}
              href={`/banks/${bankId}/ops/${op.type.toLowerCase()}/procedures/${p.id}`}
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
              href={`/banks/${bankId}/ops/${op.type.toLowerCase()}`}
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
          href={`/banks/${bank.id}/history`}
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
