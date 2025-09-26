"use client"

import { useState } from "react"
import { Signal, Battery, Wifi } from "lucide-react"

interface EsimCompatibilityCheckProps {
  className?: string
}

const EsimCompatibilityCheck = ({ className = "" }: EsimCompatibilityCheckProps) => {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  return (
    <div className={`min-h-screen bg-gray-50 p-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Instructions */}
          <div className="space-y-6">
            <h2 className="text-2xl font-medium text-gray-900 leading-relaxed">
              Для проверки{" "}
              <button
                className="text-blue-500 hover:text-blue-600 underline transition-colors"
                onClick={() => console.log("Compatibility link clicked")}
              >
                совместимости вашего смартфона
              </button>{" "}
              с технологией eSIM выполните следующее:
            </h2>

            {/* Instruction Box */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-800 leading-relaxed">
                  Откройте приложение{" "}
                  <button
                    className="text-blue-500 hover:text-blue-600 underline transition-colors"
                    onClick={() => console.log("Phone app clicked")}
                  >
                    «Телефон»
                  </button>{" "}
                  и введите на клавиатуре комбинацию{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">*#06#</code>.
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-800 leading-relaxed">
                  На экране автоматически появится служебная информация об устройстве.
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-800 leading-relaxed">
                  Если среди отображённых данных присутствует уникальный идентификатор{" "}
                  <span className="text-green-600 font-semibold">EID</span>{" "}
                  <span className="text-green-600 font-medium">(Embedded Identity Document)</span>, это означает, что
                  ваше устройство технически поддерживает использование eSIM. В случае отсутствия номера EID функция
                  eSIM на данной модели не реализована.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-80 h-[600px] bg-gray-800 rounded-[3rem] p-3 shadow-2xl">
                {/* Screen */}
                <div className="w-full h-full bg-white rounded-[2.5rem] relative overflow-hidden">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center px-6 pt-4 pb-2">
                    <span className="text-black font-semibold text-lg">9:36</span>
                    <div className="flex items-center space-x-1">
                      <Signal className="w-4 h-4 text-black" />
                      <Wifi className="w-4 h-4 text-black" />
                      <Battery className="w-6 h-3 text-black" />
                    </div>
                  </div>

                  {/* Dynamic Island */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full"></div>

                  {/* Main Content Area */}
                  <div className="flex items-center justify-center h-full relative">
                    {/* Geometric Lines */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 500" fill="none">
                      {/* Top left lines */}
                      <line x1="50" y1="150" x2="150" y2="50" stroke="#e5e7eb" strokeWidth="1" />
                      <line x1="80" y1="150" x2="180" y2="50" stroke="#e5e7eb" strokeWidth="1" />

                      {/* Top right lines */}
                      <line x1="250" y1="150" x2="150" y2="50" stroke="#e5e7eb" strokeWidth="1" />
                      <line x1="220" y1="150" x2="120" y2="50" stroke="#e5e7eb" strokeWidth="1" />

                      {/* Bottom left lines */}
                      <line x1="50" y1="350" x2="150" y2="450" stroke="#e5e7eb" strokeWidth="1" />
                      <line x1="80" y1="350" x2="180" y2="450" stroke="#e5e7eb" strokeWidth="1" />

                      {/* Bottom right lines */}
                      <line x1="250" y1="350" x2="150" y2="450" stroke="#e5e7eb" strokeWidth="1" />
                      <line x1="220" y1="350" x2="120" y2="450" stroke="#e5e7eb" strokeWidth="1" />
                    </svg>

                    {/* VIDEO Text */}
                    <div className="text-4xl font-bold text-black tracking-wider z-10">VIDEO</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EsimCompatibilityCheck
