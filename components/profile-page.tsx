"use client"

import type React from "react"

import { useState, useRef, useMemo } from "react"
import { User, Mail, Phone, MapPin, Calendar, Camera, Lock, Bell, Shield, Activity, Edit2, Save, X } from "lucide-react"
import { FilterPanel } from "./filter-panel"

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  role: string
  region: string
  avatar?: string
  joinDate: string
  lastLogin: string
  status: "active" | "inactive"
  permissions: string[]
}

interface ActivityLog {
  id: string
  action: string
  timestamp: string
  details: string
  type: "create" | "update" | "delete" | "login"
}

const mockProfile: UserProfile = {
  id: "1",
  name: "Administrator",
  email: "admin@example.com",
  phone: "+998901234567",
  role: "Super Admin",
  region: "Toshkent",
  avatar: "/placeholder.svg?height=120&width=120",
  joinDate: "2024-01-15",
  lastLogin: "2025-01-30 14:30",
  status: "active",
  permissions: ["read", "write", "delete", "admin"],
}

const mockActivityLogs: ActivityLog[] = [
  {
    id: "1",
    action: "Yangi operator qo'shildi",
    timestamp: "2025-01-30 14:25",
    details: "Alisher Karimov operatori yaratildi",
    type: "create",
  },
  {
    id: "2",
    action: "Xizmat tahrirlandi",
    timestamp: "2025-01-30 13:15",
    details: "Mobil to'lov xizmati narxi o'zgartirildi",
    type: "update",
  },
  {
    id: "3",
    action: "Hudud o'chirildi",
    timestamp: "2025-01-30 12:45",
    details: "Qashqadaryo viloyati o'chirildi",
    type: "delete",
  },
  {
    id: "4",
    action: "Tizimga kirish",
    timestamp: "2025-01-30 09:00",
    details: "Admin panelga muvaffaqiyatli kirish",
    type: "login",
  },
  {
    id: "5",
    action: "Operator ma'lumotlari yangilandi",
    timestamp: "2025-01-29 16:30",
    details: "Malika Tosheva operatori tahrirlandi",
    type: "update",
  },
  {
    id: "6",
    action: "Yangi xizmat yaratildi",
    timestamp: "2025-01-29 15:20",
    details: "Bank to'lov xizmati qo'shildi",
    type: "create",
  },
]

const activityFilters = [
  {
    id: "type",
    label: "Amal turi",
    type: "multiselect" as const,
    options: [
      { value: "create", label: "Yaratish" },
      { value: "update", label: "Yangilash" },
      { value: "delete", label: "O'chirish" },
      { value: "login", label: "Kirish" },
    ],
  },
  {
    id: "dateRange",
    label: "Sana oralig'i",
    type: "date" as const,
  },
]

