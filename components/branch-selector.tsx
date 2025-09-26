"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Search, MapPin, Phone, Clock, Star, Navigation, X, Filter } from "lucide-react"
import type { Branch, BranchSelectorProps } from "../types/branch.types"

const dayTranslations: Record<string, string> = {
  понедельник: "Душанба",
  вторник: "Сешанба",
  среда: "Чоршанба",
  четверг: "Пайшанба",
  пятница: "Жума",
  суббота: "Шанба",
  воскресенье: "Якшанба",
}

export const BranchSelector: React.FC<BranchSelectorProps> = ({
  branches,
  selectedBranch,
  onBranchSelect,
  onClose,
  isOpen,
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")

  // Get unique regions
  const regions = useMemo(() => {
    const uniqueRegions = Array.from(new Set(branches.map((branch) => branch.region)))
    return uniqueRegions.sort()
  }, [branches])

  // Filter branches
  const filteredBranches = useMemo(() => {
    return branches.filter((branch) => {
      const matchesSearch =
        searchTerm === "" ||
        branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        branch.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        branch.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        branch.region.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRegion = selectedRegion === "" || branch.region === selectedRegion

      return matchesSearch && matchesRegion
    })
  }, [branches, searchTerm, selectedRegion])

  // Check if branch is currently open
  const isBranchOpen = (workingHours: Branch["working_hours"]) => {
    const now = new Date()
    const currentDay = now.toLocaleDateString("ru-RU", { weekday: "long" })
    const currentTime = now.getHours() * 60 + now.getMinutes()

    const todayHours = workingHours.find((wh) => wh.day.toLowerCase() === currentDay.toLowerCase())

    if (!todayHours || todayHours.time === "Закрыто") {
      return false
    }

    const timeRange = todayHours.time.match(/(\d{2}):(\d{2})–(\d{2}):(\d{2})/)
    if (!timeRange) return false

    const openTime = Number.parseInt(timeRange[1]) * 60 + Number.parseInt(timeRange[2])
    const closeTime = Number.parseInt(timeRange[3]) * 60 + Number.parseInt(timeRange[4])

    return currentTime >= openTime && currentTime <= closeTime
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#F06F1E] to-[#e55a0f] p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Filial tanlash</h2>
              <p className="text-orange-100">Eng yaqin filialni toping</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Filial nomi, shahar yoki manzil bo'yicha qidiring..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F06F1E] focus:border-transparent"
              />
            </div>

            {/* Region Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F06F1E] focus:border-transparent bg-white min-w-[200px]"
              >
                <option value="">Barcha viloyatlar</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">{filteredBranches.length} ta filial topildi</div>
        </div>

        {/* Branch List */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {filteredBranches.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Filial topilmadi</h3>
              <p className="text-gray-600">Qidiruv shartlaringizni o'zgartiring yoki boshqa hudud tanlang</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredBranches.map((branch) => {
                const isOpen = isBranchOpen(branch.working_hours)
                const isSelected = selectedBranch?.id === branch.id

                return (
                  <div
                    key={branch.id}
                    onClick={() => onBranchSelect(branch)}
                    className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                      isSelected
                        ? "border-[#F06F1E] bg-orange-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-[#F06F1E]"
                    }`}
                  >
                    {/* Selected indicator */}
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#F06F1E] text-white rounded-full flex items-center justify-center">
                        <span className="text-xs">✓</span>
                      </div>
                    )}

                    {/* Branch Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{branch.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">(4.8)</span>
                        </div>
                      </div>

                      {/* Status */}
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {isOpen ? "🟢 Ochiq" : "🔴 Yopiq"}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin className="w-5 h-5 text-[#F06F1E] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">{branch.region}</p>
                        <p className="text-gray-600">{branch.city}</p>
                        <p className="text-sm text-gray-500">{branch.address}</p>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="flex items-center gap-3 mb-4">
                      <Phone className="w-5 h-5 text-[#F06F1E]" />
                      <span className="text-gray-900 font-medium">+998 {branch.phone}</span>
                    </div>

                    {/* Working Hours */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-[#F06F1E]" />
                        <span className="font-medium text-gray-900">Ish vaqti:</span>
                      </div>
                      <div className="grid grid-cols-1 gap-1 text-sm">
                        {branch.working_hours.map((wh, index) => (
                          <div key={index} className="flex justify-between">
                            <span className="text-gray-600">{dayTranslations[wh.day] || wh.day}:</span>
                            <span className={`font-medium ${wh.time === "Закрыто" ? "text-red-600" : "text-gray-900"}`}>
                              {wh.time === "Закрыто" ? "Yopiq" : wh.time}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Navigation Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(`https://maps.google.com/?q=${branch.latitude},${branch.longitude}`, "_blank")
                      }}
                      className="w-full bg-gradient-to-r from-[#F06F1E] to-[#e55a0f] text-white py-2 px-4 rounded-lg hover:from-[#e55a0f] hover:to-[#d14d0a] transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Navigation className="w-4 h-4" />
                      Yo'nalishni ko'rsatish
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {selectedBranch ? (
                <span>
                  Tanlangan: <strong>{selectedBranch.name}</strong>
                </span>
              ) : (
                <span>Filialni tanlang</span>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Bekor qilish
              </button>
              {selectedBranch && (
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-[#F06F1E] text-white rounded-lg hover:bg-[#e55a0f] transition-colors"
                >
                  Tasdiqlash
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
