"use client"

import { useState } from "react"
import { BranchSelector } from "./branch-selector"
import type { Branch } from "../types/branch.types"

// Mock data based on your provided structure
const mockBranches: Branch[] = [
  {
    id: 1,
    region: "АНДИЖОН ВИЛОЯТИ",
    city: "АНДИЖОН ШАХРИ",
    address: "Navoi ko'chasi, 15-uy",
    name: "Andijon Markaziy Filiali",
    phone: "937561302",
    working_hours: [
      { day: "понедельник", time: "09:00–19:00" },
      { day: "вторник", time: "09:00–19:00" },
      { day: "среда", time: "09:00–19:00" },
      { day: "четверг", time: "09:00–19:00" },
      { day: "пятница", time: "09:00–19:00" },
      { day: "суббота", time: "Закрыто" },
      { day: "воскресенье", time: "Закрыто" },
    ],
    latitude: "41.317031",
    longitude: "69.24959",
  },
  {
    id: 2,
    region: "ТОШКЕНТ ШАХРИ",
    city: "ТОШКЕНТ",
    address: "Amir Temur shoh ko'chasi, 108",
    name: "Toshkent Markaziy Filiali",
    phone: "712345678",
    working_hours: [
      { day: "понедельник", time: "08:00–20:00" },
      { day: "вторник", time: "08:00–20:00" },
      { day: "среда", time: "08:00–20:00" },
      { day: "четверг", time: "08:00–20:00" },
      { day: "пятница", time: "08:00–20:00" },
      { day: "суббота", time: "09:00–18:00" },
      { day: "воскресенье", time: "Закрыто" },
    ],
    latitude: "41.311081",
    longitude: "69.240562",
  },
  {
    id: 3,
    region: "САМАРҚАНД ВИЛОЯТИ",
    city: "САМАРҚАНД ШАХРИ",
    address: "Registon ko'chasi, 25",
    name: "Samarqand Registon Filiali",
    phone: "662345678",
    working_hours: [
      { day: "понедельник", time: "09:00–18:00" },
      { day: "вторник", time: "09:00–18:00" },
      { day: "среда", time: "09:00–18:00" },
      { day: "четверг", time: "09:00–18:00" },
      { day: "пятница", time: "09:00–18:00" },
      { day: "суббота", time: "09:00–17:00" },
      { day: "воскресенье", time: "Закрыто" },
    ],
    latitude: "39.627012",
    longitude: "66.975496",
  },
]

export const BranchShowcase = () => {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleBranchSelect = (branch: Branch) => {
    setSelectedBranch(branch)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Branch Selector Component</h1>
          <p className="text-xl text-gray-600">Filiallarni tanlash uchun chiroyli komponent</p>
        </div>

        {/* Demo Controls */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Demo</h2>

          <div className="text-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-[#F06F1E] to-[#e55a0f] text-white px-8 py-4 rounded-xl hover:from-[#e55a0f] hover:to-[#d14d0a] transition-all duration-200 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Filial tanlash
            </button>
          </div>

          {/* Selected Branch Display */}
          {selectedBranch && (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <h3 className="text-lg font-bold text-green-900 mb-4">Tanlangan filial:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p>
                    <strong>Nomi:</strong> {selectedBranch.name}
                  </p>
                  <p>
                    <strong>Shahar:</strong> {selectedBranch.city}
                  </p>
                  <p>
                    <strong>Manzil:</strong> {selectedBranch.address}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Telefon:</strong> +998 {selectedBranch.phone}
                  </p>
                  <p>
                    <strong>Viloyat:</strong> {selectedBranch.region}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Komponent imkoniyatlari</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 text-xl">🔍</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Qidiruv funksiyasi</h3>
              <p className="text-sm text-gray-600">Filial nomi, shahar yoki manzil bo'yicha qidirish</p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 text-xl">🏢</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Viloyat bo'yicha filtrlash</h3>
              <p className="text-sm text-gray-600">Kerakli viloyatdagi filiallarni tanlash</p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-yellow-600 text-xl">⏰</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ish vaqti ko'rsatish</h3>
              <p className="text-sm text-gray-600">Hozirgi vaqtda ochiq yoki yopiq ekanligini ko'rsatish</p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 text-xl">📍</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Xarita integratsiyasi</h3>
              <p className="text-sm text-gray-600">Google Maps orqali yo'nalish ko'rsatish</p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-red-600 text-xl">⭐</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Reyting tizimi</h3>
              <p className="text-sm text-gray-600">Filiallar uchun yulduzcha reytingi</p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-indigo-600 text-xl">📱</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Responsive dizayn</h3>
              <p className="text-sm text-gray-600">Barcha qurilmalarda mukammal ishlaydi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Branch Selector Modal */}
      <BranchSelector
        branches={mockBranches}
        selectedBranch={selectedBranch}
        onBranchSelect={handleBranchSelect}
        onClose={handleCloseModal}
        isOpen={isModalOpen}
      />
    </div>
  )
}
