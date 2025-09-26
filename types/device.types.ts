export interface Device {
  id: string
  name: string
  type: "smartphone" | "laptop" | "tablet" | "desktop" | "server" | "router"
  status: "active" | "inactive" | "maintenance" | "error"
  region: string
  location?: string
  lastSeen: string
  version: string
  batteryLevel?: number
  ipAddress?: string
  macAddress?: string
  manufacturer?: string
  model?: string
  serialNumber?: string
  installDate?: string
  warrantyExpiry?: string
  assignedUser?: string
  department?: string
  notes?: string
  specifications?: {
    cpu?: string
    ram?: string
    storage?: string
    os?: string
    [key: string]: any
  }
  networkInfo?: {
    ssid?: string
    signalStrength?: number
    bandwidth?: string
    latency?: number
  }
  securityInfo?: {
    lastSecurityScan?: string
    vulnerabilities?: number
    antivirusStatus?: "active" | "inactive" | "outdated"
    firewallStatus?: "enabled" | "disabled"
  }
  maintenanceHistory?: MaintenanceRecord[]
  alerts?: DeviceAlert[]
}

export interface MaintenanceRecord {
  id: string
  date: string
  type: "routine" | "repair" | "upgrade" | "replacement"
  description: string
  technician: string
  cost?: number
  duration?: number
  status: "completed" | "pending" | "cancelled"
}

export interface DeviceAlert {
  id: string
  type: "warning" | "error" | "info"
  message: string
  timestamp: string
  acknowledged: boolean
  severity: "low" | "medium" | "high" | "critical"
}

export interface DeviceFilter {
  type?: string[]
  status?: string[]
  region?: string[]
  manufacturer?: string[]
  department?: string[]
  assignedUser?: string
  dateRange?: {
    from?: string
    to?: string
  }
}

export interface DeviceStats {
  total: number
  active: number
  inactive: number
  maintenance: number
  error: number
  byType: Record<string, number>
  byRegion: Record<string, number>
  byManufacturer: Record<string, number>
}

export interface DeviceFormData {
  name: string
  type: Device["type"]
  manufacturer?: string
  model?: string
  serialNumber?: string
  region: string
  location?: string
  assignedUser?: string
  department?: string
  specifications?: Device["specifications"]
  notes?: string
}

export interface DeviceTableProps {
  devices: Device[]
  loading?: boolean
  onEdit?: (device: Device) => void
  onDelete?: (deviceId: string) => void
  onView?: (device: Device) => void
  selectedDevices?: string[]
  onSelectionChange?: (selectedIds: string[]) => void
}

export interface DeviceCardProps {
  device: Device
  onEdit?: (device: Device) => void
  onDelete?: (deviceId: string) => void
  onView?: (device: Device) => void
  compact?: boolean
}

export interface DeviceFormProps {
  device?: Device
  onSubmit: (data: DeviceFormData) => void
  onCancel: () => void
  loading?: boolean
}
