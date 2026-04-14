'use client'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts'
import { useTheme } from '@/components/ThemeProvider'

type Props = { data: { date: string; SOD: number; POD: number; EOD: number }[] }

export function FailuresBarChart({ data }: Props) {
  const { dark: isDark } = useTheme()
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
          contentStyle={{ borderRadius: '0.625rem', border: `1px solid ${ttBorder}`, fontSize: 13, backgroundColor: ttBg, color: ttLabel }}
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
