'use client'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts'
import { useTheme } from '@/components/ThemeProvider'

const FALLBACK_COLORS = ['#18163f','#2dd4bf','#f97316','#6366f1','#10b981','#e11d48']

type Props = {
  data: Record<string, string | number>[]
  banks: { code: string; color?: string }[]
}

export function DurationTrendChart({ data, banks }: Props) {
  const { dark: isDark } = useTheme()
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
          tickFormatter={(v) => `${Math.round(v / 60)}m`}
          width={40}
        />
        <Tooltip
          contentStyle={{ borderRadius: '0.625rem', border: `1px solid ${ttBorder}`, fontSize: 13, backgroundColor: ttBg, color: ttLabel }}
          formatter={(v) => [`${Math.round((v as number) / 60)}m`, '']}
          labelStyle={{ color: ttLabel, fontWeight: 600, marginBottom: 4 }}
          cursor={{ stroke: gridColor }}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, paddingTop: 8, color: tickColor }}
        />
        {banks.map((b, i) => {
          const color = b.color ?? FALLBACK_COLORS[i % FALLBACK_COLORS.length]
          return (
            <Line
              key={b.code}
              type="monotone"
              dataKey={b.code}
              stroke={color}
              strokeWidth={2}
              dot={{ r: 3, fill: color }}
              activeDot={{ r: 5 }}
            />
          )
        })}
      </LineChart>
    </ResponsiveContainer>
  )
}
