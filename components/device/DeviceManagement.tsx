"use client"

// Open/Closed Principle: Main component that orchestrates device management
import { useState } from "react"
import { DeviceListView } from "./DeviceListView"
import { DeviceRegionManager } from "./DeviceRegionManager"
import { DeviceForm } from "./DeviceForm"
import { ConfirmModal } from "../confirm-modal"
import { useDevices } from "@/hooks/useDevices"
import type { Device } from "@/types/device.types"

type ActiveTab = "list" | "assignment"

export function DeviceManagement() {
  const { createDevice, updateDevice, deleteDevice, devices } = useDevices() // Declare devices variable here
  const [activeTab, setActiveTab] = useState<ActiveTab>("list")
  const [showModal, setShowModal] = useState(false)
  const [editingDevice, setEditingDevice] = useState<Device | null>(null)
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    deviceId: string
    deviceName: string
  }>({
    isOpen: false,
    deviceId: "",
    deviceName: "",
  })

  const handleCreateDevice = () => {
    setEditingDevice(null)
    setShowModal(true)
  }

  const handleEditDevice = (device: Device) => {
    setEditingDevice(device)
    setShowModal(true)
  }

  const handleDeleteDevice = (id: string, name: string) => {
    setDeleteModal({
      isOpen: true,
      deviceId: id,
      deviceName: name,
    })
  }

  const handleFormSubmit = async (data: any) => {
    try {
      if (editingDevice) {
        await updateDevice(editingDevice.id, data)
      } else {
        await createDevice(data)
      }
      setShowModal(false)
      setEditingDevice(null)
    } catch (error) {
      console.error("Form submission error:", error)
    }
  }

  const handleFormCancel = () => {
    setShowModal(false)
    setEditingDevice(null)
  }

  const confirmDelete = async () => {
    try {
      await deleteDevice(deleteModal.deviceId)
      setDeleteModal({ isOpen: false, deviceId: "", deviceName: "" })
    } catch (error) {
      console.error("Delete error:", error)
    }
  }

  return (
    <div className="space-y-6">
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
            Qurilmalar ro'yxati
          </button>
          <button
            onClick={() => setActiveTab("assignment")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "assignment"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Hudud-Qurilma biriktirish
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "list" && (
        <DeviceListView
          onCreateDevice={handleCreateDevice}
          onEditDevice={handleEditDevice}
          onDeleteDevice={(id) => {
            // Find device name for confirmation
            const device = devices.find((d) => d.id === id)
            handleDeleteDevice(id, device?.name || "")
          }}
        />
      )}

      {activeTab === "assignment" && <DeviceRegionManager />}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingDevice ? "Qurilmani tahrirlash" : "Yangi qurilma qo'shish"}
            </h3>
            <DeviceForm device={editingDevice} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, deviceId: "", deviceName: "" })}
        onConfirm={confirmDelete}
        title="Qurilmani o'chirish"
        message={`"${deleteModal.deviceName}" qurilmasini o'chirmoqchimisiz? Bu amalni bekor qilib bo'lmaydi.`}
        confirmText="Ha, o'chirish"
        cancelText="Bekor qilish"
        type="danger"
      />
    </div>
  )
}
