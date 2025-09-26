"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Camera, X, Upload } from "lucide-react"

interface SmartImageUploadProps {
  profileData?: {
    image?: string | null
    [key: string]: any
  }
  fileName?: string
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onImageRemove?: () => void
  className?: string
  placeholder?: string
}

export const SmartImageUpload: React.FC<SmartImageUploadProps> = ({
  profileData,
  fileName,
  onFileUpload,
  onImageRemove,
  className = "",
  placeholder = "Загрузить",
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const hasImage = profileData?.image && profileData.image !== null

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onImageRemove) {
      onImageRemove()
    }
  }

  // If there's an image, show the image preview with change option
  if (hasImage) {
    return (
      <div
        className={`relative group cursor-pointer ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Image Preview */}
        <div className="relative w-full h-32 rounded-lg overflow-hidden border-2 border-dashed border-[#F06F1E] bg-gray-50">
          <img
            src={profileData.image || "/placeholder.svg"}
            alt="Uploaded file"
            className="w-full h-full object-cover"
          />

          {/* Overlay on hover */}
          <div
            className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-200 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="text-white text-center">
              <Camera className="w-6 h-6 mx-auto mb-1" />
              <span className="text-sm font-medium">Изменить</span>
            </div>
          </div>

          {/* Remove button */}
          {onImageRemove && (
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Hidden file input */}
        <input ref={fileInputRef} type="file" className="hidden" onChange={onFileUpload} accept="image/*" />

        {/* File name display */}
        {fileName && <div className="mt-2 text-sm text-gray-600 text-center truncate">{fileName}</div>}
      </div>
    )
  }

  // If no image, show the upload input
  return (
    <div className={`relative ${className}`}>
      <div
        className="relative cursor-pointer"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Upload Area */}
        <div
          className={`w-full h-32 border-2 border-dashed border-[#F06F1E] rounded-lg bg-white flex flex-col items-center justify-center transition-all duration-200 ${
            isHovered ? "border-[#e55a0f] bg-orange-50" : ""
          }`}
        >
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-[#F06F1E] bg-opacity-10 rounded-full flex items-center justify-center">
              <Upload className="w-6 h-6 text-[#F06F1E]" />
            </div>
            <p className="text-[#F06F1E] font-medium text-sm mb-1">{placeholder}</p>
            <p className="text-gray-500 text-xs">Нажмите для выбора файла</p>
          </div>
        </div>

        {/* Traditional input overlay for compatibility */}
        <input
          type="text"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          value={fileName || placeholder}
          readOnly
          tabIndex={-1}
        />
      </div>

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" className="hidden" onChange={onFileUpload} accept="image/*" />
    </div>
  )
}
