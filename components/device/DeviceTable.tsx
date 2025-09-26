"use client"

import type React from "react"
import { Edit2, Trash2, Eye, MoreHorizontal, Smartphone } from "lucide-react"
import type { Device } from "../../types/device.types"
import { DeviceIcon } from "./DeviceIcon"
import { DeviceStatusBadge } from "./DeviceStatusBadge"
import { formatDeviceUptime, getBatteryLevelColor } from "../../utils/device.utils"

interface DeviceTableProps {
  devices: Device[]
  loading?: boolean
  onEdit?: (device: Device) => void
  onDelete?: (deviceId: string) => void
  onView?: (device: Device) => void
  selectedDevices?: string[]
  onSelectionChange?: (selectedIds: string[]) => void
}

export const DeviceTable: React.FC<DeviceTableProps> = ({
  devices,
  loading,
  onEdit,
  onDelete,
  onView,
  selectedDevices = [],
  onSelectionChange,
}) => {
  const toggleDeviceSelection = (deviceId: string) => {
    if (!onSelectionChange) return

    const newSelection = selectedDevices.includes(deviceId)
      ? selectedDevices.filter((id) => id !== deviceId)
      : [...selectedDevices, deviceId]

    onSelectionChange(newSelection)
  }

  const toggleSelectAll = () => {
    if (!onSelectionChange) return

    if (selectedDevices.length === devices.length) {
      onSelectionChange([])
    } else {
      onSelectionChange(devices.map((device) => device.id))
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-100 border-b"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 border-b border-gray-100"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {onSelectionChange && (
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedDevices.length === devices.length && devices.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Qurilma
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Turi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holat</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hudud</th>
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
            {devices.map((device) => (
              <tr key={device.id} className="hover:bg-gray-50">
                {onSelectionChange && (
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedDevices.includes(device.id)}
                      onChange={() => toggleDeviceSelection(device.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                )}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="text-blue-600">
                      <DeviceIcon type={device.type} />
                    </div>
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
                  <DeviceStatusBadge status={device.status} />
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900">{device.region}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900">{formatDeviceUptime(device.lastSeen)}</span>
                </td>
                <td className="px-6 py-4">
                  {device.batteryLevel !== undefined ? (
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getBatteryLevelColor(device.batteryLevel)}`}
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
                    {onView && (
                      <button
                        onClick={() => onView(device)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Ko'rish"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                    {onEdit && (
                      <button
                        onClick={() => onEdit(device)}
                        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                        title="Tahrirlash"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(device.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="O'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
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

      {devices.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">
            <Smartphone className="w-12 h-12 mx-auto" />
          </div>
          <p className="text-gray-500">Hech qanday qurilma topilmadi</p>
        </div>
      )}
    </div>
  )
}
