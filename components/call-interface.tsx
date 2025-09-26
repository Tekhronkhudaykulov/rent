"use client"

import { useState, useEffect } from "react"
import { Mic, MicOff, Phone, PhoneOff } from 'lucide-react'
import Image from "next/image"

interface CallInterfaceProps {
  contactName?: string
  contactId?: string
  profileImage?: string
  onEndCall?: () => void
  onToggleMic?: (enabled: boolean) => void
}

const CallInterface = ({
  contactName = "Александра Ниязова",
  contactId = "00000001",
  profileImage = "/placeholder.svg?height=200&width=200",
  onEndCall,
  onToggleMic,
}: CallInterfaceProps) => {
  const [callDuration, setCallDuration] = useState(1) // Start from 1 second
  const [isMicEnabled, setIsMicEnabled] = useState(true)
  const [isRecording, setIsRecording] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleMicToggle = () => {
    const newMicState = !isMicEnabled
    setIsMicEnabled(newMicState)
    onToggleMic?.(newMicState)
  }

  const handleEndCall = () => {
    onEndCall?.()
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Profile Section */}
        <div className="px-8 pt-12 pb-8 text-center">
          {/* Profile Picture with Decorative Border */}
          <div className="relative inline-block mb-6">
            {/* Decorative Yellow Border */}
            <div className="absolute inset-0 rounded-full">
              <svg className="w-full h-full" viewBox="0 0 200 200">
                <defs>
                  <pattern id="yellowPattern" patternUnits="userSpaceOnUse" width="8" height="8">
                    <circle cx="4" cy="4" r="2" fill="#FCD34D" opacity="0.8" />
                  </pattern>
                </defs>
                <circle
                  cx="100"
                  cy="100"
                  r="95"
                  fill="none"
                  stroke="url(#yellowPattern)"
                  strokeWidth="10"
                  className="animate-spin-slow"
                />
                <circle cx="100" cy="100" r="85" fill="none" stroke="#FCD34D" strokeWidth="2" opacity="0.6" />
                <circle cx="100" cy="100" r="75" fill="none" stroke="#F59E0B" strokeWidth="1" opacity="0.4" />
              </svg>
            </div>

            {/* Profile Image */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <Image
                src={profileImage || "/placeholder.svg"}
                alt={contactName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 160px, 160px"
              />
            </div>
          </div>

          {/* Contact Information */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{contactName}</h1>
          <p className="text-blue-500 text-lg font-medium mb-6">ID - {contactId}</p>

          {/* Call Duration */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            <span className="text-3xl font-mono font-bold text-gray-900">{formatTime(callDuration)}</span>
            {isRecording && <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-8 pb-12">
          <div className="flex items-center justify-center space-x-6">
            {/* Microphone Button */}
            <button
              onClick={handleMicToggle}
              className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-lg ${
                isMicEnabled
                  ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  : "bg-red-100 hover:bg-red-200 text-red-600"
              }`}
            >
              {isMicEnabled ? <Mic className="w-8 h-8" /> : <MicOff className="w-8 h-8" />}
            </button>

            {/* Microphone Label */}
            <div className="text-center">
              <p className="text-gray-700 font-medium">Микрофон</p>
            </div>

            {/* End Call Button */}
            <button
              onClick={handleEndCall}
              className="w-20 h-20 bg-red-500 hover:bg-red-600 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-lg group"
            >
              <PhoneOff className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* End Call Label */}
            <div className="text-center">
              <p className="text-red-500 font-medium">Завершить</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallInterface
