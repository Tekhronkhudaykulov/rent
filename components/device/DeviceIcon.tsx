import type React from "react"
import { Smartphone, Laptop, Tablet, Monitor, Server, Router } from "lucide-react"
import type { Device } from "../../types/device.types"

interface DeviceIconProps {
  type: Device["type"]
  className?: string
  size?: "sm" | "md" | "lg"
}

export const DeviceIcon: React.FC<DeviceIconProps> = ({ type, className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  const iconProps = {
    className: `${sizeClasses[size]} ${className}`,
  }

  switch (type) {
    case "smartphone":
      return <Smartphone {...iconProps} />
    case "laptop":
      return <Laptop {...iconProps} />
    case "tablet":
      return <Tablet {...iconProps} />
    case "desktop":
      return <Monitor {...iconProps} />
    case "server":
      return <Server {...iconProps} />
    case "router":
      return <Router {...iconProps} />
    default:
      return <Smartphone {...iconProps} />
  }
}
