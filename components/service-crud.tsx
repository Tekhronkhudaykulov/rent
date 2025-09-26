"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { ConfirmModal } from "./confirm-modal"
import { FilterPanel } from "./filter-panel"

interface Service {
  id: string
  name: string
  description: string
  price: number
  status: "active" | "inactive"
  createdAt: string
}

const mockServices: Service[] = [
  {
    id: "1",
    name: "Mobil to'lov",
    description: "Mobil operatorlar uchun to'lov xizmati",
    price: 1000,
    status: "active",
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    name: "Internet to'lov",
    description: "Internet provayderlar uchun to'lov",
    price: 1500,
    status: "active",
    createdAt: "2025-01-14",
  },
  {
    id: "3",
    name: "Kommunal to'lov",
    description: "Kommunal xizmatlar uchun to'lov",
    price: 500,
    status: "inactive",
    createdAt: "2025-01-13",
  },
  {
    id: "4",
    name: "Bank to'lov",
    description: "Bank xizmatlar uchun to'lov",
    price: 2000,
    status: "active",
    createdAt: "2025-01-12",
  },
  {
    id: "5",
    name: "Kredit to'lov",
    description: "Kredit to'lovlari uchun xizmat",
    price: 750,
    status: "inactive",
    createdAt: "2025-01-11",
  },
]

const serviceFilters = [
  {
    id: "status",
    label: "Holat",
    type: "select" as const,
    options: [
      { value: "active", label: "Faol" },
      { value: "inactive", label: "Nofaol" },
    ],
  },
  {
    id: "priceRange",
    label: "Narx oralig'i",
    type: "range" as const,
    min: 0,
    max: 5000,
  },
  {
    id: "dateRange",
    label: "Yaratilgan sana",
    type: "date" as const,
  },
  {
    id: "categories",
    label: "Kategoriyalar",
    type: "multiselect" as const,
    options: [
      { value: "mobile", label: "Mobil" },
      { value: "internet", label: "Internet" },
      { value: "utility", label: "Kommunal" },
      { value: "bank", label: "Bank" },
      { value: "credit", label: "Kredit" },
    ],
  },
]

export const ServiceCRUD = () => {
  const [services, setServices] = useState<Service[]>(mockServices)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterValues, setFilterValues] = useState<Record<string, any>>({})
  const [showModal, setShowModal] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    status: "active" as const,
  })

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    serviceId: string
    serviceName: string
  }>({
    isOpen: false,
    serviceId: "",
    serviceName: "",
  })

  const filteredServices = useMemo(() => {
    let filtered = services.filter(
      (service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Status filter
    if (filterValues.status) {
      filtered = filtered.filter((service) => service.status === filterValues.status)
    }

    // Price range filter
    if (filterValues.priceRange?.min || filterValues.priceRange?.max) {
      const min = filterValues.priceRange?.min ? Number(filterValues.priceRange.min) : 0
      const max = filterValues.priceRange?.max ? Number(filterValues.priceRange.max) : Number.POSITIVE_INFINITY
      filtered = filtered.filter((service) => service.price >= min && service.price <= max)
    }

    // Date range filter
    if (filterValues.dateRange?.from || filterValues.dateRange?.to) {
      const fromDate = filterValues.dateRange?.from ? new Date(filterValues.dateRange.from) : new Date(0)
      const toDate = filterValues.dateRange?.to ? new Date(filterValues.dateRange.to) : new Date()
      filtered = filtered.filter((service) => {
        const serviceDate = new Date(service.createdAt)
        return serviceDate >= fromDate && serviceDate <= toDate
      })
    }

    return filtered
  }, [services, searchTerm, filterValues])

  const handleFilterChange = (filterId: string, value: any) => {
    setFilterValues((prev) => ({ ...prev, [filterId]: value }))
  }

  const handleFilterReset = () => {
    setFilterValues({})
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingService) {
      setServices(services.map((service) => (service.id === editingService.id ? { ...service, ...formData } : service)))
    } else {
      const newService: Service = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setServices([...services, newService])
    }

    setShowModal(false)
    setEditingService(null)
    setFormData({ name: "", description: "", price: 0, status: "active" })
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      status: service.status,
    })
    setShowModal(true)
  }

  const handleDelete = (id: string) => {
    const service = services.find((s) => s.id === id)
    if (service) {
      setDeleteModal({
        isOpen: true,
        serviceId: id,
        serviceName: service.name,
      })
    }
  }

  const confirmDelete = () => {
    setServices(services.filter((service) => service.id !== deleteModal.serviceId))
    setDeleteModal({ isOpen: false, serviceId: "", serviceName: "" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Xizmatlar</h2>
          <p className="text-gray-600">Tizim xizmatlarini boshqarish</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Yangi xizmat
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Xizmatlarni qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <FilterPanel
          filters={serviceFilters}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={handleFilterReset}
        />
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{filteredServices.length} ta xizmat topildi</span>
        {Object.keys(filterValues).length > 0 && <span>Filterlar faol: {Object.keys(filterValues).length}</span>}
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Xizmat nomi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tavsif</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Narx</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holat</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sana</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredServices.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{service.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 max-w-xs truncate">{service.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{service.price.toLocaleString()} so'm</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      service.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {service.status === "active" ? "Faol" : "Nofaol"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleEdit(service)} className="text-blue-600 hover:text-blue-900 p-1">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(service.id)} className="text-red-600 hover:text-red-900 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-500">Hech qanday xizmat topilmadi</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingService ? "Xizmatni tahrirlash" : "Yangi xizmat qo'shish"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Xizmat nomi</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tavsif</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Narx (so'm)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
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
                    setEditingService(null)
                    setFormData({ name: "", description: "", price: 0, status: "active" })
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingService ? "Yangilash" : "Qo'shish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, serviceId: "", serviceName: "" })}
        onConfirm={confirmDelete}
        title="Xizmatni o'chirish"
        message={`"${deleteModal.serviceName}" xizmatini o'chirmoqchimisiz? Bu amalni bekor qilib bo'lmaydi.`}
        confirmText="Ha, o'chirish"
        cancelText="Bekor qilish"
        type="danger"
      />
    </div>
  )
}
