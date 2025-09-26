import type {
  Device,
  DeviceFormData,
  DeviceFilter,
  DeviceStats,
  ApiResponse,
  PaginationParams,
} from "../types/device.types"

class DeviceService {
  private baseUrl = "/api/devices"

  async getDevices(params?: PaginationParams & { filters?: DeviceFilter }): Promise<ApiResponse<Device[]>> {
    try {
      const queryParams = new URLSearchParams()

      if (params?.page) queryParams.append("page", params.page.toString())
      if (params?.limit) queryParams.append("limit", params.limit.toString())
      if (params?.sortBy) queryParams.append("sortBy", params.sortBy)
      if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder)
      if (params?.search) queryParams.append("search", params.search)

      if (params?.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => queryParams.append(`filters[${key}]`, v))
          } else if (value !== undefined && value !== null) {
            queryParams.append(`filters[${key}]`, value.toString())
          }
        })
      }

      const response = await fetch(`${this.baseUrl}?${queryParams}`)
      return await response.json()
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch devices",
      }
    }
  }

  async getDevice(id: string): Promise<ApiResponse<Device>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`)
      return await response.json()
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch device",
      }
    }
  }

  async createDevice(data: DeviceFormData): Promise<ApiResponse<Device>> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      return await response.json()
    } catch (error) {
      return {
        success: false,
        error: "Failed to create device",
      }
    }
  }

  async updateDevice(id: string, data: Partial<DeviceFormData>): Promise<ApiResponse<Device>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      return await response.json()
    } catch (error) {
      return {
        success: false,
        error: "Failed to update device",
      }
    }
  }

  async deleteDevice(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
      })
      return await response.json()
    } catch (error) {
      return {
        success: false,
        error: "Failed to delete device",
      }
    }
  }

  async bulkDeleteDevices(ids: string[]): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${this.baseUrl}/bulk-delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids }),
      })
      return await response.json()
    } catch (error) {
      return {
        success: false,
        error: "Failed to delete devices",
      }
    }
  }

  async getDeviceStats(filters?: DeviceFilter): Promise<ApiResponse<DeviceStats>> {
    try {
      const queryParams = new URLSearchParams()

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => queryParams.append(`filters[${key}]`, v))
          } else if (value !== undefined && value !== null) {
            queryParams.append(`filters[${key}]`, value.toString())
          }
        })
      }

      const response = await fetch(`${this.baseUrl}/stats?${queryParams}`)
      return await response.json()
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch device stats",
      }
    }
  }

  async updateDeviceStatus(id: string, status: Device["status"]): Promise<ApiResponse<Device>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })
      return await response.json()
    } catch (error) {
      return {
        success: false,
        error: "Failed to update device status",
      }
    }
  }

  async assignDevice(id: string, userId: string): Promise<ApiResponse<Device>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}/assign`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      })
      return await response.json()
    } catch (error) {
      return {
        success: false,
        error: "Failed to assign device",
      }
    }
  }

  async unassignDevice(id: string): Promise<ApiResponse<Device>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}/unassign`, {
        method: "PATCH",
      })
      return await response.json()
    } catch (error) {
      return {
        success: false,
        error: "Failed to unassign device",
      }
    }
  }

  async getDeviceHistory(id: string): Promise<ApiResponse<any[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}/history`)
      return await response.json()
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch device history",
      }
    }
  }

  async exportDevices(filters?: DeviceFilter, format: "csv" | "xlsx" = "csv"): Promise<Blob> {
    const queryParams = new URLSearchParams()
    queryParams.append("format", format)

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => queryParams.append(`filters[${key}]`, v))
        } else if (value !== undefined && value !== null) {
          queryParams.append(`filters[${key}]`, value.toString())
        }
      })
    }

    const response = await fetch(`${this.baseUrl}/export?${queryParams}`)
    return await response.blob()
  }
}

export const deviceService = new DeviceService()
