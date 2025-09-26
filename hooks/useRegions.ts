"use client"

import { useState, useEffect, useCallback } from "react"
import type { Region, PaginationParams } from "../types/common.types"
import { regionService } from "../services/region.service"

export const useRegions = (initialParams?: PaginationParams) => {
  const [regions, setRegions] = useState<Region[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })

  const fetchRegions = useCallback(async (params?: PaginationParams) => {
    setLoading(true)
    setError(null)

    try {
      const response = await regionService.getRegions(params)

      if (response.success && response.data) {
        setRegions(response.data)
        if (response.pagination) {
          setPagination(response.pagination)
        }
      } else {
        setError(response.error || "Failed to fetch regions")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }, [])

  const createRegion = useCallback(async (data: Omit<Region, "id">) => {
    setLoading(true)
    setError(null)

    try {
      const response = await regionService.createRegion(data)

      if (response.success && response.data) {
        setRegions((prev) => [response.data!, ...prev])
        return response.data
      } else {
        setError(response.error || "Failed to create region")
        return null
      }
    } catch (err) {
      setError("An unexpected error occurred")
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const updateRegion = useCallback(async (id: string, data: Partial<Region>) => {
    setLoading(true)
    setError(null)

    try {
      const response = await regionService.updateRegion(id, data)

      if (response.success && response.data) {
        setRegions((prev) => prev.map((region) => (region.id === id ? response.data! : region)))
        return response.data
      } else {
        setError(response.error || "Failed to update region")
        return null
      }
    } catch (err) {
      setError("An unexpected error occurred")
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteRegion = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await regionService.deleteRegion(id)

      if (response.success) {
        setRegions((prev) => prev.filter((region) => region.id !== id))
        return true
      } else {
        setError(response.error || "Failed to delete region")
        return false
      }
    } catch (err) {
      setError("An unexpected error occurred")
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRegions(initialParams)
  }, [fetchRegions, initialParams])

  return {
    regions,
    loading,
    error,
    pagination,
    fetchRegions,
    createRegion,
    updateRegion,
    deleteRegion,
    refetch: () => fetchRegions(initialParams),
  }
}
