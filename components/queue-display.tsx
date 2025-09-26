"use client"

import { useState, useEffect } from "react"
import { Clock, User, Hash, Calendar, Download, Play, Pause, Volume2 } from 'lucide-react'

interface QueueData {
  queue: number
  operatorIndex: number
  prefix: string
  operatorName: string
  timestamp: string
  duration: string
  status: "active" | "waiting" | "completed"
}

interface QueueDisplayProps {
  data?: QueueData
  onNavigateToLogin?: () => void
}

const QueueDisplay = ({ data, onNavigateToLogin }: QueueDisplayProps) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getPrefixBgLogo = (prefix: string) => {
    const colors = {
      A: "bg-gradient-to-br from-red-500 to-red-600",
      B: "bg-gradient-to-br from-blue-500 to-blue-600",
      C: "bg-gradient-to-br from-green-500 to-green-600",
      D: "bg-gradient-to-br from-purple-500 to-purple-600",
      E: "bg-gradient-to-br from-yellow-500 to-yellow-600",
      F: "bg-gradient-to-br from-pink-500 to-pink-600",
    }
    return colors[prefix as keyof typeof colors] || "bg-gradient-to-br from-gray-500 to-gray-600"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400"
      case "waiting":
        return "text-yellow-400"
      case "completed":
        return "text-blue-400"
      default:
        return "text-gray-400"
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header with Current Time */}
      <div className="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Hash className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Навбат тизими</h1>
                <p className="text-sm text-gray-300">Queue Management System</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-mono font-bold text-blue-300">{formatTime(currentTime)}</div>
              <div className="text-sm text-gray-300">{formatDate(currentTime)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 lg:p-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Queue Display Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center">
              {data ? (
                <>
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-blue-300 mb-2">Ҳозирги навбат</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto"></div>
                  </div>

                  {/* Queue Number Display */}
                  <div className="mb-8">
                    <div className="flex items-center justify-center gap-6">
                      <div
                        className={`w-24 h-24 ${getPrefixBgLogo(
                          data.prefix,
                        )} rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-all duration-300`}
                      >
                        <span className="text-4xl font-bold text-white">{data.prefix}</span>
                      </div>
                      <div
                        onClick={onNavigateToLogin}
                        className="cursor-pointer group"
                      >
                        <div className="text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-mono leading-none group-hover:scale-105 transition-transform duration-300">
                          {data.queue}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="mb-6">
                    <span
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                        data.status,
                      )} bg-white/10 border border-current/20`}
                    >
                      <div className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse"></div>
                      {data.status === "active" && "Фаол"}
                      {data.status === "waiting" && "Кутилмоқда"}
                      {data.status === "completed" && "Тугалланган"}
                    </span>
                  </div>
                </>
              ) : (
                <div className="py-16 text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse">
                    <Clock className="w-16 h-16 text-gray-500" />
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Ҳозирда навбат йўқ
                  </p>
                  <p className="text-gray-400 mt-2">No queue available at the moment</p>
                </div>
              )}
            </div>
          </div>

          {/* Operator Information Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Оператор маълумотлари</h3>
              <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
            </div>

            {data ? (
              <div className="space-y-6">
                {/* Operator Number */}
                <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Hash className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">Оператор рақами</p>
                    <p className="text-xl font-bold text-blue-300">#{data.operatorIndex}</p>
                  </div>
                </div>

                {/* Operator Name */}
                <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">Оператор исми</p>
                    <p className="text-xl font-bold text-white">{data.operatorName}</p>
                  </div>
                </div>

                {/* Timestamp */}
                <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">Вақт</p>
                    <p className="text-xl font-bold text-white">{data.timestamp}</p>
                  </div>
                </div>

                {/* Audio Recording Interface */}
                <div className="p-6 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl border border-white/20">
                  <div className="flex items-center space-x-4">
                    {/* Play Button */}
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200 shadow-lg"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white ml-1" />
                      )}
                    </button>

                    {/* Waveform Visualization */}
                    <div className="flex-1 flex items-center space-x-1 h-8">
                      {Array.from({ length: 40 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 bg-gradient-to-t from-blue-400 to-blue-300 rounded-full transition-all duration-200 ${
                            isPlaying && i < 20 ? "animate-pulse" : ""
                          }`}
                          style={{
                            height: `${Math.random() * 100 + 20}%`,
                            opacity: isPlaying && i < 20 ? 1 : 0.6,
                          }}
                        />
                      ))}
                    </div>

                    {/* Duration */}
                    <div className="text-white font-mono text-lg">{data.duration}</div>

                    {/* Download Button */}
                    <button className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200 shadow-lg">
                      <Download className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  {/* Volume Control */}
                  <div className="flex items-center space-x-3 mt-4">
                    <Volume2 className="w-5 h-5 text-gray-300" />
                    <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-600/30 to-gray-700/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-gray-500" />
                </div>
                <p className="text-gray-400">Оператор маълумотлари мавжуд эмас</p>
              </div>
            )}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <Hash className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-green-300 text-sm">Жами навбатлар</p>
                <p className="text-2xl font-bold text-white">247</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-blue-300 text-sm">Кутиш вақти</p>
                <p className="text-2xl font-bold text-white">12 дақ</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-purple-300 text-sm">Фаол операторлар</p>
                <p className="text-2xl font-bold text-white">8</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QueueDisplay
