"use client"

interface BarChartProps {
  data: { label: string; value: number; color?: string }[]
  width?: number
  height?: number
  title?: string
}

export const BarChart = ({ data, width = 400, height = 200, title }: BarChartProps) => {
  if (!data || data.length === 0) return null

  const maxValue = Math.max(...data.map((d) => d.value))
  const padding = 40
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2
  const barWidth = (chartWidth / data.length) * 0.8
  const barSpacing = (chartWidth / data.length) * 0.2

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <svg width={width} height={height} className="w-full h-auto">
        {/* Grid lines */}
        <defs>
          <pattern id="barGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#barGrid)" />

        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const y = padding + chartHeight - ratio * chartHeight
          const value = Math.round(maxValue * ratio)
          return (
            <g key={index}>
              <line x1={padding - 5} y1={y} x2={padding} y2={y} stroke="#9CA3AF" strokeWidth="1" />
              <text x={padding - 10} y={y + 4} textAnchor="end" className="text-xs fill-gray-500">
                {value}
              </text>
            </g>
          )
        })}

        {/* Bars */}
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * chartHeight
          const x = padding + index * (barWidth + barSpacing) + barSpacing / 2
          const y = padding + chartHeight - barHeight
          const color = item.color || "#3B82F6"

          return (
            <g key={index}>
              <rect x={x} y={y} width={barWidth} height={barHeight} fill={color} rx="4" ry="4" />
              <text
                x={x + barWidth / 2}
                y={height - padding + 18}
                textAnchor="middle"
                className="text-xs fill-gray-500"
              >
                {item.label}
              </text>
              <text x={x + barWidth / 2} y={y - 5} textAnchor="middle" className="text-xs fill-gray-700 font-medium">
                {item.value}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
