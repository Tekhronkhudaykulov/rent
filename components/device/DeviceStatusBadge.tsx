import type React from "react"
import type { Device } from "../../types/device.types"
import { getDeviceStatusColor, getDeviceStatusText } from "../../utils/device.utils"

interface DeviceStatusBadgeProps {
  status: Device["status"]
  className?: string
}

export const DeviceStatusBadge: React.FC<DeviceStatusBadgeProps> = ({ status, className = "" }) => {
  return (
    <span
      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getDeviceStatusColor(status)} ${className}`}
    >
      {getDeviceStatusText(status)}
    </span>
  )
}
