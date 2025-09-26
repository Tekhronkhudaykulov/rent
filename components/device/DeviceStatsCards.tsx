import type React from "react"
import { Smartphone, Activity, AlertTriangle, CheckCircle } from "lucide-react"
import type { DeviceStats } from "../../types/device.types"

interface DeviceStatsCardsProps {
  stats: DeviceStats
  loading?: boolean
}

export const DeviceStatsCards: React.FC<DeviceStatsCardsProps> = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const cards = [
    {
      title: "Jami qurilmalar",
      value: stats.total,
      icon: Smartphone,
      color: "blue",
    },
    {
      title: "Faol qurilmalar",
      value: stats.active,
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Nofaol qurilmalar",
      value: stats.inactive,
      icon: Activity,
      color: "red",
    },
    {
      title: "Texnik xizmat",
      value: stats.maintenance,
      icon: AlertTriangle,
      color: "yellow",
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      red: "bg-red-100 text-red-600",
      yellow: "bg-yellow-100 text-yellow-600",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(card.color)}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
