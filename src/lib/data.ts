import type { Bank, HistoryEntry, Procedure } from './types'

function proc(id: string, name: string, status: import('./types').OpStatus, extra: Partial<Procedure> = {}): Procedure {
  return { id, name, status, ...extra }
}

export const banks: Bank[] = [
  {
    id: 'fnb', name: 'First National Bank', code: 'FNB', country: 'GH', tier: 'tier1',
    lastUpdated: '2026-04-14T08:45:00Z',
    operations: {
      SOD: {
        type: 'SOD', status: 'completed', startedAt: '2026-04-14T05:00:00Z',
        completedAt: '2026-04-14T05:42:00Z', progress: 100,
        procedureCount: 72, completedCount: 72,
        procedures: [
          proc('s1','System Health Check','completed',{ duration:120, completedAt:'2026-04-14T05:02:00Z' }),
          proc('s2','Database Connectivity Test','completed',{ duration:45 }),
          proc('s3','Core Banking Bootstrap','completed',{ duration:380 }),
          proc('s4','Account Balance Reconciliation','completed',{ duration:720 }),
          proc('s5','FX Rate Loader','completed',{ duration:60 }),
          proc('s6','Batch Queue Initialization','completed',{ duration:30 }),
        ],
      },
      POD: {
        type: 'POD', status: 'running', startedAt: '2026-04-14T14:00:00Z',
        progress: 61, procedureCount: 48, completedCount: 29,
        procedures: [
          proc('p1','Intraday Position Check','completed',{ duration:200 }),
          proc('p2','Liquidity Buffer Validation','completed',{ duration:180 }),
          proc('p3','Pending Transactions Sweep','running',{ progress:61 }),
          proc('p4','Regulatory Report Prep','not_started'),
          proc('p5','Risk Exposure Snapshot','not_started'),
        ],
      },
      EOD: { type: 'EOD', status: 'not_started', progress: 0, procedureCount: 85, completedCount: 0, procedures: [] },
    },
  },
  {
    id: 'ctb', name: 'Continental Trust Bank', code: 'CTB', country: 'GH', tier: 'tier1',
    lastUpdated: '2026-04-14T08:20:00Z',
    operations: {
      SOD: {
        type: 'SOD', status: 'completed', startedAt: '2026-04-14T05:10:00Z',
        completedAt: '2026-04-14T05:55:00Z', progress: 100,
        procedureCount: 68, completedCount: 68,
        procedures: [
          proc('s1','System Health Check','completed',{ duration:95 }),
          proc('s2','Database Connectivity Test','completed',{ duration:52 }),
          proc('s3','Core Banking Bootstrap','completed',{ duration:410 }),
          proc('s4','Account Balance Reconciliation','completed',{ duration:650 }),
          proc('s5','FX Rate Loader','completed',{ duration:55 }),
        ],
      },
      POD: {
        type: 'POD', status: 'completed', startedAt: '2026-04-14T14:05:00Z',
        completedAt: '2026-04-14T14:52:00Z', progress: 100,
        procedureCount: 44, completedCount: 44,
        procedures: [
          proc('p1','Intraday Position Check','completed',{ duration:190 }),
          proc('p2','Liquidity Buffer Validation','completed',{ duration:175 }),
          proc('p3','Pending Transactions Sweep','completed',{ duration:320 }),
          proc('p4','Regulatory Report Prep','completed',{ duration:280 }),
        ],
      },
      EOD: {
        type: 'EOD', status: 'running', startedAt: '2026-04-14T17:00:00Z',
        progress: 23, procedureCount: 80, completedCount: 18,
        procedures: [
          proc('e1','End of Day Position Lock','completed',{ duration:300 }),
          proc('e2','Overnight Batch Trigger','running',{ progress:23 }),
          proc('e3','Statement Generation','not_started'),
          proc('e4','GL Reconciliation','not_started'),
          proc('e5','Audit Log Flush','not_started'),
        ],
      },
    },
  },
  {
    id: 'hcb', name: 'Heritage Commercial Bank', code: 'HCB', country: 'GH', tier: 'tier2',
    lastUpdated: '2026-04-14T07:55:00Z',
    operations: {
      SOD: {
        type: 'SOD', status: 'failed', startedAt: '2026-04-14T05:15:00Z',
        completedAt: '2026-04-14T05:28:00Z', progress: 42,
        procedureCount: 65, completedCount: 27,
        procedures: [
          proc('s1','System Health Check','completed',{ duration:110 }),
          proc('s2','Database Connectivity Test','failed',{ logs:['Connection timeout after 30s','Retry 1 failed','Retry 2 failed'] }),
          proc('s3','Core Banking Bootstrap','not_started'),
          proc('s4','Account Balance Reconciliation','not_started'),
        ],
      },
      POD: { type: 'POD', status: 'not_started', progress: 0, procedureCount: 42, completedCount: 0, procedures: [] },
      EOD: { type: 'EOD', status: 'not_started', progress: 0, procedureCount: 78, completedCount: 0, procedures: [] },
    },
  },
  {
    id: 'mrb', name: 'Meridian Reserve Bank', code: 'MRB', country: 'GH', tier: 'tier2',
    lastUpdated: '2026-04-14T09:10:00Z',
    operations: {
      SOD: {
        type: 'SOD', status: 'completed', startedAt: '2026-04-14T05:05:00Z',
        completedAt: '2026-04-14T05:50:00Z', progress: 100,
        procedureCount: 70, completedCount: 70,
        procedures: [
          proc('s1','System Health Check','completed',{ duration:105 }),
          proc('s2','Database Connectivity Test','completed',{ duration:48 }),
          proc('s3','Core Banking Bootstrap','completed',{ duration:390 }),
          proc('s4','Account Balance Reconciliation','completed',{ duration:700 }),
          proc('s5','FX Rate Loader','completed',{ duration:58 }),
          proc('s6','Batch Queue Initialization','completed',{ duration:28 }),
        ],
      },
      POD: {
        type: 'POD', status: 'running', startedAt: '2026-04-14T14:10:00Z',
        progress: 38, procedureCount: 46, completedCount: 18,
        procedures: [
          proc('p1','Intraday Position Check','completed',{ duration:195 }),
          proc('p2','Liquidity Buffer Validation','running',{ progress:38 }),
          proc('p3','Pending Transactions Sweep','not_started'),
          proc('p4','Regulatory Report Prep','not_started'),
        ],
      },
      EOD: { type: 'EOD', status: 'not_started', progress: 0, procedureCount: 82, completedCount: 0, procedures: [] },
    },
  },
  {
    id: 'apb', name: 'Apex Premier Bank', code: 'APB', country: 'GH', tier: 'tier3',
    lastUpdated: '2026-04-14T08:00:00Z',
    operations: {
      SOD: {
        type: 'SOD', status: 'completed', progress: 100,
        startedAt: '2026-04-14T05:20:00Z', completedAt: '2026-04-14T06:05:00Z',
        procedureCount: 60, completedCount: 60, procedures: [],
      },
      POD: { type: 'POD', status: 'pending', progress: 0, procedureCount: 40, completedCount: 0, procedures: [] },
      EOD: { type: 'EOD', status: 'not_started', progress: 0, procedureCount: 74, completedCount: 0, procedures: [] },
    },
  },
]

