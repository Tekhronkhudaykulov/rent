"use client"

interface PieChartProps {
  data: { label: string; value: number; color: string }[]
  width?: number
  height?: number
  title?: string
}

export const PieChart = ({ data, width = 300, height = 300, title }: PieChartProps) => {
  if (!data || data.length === 0) return null

  const total = data.reduce((sum, item) => sum + item.value, 0)
  const centerX = width / 2
  const centerY = height / 2
  const radius = Math.min(width, height) / 2 - 20

  let currentAngle = -90 // Start from top

  const slices = data.map((item) => {
    const percentage = (item.value / total) * 100
    const sliceAngle = (item.value / total) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + sliceAngle

    const startAngleRad = (startAngle * Math.PI) / 180
    const endAngleRad = (endAngle * Math.PI) / 180

    const x1 = centerX + radius * Math.cos(startAngleRad)
    const y1 = centerY + radius * Math.sin(startAngleRad)
    const x2 = centerX + radius * Math.cos(endAngleRad)
    const y2 = centerY + radius * Math.sin(endAngleRad)

    const largeArcFlag = sliceAngle > 180 ? 1 : 0

    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      "Z",
    ].join(" ")

    currentAngle += sliceAngle

    return {
      ...item,
      pathData,
      percentage: percentage.toFixed(1),
      startAngle,
      endAngle,
    }
  })

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <div className="flex items-center gap-6">
        <svg width={width} height={height}>
          {slices.map((slice, index) => (
            <path key={index} d={slice.pathData} fill={slice.color} stroke="white" strokeWidth="2" />
          ))}
        </svg>

        {/* Legend */}
        <div className="space-y-2">
          {slices.map((slice, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: slice.color }} />
              <span className="text-sm text-gray-700">
                {slice.label}: {slice.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