export const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile>(mockProfile)
  const [activityLogs] = useState<ActivityLog[]>(mockActivityLogs)
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "notifications" | "activity">("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    region: profile.region,
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    securityAlerts: true,
  })
  const [activityFilterValues, setActivityFilterValues] = useState<Record<string, any>>({})

  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredActivityLogs = useMemo(() => {
    let filtered = activityLogs

    // Type filter
    if (activityFilterValues.type && activityFilterValues.type.length > 0) {
      filtered = filtered.filter((log) => activityFilterValues.type.includes(log.type))
    }

    // Date range filter
    if (activityFilterValues.dateRange?.from || activityFilterValues.dateRange?.to) {
      const fromDate = activityFilterValues.dateRange?.from
        ? new Date(activityFilterValues.dateRange.from)
        : new Date(0)
      const toDate = activityFilterValues.dateRange?.to ? new Date(activityFilterValues.dateRange.to) : new Date()
      filtered = filtered.filter((log) => {
        const logDate = new Date(log.timestamp)
        return logDate >= fromDate && logDate <= toDate
      })
    }

    return filtered
  }, [activityLogs, activityFilterValues])

  const handleActivityFilterChange = (filterId: string, value: any) => {
    setActivityFilterValues((prev) => ({ ...prev, [filterId]: value }))
  }

  const handleActivityFilterReset = () => {
    setActivityFilterValues({})
  }

  const handleProfileUpdate = () => {
    setProfile({ ...profile, ...editForm })
    setIsEditing(false)
  }

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Yangi parollar mos kelmaydi!")
      return
    }
    alert("Parol muvaffaqiyatli o'zgartirildi!")
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfile({ ...profile, avatar: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "create":
        return "🆕"
      case "update":
        return "✏️"
      case "delete":
        return "🗑️"
      case "login":
        return "🔐"
      default:
        return "📝"
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "create":
        return "bg-green-100 text-green-800"
      case "update":
        return "bg-blue-100 text-blue-800"
      case "delete":
        return "bg-red-100 text-red-800"
      case "login":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const tabs = [
    { id: "profile", label: "Profil ma'lumotlari", icon: User },
    { id: "security", label: "Xavfsizlik", icon: Shield },
    { id: "notifications", label: "Bildirishnomalar", icon: Bell },
    { id: "activity", label: "Faoliyat tarixi", icon: Activity },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Profil</h2>
        <p className="text-gray-600">Shaxsiy ma'lumotlar va sozlamalar</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
              {profile.avatar ? (
                <img src={profile.avatar || "/placeholder.svg"} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <Camera className="w-4 h-4" />
            </button>
            <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{profile.name}</h3>
            <p className="text-blue-600 font-medium">{profile.role}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {profile.email}
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {profile.phone}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {profile.region}
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="text-right">
            <span
              className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                profile.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {profile.status === "active" ? "Faol" : "Nofaol"}
            </span>
            <p className="text-sm text-gray-500 mt-1">Oxirgi kirish: {profile.lastLogin}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Shaxsiy ma'lumotlar</h3>
              <button
                onClick={() => {
                  if (isEditing) {
                    setEditForm({
                      name: profile.name,
                      email: profile.email,
                      phone: profile.phone,
                      region: profile.region,
                    })
                  }
                  setIsEditing(!isEditing)
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {isEditing ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                {isEditing ? "Bekor qilish" : "Tahrirlash"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To'liq ism</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">{profile.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">{profile.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">{profile.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hudud</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.region}
                    onChange={(e) => setEditForm({ ...editForm, region: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">{profile.region}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rol</label>
                <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">{profile.role}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Qo'shilgan sana</label>
                <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">{profile.joinDate}</p>
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleProfileUpdate}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Saqlash
                </button>
              </div>
            )}
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Xavfsizlik sozlamalari</h3>

            {/* Change Password */}
            <div className="mb-8">
              <h4 className="text-md font-medium text-gray-900 mb-4">Parolni o'zgartirish</h4>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Joriy parol</label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Yangi parol</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parolni tasdiqlash</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handlePasswordChange}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Lock className="w-4 h-4" />
                  Parolni o'zgartirish
                </button>
              </div>
            </div>

            {/* Permissions */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">Ruxsatlar</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {profile.permissions.map((permission) => (
                  <div key={permission} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800 capitalize">{permission}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Bildirishnoma sozlamalari</h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Email bildirishnomalar</h4>
                  <p className="text-sm text-gray-500">Muhim yangiliklar va xabarlar email orqali</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.emailNotifications}
                    onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">SMS bildirishnomalar</h4>
                  <p className="text-sm text-gray-500">Tezkor xabarlar telefon orqali</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.smsNotifications}
                    onChange={(e) => setNotifications({ ...notifications, smsNotifications: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Push bildirishnomalar</h4>
                  <p className="text-sm text-gray-500">Brauzer orqali bildirishnomalar</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.pushNotifications}
                    onChange={(e) => setNotifications({ ...notifications, pushNotifications: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Xavfsizlik ogohlantirishlari</h4>
                  <p className="text-sm text-gray-500">Shubhali faoliyat haqida xabarlar</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.securityAlerts}
                    onChange={(e) => setNotifications({ ...notifications, securityAlerts: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === "activity" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Faoliyat tarixi</h3>
              <FilterPanel
                filters={activityFilters}
                values={activityFilterValues}
                onChange={handleActivityFilterChange}
                onReset={handleActivityFilterReset}
              />
            </div>

            {/* Results Summary */}
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span>{filteredActivityLogs.length} ta faoliyat topildi</span>
              {Object.keys(activityFilterValues).length > 0 && (
                <span>Filterlar faol: {Object.keys(activityFilterValues).length}</span>
              )}
            </div>

            <div className="space-y-4">
              {filteredActivityLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0">
                    <span className="text-lg">{getActivityIcon(log.type)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium text-gray-900">{log.action}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getActivityColor(log.type)}`}>
                        {log.type === "create" && "Yaratish"}
                        {log.type === "update" && "Yangilash"}
                        {log.type === "delete" && "O'chirish"}
                        {log.type === "login" && "Kirish"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{log.details}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {log.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {filteredActivityLogs.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-2">
                    <Activity className="w-12 h-12 mx-auto" />
                  </div>
                  <p className="text-gray-500">Hech qanday faoliyat topilmadi</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
