"use client"

import { useState } from "react"
import { Calculator } from "lucide-react"
import CommissionModal from "./commission-modal"

const PaymentPageWithModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Sample data - replace with your actual data
  const responseData = {
    vendor: {
      logo: "/placeholder.svg?height=88&width=88&text=Logo",
      name: "Jarima to'lovi xizmati",
    },
    vendor_info: [
      { label: "Xizmat nomi", value: "Jarima to'lovi" },
      { label: "Summa", value: "340,000 so'm" },
      { label: "Muddat", value: "30 kun" },
      { label: "Status", value: "Faol" },
    ],
    commission_info: {
      commission_amount: 15000,
      total_amount: 355000,
    },
  }

  const handleCashPayment = () => {
    console.log("Cash payment selected")
    setIsModalOpen(false)
    // Add your navigation logic here
    // navigate(APP_ROUTES.PAYMENT_OF_FINE)
  }

  const handleCardPayment = () => {
    console.log("Card payment selected")
    setIsModalOpen(false)
    // Add your navigation logic here
    // navigate(APP_ROUTES.PAY_TO_CARD)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center">
          <Calculator className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">To'lov tizimi</h1>
          <p className="text-gray-600 mb-6">Komissiya ma'lumotlarini ko'rish va to'lov usulini tanlash</p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 w-full"
          >
            To'lov ma'lumotlarini ko'rish
          </button>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Tezkor ma'lumot:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>Asosiy summa:</span>
                <span>340,000 so'm</span>
              </div>
              <div className="flex justify-between">
                <span>Komissiya:</span>
                <span className="text-red-600">+15,000 so'm</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-800 border-t pt-1">
                <span>Jami:</span>
                <span>355,000 so'm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CommissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        responseData={responseData}
        onCashPayment={handleCashPayment}
        onCardPayment={handleCardPayment}
        cashIcon="/placeholder.svg?height=80&width=80&text=💵"
        cardIcon="/placeholder.svg?height=80&width=80&text=💳"
      />
    </div>
  )
}

export default PaymentPageWithModal
