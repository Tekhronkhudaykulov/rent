"use client"

interface LineChartProps {
  data: { label: string; value: number }[]
  width?: number
  height?: number
  color?: string
  title?: string
}

export const LineChart = ({ data, width = 400, height = 200, color = "#3B82F6", title }: LineChartProps) => {
  if (!data || data.length === 0) return null

  const maxValue = Math.max(...data.map((d) => d.value))
  const minValue = Math.min(...data.map((d) => d.value))
  const range = maxValue - minValue || 1

  const padding = 40
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const points = data
    .map((item, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth
      const y = padding + chartHeight - ((item.value - minValue) / range) * chartHeight
      return `${x},${y}`
    })
    .join(" ")

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <svg width={width} height={height} className="w-full h-auto">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const y = padding + chartHeight - ratio * chartHeight
          const value = Math.round(minValue + ratio * range)
          return (
            <g key={index}>
              <line x1={padding - 5} y1={y} x2={padding} y2={y} stroke="#9CA3AF" strokeWidth="1" />
              <text x={padding - 10} y={y + 4} textAnchor="end" className="text-xs fill-gray-500">
                {value}
              </text>
            </g>
          )
        })}

        {/* X-axis labels */}
        {data.map((item, index) => {
          const x = padding + (index / (data.length - 1)) * chartWidth
          return (
            <g key={index}>
              <line x1={x} y1={height - padding} x2={x} y2={height - padding + 5} stroke="#9CA3AF" strokeWidth="1" />
              <text x={x} y={height - padding + 18} textAnchor="middle" className="text-xs fill-gray-500">
                {item.label}
              </text>
            </g>
          )
        })}

        {/* Line */}
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />

        {/* Points */}
        {data.map((item, index) => {
          const x = padding + (index / (data.length - 1)) * chartWidth
          const y = padding + chartHeight - ((item.value - minValue) / range) * chartHeight
          return <circle key={index} cx={x} cy={y} r="4" fill={color} stroke="white" strokeWidth="2" />
        })}
      </svg>
    </div>
  )
}
