"use client"

import type React from "react"
import InstructionCard from "./instruction-card"

const InstructionShowcase: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Instruction Card Component</h1>
          <p className="text-xl text-gray-600">eSIM проверка инструкции для устройств</p>
        </div>

        {/* Main instruction card */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Основная инструкция</h2>
          <InstructionCard />
        </div>

        {/* Multiple cards example */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Несколько карточек</h2>
          <div className="grid gap-8">
            <InstructionCard className="shadow-lg" />
            <InstructionCard className="shadow-md border-blue-200" />
          </div>
        </div>

        {/* Usage example */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Использование компонента</h2>
          <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm">
            <pre>{`<InstructionCard className="shadow-lg" />`}</pre>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Особенности:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Точное соответствие дизайну из изображения</li>
              <li>Интерактивная ссылка "Телефон" с hover эффектом</li>
              <li>Выделенный код *#06# моноширинным шрифтом</li>
              <li>Зеленый текст для EID и Embedded Identity Document</li>
              <li>Правильные отступы и типографика</li>
              <li>Responsive дизайн</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstructionShowcase
