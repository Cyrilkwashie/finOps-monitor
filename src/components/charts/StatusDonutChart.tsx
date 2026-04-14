'use client'
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
  const { dark: isDark } = useTheme()
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
          contentStyle={{ borderRadius: '0.625rem', border: `1px solid ${ttBorder}`, fontSize: 13, backgroundColor: ttBg, color: ttLabel }}
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
