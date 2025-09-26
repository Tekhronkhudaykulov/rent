"use client"

import type React from "react"

// Single Responsibility: Handle device form operations
import { useState } from "react"
import type { Device, DeviceFormData } from "@/types/device.types"
import { useRegions } from "@/hooks/useRegions"

interface DeviceFormProps {
  device?: Device
  onSubmit: (data: DeviceFormData) => void
  onCancel: () => void
  loading?: boolean
}

export function DeviceForm({ device, onSubmit, onCancel, loading = false }: DeviceFormProps) {
  const { regions } = useRegions()
  const [formData, setFormData] = useState<DeviceFormData>({
    name: device?.name || "",
    type: device?.type || "terminal",
    location: device?.location || "",
    regionId: device?.regionId || "",
    ipAddress: device?.ipAddress || "",
    version: device?.version || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Qurilma nomi</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Turi</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="terminal">Terminal</option>
          <option value="mobile">Mobil</option>
          <option value="tablet">Planshet</option>
          <option value="router">Router</option>
          <option value="server">Server</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Joylashuv</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Hudud</label>
        <select
          value={formData.regionId}
          onChange={(e) => setFormData({ ...formData, regionId: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Hududni tanlang (ixtiyoriy)</option>
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">IP Address</label>
        <input
          type="text"
          value={formData.ipAddress}
          onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="192.168.1.100"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Versiya</label>
        <input
          type="text"
          value={formData.version}
          onChange={(e) => setFormData({ ...formData, version: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="v1.0.0"
          required
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          disabled={loading}
        >
          Bekor qilish
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Saqlanmoqda..." : device ? "Yangilash" : "Qo'shish"}
        </button>
      </div>
    </form>
  )
}
