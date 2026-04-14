'use client'
import { use, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react'

import { banks, history } from '@/lib/data'
import { StatusBadge } from '@/components/StatusBadge'
import type { HistoryEntry } from '@/lib/types'

function fmt(s?: string) {
  if (!s) return '—'
  return new Date(s).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

type View = 'history' | 'procedures'

export default function BankHistoryPage({ params }: { params: Promise<{ bankId: string }> }) {
  const { bankId } = use(params)
  const bank = banks.find(b => b.id === bankId)

  const [view, setView] = useState<View>('history')
  const [selectedOpType, setSelectedOpType] = useState<'SOD' | 'POD' | 'EOD' | null>(null)
  const [selectedHistory, setSelectedHistory] = useState<HistoryEntry | null>(null)
  const [dateFilter, setDateFilter] = useState('')

  if (!bank) return null

  const dur = (s: number) => { const m = Math.floor(s / 60); return m ? `${m}m` : `${s}s` }

  function selectOp(opType: 'SOD' | 'POD' | 'EOD', entry: HistoryEntry) {
    setSelectedOpType(opType)
    setSelectedHistory(entry)
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
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 px-6 py-5 space-y-4">
          <div className="flex items-center gap-8">
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
                  style={{ width: `${op.procedureCount > 0 ? Math.round((op.completedCount / op.procedureCount) * 100) : 0}%` }}
                />
              </div>
              <p className="text-xs text-[#737373] dark:text-[#94a3b8] mt-1 text-right">
                {op.procedureCount > 0 ? Math.round((op.completedCount / op.procedureCount) * 100) : 0}%
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 border-t border-[#e5e5e5] dark:border-[#334155] pt-4">
            {[
              { label: 'Operator', value: selectedHistory?.initiatedBy ?? '—' },
              { label: 'Started',  value: fmt(selectedHistory?.startedAt) },
              { label: 'Ended',    value: fmt(selectedHistory?.completedAt) },
              { label: 'Duration', value: selectedHistory ? dur(selectedHistory.duration) : '—' },
            ].map(m => (
              <div key={m.label}>
                <p className="text-xs text-[#737373] dark:text-[#94a3b8] uppercase tracking-widest">{m.label}</p>
                <p className="text-sm font-medium text-[#18163f] dark:text-[#e2e8f0] font-mono mt-0.5">{m.value}</p>
              </div>
            ))}
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
                <div
                  key={proc.id}
                  className="flex items-center gap-4 px-6 py-4"
                >
                  <span className="text-xs font-mono text-[#d4d4d4] dark:text-[#334155] w-5 shrink-0 tabular-nums">{idx + 1}</span>
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    proc.status === 'completed'  ? 'bg-emerald-400' :
                    proc.status === 'running'    ? 'bg-teal-400 animate-pulse' :
                    proc.status === 'failed'     ? 'bg-red-400' :
                    proc.status === 'pending'    ? 'bg-amber-400' :
                    'bg-[#d4d4d4] dark:bg-[#334155]'
                  }`} />
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
                </div>
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
        <Link href={`/banks/${bank.id}`} className="flex items-center gap-1.5 text-sm text-[#737373] dark:text-[#94a3b8] hover:text-[#18163f] dark:hover:text-[#e2e8f0] mb-3 transition-colors">
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
        <div className="grid grid-cols-[1fr_80px_110px_80px_140px_90px_32px] text-xs uppercase tracking-widest text-[#737373] dark:text-[#94a3b8] px-6 py-3 border-b border-[#e5e5e5] dark:border-[#334155] bg-[#fafafa] dark:bg-[#0f172a]/50">
          <span>Date</span>
          <span>Type</span>
          <span>Status</span>
          <span>Duration</span>
          <span>Operator</span>
          <span>Procedures</span>
          <span />
        </div>

        {filtered.length === 0 && (
          <div className="px-6 py-10 text-center text-sm text-[#737373] dark:text-[#94a3b8]">No records for this date.</div>
        )}

        {filtered.map((h, i) => (
          <button
            key={i}
            onClick={() => selectOp(h.opType, h)}
            className="w-full grid grid-cols-[1fr_80px_110px_80px_140px_90px_32px] items-center px-6 py-4 border-b border-[#e5e5e5] dark:border-[#334155] last:border-0 hover:bg-[#fafafa] dark:hover:bg-white/5 transition-colors text-left group"
          >
            <div>
              <p className="text-sm text-[#18163f] dark:text-[#e2e8f0] font-mono">{h.date}</p>
              {h.startedAt && (
                <p className="text-xs text-[#737373] dark:text-[#94a3b8] mt-0.5 font-mono">
                  {fmt(h.startedAt)}{h.completedAt ? ` → ${fmt(h.completedAt)}` : ''}
                </p>
              )}
            </div>
            <span className="text-sm font-mono font-semibold text-[#18163f] dark:text-[#e2e8f0]">{h.opType}</span>
            <span><StatusBadge status={h.status} size="xs" /></span>
            <span className="text-sm font-mono text-[#737373] dark:text-[#94a3b8]">{dur(h.duration)}</span>
            <span className="text-sm text-[#737373] dark:text-[#94a3b8] truncate pr-2">{h.initiatedBy ?? '—'}</span>
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
