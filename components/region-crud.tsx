"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Edit, Trash2, Search, MapPin } from "lucide-react"
import { ConfirmModal } from "./confirm-modal"

interface Region {
  id: string
  name: string
  code: string
  parentId?: string
  type: "region" | "subregion"
  population?: number
  status: "active" | "inactive"
  createdAt: string
}

const mockRegions: Region[] = [
  {
    id: "1",
    name: "Toshkent viloyati",
    code: "TOS",
    type: "region",
    population: 3000000,
    status: "active",
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    name: "Toshkent shahri",
    code: "TSH",
    parentId: "1",
    type: "subregion",
    population: 2500000,
    status: "active",
    createdAt: "2025-01-15",
  },
  {
    id: "3",
    name: "Samarqand viloyati",
    code: "SAM",
    type: "region",
    population: 4000000,
    status: "active",
    createdAt: "2025-01-14",
  },
  {
    id: "4",
    name: "Samarqand shahri",
    code: "SMS",
    parentId: "3",
    type: "subregion",
    population: 500000,
    status: "active",
    createdAt: "2025-01-14",
  },
  {
    id: "5",
    name: "Buxoro viloyati",
    code: "BUX",
    type: "region",
    population: 1800000,
    status: "inactive",
    createdAt: "2025-01-13",
  },
]

interface RegionConnection {
  regionId: string
  subregionIds: string[]
}

interface RegionConnectionManagerProps {
  regions: Region[]
  setRegions: React.Dispatch<React.SetStateAction<Region[]>>
}

const RegionConnectionManager = ({ regions, setRegions }: RegionConnectionManagerProps) => {
  const [connections, setConnections] = useState<RegionConnection[]>([])

  const handleConnectionChange = (regionId: string, subregionIds: string[]) => {
    setConnections((prevConnections) => {
      const existingConnectionIndex = prevConnections.findIndex((c) => c.regionId === regionId)

      if (existingConnectionIndex !== -1) {
        const updatedConnections = [...prevConnections]
        updatedConnections[existingConnectionIndex] = { regionId, subregionIds }
        return updatedConnections
      } else {
        return [...prevConnections, { regionId, subregionIds }]
      }
    })
  }

  return (
    <div>
      {regions
        .filter((region) => region.type === "region")
        .map((region) => (
          <RegionConnectionItem
            key={region.id}
            region={region}
            regions={regions}
            onConnectionChange={handleConnectionChange}
          />
        ))}
    </div>
  )
}

interface RegionConnectionItemProps {
  region: Region
  regions: Region[]
  onConnectionChange: (regionId: string, subregionIds: string[]) => void
}

const RegionConnectionItem = ({ region, regions, onConnectionChange }: RegionConnectionItemProps) => {
  const [connectedSubregionIds, setConnectedSubregionIds] = useState<string[]>([])

  const handleCheckboxChange = (subregionId: string) => {
    setConnectedSubregionIds((prevIds) => {
      if (prevIds.includes(subregionId)) {
        return prevIds.filter((id) => id !== subregionId)
      } else {
        return [...prevIds, subregionId]
      }
    })

    onConnectionChange(region.id, connectedSubregionIds)
  }

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold">{region.name}</h3>
      <div className="ml-4">
        {regions
          .filter((subregion) => subregion.type === "subregion" && subregion.parentId === region.id)
          .map((subregion) => (
            <label key={subregion.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={subregion.id}
                checked={connectedSubregionIds.includes(subregion.id)}
                onChange={() => handleCheckboxChange(subregion.id)}
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <span>{subregion.name}</span>
            </label>
          ))}
      </div>
    </div>
  )
}

