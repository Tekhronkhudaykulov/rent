import type { Region, ApiResponse, PaginationParams } from "../types/common.types"

class RegionService {
  private baseUrl = "/api/regions"

  async getRegions(params?: PaginationParams): Promise<ApiResponse<Region[]>> {
    try {
      const queryParams = new URLSearchParams()

      if (params?.page) queryParams.append("page", params.page.toString())
      if (params?.limit) queryParams.append("limit", params.limit.toString())
      if (params?.sortBy) queryParams.append("sortBy", params.sortBy)
      if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder)
      if (params?.search) queryParams.append("search", params.search)

      const response = await fetch(`${this.baseUrl}?${queryParams}`)
      return await response.json()
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch regions",
      }
    }
  }

  async getRegion(id: string): Promise<ApiResponse<Region>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`)
      return await response.json()
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch region",
      }
    }
  }

  async createRegion(data: Omit<Region, "id">): Promise<ApiResponse<Region>> {
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
        error: "Failed to create region",
      }
    }
  }

  async updateRegion(id: string, data: Partial<Region>): Promise<ApiResponse<Region>> {
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
        error: "Failed to update region",
      }
    }
  }

  async deleteRegion(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
      })
      return await response.json()
    } catch (error) {
      return {
        success: false,
        error: "Failed to delete region",
      }
    }
  }

  async getRegionStats(id: string): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}/stats`)
      return await response.json()
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch region stats",
      }
    }
  }

  async updateRegionStatus(id: string, status: Region["status"]): Promise<ApiResponse<Region>> {
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
        error: "Failed to update region status",
      }
    }
  }
}

export const regionService = new RegionService()
