"use client"

import type React from "react"
import { Edit2, Trash2, Eye, MoreHorizontal, MapPin, User, Calendar } from "lucide-react"
import type { Device } from "../../types/device.types"
import { DeviceIcon } from "./DeviceIcon"
import { DeviceStatusBadge } from "./DeviceStatusBadge"
import {
  formatDeviceUptime,
  getBatteryLevelColor,
  getDeviceHealthScore,
  getDeviceHealthColor,
} from "../../utils/device.utils"

interface DeviceCardProps {
  device: Device
  onEdit?: (device: Device) => void
  onDelete?: (deviceId: string) => void
  onView?: (device: Device) => void
  compact?: boolean
}

export const DeviceCard: React.FC<DeviceCardProps> = ({ device, onEdit, onDelete, onView, compact = false }) => {
  const healthScore = getDeviceHealthScore(device)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-blue-600">
            <DeviceIcon type={device.type} size="lg" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{device.name}</h3>
            <p className="text-sm text-gray-500">{device.version}</p>
          </div>
        </div>
        <DeviceStatusBadge status={device.status} />
      </div>

      {/* Info */}
      {!compact && (
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{device.region}</span>
            {device.location && <span>• {device.location}</span>}
          </div>

          {device.assignedUser && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>{device.assignedUser}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Oxirgi faollik: {formatDeviceUptime(device.lastSeen)}</span>
          </div>
        </div>
      )}

      {/* Battery and Health */}
      <div className="flex items-center justify-between mb-4">
        {device.batteryLevel !== undefined ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Batareya:</span>
            <div className="flex items-center gap-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getBatteryLevelColor(device.batteryLevel)}`}
                  style={{ width: `${device.batteryLevel}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-600">{device.batteryLevel}%</span>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Salomatlik:</span>
          <span className={`text-sm font-medium ${getDeviceHealthColor(healthScore)}`}>{healthScore}%</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2">
        {onView && (
          <button
            onClick={() => onView(device)}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            title="Ko'rish"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
        {onEdit && (
          <button
            onClick={() => onEdit(device)}
            className="p-2 text-gray-400 hover:text-green-600 transition-colors"
            title="Tahrirlash"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(device.id)}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            title="O'chirish"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
