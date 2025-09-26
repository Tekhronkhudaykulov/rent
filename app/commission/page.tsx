"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import CommissionInfoDisplay from "@/components/commission-info-display"

// Mock data for demonstration
const mockResponseData = {
  vendor_info: [
    { label: "Xizmat nomi", value: "Jarima to'lovi" },
    { label: "Hujjat raqami", value: "AA1234567" },
    { label: "Sanasi", value: "2024-01-15" },
    { label: "Manzil", value: "Toshkent sh., Yunusobod t." },
    { label: "Jarima miqdori", value: "340,000 so'm" },
  ],
  commission_info: {
    commission_amount: 15000,
    total_amount: 355000,
  },
}

export default function CommissionPage() {
  const router = useRouter()
  const [responseData] = useState(mockResponseData)

  const handleCashPayment = () => {
    console.log("Naqd to'lov tanlandi")
    // Navigate to cash payment page
    // router.push('/payment/cash')
  }

  const handleCardPayment = () => {
    console.log("Karta to'lovi tanlandi")
    // Navigate to card payment page
    // router.push('/payment/card')
  }

  return (
    <CommissionInfoDisplay
      responseData={responseData}
      onCashPayment={handleCashPayment}
      onCardPayment={handleCardPayment}
    />
  )
}
