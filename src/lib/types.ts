export type OpStatus = 'completed' | 'running' | 'failed' | 'not_started' | 'pending'

export interface Procedure {
  id: string
  name: string
  status: OpStatus
  startedAt?: string
  completedAt?: string
  duration?: number   // seconds
  progress?: number   // 0-100 for running
  logs?: string[]
}

export interface Operation {
  type: 'SOD' | 'POD' | 'EOD'
  status: OpStatus
  startedAt?: string
  completedAt?: string
  progress: number
  procedureCount: number
  completedCount: number
  procedures: Procedure[]
}

export interface Bank {
  id: string
  name: string
  code: string
  country: string
  tier: 'tier1' | 'tier2' | 'tier3'
  lastUpdated: string
  operations: { SOD: Operation; POD: Operation; EOD: Operation }
}

export interface HistoryEntry {
  date: string       // ISO date string
  bankId: string
  opType: 'SOD' | 'POD' | 'EOD'
  status: OpStatus
  duration: number
  proceduresRun: number
  proceduresFailed: number
}
