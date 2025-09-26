"use client"

import { useState } from "react"
import DetailsButton from "./details-button"

export default function ButtonShowcase() {
  const [clickCount, setClickCount] = useState(0)

  const handleClick = () => {
    setClickCount((prev) => prev + 1)
    console.log("Details button clicked!")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Details Button Component</h1>
          <p className="text-xl text-gray-600">Кнопка "Подробнее" с флагами стран</p>
        </div>

        {/* Main Example */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Основной пример</h2>
          <div className="flex justify-center">
            <DetailsButton onClick={handleClick} />
          </div>
          <p className="text-center text-gray-600 mt-4">Нажато раз: {clickCount}</p>
        </div>

        {/* Different Variants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Азиатские страны</h3>
            <DetailsButton
              flags={["🇯🇵", "🇰🇷", "🇨🇳", "🇹🇭", "🇻🇳"]}
              text="Подробнее"
              onClick={() => console.log("Asian countries clicked")}
            />
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Европейские страны</h3>
            <DetailsButton
              flags={["🇩🇪", "🇫🇷", "🇮🇹", "🇪🇸", "🇬🇧"]}
              text="Подробнее"
              onClick={() => console.log("European countries clicked")}
            />
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Американские страны</h3>
            <DetailsButton
              flags={["🇺🇸", "🇨🇦", "🇲🇽", "🇧🇷", "🇦🇷"]}
              text="Подробнее"
              onClick={() => console.log("American countries clicked")}
            />
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Африканские страны</h3>
            <DetailsButton
              flags={["🇿🇦", "🇳🇬", "🇪🇬", "🇰🇪", "🇲🇦"]}
              text="Подробнее"
              onClick={() => console.log("African countries clicked")}
            />
          </div>
        </div>

        {/* Custom Text Examples */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Разные тексты</h2>
          <div className="space-y-4">
            <div className="flex justify-center">
              <DetailsButton
                flags={["🇺🇿", "🇰🇿", "🇰🇬"]}
                text="Узнать больше"
                onClick={() => console.log("Learn more clicked")}
              />
            </div>
            <div className="flex justify-center">
              <DetailsButton
                flags={["🇷🇺", "🇺🇦", "🇧🇾"]}
                text="Показать детали"
                onClick={() => console.log("Show details clicked")}
              />
            </div>
            <div className="flex justify-center">
              <DetailsButton
                flags={["🇹🇷", "🇬🇪", "🇦🇿"]}
                text="Смотреть все"
                onClick={() => console.log("View all clicked")}
              />
            </div>
          </div>
        </div>

        {/* Usage Example */}
        <div className="bg-gray-900 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-semibold mb-4">Пример использования</h2>
          <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto text-sm">
            <code>{`import DetailsButton from './components/details-button'

function MyComponent() {
  return (
    <DetailsButton
      flags={["🇺🇿", "🇰🇿", "🇰🇬", "🇹🇯", "🇨🇳"]}
      text="Подробнее"
      onClick={() => console.log('Button clicked!')}
    />
  )
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
