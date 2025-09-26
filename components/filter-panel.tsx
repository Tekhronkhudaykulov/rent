"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"

interface FilterOption {
  id: string
  label: string
  type: "select" | "date" | "range" | "multiselect"
  options?: { value: string; label: string }[]
  min?: number
  max?: number
}

interface FilterPanelProps {
  filters: FilterOption[]
  values: Record<string, any>
  onChange: (filterId: string, value: any) => void
  onReset: () => void
  className?: string
}

export const FilterPanel = ({ filters, values, onChange, onReset, className = "" }: FilterPanelProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const hasActiveFilters = Object.values(values).some((value) => {
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === "object" && value !== null) return Object.values(value).some((v) => v !== "")
    return value !== "" && value !== null && value !== undefined
  })

  return (
    <div className={`relative ${className}`}>
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
          hasActiveFilters
            ? "bg-blue-50 border-blue-200 text-blue-700"
            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        <Filter className="w-4 h-4" />
        <span>Filter</span>
        {hasActiveFilters && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
      </button>

      {/* Filter Panel */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Filterlar</h3>
              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <button onClick={onReset} className="text-sm text-gray-500 hover:text-gray-700">
                    Tozalash
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filters.map((filter) => (
                <div key={filter.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{filter.label}</label>

                  {filter.type === "select" && (
                    <select
                      value={values[filter.id] || ""}
                      onChange={(e) => onChange(filter.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Barchasi</option>
                      {filter.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}

                  {filter.type === "multiselect" && (
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {filter.options?.map((option) => (
                        <label key={option.value} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={(values[filter.id] || []).includes(option.value)}
                            onChange={(e) => {
                              const currentValues = values[filter.id] || []
                              if (e.target.checked) {
                                onChange(filter.id, [...currentValues, option.value])
                              } else {
                                onChange(
                                  filter.id,
                                  currentValues.filter((v: string) => v !== option.value),
                                )
                              }
                            }}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {filter.type === "date" && (
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        value={values[filter.id]?.from || ""}
                        onChange={(e) => onChange(filter.id, { ...values[filter.id], from: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Dan"
                      />
                      <input
                        type="date"
                        value={values[filter.id]?.to || ""}
                        onChange={(e) => onChange(filter.id, { ...values[filter.id], to: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Gacha"
                      />
                    </div>
                  )}

                  {filter.type === "range" && (
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        value={values[filter.id]?.min || ""}
                        onChange={(e) => onChange(filter.id, { ...values[filter.id], min: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Min (${filter.min || 0})`}
                        min={filter.min}
                        max={filter.max}
                      />
                      <input
                        type="number"
                        value={values[filter.id]?.max || ""}
                        onChange={(e) => onChange(filter.id, { ...values[filter.id], max: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Max (${filter.max || 999999})`}
                        min={filter.min}
                        max={filter.max}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
