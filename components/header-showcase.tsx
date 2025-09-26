"use client"

import { useState } from "react"
import PlanHeader from "./plan-header"

export default function HeaderShowcase() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const plans = [
    { name: "Эконом", id: "economy" },
    { name: "Стандарт", id: "standard" },
    { name: "Премиум", id: "premium" },
    { name: "Безлимит", id: "unlimited" },
  ]

  const handleAddClick = (planName: string) => {
    setSelectedPlan(planName)
    console.log(`Added plan: ${planName}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Plan Headers Showcase</h1>

        <div className="grid gap-8 md:grid-cols-2">
          {plans.map((plan) => (
            <div key={plan.id} className="space-y-4">
              <PlanHeader
                planName={plan.name}
                onAddClick={() => handleAddClick(plan.name)}
                className={selectedPlan === plan.name ? "ring-4 ring-green-300 rounded-2xl" : ""}
              />

              {selectedPlan === plan.name && (
                <div className="text-center text-green-600 font-medium">✓ {plan.name} план добавлен!</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Использование компонента</h2>
          <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm">
            <pre>{`<PlanHeader
  planName="Эконом"
  onAddClick={() => console.log('Plan added!')}
  className="custom-class"
/>`}</pre>
          </div>

          <div className="mt-6 space-y-3">
            <h3 className="text-lg font-semibold text-gray-700">Props:</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">planName</code> - Название тарифного плана
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">onAddClick</code> - Функция обратного вызова при клике
                на +
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">className</code> - Дополнительные CSS классы
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
