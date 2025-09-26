"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const IdentificationInterface = () => {
  const [selectedMethod, setSelectedMethod] = useState<"face" | "fingerprint" | null>(null)
  const router = useRouter()

  const handleNext = () => {
    if (selectedMethod) {
      router.push("/identification/success")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="flex min-h-[700px]">
          {/* Left Side - Government Branding */}
          <div className="flex-1 relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-8 flex flex-col items-center justify-center">
            {/* Network Pattern Background */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                <defs>
                  <pattern id="network-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                    <circle cx="40" cy="40" r="2" fill="currentColor" />
                    <circle cx="0" cy="0" r="1" fill="currentColor" />
                    <circle cx="80" cy="0" r="1" fill="currentColor" />
                    <circle cx="0" cy="80" r="1" fill="currentColor" />
                    <circle cx="80" cy="80" r="1" fill="currentColor" />
                    <line x1="40" y1="40" x2="0" y2="0" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
                    <line x1="40" y1="40" x2="80" y2="0" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
                    <line x1="40" y1="40" x2="0" y2="80" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
                    <line x1="40" y1="40" x2="80" y2="80" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#network-pattern)" className="text-purple-300" />
              </svg>
            </div>

            {/* Government Emblem */}
            <div className="relative z-10 mb-8">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 p-4 shadow-2xl flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 flex items-center justify-center relative overflow-hidden">
                  {/* Emblem Design */}
                  <div className="absolute inset-4 rounded-full border-4 border-yellow-400 flex items-center justify-center">
                    <div className="text-center text-yellow-400">
                      <div className="text-xs font-bold mb-1 tracking-wider">O'ZBEKISTON RESPUBLIKASI</div>
                      <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full"></div>
                        </div>
                      </div>
                      <div className="text-xs font-bold tracking-wider">ICHKI ISHLAR VAZIRLIGI</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Government Text */}
            <div className="text-center text-white relative z-10">
              <h1 className="text-2xl font-bold mb-2 tracking-wide">YAGONA AXBOROT - RESURS</h1>
              <h2 className="text-xl font-semibold text-yellow-400 tracking-wider">MAKONI</h2>
            </div>
          </div>

          {/* Right Side - Identification Selection */}
          <div className="flex-1 p-12 flex flex-col">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-12">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                  1
                </div>
                <div className="w-16 h-0.5 bg-gray-300"></div>
                <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Identifikatsiya turini tanlang</h2>
            </div>

            {/* Identification Options */}
            <div className="flex-1 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-8 w-full max-w-md">
                {/* Face ID Option */}
                <div
                  onClick={() => setSelectedMethod("face")}
                  className={`cursor-pointer p-8 rounded-2xl border-2 transition-all duration-200 hover:shadow-lg ${
                    selectedMethod === "face"
                      ? "border-blue-600 bg-blue-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-blue-300"
                  }`}
                >
                  <div className="text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                        selectedMethod === "face" ? "bg-blue-600" : "bg-blue-100"
                      }`}
                    >
                      <svg
                        className={`w-8 h-8 ${selectedMethod === "face" ? "text-white" : "text-blue-600"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                    <h3 className={`font-semibold ${selectedMethod === "face" ? "text-blue-600" : "text-gray-700"}`}>
                      Face ID
                    </h3>
                  </div>
                </div>

                {/* Fingerprint Option */}
                <div
                  onClick={() => setSelectedMethod("fingerprint")}
                  className={`cursor-pointer p-8 rounded-2xl border-2 transition-all duration-200 hover:shadow-lg ${
                    selectedMethod === "fingerprint"
                      ? "border-blue-600 bg-blue-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-blue-300"
                  }`}
                >
                  <div className="text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                        selectedMethod === "fingerprint" ? "bg-blue-600" : "bg-gray-100"
                      }`}
                    >
                      <svg
                        className={`w-8 h-8 ${selectedMethod === "fingerprint" ? "text-white" : "text-gray-400"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"
                        />
                      </svg>
                    </div>
                    <h3
                      className={`font-semibold ${selectedMethod === "fingerprint" ? "text-blue-600" : "text-gray-400"}`}
                    >
                      Fingerprint scan
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <div className="mt-12">
              <Button
                onClick={handleNext}
                disabled={!selectedMethod}
                className={`w-full py-4 text-lg font-medium rounded-lg transition-all duration-200 ${
                  selectedMethod
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Keyingisi
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IdentificationInterface
