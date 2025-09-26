"use client"

import { useState } from "react"
import MobilePlanCard from "./mobile-plan-card"

export default function MobilePlansShowcase() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const plans = [
    {
      id: "economy",
      planName: "Эконом",
      traffic: "20 000мб",
      validity: "30 дней",
      network: "4G, 5G",
      coverageFlags: ["🇺🇿", "🇰🇿", "🇰🇬", "🇹🇯", "🇨🇳"],
    },
    {
      id: "standard",
      planName: "Стандарт",
      traffic: "50 000мб",
      validity: "30 дней",
      network: "4G, 5G",
      coverageFlags: ["🇺🇿", "🇰🇿", "🇰🇬", "🇹🇯", "🇨🇳", "🇷🇺"],
    },
    {
      id: "premium",
      planName: "Премиум",
      traffic: "100 000мб",
      validity: "30 дней",
      network: "4G, 5G",
      coverageFlags: ["🇺🇿", "🇰🇿", "🇰🇬", "🇹🇯", "🇨🇳", "🇷🇺", "🇹🇷"],
    },
  ]

  const handleAddPlan = (planId: string) => {
    setSelectedPlan(planId)
    console.log(`Added plan: ${planId}`)
  }

  const handleMoreDetails = (planId: string) => {
    console.log(`More details for plan: ${planId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Мобильные тарифы</h1>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
          {plans.map((plan) => (
            <div key={plan.id} className="relative">
              <MobilePlanCard
                planName={plan.planName}
                traffic={plan.traffic}
                validity={plan.validity}
                network={plan.network}
                coverageFlags={plan.coverageFlags}
                onAddPlan={() => handleAddPlan(plan.id)}
                onMoreDetails={() => handleMoreDetails(plan.id)}
                className={selectedPlan === plan.id ? "ring-4 ring-green-500" : ""}
              />
              {selectedPlan === plan.id && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Выбран
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedPlan && (
          <div className="mt-12 p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Выбранный тариф:</h3>
            <p className="text-gray-600">Вы выбрали тариф: {plans.find((p) => p.id === selectedPlan)?.planName}</p>
            <button
              onClick={() => setSelectedPlan(null)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
            >
              Отменить выбор
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
