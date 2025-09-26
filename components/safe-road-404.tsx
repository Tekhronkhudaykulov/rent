"use client"

import type React from "react"

import { useState } from "react"
import { Home, Search, RefreshCw, ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"

const SafeRoad404 = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      window.location.reload()
    }, 1000)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Implement search logic here
      console.log("Searching for:", searchQuery)
    }
  }

  const popularPages = [
    { name: "Главная", href: "/", icon: Home },
    { name: "Вход в систему", href: "/login", icon: ArrowLeft },
    { name: "Помощь", href: "/help", icon: AlertTriangle },
  ]

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">
            SAFE
            <br />
            <span className="text-5xl">ROAD</span>
          </h1>
          <p className="text-gray-600 text-lg tracking-wider">YHXX</p>
        </div>

        {/* 404 Error */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-yellow-400 mb-4 animate-pulse">404</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Страница не найдена</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
            К сожалению, запрашиваемая страница не существует или была перемещена.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по сайту..."
              className="w-full px-4 py-3 pl-12 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1.5 rounded-md transition-colors duration-200"
            >
              Найти
            </button>
          </div>
        </form>

        {/* Popular Pages */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Популярные страницы</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {popularPages.map((page) => {
              const IconComponent = page.icon
              return (
                <Link
                  key={page.name}
                  href={page.href}
                  className="flex flex-col items-center p-4 bg-gray-50 hover:bg-yellow-50 rounded-xl transition-all duration-300 hover:shadow-md group"
                >
                  <IconComponent className="w-8 h-8 text-gray-600 group-hover:text-yellow-600 mb-2 transition-colors duration-200" />
                  <span className="text-gray-700 group-hover:text-gray-900 font-medium">{page.name}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <Home className="w-5 h-5" />
            <span>На главную</span>
          </Link>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center justify-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>{isRefreshing ? "Обновление..." : "Обновить страницу"}</span>
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Если проблема повторяется, обратитесь в{" "}
            <Link href="/support" className="text-yellow-600 hover:text-yellow-700 underline">
              службу поддержки
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SafeRoad404