export const RegionCRUD = () => {
  const [regions, setRegions] = useState<Region[]>(mockRegions)
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingRegion, setEditingRegion] = useState<Region | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    parentId: "",
    type: "region" as const,
    population: 0,
    status: "active" as const,
  })

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    regionId: string
    regionName: string
  }>({
    isOpen: false,
    regionId: "",
    regionName: "",
  })

  const [activeTab, setActiveTab] = useState<"list" | "connections">("list")

  const filteredRegions = regions.filter(
    (region) =>
      region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      region.code.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const parentRegions = regions.filter((region) => region.type === "region")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingRegion) {
      setRegions(
        regions.map((region) =>
          region.id === editingRegion.id
            ? { ...region, ...formData, parentId: formData.parentId || undefined }
            : region,
        ),
      )
    } else {
      const newRegion: Region = {
        id: Date.now().toString(),
        ...formData,
        parentId: formData.parentId || undefined,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setRegions([...regions, newRegion])
    }

    setShowModal(false)
    setEditingRegion(null)
    setFormData({ name: "", code: "", parentId: "", type: "region", population: 0, status: "active" })
  }

  const handleEdit = (region: Region) => {
    setEditingRegion(region)
    setFormData({
      name: region.name,
      code: region.code,
      parentId: region.parentId || "",
      type: region.type,
      population: region.population || 0,
      status: region.status,
    })
    setShowModal(true)
  }

  const handleDelete = (id: string) => {
    const region = regions.find((r) => r.id === id)
    if (region) {
      setDeleteModal({
        isOpen: true,
        regionId: id,
        regionName: region.name,
      })
    }
  }

  const confirmDelete = () => {
    setRegions(regions.filter((region) => region.id !== deleteModal.regionId))
    setDeleteModal({ isOpen: false, regionId: "", regionName: "" })
  }

  const getParentName = (parentId?: string) => {
    if (!parentId) return "-"
    const parent = regions.find((r) => r.id === parentId)
    return parent ? parent.name : "-"
  }

  return (
    <div className="space-y-6">
      {/* Header with Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Hududlar</h2>
            <p className="text-gray-600">Viloyat va shaharlarni boshqarish</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Yangi hudud
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("list")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "list"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Hududlar ro'yxati
            </button>
            <button
              onClick={() => setActiveTab("connections")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "connections"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Viloyat-Tuman bog'lash
            </button>
          </nav>
        </div>
      </div>

      {activeTab === "list" && (
        <>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Hududlarni qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Regions Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hudud nomi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kod
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Turi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Asosiy hudud
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aholi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Holat
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRegions.map((region) => (
                  <tr key={region.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                        <div className="text-sm font-medium text-gray-900">{region.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-mono">{region.code}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          region.type === "region" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {region.type === "region" ? "Viloyat" : "Shahar/Tuman"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{getParentName(region.parentId)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {region.population ? region.population.toLocaleString() : "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          region.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {region.status === "active" ? "Faol" : "Nofaol"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(region)} className="text-blue-600 hover:text-blue-900 p-1">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(region.id)} className="text-red-600 hover:text-red-900 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === "connections" && <RegionConnectionManager regions={regions} setRegions={setRegions} />}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingRegion ? "Hududni tahrirlash" : "Yangi hudud qo'shish"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hudud nomi</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kod</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Turi</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as "region" | "subregion" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="region">Viloyat</option>
                  <option value="subregion">Shahar/Tuman</option>
                </select>
              </div>

              {formData.type === "subregion" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Asosiy hudud</label>
                  <select
                    value={formData.parentId}
                    onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Tanlang...</option>
                    {parentRegions.map((region) => (
                      <option key={region.id} value={region.id}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aholi soni</label>
                <input
                  type="number"
                  value={formData.population}
                  onChange={(e) => setFormData({ ...formData, population: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Holat</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Faol</option>
                  <option value="inactive">Nofaol</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditingRegion(null)
                    setFormData({ name: "", code: "", parentId: "", type: "region", population: 0, status: "active" })
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingRegion ? "Yangilash" : "Qo'shish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, regionId: "", regionName: "" })}
        onConfirm={confirmDelete}
        title="Hududni o'chirish"
        message={`"${deleteModal.regionName}" hududini o'chirmoqchimisiz? Bu amalni bekor qilib bo'lmaydi.`}
        confirmText="Ha, o'chirish"
        cancelText="Bekor qilish"
        type="danger"
      />
    </div>
  )
}
