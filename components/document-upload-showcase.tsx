"use client"

import type React from "react"
import { useState } from "react"
import { SmartImageUpload } from "./smart-image-upload"
import { ProfileImageUpload } from "./profile-image-upload"

export const DocumentUploadShowcase = () => {
  const [profileData, setProfileData] = useState<{
    image?: string | null
    name?: string
  }>({
    image: null,
    name: "Пользователь",
  })

  const [fileName, setFileName] = useState<string>("")
  const [documentFile, setDocumentFile] = useState<string | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)

      // Create preview URL for image files
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setDocumentFile(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const handleProfileImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setProfileData((prev) => ({
        ...prev,
        image: e.target?.result as string,
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setProfileData((prev) => ({
      ...prev,
      image: null,
    }))
  }

  const handleRemoveDocument = () => {
    setDocumentFile(null)
    setFileName("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Smart Image Upload Components</h1>
          <p className="text-xl text-gray-600">Умные компоненты загрузки изображений с предварительным просмотром</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Image Upload */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Profile Image Upload</h2>

            <div className="flex flex-col items-center space-y-6">
              <ProfileImageUpload
                profileData={profileData}
                onImageUpload={handleProfileImageUpload}
                onImageRemove={handleRemoveImage}
                size="xl"
              />

              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">{profileData.name}</h3>
                <p className="text-gray-600">{profileData.image ? "Фото загружено" : "Фото не загружено"}</p>
              </div>

              {/* Different sizes */}
              <div className="flex items-center space-x-4">
                <ProfileImageUpload
                  profileData={profileData}
                  onImageUpload={handleProfileImageUpload}
                  onImageRemove={handleRemoveImage}
                  size="sm"
                />
                <ProfileImageUpload
                  profileData={profileData}
                  onImageUpload={handleProfileImageUpload}
                  onImageRemove={handleRemoveImage}
                  size="md"
                />
                <ProfileImageUpload
                  profileData={profileData}
                  onImageUpload={handleProfileImageUpload}
                  onImageRemove={handleRemoveImage}
                  size="lg"
                />
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Document Upload</h2>

            <div className="space-y-6">
              <SmartImageUpload
                profileData={{ image: documentFile }}
                fileName={fileName}
                onFileUpload={handleFileUpload}
                onImageRemove={handleRemoveDocument}
                placeholder="Загрузить документ"
              />

              {/* File info */}
              {fileName && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Информация о файле:</h4>
                  <p className="text-sm text-gray-600">
                    <strong>Имя файла:</strong> {fileName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Статус:</strong> {documentFile ? "Загружен с предварительным просмотром" : "Загружен"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Возможности компонентов</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 text-xl">✓</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Умное отображение</h3>
              <p className="text-sm text-gray-600">Показывает изображение если есть, иначе поле загрузки</p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 text-xl">🔄</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Легкая замена</h3>
              <p className="text-sm text-gray-600">Возможность легко изменить загруженное изображение</p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-red-600 text-xl">🗑️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Удаление файлов</h3>
              <p className="text-sm text-gray-600">Кнопка удаления для очистки загруженных файлов</p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 text-xl">👁️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Предварительный просмотр</h3>
              <p className="text-sm text-gray-600">Мгновенный просмотр загруженных изображений</p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-yellow-600 text-xl">📱</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Адаптивный дизайн</h3>
              <p className="text-sm text-gray-600">Отлично работает на всех устройствах</p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-indigo-600 text-xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Быстрая загрузка</h3>
              <p className="text-sm text-gray-600">Оптимизированная обработка файлов</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
