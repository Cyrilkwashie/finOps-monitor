'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AlertTriangle, X, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { banks } from '@/lib/data'

const AMBER_OVER = 1800  // 30 min over average → amber
const RED_OVER   = 3600  // 60 min over average → red

interface ProcAlert {
  id: string
  level: 'amber' | 'red'
  bankId: string
  bankName: string
  opType: string
  procId: string
  procName: string
  overBy: number  // seconds over average
}

export function AlertToast() {
  const router = useRouter()
  const [alerts, setAlerts]   = useState<ProcAlert[]>([])
  const [index, setIndex]     = useState(0)
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const found: ProcAlert[] = []
    for (const bank of banks) {
      for (const op of Object.values(bank.operations)) {
        for (const proc of op.procedures) {
          if (proc.status !== 'running' || proc.elapsed == null || proc.avgDuration == null) continue
          const overBy = proc.elapsed - proc.avgDuration
          if (overBy >= AMBER_OVER) {
            found.push({
              id:       `${bank.id}-${op.type}-${proc.id}`,
              level:    overBy >= RED_OVER ? 'red' : 'amber',
              bankId:   bank.id,
              bankName: bank.name,
              opType:   op.type,
              procId:   proc.id,
              procName: proc.name,
              overBy,
            })
          }
        }
      }
    }
    if (found.length > 0) {
      setAlerts(found)
      // slight delay so the page has rendered first
      setTimeout(() => setVisible(true), 400)
    }
  }, [])

  function close(cb?: () => void) {
    setClosing(true)
    setTimeout(() => {
      setClosing(false)
      setVisible(false)
      cb?.()
    }, 320)
  }

  function dismiss() { close() }

  function navigate(alert: ProcAlert) {
    close(() => {
      router.push(`/banks/${alert.bankId}/ops/${alert.opType.toLowerCase()}/procedures/${alert.procId}`)
    })
  }

  if (!visible || alerts.length === 0) return null

  const alert = alerts[index]
  if (!alert) return null

  const isRed = alert.level === 'red'
  const mins  = Math.round(alert.overBy / 60)
  const total = alerts.length

  const shown = visible && !closing

  return (
    /* Backdrop */
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        shown ? 'bg-black/40 backdrop-blur-[2px]' : 'bg-black/0 backdrop-blur-0'
      }`}
      onClick={dismiss}
    >
      {/* Modal card */}
      <div
        onClick={e => e.stopPropagation()}
        className={`w-full max-w-md transition-all duration-300 ease-out ${
          shown ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        } ${
          isRed
            ? 'bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl shadow-red-500/25 ring-1 ring-red-200 dark:ring-red-500/30 overflow-hidden'
            : 'bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl shadow-amber-500/20 ring-1 ring-amber-200 dark:ring-amber-500/30 overflow-hidden'
        }`}
      >
        {/* Top accent bar */}
        <div className={`h-1.5 w-full ${isRed ? 'bg-red-400 animate-pulse' : 'bg-amber-400'}`} />

        <div className="p-6">
          {/* Header row */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                isRed ? 'bg-red-50 dark:bg-red-500/10' : 'bg-amber-50 dark:bg-amber-500/10'
              }`}>
                <AlertTriangle
                  size={18}
                  className={`${isRed ? 'text-red-500 animate-pulse' : 'text-amber-500'}`}
                />
              </div>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-widest ${
                  isRed ? 'text-red-500 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'
                }`}>
                  {isRed ? 'Critical Delay' : 'Slow Procedure'}
                </p>
                {total > 1 && (
                  <p className="text-xs text-[#737373] dark:text-[#94a3b8] mt-0.5">{index + 1} of {total} alerts</p>
                )}
              </div>
            </div>
            <button
              onClick={dismiss}
              className="text-[#737373] dark:text-[#94a3b8] hover:text-[#18163f] dark:hover:text-[#e2e8f0] transition-colors -mt-1 -mr-1 p-1"
            >
              <X size={16} />
            </button>
          </div>

          {/* Details */}
          <div className="space-y-3 mb-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#737373] dark:text-[#94a3b8] mb-1">Procedure</p>
              <p className="text-base font-semibold text-[#18163f] dark:text-[#e2e8f0]">{alert.procName}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#737373] dark:text-[#94a3b8] mb-1">Bank</p>
                <p className="text-sm font-medium text-[#18163f] dark:text-[#e2e8f0]">{alert.bankName}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[#737373] dark:text-[#94a3b8] mb-1">Operation</p>
                <p className="text-sm font-medium text-[#18163f] dark:text-[#e2e8f0]">{alert.opType}</p>
              </div>
            </div>
            <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl ${
              isRed
                ? 'bg-red-50 dark:bg-red-500/10'
                : 'bg-amber-50 dark:bg-amber-500/10'
            }`}>
              <Clock size={14} className={isRed ? 'text-red-500 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'} />
              <p className={`text-sm font-mono font-medium ${
                isRed ? 'text-red-600 dark:text-red-400' : 'text-amber-700 dark:text-amber-400'
              }`}>
                Running <span className="font-bold">+{mins} min</span> longer than average
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* multi-alert prev/next */}
            {total > 1 && (
              <div className="flex gap-1 mr-auto">
                <button
                  onClick={() => setIndex(i => Math.max(0, i - 1))}
                  disabled={index === 0}
                  className="p-1.5 rounded-lg text-[#737373] dark:text-[#94a3b8] hover:text-[#18163f] dark:hover:text-[#e2e8f0] disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setIndex(i => Math.min(total - 1, i + 1))}
                  disabled={index === total - 1}
                  className="p-1.5 rounded-lg text-[#737373] dark:text-[#94a3b8] hover:text-[#18163f] dark:hover:text-[#e2e8f0] disabled:opacity-30 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            <button
              onClick={dismiss}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#737373] dark:text-[#94a3b8] hover:bg-[#f5f5f5] dark:hover:bg-white/5 transition-colors"
            >
              Dismiss
            </button>
            <button
              onClick={() => navigate(alert)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-colors ${
                isRed
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-amber-500 hover:bg-amber-600'
              }`}
            >
              View Procedure
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

