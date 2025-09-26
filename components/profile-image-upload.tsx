"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Camera, X, Upload, User } from "lucide-react"

interface ProfileImageUploadProps {
  profileData?: {
    image?: string | null
    name?: string
    [key: string]: any
  }
  onImageUpload: (file: File) => void
  onImageRemove?: () => void
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  profileData,
  onImageUpload,
  onImageRemove,
  className = "",
  size = "lg",
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-40 h-40",
  }

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
  }

  const hasImage = profileData?.image && profileData.image !== null

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onImageUpload(file)
    }
  }

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onImageRemove) {
      onImageRemove()
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div
        className={`${sizeClasses[size]} relative group cursor-pointer`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Image or Avatar Placeholder */}
        <div
          className={`${sizeClasses[size]} rounded-full overflow-hidden border-4 border-white shadow-lg bg-gradient-to-br from-[#F06F1E] to-[#e55a0f]`}
        >
          {hasImage ? (
            <img
              src={profileData.image || "/placeholder.svg"}
              alt={profileData?.name || "Profile"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <User className={`${iconSizes[size]} text-gray-400`} />
            </div>
          )}
        </div>

        {/* Camera Icon Overlay */}
        <div
          className={`absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-white text-center">
            <Camera className={`${iconSizes[size]} mx-auto mb-1`} />
            {size !== "sm" && <span className="text-xs font-medium">{hasImage ? "Изменить" : "Добавить"}</span>}
          </div>
        </div>

        {/* Remove button */}
        {hasImage && onImageRemove && (
          <button
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 shadow-lg"
          >
            <X className="w-3 h-3" />
          </button>
        )}

        {/* Upload indicator for empty state */}
        {!hasImage && (
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#F06F1E] text-white rounded-full flex items-center justify-center shadow-lg">
            <Upload className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
    </div>
  )
}
