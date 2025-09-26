"use client"

import { Plus } from "lucide-react"

interface MobilePlanCardProps {
  planName?: string
  traffic?: string
  validity?: string
  network?: string
  coverageFlags?: string[]
  onMoreDetails?: () => void
  onAddPlan?: () => void
  className?: string
}

export default function MobilePlanCard({
  planName = "Эконом",
  traffic = "20 000мб",
  validity = "30 дней",
  network = "4G, 5G",
  coverageFlags = ["🇺🇿", "🇰🇿", "🇰🇬", "🇹🇯", "🇨🇳"],
  onMoreDetails,
  onAddPlan,
  className = "",
}: MobilePlanCardProps) {
  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      {/* Card with gray rounded border */}
      <div className="border-2 border-gray-400 rounded-3xl p-8 bg-white">
        {/* Header with plan name and add button */}
        <div className="flex items-center mb-8">
          <div className="flex-1 bg-white rounded-l-3xl px-6 py-4 border-2 border-r-0 border-blue-500">
            <h3 className="text-3xl font-bold text-black italic">{planName}</h3>
          </div>
          <button
            onClick={onAddPlan}
            className="bg-blue-500 hover:bg-blue-600 rounded-r-3xl px-6 py-4 border-2 border-blue-500 transition-colors duration-200 flex items-center justify-center"
          >
            <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
          </button>
        </div>

        {/* Plan details */}
        <div className="space-y-6 mb-8">
          <div className="text-2xl text-black">
            <span className="font-normal">Трафик:</span> <span className="font-bold">{traffic}</span>
          </div>

          <div className="text-2xl text-black">
            <span className="font-normal">Срок действия:</span> <span className="font-bold">{validity}</span>
          </div>

          <div className="text-2xl text-black">
            <span className="font-normal">Сеть:</span> <span className="font-bold">{network}</span>
          </div>
        </div>

        {/* Coverage area */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-normal text-black">Зона покрытия:</span>
            <div className="flex items-center space-x-1">
              {coverageFlags.map((flag, index) => (
                <div key={index} className="w-8 h-6 flex items-center justify-center text-lg">
                  {flag}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onMoreDetails}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-xl font-medium transition-colors duration-200"
          >
            Подробнее
          </button>
        </div>
      </div>
    </div>
  )
}
