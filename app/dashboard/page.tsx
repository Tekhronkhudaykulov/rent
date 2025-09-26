"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, FileText, Shield, Clock, CheckCircle, AlertTriangle, Settings, LogOut, Bell, Search } from "lucide-react"

export default function DashboardPage() {
  const [notifications] = useState([
    { id: 1, message: "Pasport ma'lumotlari yangilandi", time: "10 daqiqa oldin", type: "success" },
    { id: 2, message: "Yangi xizmat mavjud", time: "1 soat oldin", type: "info" },
    { id: 3, message: "Tizimda texnik ishlar", time: "2 soat oldin", type: "warning" },
  ])

  const services = [
    {
      title: "Shaxsni identifikatsiya qilish",
      description: "Biometrik ma'lumotlar orqali shaxsni aniqlash",
      icon: User,
      status: "active",
    },
    {
      title: "Hujjatlarni tekshirish",
      description: "Rasmiy hujjatlarning haqiqiyligini tekshirish",
      icon: FileText,
      status: "active",
    },
    {
      title: "Xavfsizlik tekshiruvi",
      description: "Shaxsning xavfsizlik ma'lumotlarini tekshirish",
      icon: Shield,
      status: "maintenance",
    },
    {
      title: "Tarix va hisobotlar",
      description: "Amalga oshirilgan operatsiyalar tarixi",
      icon: Clock,
      status: "active",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">YARM Dashboard</h1>
                <p className="text-sm text-gray-500">Yagona Axborot-Resurs Makoni</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Xush kelibsiz!</h2>
          <p className="text-gray-600">Tizim xizmatlari va ma'lumotlaringiz</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bugungi identifikatsiyalar</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+12% kechagiga nisbatan</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faol foydalanuvchilar</CardTitle>
              <User className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,456</div>
              <p className="text-xs text-muted-foreground">+5% o'tgan haftaga nisbatan</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tekshirilgan hujjatlar</CardTitle>
              <FileText className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,891</div>
              <p className="text-xs text-muted-foreground">+8% kechagiga nisbatan</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tizim holati</CardTitle>
              <Shield className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">99.9%</div>
              <p className="text-xs text-muted-foreground">Barqaror ishlaydi</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Mavjud xizmatlar</CardTitle>
                <CardDescription>Tizimda mavjud bo'lgan barcha xizmatlar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                        service.status === "active"
                          ? "border-green-200 bg-green-50 hover:border-green-300"
                          : "border-orange-200 bg-orange-50 hover:border-orange-300"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            service.status === "active" ? "bg-green-600" : "bg-orange-600"
                          }`}
                        >
                          <service.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                          <div className="flex items-center space-x-2">
                            {service.status === "active" ? (
                              <>
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-green-600 font-medium">Faol</span>
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="w-4 h-4 text-orange-600" />
                                <span className="text-sm text-orange-600 font-medium">Texnik ishlar</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Bildirishnomalar</CardTitle>
                <CardDescription>So'nggi yangiliklar va xabarlar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          notification.type === "success"
                            ? "bg-green-500"
                            : notification.type === "warning"
                              ? "bg-orange-500"
                              : "bg-blue-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 mb-1">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  Barcha bildirishnomalarni ko'rish
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
