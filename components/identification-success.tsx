"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { CheckCircle, User, Calendar, MapPin, Clock, Download, Home } from "lucide-react"

const IdentificationSuccess = () => {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const userData = {
    fullName: "Abdullayev Jasur Karimovich",
    passportSeries: "AA 1234567",
    birthDate: "15.03.1990",
    address: "Toshkent shahar, Yunusobod tumani, Abdulla Qodiriy ko'chasi, 45-uy",
    issueDate: "20.05.2020",
    expiryDate: "20.05.2030",
    issuePlace: "Toshkent shahar IIB",
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("uz-UZ", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("uz-UZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="flex min-h-[700px]">
          {/* Left Side - Success Branding */}
          <div className="flex-1 relative bg-gradient-to-br from-green-800 via-green-700 to-emerald-800 p-8 flex flex-col items-center justify-center">
            {/* Success Pattern Background */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                <defs>
                  <pattern id="success-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                    <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.6" />
                    <path d="M20 30l5 5 10-10" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#success-pattern)" className="text-green-300" />
              </svg>
            </div>

            {/* Success Icon */}
            <div className="relative z-10 mb-8">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 p-6 shadow-2xl flex items-center justify-center">
                <CheckCircle className="w-32 h-32 text-white" strokeWidth={1.5} />
              </div>
            </div>

            {/* Success Message */}
            <div className="text-center text-white relative z-10">
              <h1 className="text-3xl font-bold mb-4 tracking-wide">IDENTIFIKATSIYA</h1>
              <h2 className="text-2xl font-semibold text-green-300 tracking-wider mb-4">MUVAFFAQIYATLI</h2>
              <p className="text-green-200 text-lg">Shaxsingiz tasdiqlandi</p>
            </div>

            {/* Current Time */}
            <div className="absolute bottom-8 left-8 right-8 text-center text-green-200">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Clock className="w-5 h-5" />
                <span className="text-lg font-mono">{formatTime(currentTime)}</span>
              </div>
              <div className="text-sm opacity-80">{formatDate(currentTime)}</div>
            </div>
          </div>

          {/* Right Side - User Information */}
          <div className="flex-1 p-12 flex flex-col">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                  ✓
                </div>
                <div className="w-16 h-0.5 bg-green-600"></div>
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                  ✓
                </div>
              </div>
            </div>

            {/* User Information Card */}
            <div className="flex-1">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-200 mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mr-4">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Foydalanuvchi ma'lumotlari</h3>
                    <p className="text-green-600 font-medium">Tasdiqlangan</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-start space-x-3">
                    <User className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">F.I.Sh</p>
                      <p className="font-semibold text-gray-800">{userData.fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center mt-1 flex-shrink-0">
                      ID
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Pasport seriyasi</p>
                      <p className="font-semibold text-gray-800">{userData.passportSeries}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Tug'ilgan sana</p>
                      <p className="font-semibold text-gray-800">{userData.birthDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Manzil</p>
                      <p className="font-semibold text-gray-800">{userData.address}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-green-200">
                    <div>
                      <p className="text-sm text-gray-600">Berilgan sana</p>
                      <p className="font-semibold text-gray-800">{userData.issueDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Amal qilish muddati</p>
                      <p className="font-semibold text-gray-800">{userData.expiryDate}</p>
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Bergan organ</p>
                    <p className="font-semibold text-gray-800">{userData.issuePlace}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button
                  onClick={() => router.push("/")}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Home className="w-5 h-5" />
                  <span>Bosh sahifa</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex-1 border-green-600 text-green-600 hover:bg-green-50 py-3 text-lg font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 bg-transparent"
                >
                  <Download className="w-5 h-5" />
                  <span>Ma'lumotni yuklab olish</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IdentificationSuccess
