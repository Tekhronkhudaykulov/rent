"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Calculator, Info } from "lucide-react"

interface CommissionInfo {
  commission_amount: number
  total_amount: number
}

interface VendorInfo {
  label: string
  value: string | number
}

interface Vendor {
  logo: string
  name: string
}

interface CommissionModalProps {
  isOpen: boolean
  onClose: () => void
  responseData?: {
    vendor?: Vendor
    vendor_info?: VendorInfo[]
    commission_info?: CommissionInfo
  }
  onCashPayment: () => void
  onCardPayment: () => void
  cashIcon?: string
  cardIcon?: string
}

const CommissionModal = ({
  isOpen,
  onClose,
  responseData,
  onCashPayment,
  onCardPayment,
  cashIcon = "/placeholder.svg?height=80&width=80&text=Cash",
  cardIcon = "/placeholder.svg?height=80&width=80&text=Card",
}: CommissionModalProps) => {
  const animatedCardStyle =
    "flex flex-col justify-center items-center h-full bg-white rounded-[12px] cursor-pointer p-5 w-full shadow-md"

  const animatedProps = {
    animate: {
      y: [0, -8, 0],
      boxShadow: [
        "0px 0px 8px rgba(0, 0, 255, 0.3)",
        "0px 5px 18px rgba(0, 0, 255, 0.6)",
        "0px 0px 8px rgba(0, 0, 255, 0.3)",
      ],
    },
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const calculateBaseAmount = () => {
    if (!responseData?.commission_info) return 0
    return responseData.commission_info.total_amount - responseData.commission_info.commission_amount
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-[#F4F4F4] p-[25px] rounded-[35px] max-w-5xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full transition-colors z-10"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              <div>
                <p className="text-[36px] mb-4">Выберите способ оплаты:</p>
              </div>

              {/* Vendor Info */}
              {responseData?.vendor && (
                <div className="bg-white flex justify-between items-center mt-[20px] p-[15px] rounded-[12px]">
                  <img
                    src={responseData.vendor.logo || "/placeholder.svg"}
                    className="min-w-[88px] w-[88px] h-[88px] rounded-full object-contain"
                    alt={responseData.vendor.name}
                  />
                  <div className="text-[25px] font-bold">{responseData.vendor.name}</div>
                </div>
              )}

              <div className="grid grid-cols-[60%_1fr] gap-[20px] mt-[10px]">
                {/* Left Side - Vendor Info and Commission */}
                <div className="flex flex-col gap-[20px]">
                  {/* Vendor Information */}
                  <div className="bg-white p-[15px] rounded-[12px]">
                    <div className="flex items-center mb-3">
                      <Info className="w-5 h-5 text-blue-600 mr-2" />
                      <h3 className="text-[20px] font-semibold text-gray-800">Xizmat ma'lumotlari</h3>
                    </div>

                    {responseData?.vendor_info?.map((item: VendorInfo, ind: number) => (
                      <div key={ind} className="flex items-center py-1">
                        <div className="text-[22px] font-[500]">{item.label}</div>
                        <div className="text-[22px] ml-auto text-right">{item.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Commission Information */}
                  {responseData?.commission_info && (
                    <div className="bg-gradient-to-r w-full from-red-50 to-red-100 p-[15px] rounded-[12px] border-2 border-red-300">
                      <div className="flex items-center mb-3">
                        <Calculator className="w-6 h-6 text-red-600 mr-2" />
                        <h3 className="text-[20px] font-semibold text-red-800">Komissiya hisob-kitobi</h3>
                      </div>

                      <div className="space-y-3">
                        {/* Base Amount */}
                        <div className="flex items-center">
                          <div className="text-[18px] font-[500] text-gray-700">Asosiy summa:</div>
                          <div className="text-[18px] font-bold text-gray-900 ml-auto text-right">
                            {formatAmount(calculateBaseAmount())} so'm
                          </div>
                        </div>

                        {/* Commission */}
                        <div className="flex items-center">
                          <div className="text-[18px] font-[500] text-red-700">Komissiya (+):</div>
                          <div className="text-[18px] font-bold text-red-600 ml-auto text-right">
                            {formatAmount(responseData.commission_info.commission_amount)} so'm
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t-2 border-red-300 my-2"></div>

                        {/* Total Amount */}
                        <div className="flex items-center bg-white/70 p-3 rounded-lg">
                          <div className="text-[22px] font-bold text-gray-800">Jami to'lov:</div>
                          <div className="text-[24px] font-bold text-green-600 ml-auto text-right">
                            {formatAmount(responseData.commission_info.total_amount)} so'm
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side - Payment Methods */}
                <div className="flex flex-col gap-y-[20px] items-center">
                  {/* Cash Payment */}
                  <motion.div {...animatedProps} onClick={onCashPayment} className={animatedCardStyle}>
                    <p className="text-[25px] mb-2">Наличными</p>
                    <img src={cashIcon || "/placeholder.svg"} alt="Наличными" className="w-[80px] h-[80px]" />
                  </motion.div>

                  {/* Card Payment */}
                  <motion.div {...animatedProps} onClick={onCardPayment} className={animatedCardStyle}>
                    <p className="text-[25px] mb-2">Банковской картой</p>
                    <img src={cardIcon || "/placeholder.svg"} alt="Банковской картой" className="w-[80px] h-[80px]" />
                  </motion.div>

                  {/* Info Note */}
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 text-center max-w-[200px]">
                    <div className="flex items-center justify-center mb-1">
                      <Info className="w-4 h-4 text-blue-600 mr-1" />
                      <span className="text-sm font-medium text-blue-800">Eslatma</span>
                    </div>
                    <p className="text-xs text-blue-700">Komissiya miqdori to'lov turiga qarab o'zgarishi mumkin</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CommissionModal
