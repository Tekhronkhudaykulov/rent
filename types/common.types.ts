import type React from "react"
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: "admin" | "operator" | "viewer" | "manager"
  region?: string
  avatar?: string
  status: "active" | "inactive" | "suspended"
  lastLogin?: string
  createdAt: string
  updatedAt: string
  permissions: Permission[]
}

export interface Permission {
  id: string
  name: string
  resource: string
  action: "create" | "read" | "update" | "delete" | "manage"
}

export interface Region {
  id: string
  name: string
  code: string
  country: string
  timezone: string
  coordinates?: {
    latitude: number
    longitude: number
  }
  status: "active" | "inactive"
  manager?: User
  deviceCount?: number
  userCount?: number
}

export interface Operator {
  id: string
  name: string
  email: string
  phone: string
  region: string
  status: "active" | "inactive" | "suspended"
  role: "senior" | "junior" | "trainee"
  hireDate: string
  salary?: number
  performance?: {
    rating: number
    completedTasks: number
    averageResponseTime: number
  }
  skills: string[]
  certifications: string[]
  avatar?: string
}

export interface Service {
  id: string
  name: string
  description: string
  category: string
  price: number
  currency: string
  status: "active" | "inactive" | "deprecated"
  region?: string
  provider?: string
  features: string[]
  requirements: string[]
  supportedDevices: string[]
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
  search?: string
  filters?: Record<string, any>
}

export interface FilterOption {
  value: string
  label: string
  count?: number
}

export interface Filter {
  id: string
  label: string
  type: "text" | "select" | "multiselect" | "date" | "daterange" | "number" | "boolean"
  options?: FilterOption[]
  placeholder?: string
  defaultValue?: any
}

export interface TableColumn<T = any> {
  key: keyof T | string
  label: string
  sortable?: boolean
  filterable?: boolean
  width?: string
  align?: "left" | "center" | "right"
  render?: (value: any, row: T) => React.ReactNode
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string | string[]
    borderWidth?: number
  }[]
}

export interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalDevices: number
  activeDevices: number
  totalRegions: number
  activeRegions: number
  totalServices: number
  activeServices: number
  revenue: number
  growth: number
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  timestamp: string
  read: boolean
  userId?: string
  actionUrl?: string
}

export interface ActivityLog {
  id: string
  userId: string
  userName: string
  action: string
  resource: string
  resourceId?: string
  details?: string
  timestamp: string
  ipAddress?: string
  userAgent?: string
}

export interface FileUpload {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedAt: string
  uploadedBy: string
}

export interface SystemSettings {
  siteName: string
  siteDescription: string
  logo?: string
  favicon?: string
  primaryColor: string
  secondaryColor: string
  timezone: string
  language: string
  currency: string
  emailSettings: {
    smtpHost: string
    smtpPort: number
    smtpUser: string
    smtpPassword: string
    fromEmail: string
    fromName: string
  }
  smsSettings: {
    provider: string
    apiKey: string
    senderId: string
  }
  paymentSettings: {
    providers: string[]
    testMode: boolean
  }
}
