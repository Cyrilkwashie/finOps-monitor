'use client'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Cell,
} from 'recharts'
import { useTheme } from '@/components/ThemeProvider'

type Props = { data: { bank: string; rate: number; color: string }[] }

export function SuccessRateChart({ data }: Props) {
  const { dark: isDark } = useTheme()
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
          tickFormatter={(v) => `${v}%`}
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
          contentStyle={{ borderRadius: '0.625rem', border: `1px solid ${ttBorder}`, fontSize: 13, backgroundColor: ttBg, color: ttLabel }}
          formatter={(v) => [`${v as number}%`, 'Success rate']}
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
