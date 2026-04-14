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
        completedAt: '2026-04-14T05:42:00Z', progress: 100, initiatedBy: 'Kwame Asante',
        procedureCount: 72, completedCount: 72,
        procedures: [
          proc('s1','System Health Check','completed',{ duration:120, startedAt:'2026-04-14T05:00:00Z', completedAt:'2026-04-14T05:02:00Z' }),
          proc('s2','Database Connectivity Test','completed',{ duration:45, startedAt:'2026-04-14T05:02:00Z', completedAt:'2026-04-14T05:02:45Z' }),
          proc('s3','Core Banking Bootstrap','completed',{ duration:380, startedAt:'2026-04-14T05:03:00Z', completedAt:'2026-04-14T05:09:20Z' }),
          proc('s4','Account Balance Reconciliation','completed',{ duration:720, startedAt:'2026-04-14T05:09:20Z', completedAt:'2026-04-14T05:21:20Z' }),
          proc('s5','FX Rate Loader','completed',{ duration:60, startedAt:'2026-04-14T05:21:20Z', completedAt:'2026-04-14T05:22:20Z' }),
          proc('s6','Batch Queue Initialization','completed',{ duration:30, startedAt:'2026-04-14T05:22:20Z', completedAt:'2026-04-14T05:22:50Z' }),
        ],
      },
      POD: {
        type: 'POD', status: 'running', startedAt: '2026-04-14T14:00:00Z',
        progress: 61, initiatedBy: 'Kwame Asante', procedureCount: 48, completedCount: 29,
        procedures: [
          proc('p1','Intraday Position Check','completed',{ duration:200, startedAt:'2026-04-14T14:00:00Z', completedAt:'2026-04-14T14:03:20Z' }),
          proc('p2','Liquidity Buffer Validation','completed',{ duration:180, startedAt:'2026-04-14T14:03:20Z', completedAt:'2026-04-14T14:06:20Z' }),
          proc('p3','Pending Transactions Sweep','running',{ progress:61, elapsed:5600, avgDuration:200, startedAt:'2026-04-14T13:07:00Z' }),
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
        completedAt: '2026-04-14T05:55:00Z', progress: 100, initiatedBy: 'Ama Boateng',
        procedureCount: 68, completedCount: 68,
        procedures: [
          proc('s1','System Health Check','completed',{ duration:95, startedAt:'2026-04-14T05:10:00Z', completedAt:'2026-04-14T05:11:35Z' }),
          proc('s2','Database Connectivity Test','completed',{ duration:52, startedAt:'2026-04-14T05:11:35Z', completedAt:'2026-04-14T05:12:27Z' }),
          proc('s3','Core Banking Bootstrap','completed',{ duration:410, startedAt:'2026-04-14T05:12:27Z', completedAt:'2026-04-14T05:19:17Z' }),
          proc('s4','Account Balance Reconciliation','completed',{ duration:650, startedAt:'2026-04-14T05:19:17Z', completedAt:'2026-04-14T05:30:07Z' }),
          proc('s5','FX Rate Loader','completed',{ duration:55, startedAt:'2026-04-14T05:30:07Z', completedAt:'2026-04-14T05:31:02Z' }),
        ],
      },
      POD: {
        type: 'POD', status: 'completed', startedAt: '2026-04-14T14:05:00Z',
        completedAt: '2026-04-14T14:52:00Z', progress: 100, initiatedBy: 'Ama Boateng',
        procedureCount: 44, completedCount: 44,
        procedures: [
          proc('p1','Intraday Position Check','completed',{ duration:190, startedAt:'2026-04-14T14:05:00Z', completedAt:'2026-04-14T14:08:10Z' }),
          proc('p2','Liquidity Buffer Validation','completed',{ duration:175, startedAt:'2026-04-14T14:08:10Z', completedAt:'2026-04-14T14:11:05Z' }),
          proc('p3','Pending Transactions Sweep','completed',{ duration:320, startedAt:'2026-04-14T14:11:05Z', completedAt:'2026-04-14T14:16:25Z' }),
          proc('p4','Regulatory Report Prep','completed',{ duration:280, startedAt:'2026-04-14T14:16:25Z', completedAt:'2026-04-14T14:21:05Z' }),
        ],
      },
      EOD: {
        type: 'EOD', status: 'running', startedAt: '2026-04-14T17:00:00Z',
        progress: 23, initiatedBy: 'Ama Boateng', procedureCount: 80, completedCount: 18,
        procedures: [
          proc('e1','End of Day Position Lock','completed',{ duration:300, startedAt:'2026-04-14T17:00:00Z', completedAt:'2026-04-14T17:05:00Z' }),
          proc('e2','Overnight Batch Trigger','running',{ progress:23, elapsed:2580, avgDuration:180, startedAt:'2026-04-14T17:05:00Z' }),
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
        completedAt: '2026-04-14T05:28:00Z', progress: 42, initiatedBy: 'Kofi Mensah',
        procedureCount: 65, completedCount: 27,
        procedures: [
          proc('s1','System Health Check','completed',{ duration:110, startedAt:'2026-04-14T05:15:00Z', completedAt:'2026-04-14T05:16:50Z' }),
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
        completedAt: '2026-04-14T05:50:00Z', progress: 100, initiatedBy: 'Yaw Darko',
        procedureCount: 70, completedCount: 70,
        procedures: [
          proc('s1','System Health Check','completed',{ duration:105, startedAt:'2026-04-14T05:05:00Z', completedAt:'2026-04-14T05:06:45Z' }),
          proc('s2','Database Connectivity Test','completed',{ duration:48, startedAt:'2026-04-14T05:06:45Z', completedAt:'2026-04-14T05:07:33Z' }),
          proc('s3','Core Banking Bootstrap','completed',{ duration:390, startedAt:'2026-04-14T05:07:33Z', completedAt:'2026-04-14T05:14:03Z' }),
          proc('s4','Account Balance Reconciliation','completed',{ duration:700, startedAt:'2026-04-14T05:14:03Z', completedAt:'2026-04-14T05:25:43Z' }),
          proc('s5','FX Rate Loader','completed',{ duration:58, startedAt:'2026-04-14T05:25:43Z', completedAt:'2026-04-14T05:26:41Z' }),
          proc('s6','Batch Queue Initialization','completed',{ duration:28, startedAt:'2026-04-14T05:26:41Z', completedAt:'2026-04-14T05:27:09Z' }),
        ],
      },
      POD: {
        type: 'POD', status: 'running', startedAt: '2026-04-14T14:10:00Z',
        progress: 38, initiatedBy: 'Yaw Darko', procedureCount: 46, completedCount: 18,
        procedures: [
          proc('p1','Intraday Position Check','completed',{ duration:195, startedAt:'2026-04-14T14:10:00Z', completedAt:'2026-04-14T14:13:15Z' }),
          proc('p2','Liquidity Buffer Validation','running',{ progress:38, startedAt:'2026-04-14T14:13:00Z' }),
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
        startedAt: '2026-04-14T05:20:00Z', completedAt: '2026-04-14T06:07:00Z',
        initiatedBy: 'Abena Osei', procedureCount: 60, completedCount: 60, procedures: [],
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
  { date: '2026-04-14', bankId: 'fnb', opType: 'SOD', status: 'completed', duration: 2520, proceduresRun: 72, proceduresFailed: 0, startedAt: '2026-04-14T05:00:00Z', completedAt: '2026-04-14T05:42:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-14', bankId: 'ctb', opType: 'SOD', status: 'completed', duration: 2700, proceduresRun: 68, proceduresFailed: 0, startedAt: '2026-04-14T05:10:00Z', completedAt: '2026-04-14T05:55:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-14', bankId: 'hcb', opType: 'SOD', status: 'failed',    duration: 780,  proceduresRun: 27, proceduresFailed: 1, startedAt: '2026-04-14T05:15:00Z', completedAt: '2026-04-14T05:28:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-14', bankId: 'mrb', opType: 'SOD', status: 'completed', duration: 2700, proceduresRun: 70, proceduresFailed: 0, startedAt: '2026-04-14T05:05:00Z', completedAt: '2026-04-14T05:50:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-14', bankId: 'apb', opType: 'SOD', status: 'completed', duration: 2820, proceduresRun: 60, proceduresFailed: 0, startedAt: '2026-04-14T05:20:00Z', completedAt: '2026-04-14T06:07:00Z', initiatedBy: 'Abena Osei' },

  // Apr 13
  { date: '2026-04-13', bankId: 'fnb', opType: 'SOD', status: 'completed', duration: 2400, proceduresRun: 72, proceduresFailed: 0, startedAt: '2026-04-13T05:00:00Z', completedAt: '2026-04-13T05:40:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-13', bankId: 'ctb', opType: 'SOD', status: 'completed', duration: 2580, proceduresRun: 68, proceduresFailed: 0, startedAt: '2026-04-13T05:10:00Z', completedAt: '2026-04-13T05:53:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-13', bankId: 'hcb', opType: 'SOD', status: 'completed', duration: 2640, proceduresRun: 65, proceduresFailed: 0, startedAt: '2026-04-13T05:15:00Z', completedAt: '2026-04-13T05:59:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-13', bankId: 'mrb', opType: 'SOD', status: 'completed', duration: 2520, proceduresRun: 70, proceduresFailed: 0, startedAt: '2026-04-13T05:05:00Z', completedAt: '2026-04-13T05:47:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-13', bankId: 'apb', opType: 'SOD', status: 'completed', duration: 2760, proceduresRun: 60, proceduresFailed: 0, startedAt: '2026-04-13T05:20:00Z', completedAt: '2026-04-13T06:06:00Z', initiatedBy: 'Abena Osei' },
  { date: '2026-04-13', bankId: 'fnb', opType: 'POD', status: 'completed', duration: 1980, proceduresRun: 48, proceduresFailed: 0, startedAt: '2026-04-13T14:00:00Z', completedAt: '2026-04-13T14:33:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-13', bankId: 'ctb', opType: 'POD', status: 'completed', duration: 1860, proceduresRun: 44, proceduresFailed: 0, startedAt: '2026-04-13T14:05:00Z', completedAt: '2026-04-13T14:36:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-13', bankId: 'hcb', opType: 'POD', status: 'completed', duration: 1920, proceduresRun: 42, proceduresFailed: 0, startedAt: '2026-04-13T14:00:00Z', completedAt: '2026-04-13T14:32:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-13', bankId: 'mrb', opType: 'POD', status: 'completed', duration: 1860, proceduresRun: 46, proceduresFailed: 0, startedAt: '2026-04-13T14:10:00Z', completedAt: '2026-04-13T14:41:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-13', bankId: 'apb', opType: 'POD', status: 'failed',    duration: 540,  proceduresRun: 12, proceduresFailed: 2, startedAt: '2026-04-13T14:00:00Z', completedAt: '2026-04-13T14:09:00Z', initiatedBy: 'Abena Osei' },
  { date: '2026-04-13', bankId: 'fnb', opType: 'EOD', status: 'completed', duration: 3600, proceduresRun: 85, proceduresFailed: 0, startedAt: '2026-04-13T17:00:00Z', completedAt: '2026-04-13T18:00:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-13', bankId: 'ctb', opType: 'EOD', status: 'completed', duration: 3420, proceduresRun: 80, proceduresFailed: 0, startedAt: '2026-04-13T17:05:00Z', completedAt: '2026-04-13T18:02:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-13', bankId: 'hcb', opType: 'EOD', status: 'completed', duration: 3300, proceduresRun: 78, proceduresFailed: 0, startedAt: '2026-04-13T17:00:00Z', completedAt: '2026-04-13T17:55:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-13', bankId: 'mrb', opType: 'EOD', status: 'completed', duration: 3480, proceduresRun: 82, proceduresFailed: 0, startedAt: '2026-04-13T17:00:00Z', completedAt: '2026-04-13T17:58:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-13', bankId: 'apb', opType: 'EOD', status: 'completed', duration: 3120, proceduresRun: 74, proceduresFailed: 0, startedAt: '2026-04-13T17:00:00Z', completedAt: '2026-04-13T17:52:00Z', initiatedBy: 'Abena Osei' },

  // Apr 12
  { date: '2026-04-12', bankId: 'fnb', opType: 'SOD', status: 'completed', duration: 2460, proceduresRun: 72, proceduresFailed: 0, startedAt: '2026-04-12T05:00:00Z', completedAt: '2026-04-12T05:41:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-12', bankId: 'ctb', opType: 'SOD', status: 'failed',    duration: 900,  proceduresRun: 30, proceduresFailed: 2, startedAt: '2026-04-12T05:10:00Z', completedAt: '2026-04-12T05:25:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-12', bankId: 'hcb', opType: 'SOD', status: 'completed', duration: 2700, proceduresRun: 65, proceduresFailed: 0, startedAt: '2026-04-12T05:15:00Z', completedAt: '2026-04-12T06:00:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-12', bankId: 'mrb', opType: 'SOD', status: 'completed', duration: 2580, proceduresRun: 70, proceduresFailed: 0, startedAt: '2026-04-12T05:05:00Z', completedAt: '2026-04-12T05:48:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-12', bankId: 'apb', opType: 'SOD', status: 'completed', duration: 2790, proceduresRun: 60, proceduresFailed: 0, startedAt: '2026-04-12T05:20:00Z', completedAt: '2026-04-12T06:07:00Z', initiatedBy: 'Abena Osei' },
  { date: '2026-04-12', bankId: 'fnb', opType: 'POD', status: 'completed', duration: 1920, proceduresRun: 48, proceduresFailed: 0, startedAt: '2026-04-12T14:00:00Z', completedAt: '2026-04-12T14:32:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-12', bankId: 'ctb', opType: 'POD', status: 'completed', duration: 1800, proceduresRun: 44, proceduresFailed: 0, startedAt: '2026-04-12T14:05:00Z', completedAt: '2026-04-12T14:35:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-12', bankId: 'hcb', opType: 'POD', status: 'completed', duration: 1980, proceduresRun: 42, proceduresFailed: 0, startedAt: '2026-04-12T14:00:00Z', completedAt: '2026-04-12T14:33:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-12', bankId: 'mrb', opType: 'POD', status: 'completed', duration: 1800, proceduresRun: 46, proceduresFailed: 0, startedAt: '2026-04-12T14:10:00Z', completedAt: '2026-04-12T14:40:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-12', bankId: 'apb', opType: 'POD', status: 'completed', duration: 1620, proceduresRun: 40, proceduresFailed: 0, startedAt: '2026-04-12T14:00:00Z', completedAt: '2026-04-12T14:27:00Z', initiatedBy: 'Abena Osei' },
  { date: '2026-04-12', bankId: 'fnb', opType: 'EOD', status: 'completed', duration: 3540, proceduresRun: 85, proceduresFailed: 0, startedAt: '2026-04-12T17:00:00Z', completedAt: '2026-04-12T17:59:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-12', bankId: 'ctb', opType: 'EOD', status: 'completed', duration: 3360, proceduresRun: 80, proceduresFailed: 0, startedAt: '2026-04-12T17:05:00Z', completedAt: '2026-04-12T18:01:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-12', bankId: 'hcb', opType: 'EOD', status: 'failed',    duration: 1080, proceduresRun: 35, proceduresFailed: 3, startedAt: '2026-04-12T17:00:00Z', completedAt: '2026-04-12T17:18:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-12', bankId: 'mrb', opType: 'EOD', status: 'completed', duration: 3420, proceduresRun: 82, proceduresFailed: 0, startedAt: '2026-04-12T17:00:00Z', completedAt: '2026-04-12T17:57:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-12', bankId: 'apb', opType: 'EOD', status: 'completed', duration: 3060, proceduresRun: 74, proceduresFailed: 0, startedAt: '2026-04-12T17:00:00Z', completedAt: '2026-04-12T17:51:00Z', initiatedBy: 'Abena Osei' },

  // Apr 11
  { date: '2026-04-11', bankId: 'fnb', opType: 'SOD', status: 'completed', duration: 2380, proceduresRun: 72, proceduresFailed: 0, startedAt: '2026-04-11T05:00:00Z', completedAt: '2026-04-11T05:40:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-11', bankId: 'ctb', opType: 'SOD', status: 'completed', duration: 2560, proceduresRun: 68, proceduresFailed: 0, startedAt: '2026-04-11T05:10:00Z', completedAt: '2026-04-11T05:53:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-11', bankId: 'hcb', opType: 'SOD', status: 'completed', duration: 2660, proceduresRun: 65, proceduresFailed: 0, startedAt: '2026-04-11T05:15:00Z', completedAt: '2026-04-11T05:59:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-11', bankId: 'mrb', opType: 'SOD', status: 'completed', duration: 2500, proceduresRun: 70, proceduresFailed: 0, startedAt: '2026-04-11T05:05:00Z', completedAt: '2026-04-11T05:47:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-11', bankId: 'apb', opType: 'SOD', status: 'completed', duration: 2720, proceduresRun: 60, proceduresFailed: 0, startedAt: '2026-04-11T05:20:00Z', completedAt: '2026-04-11T06:05:00Z', initiatedBy: 'Abena Osei' },
  { date: '2026-04-11', bankId: 'fnb', opType: 'POD', status: 'completed', duration: 1960, proceduresRun: 48, proceduresFailed: 0, startedAt: '2026-04-11T14:00:00Z', completedAt: '2026-04-11T14:33:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-11', bankId: 'ctb', opType: 'POD', status: 'completed', duration: 1840, proceduresRun: 44, proceduresFailed: 0, startedAt: '2026-04-11T14:05:00Z', completedAt: '2026-04-11T14:36:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-11', bankId: 'hcb', opType: 'POD', status: 'completed', duration: 1900, proceduresRun: 42, proceduresFailed: 0, startedAt: '2026-04-11T14:00:00Z', completedAt: '2026-04-11T14:32:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-11', bankId: 'mrb', opType: 'POD', status: 'failed',    duration: 620,  proceduresRun: 18, proceduresFailed: 1, startedAt: '2026-04-11T14:10:00Z', completedAt: '2026-04-11T14:20:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-11', bankId: 'apb', opType: 'POD', status: 'completed', duration: 1580, proceduresRun: 40, proceduresFailed: 0, startedAt: '2026-04-11T14:00:00Z', completedAt: '2026-04-11T14:26:00Z', initiatedBy: 'Abena Osei' },
  { date: '2026-04-11', bankId: 'fnb', opType: 'EOD', status: 'completed', duration: 3560, proceduresRun: 85, proceduresFailed: 0, startedAt: '2026-04-11T17:00:00Z', completedAt: '2026-04-11T17:59:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-11', bankId: 'ctb', opType: 'EOD', status: 'completed', duration: 3380, proceduresRun: 80, proceduresFailed: 0, startedAt: '2026-04-11T17:05:00Z', completedAt: '2026-04-11T18:01:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-11', bankId: 'hcb', opType: 'EOD', status: 'completed', duration: 3280, proceduresRun: 78, proceduresFailed: 0, startedAt: '2026-04-11T17:00:00Z', completedAt: '2026-04-11T17:55:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-11', bankId: 'mrb', opType: 'EOD', status: 'completed', duration: 3440, proceduresRun: 82, proceduresFailed: 0, startedAt: '2026-04-11T17:00:00Z', completedAt: '2026-04-11T17:57:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-11', bankId: 'apb', opType: 'EOD', status: 'completed', duration: 3080, proceduresRun: 74, proceduresFailed: 0, startedAt: '2026-04-11T17:00:00Z', completedAt: '2026-04-11T17:51:00Z', initiatedBy: 'Abena Osei' },

  // Apr 10
  { date: '2026-04-10', bankId: 'fnb', opType: 'SOD', status: 'completed', duration: 2420, proceduresRun: 72, proceduresFailed: 0, startedAt: '2026-04-10T05:00:00Z', completedAt: '2026-04-10T05:40:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-10', bankId: 'ctb', opType: 'SOD', status: 'completed', duration: 2540, proceduresRun: 68, proceduresFailed: 0, startedAt: '2026-04-10T05:10:00Z', completedAt: '2026-04-10T05:52:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-10', bankId: 'hcb', opType: 'SOD', status: 'failed',    duration: 860,  proceduresRun: 28, proceduresFailed: 1, startedAt: '2026-04-10T05:15:00Z', completedAt: '2026-04-10T05:29:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-10', bankId: 'mrb', opType: 'SOD', status: 'completed', duration: 2480, proceduresRun: 70, proceduresFailed: 0, startedAt: '2026-04-10T05:05:00Z', completedAt: '2026-04-10T05:46:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-10', bankId: 'apb', opType: 'SOD', status: 'completed', duration: 2740, proceduresRun: 60, proceduresFailed: 0, startedAt: '2026-04-10T05:20:00Z', completedAt: '2026-04-10T06:06:00Z', initiatedBy: 'Abena Osei' },
  { date: '2026-04-10', bankId: 'fnb', opType: 'POD', status: 'completed', duration: 1900, proceduresRun: 48, proceduresFailed: 0, startedAt: '2026-04-10T14:00:00Z', completedAt: '2026-04-10T14:32:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-10', bankId: 'ctb', opType: 'POD', status: 'completed', duration: 1820, proceduresRun: 44, proceduresFailed: 0, startedAt: '2026-04-10T14:05:00Z', completedAt: '2026-04-10T14:35:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-10', bankId: 'hcb', opType: 'POD', status: 'completed', duration: 1940, proceduresRun: 42, proceduresFailed: 0, startedAt: '2026-04-10T14:00:00Z', completedAt: '2026-04-10T14:32:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-10', bankId: 'mrb', opType: 'POD', status: 'completed', duration: 1780, proceduresRun: 46, proceduresFailed: 0, startedAt: '2026-04-10T14:10:00Z', completedAt: '2026-04-10T14:40:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-10', bankId: 'apb', opType: 'POD', status: 'completed', duration: 1600, proceduresRun: 40, proceduresFailed: 0, startedAt: '2026-04-10T14:00:00Z', completedAt: '2026-04-10T14:27:00Z', initiatedBy: 'Abena Osei' },
  { date: '2026-04-10', bankId: 'fnb', opType: 'EOD', status: 'completed', duration: 3520, proceduresRun: 85, proceduresFailed: 0, startedAt: '2026-04-10T17:00:00Z', completedAt: '2026-04-10T17:59:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-10', bankId: 'ctb', opType: 'EOD', status: 'completed', duration: 3400, proceduresRun: 80, proceduresFailed: 0, startedAt: '2026-04-10T17:05:00Z', completedAt: '2026-04-10T18:02:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-10', bankId: 'hcb', opType: 'EOD', status: 'completed', duration: 3260, proceduresRun: 78, proceduresFailed: 0, startedAt: '2026-04-10T17:00:00Z', completedAt: '2026-04-10T17:54:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-10', bankId: 'mrb', opType: 'EOD', status: 'completed', duration: 3460, proceduresRun: 82, proceduresFailed: 0, startedAt: '2026-04-10T17:00:00Z', completedAt: '2026-04-10T17:58:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-10', bankId: 'apb', opType: 'EOD', status: 'completed', duration: 3100, proceduresRun: 74, proceduresFailed: 0, startedAt: '2026-04-10T17:00:00Z', completedAt: '2026-04-10T17:52:00Z', initiatedBy: 'Abena Osei' },

  // Apr 9
  { date: '2026-04-09', bankId: 'fnb', opType: 'SOD', status: 'completed', duration: 2360, proceduresRun: 72, proceduresFailed: 0, startedAt: '2026-04-09T05:00:00Z', completedAt: '2026-04-09T05:39:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-09', bankId: 'ctb', opType: 'SOD', status: 'completed', duration: 2500, proceduresRun: 68, proceduresFailed: 0, startedAt: '2026-04-09T05:10:00Z', completedAt: '2026-04-09T05:52:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-09', bankId: 'hcb', opType: 'SOD', status: 'completed', duration: 2620, proceduresRun: 65, proceduresFailed: 0, startedAt: '2026-04-09T05:15:00Z', completedAt: '2026-04-09T05:59:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-09', bankId: 'mrb', opType: 'SOD', status: 'completed', duration: 2540, proceduresRun: 70, proceduresFailed: 0, startedAt: '2026-04-09T05:05:00Z', completedAt: '2026-04-09T05:47:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-09', bankId: 'apb', opType: 'SOD', status: 'failed',    duration: 720,  proceduresRun: 22, proceduresFailed: 1, startedAt: '2026-04-09T05:20:00Z', completedAt: '2026-04-09T05:32:00Z', initiatedBy: 'Abena Osei' },
  { date: '2026-04-09', bankId: 'fnb', opType: 'POD', status: 'completed', duration: 1940, proceduresRun: 48, proceduresFailed: 0, startedAt: '2026-04-09T14:00:00Z', completedAt: '2026-04-09T14:32:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-09', bankId: 'ctb', opType: 'POD', status: 'completed', duration: 1860, proceduresRun: 44, proceduresFailed: 0, startedAt: '2026-04-09T14:05:00Z', completedAt: '2026-04-09T14:36:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-09', bankId: 'hcb', opType: 'POD', status: 'completed', duration: 1920, proceduresRun: 42, proceduresFailed: 0, startedAt: '2026-04-09T14:00:00Z', completedAt: '2026-04-09T14:32:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-09', bankId: 'mrb', opType: 'POD', status: 'completed', duration: 1800, proceduresRun: 46, proceduresFailed: 0, startedAt: '2026-04-09T14:10:00Z', completedAt: '2026-04-09T14:40:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-09', bankId: 'apb', opType: 'POD', status: 'completed', duration: 1620, proceduresRun: 40, proceduresFailed: 0, startedAt: '2026-04-09T14:00:00Z', completedAt: '2026-04-09T14:27:00Z', initiatedBy: 'Abena Osei' },
  { date: '2026-04-09', bankId: 'fnb', opType: 'EOD', status: 'completed', duration: 3500, proceduresRun: 85, proceduresFailed: 0, startedAt: '2026-04-09T17:00:00Z', completedAt: '2026-04-09T17:58:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-09', bankId: 'ctb', opType: 'EOD', status: 'completed', duration: 3340, proceduresRun: 80, proceduresFailed: 0, startedAt: '2026-04-09T17:05:00Z', completedAt: '2026-04-09T18:01:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-09', bankId: 'hcb', opType: 'EOD', status: 'completed', duration: 3320, proceduresRun: 78, proceduresFailed: 0, startedAt: '2026-04-09T17:00:00Z', completedAt: '2026-04-09T17:55:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-09', bankId: 'mrb', opType: 'EOD', status: 'completed', duration: 3400, proceduresRun: 82, proceduresFailed: 0, startedAt: '2026-04-09T17:00:00Z', completedAt: '2026-04-09T17:57:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-09', bankId: 'apb', opType: 'EOD', status: 'completed', duration: 3040, proceduresRun: 74, proceduresFailed: 0, startedAt: '2026-04-09T17:00:00Z', completedAt: '2026-04-09T17:51:00Z', initiatedBy: 'Abena Osei' },

  // Apr 8
  { date: '2026-04-08', bankId: 'fnb', opType: 'SOD', status: 'completed', duration: 2440, proceduresRun: 72, proceduresFailed: 0, startedAt: '2026-04-08T05:00:00Z', completedAt: '2026-04-08T05:41:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-08', bankId: 'ctb', opType: 'SOD', status: 'completed', duration: 2560, proceduresRun: 68, proceduresFailed: 0, startedAt: '2026-04-08T05:10:00Z', completedAt: '2026-04-08T05:53:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-08', bankId: 'hcb', opType: 'SOD', status: 'completed', duration: 2680, proceduresRun: 65, proceduresFailed: 0, startedAt: '2026-04-08T05:15:00Z', completedAt: '2026-04-08T06:00:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-08', bankId: 'mrb', opType: 'SOD', status: 'completed', duration: 2520, proceduresRun: 70, proceduresFailed: 0, startedAt: '2026-04-08T05:05:00Z', completedAt: '2026-04-08T05:47:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-08', bankId: 'apb', opType: 'SOD', status: 'completed', duration: 2760, proceduresRun: 60, proceduresFailed: 0, startedAt: '2026-04-08T05:20:00Z', completedAt: '2026-04-08T06:06:00Z', initiatedBy: 'Abena Osei' },
  { date: '2026-04-08', bankId: 'fnb', opType: 'POD', status: 'completed', duration: 1960, proceduresRun: 48, proceduresFailed: 0, startedAt: '2026-04-08T14:00:00Z', completedAt: '2026-04-08T14:33:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-08', bankId: 'ctb', opType: 'POD', status: 'failed',    duration: 580,  proceduresRun: 15, proceduresFailed: 1, startedAt: '2026-04-08T14:05:00Z', completedAt: '2026-04-08T14:15:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-08', bankId: 'hcb', opType: 'POD', status: 'completed', duration: 1880, proceduresRun: 42, proceduresFailed: 0, startedAt: '2026-04-08T14:00:00Z', completedAt: '2026-04-08T14:31:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-08', bankId: 'mrb', opType: 'POD', status: 'completed', duration: 1820, proceduresRun: 46, proceduresFailed: 0, startedAt: '2026-04-08T14:10:00Z', completedAt: '2026-04-08T14:40:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-08', bankId: 'apb', opType: 'POD', status: 'completed', duration: 1640, proceduresRun: 40, proceduresFailed: 0, startedAt: '2026-04-08T14:00:00Z', completedAt: '2026-04-08T14:27:00Z', initiatedBy: 'Abena Osei' },
  { date: '2026-04-08', bankId: 'fnb', opType: 'EOD', status: 'completed', duration: 3580, proceduresRun: 85, proceduresFailed: 0, startedAt: '2026-04-08T17:00:00Z', completedAt: '2026-04-08T18:00:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-08', bankId: 'ctb', opType: 'EOD', status: 'completed', duration: 3360, proceduresRun: 80, proceduresFailed: 0, startedAt: '2026-04-08T17:05:00Z', completedAt: '2026-04-08T18:01:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-08', bankId: 'hcb', opType: 'EOD', status: 'completed', duration: 3240, proceduresRun: 78, proceduresFailed: 0, startedAt: '2026-04-08T17:00:00Z', completedAt: '2026-04-08T17:54:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-08', bankId: 'mrb', opType: 'EOD', status: 'completed', duration: 3480, proceduresRun: 82, proceduresFailed: 0, startedAt: '2026-04-08T17:00:00Z', completedAt: '2026-04-08T17:58:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-08', bankId: 'apb', opType: 'EOD', status: 'completed', duration: 3120, proceduresRun: 74, proceduresFailed: 0, startedAt: '2026-04-08T17:00:00Z', completedAt: '2026-04-08T17:52:00Z', initiatedBy: 'Abena Osei' },

  // Apr 7
  { date: '2026-04-07', bankId: 'fnb', opType: 'SOD', status: 'completed', duration: 2400, proceduresRun: 72, proceduresFailed: 0, startedAt: '2026-04-07T05:00:00Z', completedAt: '2026-04-07T05:40:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-07', bankId: 'ctb', opType: 'SOD', status: 'completed', duration: 2520, proceduresRun: 68, proceduresFailed: 0, startedAt: '2026-04-07T05:10:00Z', completedAt: '2026-04-07T05:52:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-07', bankId: 'hcb', opType: 'SOD', status: 'completed', duration: 2640, proceduresRun: 65, proceduresFailed: 0, startedAt: '2026-04-07T05:15:00Z', completedAt: '2026-04-07T05:59:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-07', bankId: 'mrb', opType: 'SOD', status: 'completed', duration: 2500, proceduresRun: 70, proceduresFailed: 0, startedAt: '2026-04-07T05:05:00Z', completedAt: '2026-04-07T05:47:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-07', bankId: 'apb', opType: 'SOD', status: 'completed', duration: 2700, proceduresRun: 60, proceduresFailed: 0, startedAt: '2026-04-07T05:20:00Z', completedAt: '2026-04-07T06:05:00Z', initiatedBy: 'Abena Osei' },
  { date: '2026-04-07', bankId: 'fnb', opType: 'POD', status: 'completed', duration: 1920, proceduresRun: 48, proceduresFailed: 0, startedAt: '2026-04-07T14:00:00Z', completedAt: '2026-04-07T14:32:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-07', bankId: 'ctb', opType: 'POD', status: 'completed', duration: 1800, proceduresRun: 44, proceduresFailed: 0, startedAt: '2026-04-07T14:05:00Z', completedAt: '2026-04-07T14:35:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-07', bankId: 'hcb', opType: 'POD', status: 'failed',    duration: 560,  proceduresRun: 14, proceduresFailed: 1, startedAt: '2026-04-07T14:00:00Z', completedAt: '2026-04-07T14:09:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-07', bankId: 'mrb', opType: 'POD', status: 'completed', duration: 1820, proceduresRun: 46, proceduresFailed: 0, startedAt: '2026-04-07T14:10:00Z', completedAt: '2026-04-07T14:40:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-07', bankId: 'apb', opType: 'POD', status: 'completed', duration: 1600, proceduresRun: 40, proceduresFailed: 0, startedAt: '2026-04-07T14:00:00Z', completedAt: '2026-04-07T14:27:00Z', initiatedBy: 'Abena Osei' },
  { date: '2026-04-07', bankId: 'fnb', opType: 'EOD', status: 'completed', duration: 3540, proceduresRun: 85, proceduresFailed: 0, startedAt: '2026-04-07T17:00:00Z', completedAt: '2026-04-07T17:59:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-07', bankId: 'ctb', opType: 'EOD', status: 'completed', duration: 3360, proceduresRun: 80, proceduresFailed: 0, startedAt: '2026-04-07T17:05:00Z', completedAt: '2026-04-07T18:01:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-07', bankId: 'hcb', opType: 'EOD', status: 'completed', duration: 3280, proceduresRun: 78, proceduresFailed: 0, startedAt: '2026-04-07T17:00:00Z', completedAt: '2026-04-07T17:55:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-07', bankId: 'mrb', opType: 'EOD', status: 'completed', duration: 3460, proceduresRun: 82, proceduresFailed: 0, startedAt: '2026-04-07T17:00:00Z', completedAt: '2026-04-07T17:58:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-07', bankId: 'apb', opType: 'EOD', status: 'completed', duration: 3100, proceduresRun: 74, proceduresFailed: 0, startedAt: '2026-04-07T17:00:00Z', completedAt: '2026-04-07T17:52:00Z', initiatedBy: 'Abena Osei' },

  // Apr 6
  { date: '2026-04-06', bankId: 'fnb', opType: 'SOD', status: 'completed', duration: 2380, proceduresRun: 72, proceduresFailed: 0, startedAt: '2026-04-06T05:00:00Z', completedAt: '2026-04-06T05:40:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-06', bankId: 'ctb', opType: 'SOD', status: 'completed', duration: 2500, proceduresRun: 68, proceduresFailed: 0, startedAt: '2026-04-06T05:10:00Z', completedAt: '2026-04-06T05:52:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-06', bankId: 'hcb', opType: 'SOD', status: 'completed', duration: 2620, proceduresRun: 65, proceduresFailed: 0, startedAt: '2026-04-06T05:15:00Z', completedAt: '2026-04-06T05:59:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-06', bankId: 'mrb', opType: 'SOD', status: 'failed',    duration: 840,  proceduresRun: 26, proceduresFailed: 1, startedAt: '2026-04-06T05:05:00Z', completedAt: '2026-04-06T05:19:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-06', bankId: 'apb', opType: 'SOD', status: 'completed', duration: 2720, proceduresRun: 60, proceduresFailed: 0, startedAt: '2026-04-06T05:20:00Z', completedAt: '2026-04-06T06:05:00Z', initiatedBy: 'Abena Osei' },
  { date: '2026-04-06', bankId: 'fnb', opType: 'POD', status: 'completed', duration: 1940, proceduresRun: 48, proceduresFailed: 0, startedAt: '2026-04-06T14:00:00Z', completedAt: '2026-04-06T14:32:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-06', bankId: 'ctb', opType: 'POD', status: 'completed', duration: 1820, proceduresRun: 44, proceduresFailed: 0, startedAt: '2026-04-06T14:05:00Z', completedAt: '2026-04-06T14:35:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-06', bankId: 'hcb', opType: 'POD', status: 'completed', duration: 1900, proceduresRun: 42, proceduresFailed: 0, startedAt: '2026-04-06T14:00:00Z', completedAt: '2026-04-06T14:32:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-06', bankId: 'mrb', opType: 'POD', status: 'completed', duration: 1780, proceduresRun: 46, proceduresFailed: 0, startedAt: '2026-04-06T14:10:00Z', completedAt: '2026-04-06T14:40:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-06', bankId: 'apb', opType: 'POD', status: 'completed', duration: 1620, proceduresRun: 40, proceduresFailed: 0, startedAt: '2026-04-06T14:00:00Z', completedAt: '2026-04-06T14:27:00Z', initiatedBy: 'Abena Osei' },
  { date: '2026-04-06', bankId: 'fnb', opType: 'EOD', status: 'completed', duration: 3500, proceduresRun: 85, proceduresFailed: 0, startedAt: '2026-04-06T17:00:00Z', completedAt: '2026-04-06T17:58:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-06', bankId: 'ctb', opType: 'EOD', status: 'completed', duration: 3380, proceduresRun: 80, proceduresFailed: 0, startedAt: '2026-04-06T17:05:00Z', completedAt: '2026-04-06T18:01:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-06', bankId: 'hcb', opType: 'EOD', status: 'completed', duration: 3300, proceduresRun: 78, proceduresFailed: 0, startedAt: '2026-04-06T17:00:00Z', completedAt: '2026-04-06T17:55:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-06', bankId: 'mrb', opType: 'EOD', status: 'completed', duration: 3420, proceduresRun: 82, proceduresFailed: 0, startedAt: '2026-04-06T17:00:00Z', completedAt: '2026-04-06T17:57:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-06', bankId: 'apb', opType: 'EOD', status: 'completed', duration: 3080, proceduresRun: 74, proceduresFailed: 0, startedAt: '2026-04-06T17:00:00Z', completedAt: '2026-04-06T17:51:00Z', initiatedBy: 'Abena Osei' },

  // Apr 5
  { date: '2026-04-05', bankId: 'fnb', opType: 'SOD', status: 'completed', duration: 2420, proceduresRun: 72, proceduresFailed: 0, startedAt: '2026-04-05T05:00:00Z', completedAt: '2026-04-05T05:40:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-05', bankId: 'ctb', opType: 'SOD', status: 'completed', duration: 2540, proceduresRun: 68, proceduresFailed: 0, startedAt: '2026-04-05T05:10:00Z', completedAt: '2026-04-05T05:52:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-05', bankId: 'hcb', opType: 'SOD', status: 'completed', duration: 2660, proceduresRun: 65, proceduresFailed: 0, startedAt: '2026-04-05T05:15:00Z', completedAt: '2026-04-05T05:59:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-05', bankId: 'mrb', opType: 'SOD', status: 'completed', duration: 2480, proceduresRun: 70, proceduresFailed: 0, startedAt: '2026-04-05T05:05:00Z', completedAt: '2026-04-05T05:46:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-05', bankId: 'apb', opType: 'SOD', status: 'completed', duration: 2740, proceduresRun: 60, proceduresFailed: 0, startedAt: '2026-04-05T05:20:00Z', completedAt: '2026-04-05T06:06:00Z', initiatedBy: 'Abena Osei' },
  { date: '2026-04-05', bankId: 'fnb', opType: 'POD', status: 'completed', duration: 1900, proceduresRun: 48, proceduresFailed: 0, startedAt: '2026-04-05T14:00:00Z', completedAt: '2026-04-05T14:32:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-05', bankId: 'ctb', opType: 'POD', status: 'completed', duration: 1840, proceduresRun: 44, proceduresFailed: 0, startedAt: '2026-04-05T14:05:00Z', completedAt: '2026-04-05T14:36:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-05', bankId: 'hcb', opType: 'POD', status: 'completed', duration: 1960, proceduresRun: 42, proceduresFailed: 0, startedAt: '2026-04-05T14:00:00Z', completedAt: '2026-04-05T14:33:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-05', bankId: 'mrb', opType: 'POD', status: 'completed', duration: 1800, proceduresRun: 46, proceduresFailed: 0, startedAt: '2026-04-05T14:10:00Z', completedAt: '2026-04-05T14:40:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-05', bankId: 'apb', opType: 'POD', status: 'failed',    duration: 600,  proceduresRun: 16, proceduresFailed: 1, startedAt: '2026-04-05T14:00:00Z', completedAt: '2026-04-05T14:10:00Z', initiatedBy: 'Abena Osei' },
  { date: '2026-04-05', bankId: 'fnb', opType: 'EOD', status: 'completed', duration: 3560, proceduresRun: 85, proceduresFailed: 0, startedAt: '2026-04-05T17:00:00Z', completedAt: '2026-04-05T17:59:00Z', initiatedBy: 'Kwame Asante' },
  { date: '2026-04-05', bankId: 'ctb', opType: 'EOD', status: 'completed', duration: 3400, proceduresRun: 80, proceduresFailed: 0, startedAt: '2026-04-05T17:05:00Z', completedAt: '2026-04-05T18:02:00Z', initiatedBy: 'Ama Boateng' },
  { date: '2026-04-05', bankId: 'hcb', opType: 'EOD', status: 'completed', duration: 3260, proceduresRun: 78, proceduresFailed: 0, startedAt: '2026-04-05T17:00:00Z', completedAt: '2026-04-05T17:54:00Z', initiatedBy: 'Kofi Mensah' },
  { date: '2026-04-05', bankId: 'mrb', opType: 'EOD', status: 'completed', duration: 3440, proceduresRun: 82, proceduresFailed: 0, startedAt: '2026-04-05T17:00:00Z', completedAt: '2026-04-05T17:57:00Z', initiatedBy: 'Yaw Darko' },
  { date: '2026-04-05', bankId: 'apb', opType: 'EOD', status: 'completed', duration: 3120, proceduresRun: 74, proceduresFailed: 0, startedAt: '2026-04-05T17:00:00Z', completedAt: '2026-04-05T17:52:00Z', initiatedBy: 'Abena Osei' },
]
