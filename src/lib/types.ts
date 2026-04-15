export type OpStatus = 'completed' | 'running' | 'failed' | 'not_started' | 'pending'

export interface Procedure {
  id: string
  name: string
  status: OpStatus
  startedAt?: string
  completedAt?: string
  duration?: number     // seconds (completed)
  progress?: number     // 0-100 for running
  logs?: string[]
  elapsed?: number      // seconds already running (for active procedures)
  avgDuration?: number  // expected average duration in seconds
  seq?: number          // PREOCESS_SEQ — sequence within the operation
  processId?: string    // PROCESS_ID — unique procedure identifier
  processProc?: string  // PROCESS_PROC — PL/SQL procedure call
  enabled?: 'Y' | 'N'  // ENABLED
  transReq?: 'Y' | 'N' | 'Z'  // TRANS_REQ — transaction required
  exeOnWknd?: 'Y' | 'N'       // EXE_ON_WKND — execute on weekends
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
  initiatedBy?: string
}

export interface Bank {
  id: string
  name: string
  code: string
  country: string
  tier: 'tier1' | 'tier2' | 'tier3'
  logo: string
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
  startedAt?: string
  completedAt?: string
  initiatedBy?: string
}
