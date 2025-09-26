"use client"
import { useState, useMemo } from "react"
import { Plus, Search, Edit2, Trash2, Eye, MoreHorizontal, Smartphone, Laptop, Tablet, Monitor } from "lucide-react"
import { FilterPanel } from "./filter-panel"

interface Device {
  id: string
  name: string
  type: "smartphone" | "laptop" | "tablet" | "desktop"
  status: "active" | "inactive" | "maintenance"
  region: string
  lastSeen: string
  version: string
  batteryLevel?: number
}

const mockDevices: Device[] = [
  {
    id: "1",
    name: "iPhone 14 Pro",
    type: "smartphone",
    status: "active",
    region: "Toshkent",
    lastSeen: "2025-01-30 15:30",
    version: "iOS 17.2",
    batteryLevel: 85,
  },
  {
    id: "2",
    name: "MacBook Pro M3",
    type: "laptop",
    status: "active",
    region: "Samarqand",
    lastSeen: "2025-01-30 15:25",
    version: "macOS 14.2",
  },
  {
    id: "3",
    name: "iPad Air",
    type: "tablet",
    status: "maintenance",
    region: "Andijon",
    lastSeen: "2025-01-30 14:15",
    version: "iPadOS 17.1",
    batteryLevel: 45,
  },
  {
    id: "4",
    name: "Windows Desktop",
    type: "desktop",
    status: "inactive",
    region: "Namangan",
    lastSeen: "2025-01-30 12:00",
    version: "Windows 11",
  },
]

const deviceFilters = [
  {
    id: "type",
    label: "Qurilma turi",
    type: "multiselect" as const,
    options: [
      { value: "smartphone", label: "Smartphone" },
      { value: "laptop", label: "Laptop" },
      { value: "tablet", label: "Tablet" },
      { value: "desktop", label: "Desktop" },
    ],
  },
  {
    id: "status",
    label: "Holat",
    type: "multiselect" as const,
    options: [
      { value: "active", label: "Faol" },
      { value: "inactive", label: "Nofaol" },
      { value: "maintenance", label: "Texnik xizmat" },
    ],
  },
  {
    id: "region",
    label: "Hudud",
    type: "multiselect" as const,
    options: [
      { value: "Toshkent", label: "Toshkent" },
      { value: "Samarqand", label: "Samarqand" },
      { value: "Andijon", label: "Andijon" },
      { value: "Namangan", label: "Namangan" },
    ],
  },
]

export const DeviceCRUD = () => {
  const [devices, setDevices] = useState<Device[]>(mockDevices)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterValues, setFilterValues] = useState<Record<string, any>>({})
  const [selectedDevices, setSelectedDevices] = useState<string[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingDevice, setEditingDevice] = useState<Device | null>(null)

  const filteredDevices = useMemo(() => {
    let filtered = devices

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (device) =>
          device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          device.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          device.region.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Type filter
    if (filterValues.type && filterValues.type.length > 0) {
      filtered = filtered.filter((device) => filterValues.type.includes(device.type))
    }

    // Status filter
    if (filterValues.status && filterValues.status.length > 0) {
      filtered = filtered.filter((device) => filterValues.status.includes(device.status))
    }

    // Region filter
    if (filterValues.region && filterValues.region.length > 0) {
      filtered = filtered.filter((device) => filterValues.region.includes(device.region))
    }

    return filtered
  }, [devices, searchTerm, filterValues])

  const handleFilterChange = (filterId: string, value: any) => {
    setFilterValues((prev) => ({ ...prev, [filterId]: value }))
  }

  const handleFilterReset = () => {
    setFilterValues({})
  }

  const getDeviceIcon = (type: Device["type"]) => {
    switch (type) {
      case "smartphone":
        return <Smartphone className="w-5 h-5" />
      case "laptop":
        return <Laptop className="w-5 h-5" />
      case "tablet":
        return <Tablet className="w-5 h-5" />
      case "desktop":
        return <Monitor className="w-5 h-5" />
      default:
        return <Smartphone className="w-5 h-5" />
    }
  }

  const getStatusColor = (status: Device["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: Device["status"]) => {
    switch (status) {
      case "active":
        return "Faol"
      case "inactive":
        return "Nofaol"
      case "maintenance":
        return "Texnik xizmat"
      default:
        return "Noma'lum"
    }
  }

  const handleDeleteDevice = (deviceId: string) => {
    setDevices((prev) => prev.filter((device) => device.id !== deviceId))
  }

  const handleBulkDelete = () => {
    setDevices((prev) => prev.filter((device) => !selectedDevices.includes(device.id)))
    setSelectedDevices([])
  }

  const toggleDeviceSelection = (deviceId: string) => {
    setSelectedDevices((prev) => (prev.includes(deviceId) ? prev.filter((id) => id !== deviceId) : [...prev, deviceId]))
  }

  const toggleSelectAll = () => {
    if (selectedDevices.length === filteredDevices.length) {
      setSelectedDevices([])
    } else {
      setSelectedDevices(filteredDevices.map((device) => device.id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Qurilmalar</h2>
          <p className="text-gray-600">Barcha qurilmalarni boshqarish</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Yangi qurilma
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Qurilma nomi, turi yoki hudud bo'yicha qidiring..."
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
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <span>{filteredDevices.length} ta qurilma topildi</span>
          {selectedDevices.length > 0 && (
            <div className="flex items-center gap-2">
              <span>{selectedDevices.length} ta tanlangan</span>
              <button
                onClick={handleBulkDelete}
                className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
              >
                Tanlanganlarni o'chirish
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Devices Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedDevices.length === filteredDevices.length && filteredDevices.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qurilma
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Turi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Holat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hudud
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Oxirgi faollik
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batareya
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDevices.map((device) => (
                <tr key={device.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedDevices.includes(device.id)}
                      onChange={() => toggleDeviceSelection(device.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="text-blue-600">{getDeviceIcon(device.type)}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{device.name}</div>
                        <div className="text-sm text-gray-500">{device.version}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 capitalize">{device.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                        device.status,
                      )}`}
                    >
                      {getStatusText(device.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{device.region}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{device.lastSeen}</span>
                  </td>
                  <td className="px-6 py-4">
                    {device.batteryLevel ? (
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              device.batteryLevel > 50
                                ? "bg-green-500"
                                : device.batteryLevel > 20
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${device.batteryLevel}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">{device.batteryLevel}%</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingDevice(device)}
                        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteDevice(device.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDevices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Smartphone className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-500">Hech qanday qurilma topilmadi</p>
          </div>
        )}
      </div>
    </div>
  )
}
