"use client"

import EsimCompatibilityCheck from "./esim-compatibility-check"

const EsimShowcase = () => {
  return (
    <div className="min-h-screen">
      <EsimCompatibilityCheck />

      {/* Additional Information Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-center mb-8">Дополнительная информация об eSIM</h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl">
              <h4 className="font-semibold text-lg mb-3 text-blue-900">Что такое eSIM?</h4>
              <p className="text-blue-800 leading-relaxed">
                eSIM (embedded SIM) — это встроенная SIM-карта, которая позволяет активировать тарифный план без
                использования физической SIM-карты.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <h4 className="font-semibold text-lg mb-3 text-green-900">Преимущества eSIM</h4>
              <ul className="text-green-800 space-y-2">
                <li>• Быстрая активация</li>
                <li>• Несколько номеров на одном устройстве</li>
                <li>• Удобство при путешествиях</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EsimShowcase
