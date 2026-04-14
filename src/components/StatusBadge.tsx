import type { OpStatus } from '@/lib/types'

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
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${
      size === 'xs' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'
    } ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
      {c.label}
    </span>
  )
}
