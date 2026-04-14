const fs = require('fs')
const w = (p, c) => { fs.writeFileSync(p, c); console.log('✓', p) }

w('src/components/charts/DurationTrendChart.tsx', `'use client'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts'
import { useTheme } from '@/components/ThemeProvider'

const BANK_COLORS: Record<string, string> = {
  FNB: '#18163f',
  CTB: '#2dd4bf',
  HCB: '#f97316',
  MRB: '#6366f1',
  APB: '#10b981',
}

type Props = {
  data: Record<string, string | number>[]
  banks: { code: string }[]
}

export function DurationTrendChart({ data, banks }: Props) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const gridColor  = isDark ? '#334155' : '#e5e5e5'
  const tickColor  = isDark ? '#94a3b8' : '#737373'
  const ttBorder   = isDark ? '#334155' : '#e5e5e5'
  const ttBg       = isDark ? '#1e293b' : '#ffffff'
  const ttLabel    = isDark ? '#e2e8f0' : '#18163f'
  const cursorFill = isDark ? '#0f172a' : '#f5f5f5'

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: tickColor }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: tickColor }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => \`\${Math.round(v / 60)}m\`}
          width={40}
        />
        <Tooltip
          contentStyle={{ borderRadius: '0.625rem', border: \`1px solid \${ttBorder}\`, fontSize: 13, backgroundColor: ttBg, color: ttLabel }}
          formatter={(v) => [\`\${Math.round((v as number) / 60)}m\`, '']}
          labelStyle={{ color: ttLabel, fontWeight: 600, marginBottom: 4 }}
          cursor={{ stroke: gridColor }}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, paddingTop: 8, color: tickColor }}
        />
        {banks.map(b => (
          <Line
            key={b.code}
            type="monotone"
            dataKey={b.code}
            stroke={BANK_COLORS[b.code]}
            strokeWidth={2}
            dot={{ r: 3, fill: BANK_COLORS[b.code] }}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
`)

w('src/components/charts/StatusDonutChart.tsx', `'use client'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { useTheme } from '@/components/ThemeProvider'

const COLORS: Record<string, string> = {
  Completed:     '#10b981',
  Running:       '#2dd4bf',
  Failed:        '#ef4444',
  'Not Started': '#d4d4d4',
  Pending:       '#f59e0b',
}

type Props = { data: { name: string; value: number }[] }

export function StatusDonutChart({ data }: Props) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const ttBorder = isDark ? '#334155' : '#e5e5e5'
  const ttBg     = isDark ? '#1e293b' : '#ffffff'
  const ttLabel  = isDark ? '#e2e8f0' : '#18163f'
  const tickColor = isDark ? '#94a3b8' : '#737373'

  const filtered = data.filter(d => d.value > 0)
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={filtered}
          cx="50%"
          cy="45%"
          innerRadius={65}
          outerRadius={95}
          paddingAngle={3}
          dataKey="value"
        >
          {filtered.map((entry) => (
            <Cell key={entry.name} fill={COLORS[entry.name] ?? '#ccc'} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ borderRadius: '0.625rem', border: \`1px solid \${ttBorder}\`, fontSize: 13, backgroundColor: ttBg, color: ttLabel }}
          formatter={(v, name) => [v, name]}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, color: tickColor }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
`)

w('src/components/charts/SuccessRateChart.tsx', `'use client'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Cell,
} from 'recharts'
import { useTheme } from '@/components/ThemeProvider'

type Props = { data: { bank: string; rate: number; color: string }[] }

export function SuccessRateChart({ data }: Props) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const gridColor  = isDark ? '#334155' : '#e5e5e5'
  const tickColor  = isDark ? '#94a3b8' : '#737373'
  const bankTick   = isDark ? '#e2e8f0' : '#18163f'
  const ttBorder   = isDark ? '#334155' : '#e5e5e5'
  const ttBg       = isDark ? '#1e293b' : '#ffffff'
  const ttLabel    = isDark ? '#e2e8f0' : '#18163f'
  const cursorFill = isDark ? '#0f172a' : '#f5f5f5'

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 100]}
          tick={{ fontSize: 12, fill: tickColor }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => \`\${v}%\`}
        />
        <YAxis
          type="category"
          dataKey="bank"
          tick={{ fontSize: 13, fill: bankTick, fontWeight: 500 }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip
          contentStyle={{ borderRadius: '0.625rem', border: \`1px solid \${ttBorder}\`, fontSize: 13, backgroundColor: ttBg, color: ttLabel }}
          formatter={(v) => [\`\${v as number}%\`, 'Success rate']}
          cursor={{ fill: cursorFill }}
        />
        <Bar dataKey="rate" radius={[0, 6, 6, 0]} maxBarSize={28}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
`)

