"use client"

// Single Responsibility: Manage device-region assignments
import { useState } from "react"
import { Link, Unlink, MapPin, Users, Monitor, AlertCircle } from "lucide-react"
import { useDevices } from "@/hooks/useDevices"
import { useRegions } from "@/hooks/useRegions"
import { DeviceCard } from "./DeviceCard"

export function DeviceRegionManager() {
  const { devices, assignDeviceToRegion, unassignDeviceFromRegion, getUnassignedDevices, getDevicesByRegion } =
    useDevices()
  const { regions } = useRegions()
  const [selectedRegion, setSelectedRegion] = useState<string>("")
  const [selectedDevices, setSelectedDevices] = useState<string[]>([])

  const unassignedDevices = getUnassignedDevices()
  const assignedDevices = selectedRegion ? getDevicesByRegion(selectedRegion) : []

  const handleAssignDevices = () => {
    if (!selectedRegion || selectedDevices.length === 0) return

    selectedDevices.forEach((deviceId) => {
      assignDeviceToRegion(deviceId, selectedRegion)
    })
    setSelectedDevices([])
  }

  const handleUnassignDevice = (deviceId: string) => {
    unassignDeviceFromRegion(deviceId)
  }

  const handleDeviceSelection = (deviceId: string) => {
    setSelectedDevices((prev) => (prev.includes(deviceId) ? prev.filter((id) => id !== deviceId) : [...prev, deviceId]))
  }

  const getRegionDeviceHierarchy = () => {
    return regions.map((region) => ({
      ...region,
      devices: getDevicesByRegion(region.id),
    }))
  }

  return (
    <div className="space-y-6">
      {/* Assignment Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Assign Devices */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Link className="w-5 h-5 text-blue-500" />
            Qurilmalarni hududga biriktirish
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hududni tanlang</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Hududni tanlang...</option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedRegion && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Biriktirilmagan qurilmalar ({unassignedDevices.length})
                </label>
                <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                  {unassignedDevices.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      <Monitor className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p>Biriktirilmagan qurilmalar yo'q</p>
                    </div>
                  ) : (
                    <div className="p-2 space-y-1">
                      {unassignedDevices.map((device) => (
                        <label
                          key={device.id}
                          className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedDevices.includes(device.id)}
                            onChange={() => handleDeviceSelection(device.id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div className="ml-3 flex-1">
                            <DeviceCard device={device} showActions={false} />
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={handleAssignDevices}
              disabled={!selectedRegion || selectedDevices.length === 0}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <Link className="w-4 h-4" />
              Biriktirish ({selectedDevices.length})
            </button>
          </div>
        </div>

        {/* Right Side - Assigned Devices */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Unlink className="w-5 h-5 text-red-500" />
            Biriktirilgan qurilmalar
          </h3>

          {selectedRegion ? (
            <div>
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">
                    {regions.find((r) => r.id === selectedRegion)?.name}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {assignedDevices.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Monitor className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p>Bu hududga biriktirilgan qurilmalar yo'q</p>
                  </div>
                ) : (
                  assignedDevices.map((device) => (
                    <div
                      key={device.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <DeviceCard device={device} showActions={false} />
                      </div>
                      <button
                        onClick={() => handleUnassignDevice(device.id)}
                        className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                        title="Bog'lanishni uzish"
                      >
                        <Unlink className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>Avval hududni tanlang</p>
            </div>
          )}
        </div>
      </div>

      {/* Hierarchy Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-green-500" />
          Hududlar bo'yicha qurilmalar taqsimoti
        </h3>

        <div className="space-y-4">
          {getRegionDeviceHierarchy().map((region) => (
            <div key={region.id} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Region Header */}
              <div className="bg-blue-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-blue-900">{region.name}</h4>
                      <p className="text-sm text-blue-700">{region.devices.length} ta qurilma biriktirilgan</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">{region.code}</span>
                </div>
              </div>

              {/* Devices */}
              <div className="p-4">
                {region.devices.length === 0 ? (
                  <p className="text-gray-500 text-sm italic">Biriktirilgan qurilmalar yo'q</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {region.devices.map((device) => (
                      <DeviceCard key={device.id} device={device} showActions={false} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-blue-700">Jami hududlar</p>
                <p className="text-xl font-bold text-blue-900">{regions.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Monitor className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-green-700">Biriktirilgan qurilmalar</p>
                <p className="text-xl font-bold text-green-900">{devices.filter((d) => d.regionId).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-yellow-700">Biriktirilmagan qurilmalar</p>
                <p className="text-xl font-bold text-yellow-900">{unassignedDevices.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Monitor className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-purple-700">Onlayn qurilmalar</p>
                <p className="text-xl font-bold text-purple-900">
                  {devices.filter((d) => d.status === "online").length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
