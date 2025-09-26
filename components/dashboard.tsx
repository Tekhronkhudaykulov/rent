"use client"

import { useState } from "react"
import { Users, Settings, Activity, DollarSign, Calendar, Monitor, Wifi, WifiOff } from "lucide-react"
import { FilterPanel } from "./filter-panel"
import { LineChart } from "./charts/line-chart"
import { BarChart } from "./charts/bar-chart"
import { PieChart } from "./charts/pie-chart"

const stats = [
  {
    title: "Jami Operatorlar",
    value: "1,234",
    change: "+12%",
    changeType: "increase" as const,
    icon: Users,
    color: "blue",
  },
  {
    title: "Faol Xizmatlar",
    value: "89",
    change: "+5%",
    changeType: "increase" as const,
    icon: Settings,
    color: "green",
  },
  {
    title: "Onlayn Qurilmalar",
    value: "156",
    change: "+8%",
    changeType: "increase" as const,
    icon: Monitor,
    color: "purple",
  },
  {
    title: "Oylik Daromad",
    value: "$12,345",
    change: "-3%",
    changeType: "decrease" as const,
    icon: DollarSign,
    color: "yellow",
  },
]

const recentActivities = [
  { id: 1, action: "Yangi operator qo'shildi", user: "John Doe", time: "2 daqiqa oldin" },
  { id: 2, action: "Xizmat yangilandi", user: "Jane Smith", time: "5 daqiqa oldin" },
  { id: 3, action: "Qurilma oflayn bo'ldi", user: "Terminal-003", time: "8 daqiqa oldin" },
  { id: 4, action: "Hudud o'chirildi", user: "Mike Johnson", time: "10 daqiqa oldin" },
  { id: 5, action: "Operator ma'lumotlari o'zgartirildi", user: "Sarah Wilson", time: "15 daqiqa oldin" },
]

const dashboardFilters = [
  {
    id: "dateRange",
    label: "Sana oralig'i",
    type: "date" as const,
  },
  {
    id: "period",
    label: "Davr",
    type: "select" as const,
    options: [
      { value: "today", label: "Bugun" },
      { value: "week", label: "Bu hafta" },
      { value: "month", label: "Bu oy" },
      { value: "quarter", label: "Bu chorak" },
      { value: "year", label: "Bu yil" },
    ],
  },
  {
    id: "metrics",
    label: "Ko'rsatkichlar",
    type: "multiselect" as const,
    options: [
      { value: "operators", label: "Operatorlar" },
      { value: "services", label: "Xizmatlar" },
      { value: "devices", label: "Qurilmalar" },
      { value: "revenue", label: "Daromad" },
    ],
  },
]

// Sample chart data
const monthlyRevenueData = [
  { label: "Yan", value: 12000 },
  { label: "Fev", value: 15000 },
  { label: "Mar", value: 18000 },
  { label: "Apr", value: 14000 },
  { label: "May", value: 22000 },
  { label: "Iyun", value: 25000 },
  { label: "Iyul", value: 28000 },
]

const serviceUsageData = [
  { label: "Mobil to'lov", value: 450, color: "#3B82F6" },
  { label: "Internet", value: 320, color: "#10B981" },
  { label: "Kommunal", value: 280, color: "#F59E0B" },
  { label: "Bank", value: 180, color: "#EF4444" },
  { label: "Kredit", value: 120, color: "#8B5CF6" },
]

const deviceStatusData = [
  { label: "Onlayn", value: 156, color: "#10B981" },
  { label: "Oflayn", value: 24, color: "#EF4444" },
  { label: "Texnik xizmat", value: 8, color: "#F59E0B" },
]

const operatorActivityData = [
  { label: "Dush", value: 45 },
  { label: "Sesh", value: 62 },
  { label: "Chor", value: 38 },
  { label: "Pay", value: 71 },
  { label: "Jum", value: 55 },
  { label: "Shan", value: 29 },
  { label: "Yak", value: 33 },
]

export const Dashboard = () => {
  const [filterValues, setFilterValues] = useState<Record<string, any>>({})

  const handleFilterChange = (filterId: string, value: any) => {
    setFilterValues((prev) => ({ ...prev, [filterId]: value }))
  }

  const handleFilterReset = () => {
    setFilterValues({})
  }

  return (
    <div className="space-y-6">
      {/* Page Header with Filters */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Statistika</h2>
          <p className="text-gray-600">Tizim holati va asosiy ko'rsatkichlar</p>
        </div>
        <FilterPanel
          filters={dashboardFilters}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={handleFilterReset}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          const colorClasses = {
            blue: "bg-blue-500",
            green: "bg-green-500",
            purple: "bg-purple-500",
            yellow: "bg-yellow-500",
          }

          return (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span
                      className={`text-sm font-medium ${
                        stat.changeType === "increase" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">o'tgan oyga nisbatan</span>
                  </div>
                </div>
                <div className={`w-12 h-12 ${colorClasses[stat.color]} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <LineChart data={monthlyRevenueData} title="Oylik Daromad Dinamikasi" color="#3B82F6" height={250} />
        </div>

        {/* Device Status Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <PieChart data={deviceStatusData} title="Qurilmalar Holati" width={280} height={280} />
        </div>

        {/* Service Usage Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <BarChart data={serviceUsageData} title="Xizmatlar Foydalanish Statistikasi" height={250} />
        </div>

        {/* Operator Activity Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <LineChart data={operatorActivityData} title="Haftalik Operator Faolligi" color="#10B981" height={250} />
        </div>
      </div>

      {/* Recent Activities and System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">So'nggi Faoliyat</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Tizim Holati</h3>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-700">Server</span>
              </div>
              <span className="text-sm font-medium text-green-600">Onlayn</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-700">Ma'lumotlar bazasi</span>
              </div>
              <span className="text-sm font-medium text-green-600">Faol</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <WifiOff className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-700">Backup tizimi</span>
              </div>
              <span className="text-sm font-medium text-yellow-600">Tekshiruvda</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-700">Foydalanuvchilar</span>
              </div>
              <span className="text-sm font-medium text-green-600">1,234 faol</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
