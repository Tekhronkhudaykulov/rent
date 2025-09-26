"use client"

import { useState } from "react"

interface RegionTab {
  id: string
  icon: string
  label: string
}

const regions: RegionTab[] = [
  { id: "global", icon: "🌍", label: "Global" },
  { id: "top", icon: "🔥", label: "Топ направлений" },
  { id: "america", icon: "🗽", label: "Америка" },
  { id: "europe", icon: "🏛️", label: "Европа" },
  { id: "asia", icon: "🥟", label: "Азия" },
  { id: "africa", icon: "🌴", label: "Африка" },
  { id: "oceania", icon: "🏔️", label: "Океания" },
]

interface RegionNavigationProps {
  activeTab?: string
  onTabChange?: (tabId: string) => void
  className?: string
}

export default function RegionNavigation({ activeTab = "top", onTabChange, className = "" }: RegionNavigationProps) {
  const [selectedTab, setSelectedTab] = useState(activeTab)

  const handleTabClick = (tabId: string) => {
    setSelectedTab(tabId)
    onTabChange?.(tabId)
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Top dotted line */}
      <div className="w-full border-t-2 border-dotted border-blue-400 mb-4"></div>

      {/* Navigation tabs */}
      <div className="flex items-center justify-center gap-2 px-4 overflow-x-auto">
        {regions.map((region) => (
          <button
            key={region.id}
            onClick={() => handleTabClick(region.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap
              transition-all duration-200 ease-in-out
              ${
                selectedTab === region.id
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }
            `}
          >
            <span className="text-lg">{region.icon}</span>
            <span className="font-medium text-sm">{region.label}</span>
          </button>
        ))}
      </div>

      {/* Bottom dotted line */}
      <div className="w-full border-t-2 border-dotted border-blue-400 mt-4"></div>
    </div>
  )
}
