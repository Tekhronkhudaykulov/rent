"use client"

// Single Responsibility: Manage device list view with filters and search
import { useState, useMemo } from "react"
import { Search, Plus } from "lucide-react"
import { DeviceStatsCards } from "./DeviceStatsCards"
import { DeviceTable } from "./DeviceTable"
import { FilterPanel } from "../filter-panel"
import { useDevices } from "@/hooks/useDevices"
import type { DeviceFilters, Device } from "@/types/device.types"

interface DeviceListViewProps {
  onCreateDevice: () => void
  onEditDevice: (device: Device) => void
  onDeleteDevice: (id: string) => void
}

export function DeviceListView({ onCreateDevice, onEditDevice, onDeleteDevice }: DeviceListViewProps) {
  const { devices, toggleDeviceStatus, getDeviceStats } = useDevices()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterValues, setFilterValues] = useState<DeviceFilters>({})

  const deviceFilters = [
    {
      id: "status",
      label: "Holat",
      type: "multiselect" as const,
      options: [
        { value: "online", label: "Onlayn" },
        { value: "offline", label: "Oflayn" },
        { value: "maintenance", label: "Texnik xizmat" },
      ],
    },
    {
      id: "type",
      label: "Turi",
      type: "multiselect" as const,
      options: [
        { value: "terminal", label: "Terminal" },
        { value: "mobile", label: "Mobil" },
        { value: "tablet", label: "Planshet" },
        { value: "router", label: "Router" },
        { value: "server", label: "Server" },
      ],
    },
    // Add other filters...
  ]

  const filteredDevices = useMemo(() => {
    return devices.filter(
      (device) =>
        device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.ipAddress.includes(searchTerm),
    )
  }, [devices, searchTerm, filterValues])

  const stats = getDeviceStats()

  const handleFilterChange = (filterId: string, value: any) => {
    setFilterValues((prev) => ({ ...prev, [filterId]: value }))
  }

  const handleFilterReset = () => {
    setFilterValues({})
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Qurilmalar</h2>
          <p className="text-gray-600">Tizim qurilmalarini boshqarish va monitoring</p>
        </div>
        <button
          onClick={onCreateDevice}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Yangi qurilma
        </button>
      </div>

      {/* Stats */}
      <DeviceStatsCards stats={stats} />

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Qurilmalarni qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <FilterPanel
          filters={deviceFilters}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={handleFilterReset}
        />
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{filteredDevices.length} ta qurilma topildi</span>
        {Object.keys(filterValues).length > 0 && <span>Filterlar faol: {Object.keys(filterValues).length}</span>}
      </div>

      {/* Table */}
      <DeviceTable
        devices={filteredDevices}
        onEdit={onEditDevice}
        onDelete={onDeleteDevice}
        onToggleStatus={toggleDeviceStatus}
      />
    </div>
  )
}
