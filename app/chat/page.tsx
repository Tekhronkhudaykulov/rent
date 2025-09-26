"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ArrowLeft, Phone, User, Star, Video, Mic, Paperclip, Send } from "lucide-react"

interface Message {
  id: string
  text: string
  timestamp: string
  isOperator: boolean
  attachments?: {
    type: "image" | "file"
    name: string
    url: string
    preview?: string
  }[]
}

interface ChatUser {
  name: string
  id: string
  avatar: string
  createdAt: string
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "пароль неверен, хотя я уверен, что ввожу его правильно. Можете, пожалуйста, помочь восстановить доступ?",
      timestamp: "9:41",
      isOperator: false,
    },
    {
      id: "2",
      text: "Здравствуйте! У меня возникла проблема с входом в мобильное приложение. Каждый раз, когда я пытаюсь войти, появляется ошибка, что мой пароль неверен, хотя я уверен, что ввожу его правильно. Можете, пожалуйста, помочь восстановить доступ?",
      timestamp: "9:41",
      isOperator: true,
    },
    {
      id: "3",
      text: "Здравствуйте! У меня возникла проблема с входом в мобильное приложение. Каждый раз, когда я пытаюсь войти, появляется ошибка, что мой пароль неверен, хотя я уверен, что ввожу его правильно. Можете, пожалуйста, помочь восстановить доступ?",
      timestamp: "9:41",
      isOperator: true,
    },
    {
      id: "4",
      text: "",
      timestamp: "9:41",
      isOperator: false,
      attachments: [
        {
          type: "image",
          name: "screenshot1.jpg",
          url: "/placeholder.svg?height=120&width=160",
          preview: "/placeholder.svg?height=120&width=160",
        },
        {
          type: "image",
          name: "screenshot2.jpg",
          url: "/placeholder.svg?height=120&width=160",
          preview: "/placeholder.svg?height=120&width=160",
        },
      ],
    },
    {
      id: "5",
      text: "",
      timestamp: "9:41",
      isOperator: false,
      attachments: [
        {
          type: "file",
          name: "preview_file.pdf",
          url: "/preview_file.pdf",
        },
      ],
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const chatUser: ChatUser = {
    name: "Aleksandr Niyazov",
    id: "0000001",
    avatar: "/placeholder.svg?height=48&width=48",
    createdAt: "12.22.2025 - 17:49",
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        timestamp: new Date().toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOperator: true,
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      const message: Message = {
        id: Date.now().toString(),
        text: "",
        timestamp: new Date().toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOperator: true,
        attachments: [
          {
            type: file.type.startsWith("image/") ? "image" : "file",
            name: file.name,
            url: URL.createObjectURL(file),
            preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
          },
        ],
      }
      setMessages([...messages, message])
    }
    setShowDropdown(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Back button and user info */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Nazad</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Data sozdaniya:</span>
                <br />
                <span>{chatUser.createdAt}</span>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={chatUser.avatar || "/placeholder.svg"}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{chatUser.name}</h3>
                  <p className="text-sm text-blue-600">ID - {chatUser.id}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center justify-center transition-colors">
              <Star className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center transition-colors">
              <Video className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.isOperator ? "flex-row-reverse" : ""}`}>
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-green-600" />
              </div>
            </div>

            {/* Message Content */}
            <div className={`flex flex-col max-w-2xl ${message.isOperator ? "items-end" : ""}`}>
              {/* Text Message */}
              {message.text && (
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.isOperator
                      ? "bg-blue-500 text-white rounded-br-md"
                      : "bg-gray-100 text-gray-900 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              )}

              {/* Attachments */}
              {message.attachments && (
                <div className="mt-2 space-y-2">
                  {message.attachments.map((attachment, index) => (
                    <div key={index}>
                      {attachment.type === "image" ? (
                        <div className="flex gap-2">
                          <img
                            src={attachment.preview || "/placeholder.svg"}
                            alt={attachment.name}
                            className="w-32 h-24 object-cover rounded-lg border border-gray-200"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-3">
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                            <Paperclip className="w-4 h-4 text-gray-600" />
                          </div>
                          <span className="text-sm text-gray-700 flex-1">{attachment.name}</span>
                          <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors">
                            Skachat
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Timestamp */}
              <div className={`flex items-center gap-1 mt-1 ${message.isOperator ? "flex-row-reverse" : ""}`}>
                <span className="text-xs text-gray-500">{message.timestamp}</span>
                {message.isOperator && (
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-end gap-3">
          {/* Attachment Button with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
            >
              <Paperclip className="w-5 h-5 text-gray-600" />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
                <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[150px]">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 first:rounded-t-lg"
                  >
                    <Paperclip className="w-4 h-4" />
                    Fayl
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 last:rounded-b-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    Bilimlar bazasi
                  </button>
                </div>
              </>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx"
            />
          </div>

          {/* Message Input */}
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Xabar yozing"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={1}
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
              <Mic className="w-5 h-5" />
            </button>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Yuborish
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
