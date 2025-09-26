"use client"

import { useState } from "react"
import RegionNavigation from "./region-navigation"

export default function NavigationShowcase() {
  const [activeRegion, setActiveRegion] = useState("top")

  const getRegionContent = (region: string) => {
    const content = {
      global: "Глобальные направления - популярные маршруты по всему миру",
      top: "Топ направлений - самые популярные туристические места",
      america: "Америка - США, Канада, Мексика и страны Южной Америки",
      europe: "Европа - Франция, Италия, Германия и другие европейские страны",
      asia: "Азия - Япония, Китай, Таиланд и другие азиатские направления",
      africa: "Африка - Египет, Марокко, ЮАР и другие африканские страны",
      oceania: "Океания - Австралия, Новая Зеландия и острова Тихого океана",
    }
    return content[region as keyof typeof content] || "Выберите регион"
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Навигация по регионам</h1>
          <p className="text-gray-600">Выберите регион для просмотра популярных направлений</p>
        </div>

        {/* Navigation Component */}
        <RegionNavigation activeTab={activeRegion} onTabChange={setActiveRegion} className="mb-8" />

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {activeRegion === "global" && "🌍 Глобальные направления"}
            {activeRegion === "top" && "🔥 Топ направлений"}
            {activeRegion === "america" && "🗽 Америка"}
            {activeRegion === "europe" && "🏛️ Европа"}
            {activeRegion === "asia" && "🥟 Азия"}
            {activeRegion === "africa" && "🌴 Африка"}
            {activeRegion === "oceania" && "🏔️ Океания"}
          </h2>
          <p className="text-gray-600 text-lg">{getRegionContent(activeRegion)}</p>

          {/* Sample destinations */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-50 rounded-lg p-4">
                <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Изображение {item}</span>
                </div>
                <h3 className="font-semibold text-gray-800">Направление {item}</h3>
                <p className="text-gray-600 text-sm">Описание популярного места</p>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Example */}
        <div className="mt-8 bg-gray-900 text-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Пример использования:</h3>
          <pre className="text-sm text-green-400 overflow-x-auto">
            {`<RegionNavigation
  activeTab="top"
  onTabChange={(tabId) => console.log('Selected:', tabId)}
  className="mb-4"
/>`}
          </pre>
        </div>
      </div>
    </div>
  )
}
