'use client'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts'
import { useTheme } from '@/components/ThemeProvider'

type Props = { data: { date: string; SOD: number; POD: number; EOD: number }[] }

export function VolumeTrendChart({ data }: Props) {
  const { dark: isDark } = useTheme()
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
          contentStyle={{ borderRadius: '0.625rem', border: `1px solid ${ttBorder}`, fontSize: 13, backgroundColor: ttBg, color: ttLabel }}
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