export function getBankById(id: string): Bank | undefined {
  return banks.find(b => b.id === id)
}

// 7 days of history — all banks × SOD/POD/EOD with realistic durations and occasional failures
export const history: HistoryEntry[] = [
  // Apr 14 (today — SOD complete, POD in-progress for some)
  { date: '2026-04-14', bankId: 'fnb', opType: 'SOD', status: 'completed', duration: 2520, proceduresRun: 72, proceduresFailed: 0 },
  { date: '2026-04-14', bankId: 'ctb', opType: 'SOD', status: 'completed', duration: 2700, proceduresRun: 68, proceduresFailed: 0 },
  { date: '2026-04-14', bankId: 'hcb', opType: 'SOD', status: 'failed',    duration: 780,  proceduresRun: 27, proceduresFailed: 1 },
  { date: '2026-04-14', bankId: 'mrb', opType: 'SOD', status: 'completed', duration: 2700, proceduresRun: 70, proceduresFailed: 0 },
  { date: '2026-04-14', bankId: 'apb', opType: 'SOD', status: 'completed', duration: 2820, proceduresRun: 60, proceduresFailed: 0 },

  // Apr 13
  { date: '2026-04-13', bankId: 'fnb', opType: 'SOD', status: 'completed', duration: 2400, proceduresRun: 72, proceduresFailed: 0 },
  { date: '2026-04-13', bankId: 'ctb', opType: 'SOD', status: 'completed', duration: 2580, proceduresRun: 68, proceduresFailed: 0 },
  { date: '2026-04-13', bankId: 'hcb', opType: 'SOD', status: 'completed', duration: 2640, proceduresRun: 65, proceduresFailed: 0 },
  { date: '2026-04-13', bankId: 'mrb', opType: 'SOD', status: 'completed', duration: 2520, proceduresRun: 70, proceduresFailed: 0 },
  { date: '2026-04-13', bankId: 'apb', opType: 'SOD', status: 'completed', duration: 2760, proceduresRun: 60, proceduresFailed: 0 },
  { date: '2026-04-13', bankId: 'fnb', opType: 'POD', status: 'completed', duration: 1980, proceduresRun: 48, proceduresFailed: 0 },
  { date: '2026-04-13', bankId: 'ctb', opType: 'POD', status: 'completed', duration: 1860, proceduresRun: 44, proceduresFailed: 0 },
  { date: '2026-04-13', bankId: 'hcb', opType: 'POD', status: 'completed', duration: 1920, proceduresRun: 42, proceduresFailed: 0 },
  { date: '2026-04-13', bankId: 'mrb', opType: 'POD', status: 'completed', duration: 1860, proceduresRun: 46, proceduresFailed: 0 },
  { date: '2026-04-13', bankId: 'apb', opType: 'POD', status: 'failed',    duration: 540,  proceduresRun: 12, proceduresFailed: 2 },
  { date: '2026-04-13', bankId: 'fnb', opType: 'EOD', status: 'completed', duration: 3600, proceduresRun: 85, proceduresFailed: 0 },
  { date: '2026-04-13', bankId: 'ctb', opType: 'EOD', status: 'completed', duration: 3420, proceduresRun: 80, proceduresFailed: 0 },
  { date: '2026-04-13', bankId: 'hcb', opType: 'EOD', status: 'completed', duration: 3300, proceduresRun: 78, proceduresFailed: 0 },
  { date: '2026-04-13', bankId: 'mrb', opType: 'EOD', status: 'completed', duration: 3480, proceduresRun: 82, proceduresFailed: 0 },
  { date: '2026-04-13', bankId: 'apb', opType: 'EOD', status: 'completed', duration: 3120, proceduresRun: 74, proceduresFailed: 0 },

  // Apr 12
  { date: '2026-04-12', bankId: 'fnb', opType: 'SOD', status: 'completed', duration: 2460, proceduresRun: 72, proceduresFailed: 0 },
  { date: '2026-04-12', bankId: 'ctb', opType: 'SOD', status: 'failed',    duration: 900,  proceduresRun: 30, proceduresFailed: 2 },
  { date: '2026-04-12', bankId: 'hcb', opType: 'SOD', status: 'completed', duration: 2700, proceduresRun: 65, proceduresFailed: 0 },
  { date: '2026-04-12', bankId: 'mrb', opType: 'SOD', status: 'completed', duration: 2580, proceduresRun: 70, proceduresFailed: 0 },
  { date: '2026-04-12', bankId: 'apb', opType: 'SOD', status: 'completed', duration: 2790, proceduresRun: 60, proceduresFailed: 0 },
  { date: '2026-04-12', bankId: 'fnb', opType: 'POD', status: 'completed', duration: 1920, proceduresRun: 48, proceduresFailed: 0 },
  { date: '2026-04-12', bankId: 'ctb', opType: 'POD', status: 'completed', duration: 1800, proceduresRun: 44, proceduresFailed: 0 },
  { date: '2026-04-12', bankId: 'hcb', opType: 'POD', status: 'completed', duration: 1980, proceduresRun: 42, proceduresFailed: 0 },
  { date: '2026-04-12', bankId: 'mrb', opType: 'POD', status: 'completed', duration: 1800, proceduresRun: 46, proceduresFailed: 0 },
  { date: '2026-04-12', bankId: 'apb', opType: 'POD', status: 'completed', duration: 1620, proceduresRun: 40, proceduresFailed: 0 },
  { date: '2026-04-12', bankId: 'fnb', opType: 'EOD', status: 'completed', duration: 3540, proceduresRun: 85, proceduresFailed: 0 },
  { date: '2026-04-12', bankId: 'ctb', opType: 'EOD', status: 'completed', duration: 3360, proceduresRun: 80, proceduresFailed: 0 },
  { date: '2026-04-12', bankId: 'hcb', opType: 'EOD', status: 'failed',    duration: 1080, proceduresRun: 35, proceduresFailed: 3 },
  { date: '2026-04-12', bankId: 'mrb', opType: 'EOD', status: 'completed', duration: 3420, proceduresRun: 82, proceduresFailed: 0 },
  { date: '2026-04-12', bankId: 'apb', opType: 'EOD', status: 'completed', duration: 3060, proceduresRun: 74, proceduresFailed: 0 },

  // Apr 11
  { date: '2026-04-11', bankId: 'fnb', opType: 'SOD', status: 'completed', duration: 2380, proceduresRun: 72, proceduresFailed: 0 },
  { date: '2026-04-11', bankId: 'ctb', opType: 'SOD', status: 'completed', duration: 2560, proceduresRun: 68, proceduresFailed: 0 },
  { date: '2026-04-11', bankId: 'hcb', opType: 'SOD', status: 'completed', duration: 2660, proceduresRun: 65, proceduresFailed: 0 },
  { date: '2026-04-11', bankId: 'mrb', opType: 'SOD', status: 'completed', duration: 2500, proceduresRun: 70, proceduresFailed: 0 },
  { date: '2026-04-11', bankId: 'apb', opType: 'SOD', status: 'completed', duration: 2720, proceduresRun: 60, proceduresFailed: 0 },
  { date: '2026-04-11', bankId: 'fnb', opType: 'POD', status: 'completed', duration: 1960, proceduresRun: 48, proceduresFailed: 0 },
  { date: '2026-04-11', bankId: 'ctb', opType: 'POD', status: 'completed', duration: 1840, proceduresRun: 44, proceduresFailed: 0 },
  { date: '2026-04-11', bankId: 'hcb', opType: 'POD', status: 'completed', duration: 1900, proceduresRun: 42, proceduresFailed: 0 },
  { date: '2026-04-11', bankId: 'mrb', opType: 'POD', status: 'failed',    duration: 620,  proceduresRun: 18, proceduresFailed: 1 },
  { date: '2026-04-11', bankId: 'apb', opType: 'POD', status: 'completed', duration: 1580, proceduresRun: 40, proceduresFailed: 0 },
  { date: '2026-04-11', bankId: 'fnb', opType: 'EOD', status: 'completed', duration: 3560, proceduresRun: 85, proceduresFailed: 0 },
  { date: '2026-04-11', bankId: 'ctb', opType: 'EOD', status: 'completed', duration: 3380, proceduresRun: 80, proceduresFailed: 0 },
  { date: '2026-04-11', bankId: 'hcb', opType: 'EOD', status: 'completed', duration: 3280, proceduresRun: 78, proceduresFailed: 0 },
  { date: '2026-04-11', bankId: 'mrb', opType: 'EOD', status: 'completed', duration: 3440, proceduresRun: 82, proceduresFailed: 0 },
  { date: '2026-04-11', bankId: 'apb', opType: 'EOD', status: 'completed', duration: 3080, proceduresRun: 74, proceduresFailed: 0 },

  // Apr 10
  { date: '2026-04-10', bankId: 'fnb', opType: 'SOD', status: 'completed', duration: 2420, proceduresRun: 72, proceduresFailed: 0 },
  { date: '2026-04-10', bankId: 'ctb', opType: 'SOD', status: 'completed', duration: 2540, proceduresRun: 68, proceduresFailed: 0 },
  { date: '2026-04-10', bankId: 'hcb', opType: 'SOD', status: 'failed',    duration: 860,  proceduresRun: 28, proceduresFailed: 1 },
  { date: '2026-04-10', bankId: 'mrb', opType: 'SOD', status: 'completed', duration: 2480, proceduresRun: 70, proceduresFailed: 0 },
  { date: '2026-04-10', bankId: 'apb', opType: 'SOD', status: 'completed', duration: 2740, proceduresRun: 60, proceduresFailed: 0 },
  { date: '2026-04-10', bankId: 'fnb', opType: 'POD', status: 'completed', duration: 1900, proceduresRun: 48, proceduresFailed: 0 },
  { date: '2026-04-10', bankId: 'ctb', opType: 'POD', status: 'completed', duration: 1820, proceduresRun: 44, proceduresFailed: 0 },
  { date: '2026-04-10', bankId: 'hcb', opType: 'POD', status: 'completed', duration: 1940, proceduresRun: 42, proceduresFailed: 0 },
  { date: '2026-04-10', bankId: 'mrb', opType: 'POD', status: 'completed', duration: 1780, proceduresRun: 46, proceduresFailed: 0 },
  { date: '2026-04-10', bankId: 'apb', opType: 'POD', status: 'completed', duration: 1600, proceduresRun: 40, proceduresFailed: 0 },
  { date: '2026-04-10', bankId: 'fnb', opType: 'EOD', status: 'completed', duration: 3520, proceduresRun: 85, proceduresFailed: 0 },
  { date: '2026-04-10', bankId: 'ctb', opType: 'EOD', status: 'completed', duration: 3400, proceduresRun: 80, proceduresFailed: 0 },
  { date: '2026-04-10', bankId: 'hcb', opType: 'EOD', status: 'completed', duration: 3260, proceduresRun: 78, proceduresFailed: 0 },
  { date: '2026-04-10', bankId: 'mrb', opType: 'EOD', status: 'completed', duration: 3460, proceduresRun: 82, proceduresFailed: 0 },
  { date: '2026-04-10', bankId: 'apb', opType: 'EOD', status: 'completed', duration: 3100, proceduresRun: 74, proceduresFailed: 0 },

  // Apr 9
  { date: '2026-04-09', bankId: 'fnb', opType: 'SOD', status: 'completed', duration: 2360, proceduresRun: 72, proceduresFailed: 0 },
  { date: '2026-04-09', bankId: 'ctb', opType: 'SOD', status: 'completed', duration: 2500, proceduresRun: 68, proceduresFailed: 0 },
  { date: '2026-04-09', bankId: 'hcb', opType: 'SOD', status: 'completed', duration: 2620, proceduresRun: 65, proceduresFailed: 0 },
  { date: '2026-04-09', bankId: 'mrb', opType: 'SOD', status: 'completed', duration: 2540, proceduresRun: 70, proceduresFailed: 0 },
  { date: '2026-04-09', bankId: 'apb', opType: 'SOD', status: 'failed',    duration: 720,  proceduresRun: 22, proceduresFailed: 1 },
  { date: '2026-04-09', bankId: 'fnb', opType: 'POD', status: 'completed', duration: 1940, proceduresRun: 48, proceduresFailed: 0 },
  { date: '2026-04-09', bankId: 'ctb', opType: 'POD', status: 'completed', duration: 1860, proceduresRun: 44, proceduresFailed: 0 },
  { date: '2026-04-09', bankId: 'hcb', opType: 'POD', status: 'completed', duration: 1920, proceduresRun: 42, proceduresFailed: 0 },
  { date: '2026-04-09', bankId: 'mrb', opType: 'POD', status: 'completed', duration: 1800, proceduresRun: 46, proceduresFailed: 0 },
  { date: '2026-04-09', bankId: 'apb', opType: 'POD', status: 'completed', duration: 1620, proceduresRun: 40, proceduresFailed: 0 },
  { date: '2026-04-09', bankId: 'fnb', opType: 'EOD', status: 'completed', duration: 3500, proceduresRun: 85, proceduresFailed: 0 },
  { date: '2026-04-09', bankId: 'ctb', opType: 'EOD', status: 'completed', duration: 3340, proceduresRun: 80, proceduresFailed: 0 },
  { date: '2026-04-09', bankId: 'hcb', opType: 'EOD', status: 'completed', duration: 3320, proceduresRun: 78, proceduresFailed: 0 },
  { date: '2026-04-09', bankId: 'mrb', opType: 'EOD', status: 'completed', duration: 3400, proceduresRun: 82, proceduresFailed: 0 },
  { date: '2026-04-09', bankId: 'apb', opType: 'EOD', status: 'completed', duration: 3040, proceduresRun: 74, proceduresFailed: 0 },

  // Apr 8
  { date: '2026-04-08', bankId: 'fnb', opType: 'SOD', status: 'completed', duration: 2440, proceduresRun: 72, proceduresFailed: 0 },
  { date: '2026-04-08', bankId: 'ctb', opType: 'SOD', status: 'completed', duration: 2560, proceduresRun: 68, proceduresFailed: 0 },
  { date: '2026-04-08', bankId: 'hcb', opType: 'SOD', status: 'completed', duration: 2680, proceduresRun: 65, proceduresFailed: 0 },
  { date: '2026-04-08', bankId: 'mrb', opType: 'SOD', status: 'completed', duration: 2520, proceduresRun: 70, proceduresFailed: 0 },
  { date: '2026-04-08', bankId: 'apb', opType: 'SOD', status: 'completed', duration: 2760, proceduresRun: 60, proceduresFailed: 0 },
  { date: '2026-04-08', bankId: 'fnb', opType: 'POD', status: 'completed', duration: 1960, proceduresRun: 48, proceduresFailed: 0 },
  { date: '2026-04-08', bankId: 'ctb', opType: 'POD', status: 'failed',    duration: 580,  proceduresRun: 15, proceduresFailed: 1 },
  { date: '2026-04-08', bankId: 'hcb', opType: 'POD', status: 'completed', duration: 1880, proceduresRun: 42, proceduresFailed: 0 },
  { date: '2026-04-08', bankId: 'mrb', opType: 'POD', status: 'completed', duration: 1820, proceduresRun: 46, proceduresFailed: 0 },
  { date: '2026-04-08', bankId: 'apb', opType: 'POD', status: 'completed', duration: 1640, proceduresRun: 40, proceduresFailed: 0 },
  { date: '2026-04-08', bankId: 'fnb', opType: 'EOD', status: 'completed', duration: 3580, proceduresRun: 85, proceduresFailed: 0 },
  { date: '2026-04-08', bankId: 'ctb', opType: 'EOD', status: 'completed', duration: 3360, proceduresRun: 80, proceduresFailed: 0 },
  { date: '2026-04-08', bankId: 'hcb', opType: 'EOD', status: 'completed', duration: 3240, proceduresRun: 78, proceduresFailed: 0 },
  { date: '2026-04-08', bankId: 'mrb', opType: 'EOD', status: 'completed', duration: 3480, proceduresRun: 82, proceduresFailed: 0 },
  { date: '2026-04-08', bankId: 'apb', opType: 'EOD', status: 'completed', duration: 3120, proceduresRun: 74, proceduresFailed: 0 },
]
