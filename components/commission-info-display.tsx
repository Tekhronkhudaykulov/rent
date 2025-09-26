"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, Banknote, Info, Calculator } from "lucide-react"

interface CommissionInfo {
  commission_amount: number
  total_amount: number
}

interface VendorInfo {
  label: string
  value: string | number
}

interface CommissionDisplayProps {
  responseData?: {
    vendor_info?: VendorInfo[]
    commission_info?: CommissionInfo
  }
  onCashPayment: () => void
  onCardPayment: () => void
}

const CommissionInfoDisplay = ({ responseData, onCashPayment, onCardPayment }: CommissionDisplayProps) => {
  const [selectedPaymentType, setSelectedPaymentType] = useState<string | null>(null)

  const animatedProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2 },
  }

  const animatedCardStyle = `
    bg-gradient-to-br from-blue-50 to-blue-100 
    border-2 border-blue-200 
    rounded-xl p-6 
    cursor-pointer 
    hover:shadow-lg 
    transition-all duration-300 
    flex flex-col items-center justify-center 
    min-h-[140px]
    hover:border-blue-400
  `

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">To'lov ma'lumotlari</h1>
          <p className="text-gray-600">Xizmat haqida batafsil ma'lumot va to'lov turini tanlang</p>
        </div>

        <div className="grid grid-cols-[60%_1fr] gap-[20px] mt-[10px]">
          {/* Vendor Information */}
          <div className="flex flex-col gap-[20px] bg-white p-[15px] rounded-[12px] shadow-lg">
            <div className="flex items-center mb-4">
              <Info className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Xizmat ma'lumotlari</h2>
            </div>

            {responseData?.vendor_info?.map((item: VendorInfo, ind: number) => (
              <div key={ind} className="flex items-center py-2 border-b border-gray-100 last:border-b-0">
                <div className="text-[18px] font-[500] text-gray-700 flex-1">{item.label}</div>
                <div className="text-[18px] font-semibold text-gray-900 text-right">{item.value}</div>
              </div>
            ))}

            {/* Commission Information */}
            {responseData?.commission_info && (
              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <div className="flex items-center mb-3">
                  <Calculator className="w-5 h-5 text-orange-600 mr-2" />
                  <h3 className="text-lg font-semibold text-orange-800">Komissiya ma'lumotlari</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Asosiy summa:</span>
                    <span className="text-lg font-bold text-gray-900">
                      {formatAmount(
                        responseData.commission_info.total_amount - responseData.commission_info.commission_amount,
                      )}{" "}
                      so'm
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-orange-700 font-medium">Komissiya:</span>
                    <span className="text-lg font-bold text-orange-600">
                      +{formatAmount(responseData.commission_info.commission_amount)} so'm
                    </span>
                  </div>

                  <div className="border-t border-orange-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-800">Jami to'lov:</span>
                      <span className="text-2xl font-bold text-green-600">
                        {formatAmount(responseData.commission_info.total_amount)} so'm
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Payment Methods */}
          <div className="flex flex-col gap-y-[20px] items-center">
            <div className="text-center mb-4">
              <h3 className="text-[20px] font-semibold text-gray-800 mb-2">To'lov turini tanlang:</h3>
              <p className="text-gray-600 text-sm">Sizga qulay bo'lgan to'lov usulini tanlang</p>
            </div>

            {/* Cash Payment */}
            <motion.div
              {...animatedProps}
              onClick={() => {
                setSelectedPaymentType("cash")
                onCashPayment()
              }}
              className={`${animatedCardStyle} ${
                selectedPaymentType === "cash" ? "border-green-400 bg-gradient-to-br from-green-50 to-green-100" : ""
              }`}
            >
              <Banknote className="w-12 h-12 text-green-600 mb-3" />
              <p className="text-[22px] font-semibold text-gray-800 mb-1">Наличными</p>
              <p className="text-sm text-gray-600 text-center">Naqd pul bilan to'lash</p>
            </motion.div>

            {/* Card Payment */}
            <motion.div
              {...animatedProps}
              onClick={() => {
                setSelectedPaymentType("card")
                onCardPayment()
              }}
              className={`${animatedCardStyle} ${
                selectedPaymentType === "card" ? "border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100" : ""
              }`}
            >
              <CreditCard className="w-12 h-12 text-blue-600 mb-3" />
              <p className="text-[22px] font-semibold text-gray-800 mb-1">Банковской картой</p>
              <p className="text-sm text-gray-600 text-center">Bank kartasi bilan to'lash</p>
            </motion.div>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 max-w-sm">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Eslatma:</p>
                  <p>
                    Komissiya miqdori to'lov turiga qarab o'zgarishi mumkin. Aniq summa keyingi bosqichda ko'rsatiladi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommissionInfoDisplay
