"use client"

import type React from "react"

interface InstructionCardProps {
  className?: string
}

const InstructionCard: React.FC<InstructionCardProps> = ({ className = "" }) => {
  return (
    <div className={`bg-white border-2 border-gray-300 rounded-2xl p-6 max-w-4xl ${className}`}>
      <div className="space-y-4">
        {/* First bullet point */}
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
          <p className="text-lg leading-relaxed">
            Откройте приложение{" "}
            <span className="text-blue-500 underline cursor-pointer hover:text-blue-600">«Телефон»</span> и введите на
            клавиатуре комбинацию <span className="font-mono font-bold">*#06#</span>.
          </p>
        </div>

        {/* Second bullet point */}
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
          <p className="text-lg leading-relaxed">
            На экране автоматически появится служебная информация об устройстве.
          </p>
        </div>

        {/* Third bullet point */}
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
          <p className="text-lg leading-relaxed">
            Если среди отображённых данных присутствует уникальный идентификатор{" "}
            <span className="text-green-600 font-semibold">EID</span>{" "}
            <span className="text-green-600 font-semibold">(Embedded Identity Document)</span>, это означает, что ваше
            устройство технически поддерживает использование eSIM. В случае отсутствия номера EID функция eSIM на данной
            модели не реализована.
          </p>
        </div>
      </div>
    </div>
  )
}

export default InstructionCard
