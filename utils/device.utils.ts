import type { Device } from "../types/device.types"

export const getDeviceTypeIcon = (type: Device["type"]): string => {
  const icons = {
    smartphone: "📱",
    laptop: "💻",
    tablet: "📱",
    desktop: "🖥️",
    server: "🖥️",
    router: "📡",
  }
  return icons[type] || "📱"
}

export const getDeviceStatusColor = (status: Device["status"]): string => {
  const colors = {
    active: "bg-green-100 text-green-800 border-green-200",
    inactive: "bg-red-100 text-red-800 border-red-200",
    maintenance: "bg-yellow-100 text-yellow-800 border-yellow-200",
    error: "bg-red-100 text-red-800 border-red-200",
  }
  return colors[status] || "bg-gray-100 text-gray-800 border-gray-200"
}

export const getDeviceStatusText = (status: Device["status"]): string => {
  const texts = {
    active: "Faol",
    inactive: "Nofaol",
    maintenance: "Texnik xizmat",
    error: "Xatolik",
  }
  return texts[status] || "Noma'lum"
}

export const getBatteryLevelColor = (level: number): string => {
  if (level > 50) return "bg-green-500"
  if (level > 20) return "bg-yellow-500"
  return "bg-red-500"
}

export const formatDeviceUptime = (lastSeen: string): string => {
  const now = new Date()
  const lastSeenDate = new Date(lastSeen)
  const diffMs = now.getTime() - lastSeenDate.getTime()

  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMinutes < 60) {
    return `${diffMinutes} daqiqa oldin`
  } else if (diffHours < 24) {
    return `${diffHours} soat oldin`
  } else {
    return `${diffDays} kun oldin`
  }
}

export const isDeviceOnline = (lastSeen: string, thresholdMinutes = 5): boolean => {
  const now = new Date()
  const lastSeenDate = new Date(lastSeen)
  const diffMs = now.getTime() - lastSeenDate.getTime()
  const diffMinutes = diffMs / (1000 * 60)

  return diffMinutes <= thresholdMinutes
}

export const getDeviceHealthScore = (device: Device): number => {
  let score = 100

  // Reduce score based on status
  if (device.status === "inactive") score -= 50
  if (device.status === "maintenance") score -= 30
  if (device.status === "error") score -= 70

  // Reduce score based on battery level
  if (device.batteryLevel && device.batteryLevel < 20) score -= 20
  if (device.batteryLevel && device.batteryLevel < 10) score -= 30

  // Reduce score based on last seen
  if (!isDeviceOnline(device.lastSeen, 60)) score -= 20
  if (!isDeviceOnline(device.lastSeen, 1440)) score -= 40 // 24 hours

  // Reduce score based on alerts
  if (device.alerts && device.alerts.length > 0) {
    const criticalAlerts = device.alerts.filter((alert) => alert.severity === "critical").length
    const highAlerts = device.alerts.filter((alert) => alert.severity === "high").length
    score -= criticalAlerts * 20 + highAlerts * 10
  }

  return Math.max(0, Math.min(100, score))
}

export const getDeviceHealthColor = (score: number): string => {
  if (score >= 80) return "text-green-600"
  if (score >= 60) return "text-yellow-600"
  if (score >= 40) return "text-orange-600"
  return "text-red-600"
}

export const formatDeviceSpecs = (specs?: Device["specifications"]): string => {
  if (!specs) return "N/A"

  const parts = []
  if (specs.cpu) parts.push(specs.cpu)
  if (specs.ram) parts.push(specs.ram)
  if (specs.storage) parts.push(specs.storage)

  return parts.join(" • ") || "N/A"
}

export const generateDeviceId = (): string => {
  return "DEV-" + Math.random().toString(36).substr(2, 9).toUpperCase()
}

export const validateDeviceData = (data: Partial<Device>): string[] => {
  const errors: string[] = []

  if (!data.name || data.name.trim().length === 0) {
    errors.push("Qurilma nomi kiritilishi shart")
  }

  if (!data.type) {
    errors.push("Qurilma turi tanlanishi shart")
  }

  if (!data.region || data.region.trim().length === 0) {
    errors.push("Hudud tanlanishi shart")
  }

  if (data.batteryLevel && (data.batteryLevel < 0 || data.batteryLevel > 100)) {
    errors.push("Batareya darajasi 0-100 oralig'ida bo'lishi kerak")
  }

  return errors
}

export const exportDevicesToCSV = (devices: Device[]): string => {
  const headers = [
    "ID",
    "Nomi",
    "Turi",
    "Holat",
    "Hudud",
    "Oxirgi faollik",
    "Versiya",
    "Batareya",
    "Tayinlangan foydalanuvchi",
  ]

  const rows = devices.map((device) => [
    device.id,
    device.name,
    device.type,
    getDeviceStatusText(device.status),
    device.region,
    device.lastSeen,
    device.version,
    device.batteryLevel ? `${device.batteryLevel}%` : "N/A",
    device.assignedUser || "N/A",
  ])

  const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")

  return csvContent
}

export const downloadCSV = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
