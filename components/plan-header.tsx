"use client"

import { Plus } from "lucide-react"

interface PlanHeaderProps {
  planName?: string
  onAddClick?: () => void
  className?: string
}

export default function PlanHeader({ planName = "Эконом", onAddClick, className = "" }: PlanHeaderProps) {
  return (
    <div className={`flex items-center w-full max-w-md mx-auto ${className}`}>
      {/* Left section with plan name */}
      <div className="flex-1 bg-white rounded-l-2xl px-6 py-4 border-2 border-r-0 border-blue-500">
        <h3 className="text-2xl font-bold text-black">{planName}</h3>
      </div>

      {/* Right section with add button */}
      <button
        onClick={onAddClick}
        className="bg-blue-500 hover:bg-blue-600 rounded-r-2xl px-6 py-4 border-2 border-blue-500 transition-colors duration-200 flex items-center justify-center"
      >
        <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
          <Plus className="w-5 h-5 text-white" />
        </div>
      </button>
    </div>
  )
}
