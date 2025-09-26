"use client"

import { useState, useEffect, useCallback } from "react"
import type { Device, DeviceFilter, DeviceStats, PaginationParams } from "../types/device.types"
import { deviceService } from "../services/device.service"

export const useDevices = (initialParams?: PaginationParams & { filters?: DeviceFilter }) => {
  const [devices, setDevices] = useState<Device[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })

  const fetchDevices = useCallback(async (params?: PaginationParams & { filters?: DeviceFilter }) => {
    setLoading(true)
    setError(null)

    try {
      const response = await deviceService.getDevices(params)

      if (response.success && response.data) {
        setDevices(response.data)
        if (response.pagination) {
          setPagination(response.pagination)
        }
      } else {
        setError(response.error || "Failed to fetch devices")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }, [])

  const createDevice = useCallback(async (data: any) => {
    setLoading(true)
    setError(null)

    try {
      const response = await deviceService.createDevice(data)

      if (response.success && response.data) {
        setDevices((prev) => [response.data!, ...prev])
        return response.data
      } else {
        setError(response.error || "Failed to create device")
        return null
      }
    } catch (err) {
      setError("An unexpected error occurred")
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const updateDevice = useCallback(async (id: string, data: any) => {
    setLoading(true)
    setError(null)

    try {
      const response = await deviceService.updateDevice(id, data)

      if (response.success && response.data) {
        setDevices((prev) => prev.map((device) => (device.id === id ? response.data! : device)))
        return response.data
      } else {
        setError(response.error || "Failed to update device")
        return null
      }
    } catch (err) {
      setError("An unexpected error occurred")
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteDevice = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await deviceService.deleteDevice(id)

      if (response.success) {
        setDevices((prev) => prev.filter((device) => device.id !== id))
        return true
      } else {
        setError(response.error || "Failed to delete device")
        return false
      }
    } catch (err) {
      setError("An unexpected error occurred")
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const bulkDeleteDevices = useCallback(async (ids: string[]) => {
    setLoading(true)
    setError(null)

    try {
      const response = await deviceService.bulkDeleteDevices(ids)

      if (response.success) {
        setDevices((prev) => prev.filter((device) => !ids.includes(device.id)))
        return true
      } else {
        setError(response.error || "Failed to delete devices")
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
    fetchDevices(initialParams)
  }, [fetchDevices, initialParams])

  return {
    devices,
    loading,
    error,
    pagination,
    fetchDevices,
    createDevice,
    updateDevice,
    deleteDevice,
    bulkDeleteDevices,
    refetch: () => fetchDevices(initialParams),
  }
}

export const useDeviceStats = (filters?: DeviceFilter) => {
  const [stats, setStats] = useState<DeviceStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await deviceService.getDeviceStats(filters)

      if (response.success && response.data) {
        setStats(response.data)
      } else {
        setError(response.error || "Failed to fetch device stats")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  }
}
