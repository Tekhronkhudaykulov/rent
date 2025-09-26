"use client"

import { BarChart3, Settings, Users, MapPin, ChevronLeft, ChevronRight, Home, User, Monitor } from "lucide-react"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  collapsed: boolean
  onToggleCollapse: () => void
}

const menuItems = [
  { id: "dashboard", label: "Statistika", icon: BarChart3 },
  { id: "services", label: "Xizmatlar", icon: Settings },
  { id: "operators", label: "Operatorlar", icon: Users },
  { id: "regions", label: "Hududlar", icon: MapPin },
  { id: "devices", label: "Qurilmalar", icon: Monitor },
  { id: "profile", label: "Profil", icon: User },
]

export const Sidebar = ({ activeTab, onTabChange, collapsed, onToggleCollapse }: SidebarProps) => {
  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-30 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900">Admin Panel</span>
          </div>
        )}
        <button onClick={onToggleCollapse} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive ? "bg-blue-50 text-blue-600 border border-blue-200" : "text-gray-700 hover:bg-gray-100"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
