"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import CommissionModal from "./commission-modal"
import { Calculator } from "lucide-react"

// Mock data for demonstration
const mockResponseData = {
  vendor_info: [
    { label: "Xizmat nomi", value: "Jarima to'lovi" },
    { label: "Hujjat raqami", value: "AA1234567" },
    { label: "Sanasi", value: "2024-01-15" },
    { label: "Manzil", value: "Toshkent sh., Yunusobod t." },
    { label: "Jarima miqdori", value: "340,000 so'm" },
    { label: "Muddat", value: "2024-02-15 gacha" },
  ],
  commission_info: {
    commission_amount: 15000,
    total_amount: 355000,
  },
}

const PaymentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [responseData] = useState(mockResponseData)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleCashPayment = () => {
    console.log("Naqd to'lov tanlandi")
    alert("Naqd to'lov tanlandi!")
    setIsModalOpen(false)
  }

  const handleCardPayment = () => {
    console.log("Karta to'lovi tanlandi")
    alert("Karta to'lovi tanlandi!")
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">To'lov tizimi</h1>
          <p className="text-gray-600 text-lg">Xizmat uchun to'lov qilish</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Jarima to'lovi</h2>
            <p className="text-gray-600">Quyidagi tugmani bosib to'lov ma'lumotlarini ko'ring</p>
          </div>

          {/* Open Modal Button */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              To'lov ma'lumotlarini ko'rish
            </motion.button>
          </div>

          {/* Quick Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-gray-800 mb-1">Asosiy summa</h3>
              <p className="text-2xl font-bold text-blue-600">340,000 so'm</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-gray-800 mb-1">Komissiya</h3>
              <p className="text-2xl font-bold text-orange-600">15,000 so'm</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-gray-800 mb-1">Jami</h3>
              <p className="text-2xl font-bold text-green-600">355,000 so'm</p>
            </div>
          </div>
        </div>

        {/* Commission Modal */}
        <CommissionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          responseData={responseData}
          onCashPayment={handleCashPayment}
          onCardPayment={handleCardPayment}
        />
      </div>
    </div>
  )
}

export default PaymentPage
