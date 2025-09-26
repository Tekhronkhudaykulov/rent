"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, Clock, Wifi, Smartphone, AlertCircle } from "lucide-react"
import OrderInfoModal from "./order-info-modal"

interface ConfirmPageProps {
  orderData?: any
}

const ConfirmPage: React.FC<ConfirmPageProps> = ({ orderData }) => {
  const [status, setStatus] = useState("pending")
  const [isWaiting, setIsWaiting] = useState(true)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [currentOrderData, setCurrentOrderData] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Simulate WebSocket connection
    const ws = new WebSocket("wss://your-websocket-url")

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)

      if (data.type === "status_update") {
        setStatus(data.status_name)
        setIsWaiting(false)

        if (data.status_name === "активный") {
          // Show success animation for 3 seconds then redirect
          setTimeout(() => {
            router.push("/simDone")
          }, 3000)
        }
      }

      if (data.type === "order_data") {
        setCurrentOrderData(data)
        setShowOrderModal(true)
      }
    }

    // Cleanup
    return () => {
      ws.close()
    }
  }, [router])

  const getStatusIcon = () => {
    switch (status) {
      case "активный":
        return <CheckCircle className="w-16 h-16 text-green-500" />
      case "ожидание":
        return <Clock className="w-16 h-16 text-yellow-500" />
      case "error":
        return <AlertCircle className="w-16 h-16 text-red-500" />
      default:
        return <Wifi className="w-16 h-16 text-blue-500" />
    }
  }

  const getStatusMessage = () => {
    switch (status) {
      case "активный":
        return "SIM karta muvaffaqiyatli faollashtirildi!"
      case "ожидание":
        return "SIM karta faollashtirilmoqda..."
      case "error":
        return "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
      default:
        return "Jarayon boshlanmoqda..."
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border-2 border-gray-100">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Smartphone className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-2xl font-black text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SIM karta holati
            </span>
          </h1>
        </div>

        <div className="mb-8">
          <div className="flex justify-center mb-4">{getStatusIcon()}</div>

          <p className="text-lg font-semibold text-gray-700 mb-4">{getStatusMessage()}</p>

          {isWaiting && (
            <div className="flex justify-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div
                className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
          )}

          {status === "активный" && (
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-green-600 font-bold">Tayyor! SimDone sahifasiga o'tilmoqda...</p>
            </div>
          )}
        </div>

        <button
          onClick={() => setShowOrderModal(true)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Buyurtma ma'lumotlarini ko'rish
        </button>
      </div>

      <OrderInfoModal isOpen={showOrderModal} onClose={() => setShowOrderModal(false)} orderData={currentOrderData} />
    </div>
  )
}

export default ConfirmPage
