"use client"
import { useState } from "react"
import { Wifi, WifiOff, MapPin, Users, Activity, AlertCircle, CheckCircle, Clock } from "lucide-react"

interface Region {
  id: string
  name: string
  status: "connected" | "disconnected" | "maintenance"
  lastUpdate: string
  activeUsers: number
  totalDevices: number
  connectionQuality: "excellent" | "good" | "poor"
}

const mockRegions: Region[] = [
  {
    id: "1",
    name: "Toshkent",
    status: "connected",
    lastUpdate: "2025-01-30 15:30",
    activeUsers: 1250,
    totalDevices: 45,
    connectionQuality: "excellent",
  },
  {
    id: "2",
    name: "Samarqand",
    status: "connected",
    lastUpdate: "2025-01-30 15:28",
    activeUsers: 890,
    totalDevices: 32,
    connectionQuality: "good",
  },
  {
    id: "3",
    name: "Andijon",
    status: "maintenance",
    lastUpdate: "2025-01-30 14:45",
    activeUsers: 0,
    totalDevices: 28,
    connectionQuality: "poor",
  },
  {
    id: "4",
    name: "Namangan",
    status: "disconnected",
    lastUpdate: "2025-01-30 13:20",
    activeUsers: 0,
    totalDevices: 22,
    connectionQuality: "poor",
  },
]

export const RegionConnectionManager = () => {
  const [regions, setRegions] = useState<Region[]>(mockRegions)
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)

  const getStatusIcon = (status: Region["status"]) => {
    switch (status) {
      case "connected":
        return <Wifi className="w-5 h-5 text-green-600" />
      case "disconnected":
        return <WifiOff className="w-5 h-5 text-red-600" />
      case "maintenance":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      default:
        return <WifiOff className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: Region["status"]) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800 border-green-200"
      case "disconnected":
        return "bg-red-100 text-red-800 border-red-200"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: Region["status"]) => {
    switch (status) {
      case "connected":
        return "Ulangan"
      case "disconnected":
        return "Uzilgan"
      case "maintenance":
        return "Texnik xizmat"
      default:
        return "Noma'lum"
    }
  }

  const getQualityColor = (quality: Region["connectionQuality"]) => {
    switch (quality) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-yellow-600"
      case "poor":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getQualityText = (quality: Region["connectionQuality"]) => {
    switch (quality) {
      case "excellent":
        return "A'lo"
      case "good":
        return "Yaxshi"
      case "poor":
        return "Yomon"
      default:
        return "Noma'lum"
    }
  }

  const handleConnect = (regionId: string) => {
    setRegions((prev) =>
      prev.map((region) =>
        region.id === regionId
          ? {
              ...region,
              status: "connected" as const,
              lastUpdate: new Date().toLocaleString("ru-RU"),
              connectionQuality: "good" as const,
            }
          : region,
      ),
    )
  }

  const handleDisconnect = (regionId: string) => {
    setRegions((prev) =>
      prev.map((region) =>
        region.id === regionId
          ? {
              ...region,
              status: "disconnected" as const,
              lastUpdate: new Date().toLocaleString("ru-RU"),
              activeUsers: 0,
              connectionQuality: "poor" as const,
            }
          : region,
      ),
    )
  }

  const connectedRegions = regions.filter((r) => r.status === "connected").length
  const totalUsers = regions.reduce((sum, region) => sum + region.activeUsers, 0)
  const totalDevices = regions.reduce((sum, region) => sum + region.totalDevices, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Hududlar bilan aloqa</h2>
        <p className="text-gray-600">Barcha hududlardagi ulanish holati va statistika</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Jami hududlar</p>
              <p className="text-2xl font-bold text-gray-900">{regions.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Ulangan hududlar</p>
              <p className="text-2xl font-bold text-gray-900">{connectedRegions}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Faol foydalanuvchilar</p>
              <p className="text-2xl font-bold text-gray-900">{totalUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Jami qurilmalar</p>
              <p className="text-2xl font-bold text-gray-900">{totalDevices}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Regions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {regions.map((region) => (
          <div
            key={region.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {getStatusIcon(region.status)}
                <h3 className="text-lg font-semibold text-gray-900">{region.name}</h3>
              </div>
              <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(region.status)}`}>
                {getStatusText(region.status)}
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Faol foydalanuvchilar</p>
                <p className="text-xl font-bold text-gray-900">{region.activeUsers.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Qurilmalar</p>
                <p className="text-xl font-bold text-gray-900">{region.totalDevices}</p>
              </div>
            </div>

            {/* Connection Quality */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Ulanish sifati:</span>
                <span className={`font-medium ${getQualityColor(region.connectionQuality)}`}>
                  {getQualityText(region.connectionQuality)}
                </span>
              </div>
            </div>

            {/* Last Update */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Clock className="w-4 h-4" />
              <span>Oxirgi yangilanish: {region.lastUpdate}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {region.status === "connected" ? (
                <button
                  onClick={() => handleDisconnect(region.id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  Uzish
                </button>
              ) : (
                <button
                  onClick={() => handleConnect(region.id)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  Ulash
                </button>
              )}
              <button
                onClick={() => setSelectedRegion(region)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Batafsil
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Region Details Modal */}
      {selectedRegion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(selectedRegion.status)}
                  <h2 className="text-2xl font-bold text-gray-900">{selectedRegion.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedRegion(null)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Asosiy ma'lumotlar</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Holat:</span>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          selectedRegion.status,
                        )}`}
                      >
                        {getStatusText(selectedRegion.status)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ulanish sifati:</span>
                      <span className={`font-medium ${getQualityColor(selectedRegion.connectionQuality)}`}>
                        {getQualityText(selectedRegion.connectionQuality)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Faol foydalanuvchilar:</span>
                      <span className="font-medium text-gray-900">{selectedRegion.activeUsers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Jami qurilmalar:</span>
                      <span className="font-medium text-gray-900">{selectedRegion.totalDevices}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Oxirgi yangilanish:</span>
                      <span className="font-medium text-gray-900">{selectedRegion.lastUpdate}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Qo'shimcha ma'lumotlar</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Trafik statistikasi</h4>
                      <div className="text-sm text-gray-600">
                        <p>Kunlik trafik: 2.5 TB</p>
                        <p>O'rtacha javob vaqti: 45ms</p>
                        <p>Xatoliklar soni: 0.02%</p>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Server ma'lumotlari</h4>
                      <div className="text-sm text-gray-600">
                        <p>CPU yuklanganligi: 65%</p>
                        <p>RAM ishlatilishi: 4.2/8 GB</p>
                        <p>Disk bo'sh joyi: 120 GB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                {selectedRegion.status === "connected" ? (
                  <button
                    onClick={() => {
                      handleDisconnect(selectedRegion.id)
                      setSelectedRegion(null)
                    }}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Ulanishni uzish
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleConnect(selectedRegion.id)
                      setSelectedRegion(null)
                    }}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Qayta ulash
                  </button>
                )}
                <button
                  onClick={() => setSelectedRegion(null)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Yopish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
