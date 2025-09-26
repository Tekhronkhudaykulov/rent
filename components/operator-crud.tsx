"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Plus, Edit, Trash2, Search, Phone, Mail } from "lucide-react"
import { ConfirmModal } from "./confirm-modal"
import { FilterPanel } from "./filter-panel"

interface Operator {
  id: string
  name: string
  email: string
  phone: string
  region: string
  status: "active" | "inactive"
  createdAt: string
}

const mockOperators: Operator[] = [
  {
    id: "1",
    name: "Alisher Karimov",
    email: "alisher@example.com",
    phone: "+998901234567",
    region: "Toshkent",
    status: "active",
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    name: "Malika Tosheva",
    email: "malika@example.com",
    phone: "+998907654321",
    region: "Samarqand",
    status: "active",
    createdAt: "2025-01-14",
  },
  {
    id: "3",
    name: "Bobur Rahimov",
    email: "bobur@example.com",
    phone: "+998909876543",
    region: "Buxoro",
    status: "inactive",
    createdAt: "2025-01-13",
  },
  {
    id: "4",
    name: "Dilnoza Abdullayeva",
    email: "dilnoza@example.com",
    phone: "+998905555555",
    region: "Toshkent",
    status: "active",
    createdAt: "2025-01-12",
  },
  {
    id: "5",
    name: "Jasur Tursunov",
    email: "jasur@example.com",
    phone: "+998906666666",
    region: "Farg'ona",
    status: "inactive",
    createdAt: "2025-01-11",
  },
]

const operatorFilters = [
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
    id: "regions",
    label: "Hududlar",
    type: "multiselect" as const,
    options: [
      { value: "Toshkent", label: "Toshkent" },
      { value: "Samarqand", label: "Samarqand" },
      { value: "Buxoro", label: "Buxoro" },
      { value: "Farg'ona", label: "Farg'ona" },
      { value: "Andijon", label: "Andijon" },
      { value: "Namangan", label: "Namangan" },
    ],
  },
  {
    id: "dateRange",
    label: "Qo'shilgan sana",
    type: "date" as const,
  },
]

export const OperatorCRUD = () => {
  const [operators, setOperators] = useState<Operator[]>(mockOperators)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterValues, setFilterValues] = useState<Record<string, any>>({})
  const [showModal, setShowModal] = useState(false)
  const [editingOperator, setEditingOperator] = useState<Operator | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    region: "",
    status: "active" as const,
  })

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    operatorId: string
    operatorName: string
  }>({
    isOpen: false,
    operatorId: "",
    operatorName: "",
  })

  const filteredOperators = useMemo(() => {
    let filtered = operators.filter(
      (operator) =>
        operator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        operator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        operator.region.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Status filter
    if (filterValues.status) {
      filtered = filtered.filter((operator) => operator.status === filterValues.status)
    }

    // Regions filter
    if (filterValues.regions && filterValues.regions.length > 0) {
      filtered = filtered.filter((operator) => filterValues.regions.includes(operator.region))
    }

    // Date range filter
    if (filterValues.dateRange?.from || filterValues.dateRange?.to) {
      const fromDate = filterValues.dateRange?.from ? new Date(filterValues.dateRange.from) : new Date(0)
      const toDate = filterValues.dateRange?.to ? new Date(filterValues.dateRange.to) : new Date()
      filtered = filtered.filter((operator) => {
        const operatorDate = new Date(operator.createdAt)
        return operatorDate >= fromDate && operatorDate <= toDate
      })
    }

    return filtered
  }, [operators, searchTerm, filterValues])

  const handleFilterChange = (filterId: string, value: any) => {
    setFilterValues((prev) => ({ ...prev, [filterId]: value }))
  }

  const handleFilterReset = () => {
    setFilterValues({})
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingOperator) {
      setOperators(
        operators.map((operator) => (operator.id === editingOperator.id ? { ...operator, ...formData } : operator)),
      )
    } else {
      const newOperator: Operator = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setOperators([...operators, newOperator])
    }

    setShowModal(false)
    setEditingOperator(null)
    setFormData({ name: "", email: "", phone: "", region: "", status: "active" })
  }

  const handleEdit = (operator: Operator) => {
    setEditingOperator(operator)
    setFormData({
      name: operator.name,
      email: operator.email,
      phone: operator.phone,
      region: operator.region,
      status: operator.status,
    })
    setShowModal(true)
  }

  const handleDelete = (id: string) => {
    const operator = operators.find((o) => o.id === id)
    if (operator) {
      setDeleteModal({
        isOpen: true,
        operatorId: id,
        operatorName: operator.name,
      })
    }
  }

  const confirmDelete = () => {
    setOperators(operators.filter((operator) => operator.id !== deleteModal.operatorId))
    setDeleteModal({ isOpen: false, operatorId: "", operatorName: "" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Operatorlar</h2>
          <p className="text-gray-600">Tizim operatorlarini boshqarish</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Yangi operator
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Operatorlarni qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <FilterPanel
          filters={operatorFilters}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={handleFilterReset}
        />
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{filteredOperators.length} ta operator topildi</span>
        {Object.keys(filterValues).length > 0 && <span>Filterlar faol: {Object.keys(filterValues).length}</span>}
      </div>

      {/* Operators Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Operator
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aloqa</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hudud</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holat</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sana</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOperators.map((operator) => (
              <tr key={operator.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">
                        {operator.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{operator.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail className="w-4 h-4 mr-2" />
                      {operator.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="w-4 h-4 mr-2" />
                      {operator.phone}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{operator.region}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      operator.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {operator.status === "active" ? "Faol" : "Nofaol"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{operator.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleEdit(operator)} className="text-blue-600 hover:text-blue-900 p-1">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(operator.id)} className="text-red-600 hover:text-red-900 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOperators.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-500">Hech qanday operator topilmadi</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingOperator ? "Operatorni tahrirlash" : "Yangi operator qo'shish"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To'liq ism</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hudud</label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
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
                    setEditingOperator(null)
                    setFormData({ name: "", email: "", phone: "", region: "", status: "active" })
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingOperator ? "Yangilash" : "Qo'shish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, operatorId: "", operatorName: "" })}
        onConfirm={confirmDelete}
        title="Operatorni o'chirish"
        message={`"${deleteModal.operatorName}" operatorini o'chirmoqchimisiz? Bu amalni bekor qilib bo'lmaydi.`}
        confirmText="Ha, o'chirish"
        cancelText="Bekor qilish"
        type="danger"
      />
    </div>
  )
}