w('src/components/charts/FailuresBarChart.tsx', `'use client'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts'
import { useTheme } from '@/components/ThemeProvider'

type Props = { data: { date: string; SOD: number; POD: number; EOD: number }[] }

export function FailuresBarChart({ data }: Props) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const gridColor  = isDark ? '#334155' : '#e5e5e5'
  const tickColor  = isDark ? '#94a3b8' : '#737373'
  const ttBorder   = isDark ? '#334155' : '#e5e5e5'
  const ttBg       = isDark ? '#1e293b' : '#ffffff'
  const ttLabel    = isDark ? '#e2e8f0' : '#18163f'
  const cursorFill = isDark ? '#0f172a' : '#f5f5f5'

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: tickColor }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 12, fill: tickColor }}
          axisLine={false}
          tickLine={false}
          width={28}
        />
        <Tooltip
          contentStyle={{ borderRadius: '0.625rem', border: \`1px solid \${ttBorder}\`, fontSize: 13, backgroundColor: ttBg, color: ttLabel }}
          cursor={{ fill: cursorFill }}
        />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 8, color: tickColor }} />
        <Bar dataKey="SOD" fill="#18163f" radius={[4, 4, 0, 0]} maxBarSize={24} />
        <Bar dataKey="POD" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={24} />
        <Bar dataKey="EOD" fill="#2dd4bf" radius={[4, 4, 0, 0]} maxBarSize={24} />
      </BarChart>
    </ResponsiveContainer>
  )
}
`)

w('src/components/charts/VolumeTrendChart.tsx', `'use client'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts'
import { useTheme } from '@/components/ThemeProvider'

type Props = { data: { date: string; SOD: number; POD: number; EOD: number }[] }

export function VolumeTrendChart({ data }: Props) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const gridColor  = isDark ? '#334155' : '#e5e5e5'
  const tickColor  = isDark ? '#94a3b8' : '#737373'
  const ttBorder   = isDark ? '#334155' : '#e5e5e5'
  const ttBg       = isDark ? '#1e293b' : '#ffffff'
  const ttLabel    = isDark ? '#e2e8f0' : '#18163f'
  const cursorStroke = isDark ? '#334155' : '#e5e5e5'

  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
        <defs>
          <linearGradient id="gSOD" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#18163f" stopOpacity={isDark ? 0.25 : 0.15} />
            <stop offset="95%" stopColor="#18163f" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gPOD" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#6366f1" stopOpacity={isDark ? 0.25 : 0.15} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gEOD" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#2dd4bf" stopOpacity={isDark ? 0.25 : 0.15} />
            <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: tickColor }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: tickColor }}
          axisLine={false}
          tickLine={false}
          width={36}
        />
        <Tooltip
          contentStyle={{ borderRadius: '0.625rem', border: \`1px solid \${ttBorder}\`, fontSize: 13, backgroundColor: ttBg, color: ttLabel }}
          cursor={{ stroke: cursorStroke }}
        />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 8, color: tickColor }} />
        <Area type="monotone" dataKey="SOD" stroke="#18163f" strokeWidth={2} fill="url(#gSOD)" />
        <Area type="monotone" dataKey="POD" stroke="#6366f1" strokeWidth={2} fill="url(#gPOD)" />
        <Area type="monotone" dataKey="EOD" stroke="#2dd4bf" strokeWidth={2} fill="url(#gEOD)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
`)

w('src/components/charts/AvgDurationByBankChart.tsx', `'use client'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts'
import { useTheme } from '@/components/ThemeProvider'

type Props = { data: { bank: string; SOD: number; POD: number; EOD: number }[] }

export function AvgDurationByBankChart({ data }: Props) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const gridColor  = isDark ? '#334155' : '#e5e5e5'
  const tickColor  = isDark ? '#94a3b8' : '#737373'
  const bankTick   = isDark ? '#e2e8f0' : '#18163f'
  const ttBorder   = isDark ? '#334155' : '#e5e5e5'
  const ttBg       = isDark ? '#1e293b' : '#ffffff'
  const ttLabel    = isDark ? '#e2e8f0' : '#18163f'
  const cursorFill = isDark ? '#0f172a' : '#f5f5f5'

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }} barCategoryGap="25%">
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
        <XAxis
          dataKey="bank"
          tick={{ fontSize: 13, fill: bankTick, fontWeight: 500 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: tickColor }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => \`\${Math.round(v / 60)}m\`}
          width={40}
        />
        <Tooltip
          contentStyle={{ borderRadius: '0.625rem', border: \`1px solid \${ttBorder}\`, fontSize: 13, backgroundColor: ttBg, color: ttLabel }}
          formatter={(v) => [\`\${Math.round((v as number) / 60)}m\`, '']}
          cursor={{ fill: cursorFill }}
        />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 8, color: tickColor }} />
        <Bar dataKey="SOD" fill="#18163f" radius={[4, 4, 0, 0]} maxBarSize={20} />
        <Bar dataKey="POD" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={20} />
        <Bar dataKey="EOD" fill="#2dd4bf" radius={[4, 4, 0, 0]} maxBarSize={20} />
      </BarChart>
    </ResponsiveContainer>
  )
}
`)

console.log('\nAll chart components written.')
