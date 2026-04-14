'use client'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts'
import { useTheme } from '@/components/ThemeProvider'

type Props = { data: { bank: string; SOD: number; POD: number; EOD: number }[] }

export function AvgDurationByBankChart({ data }: Props) {
  const { dark: isDark } = useTheme()
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
          tickFormatter={(v) => `${Math.round(v / 60)}m`}
          width={40}
        />
        <Tooltip
          contentStyle={{ borderRadius: '0.625rem', border: `1px solid ${ttBorder}`, fontSize: 13, backgroundColor: ttBg, color: ttLabel }}
          formatter={(v) => [`${Math.round((v as number) / 60)}m`, '']}
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
