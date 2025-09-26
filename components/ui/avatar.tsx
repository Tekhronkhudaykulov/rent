"use client"

import * as React from "react"

interface AvatarProps {
  className?: string
  children: React.ReactNode
}

interface AvatarImageProps {
  src?: string
  alt?: string
}

interface AvatarFallbackProps {
  className?: string
  children: React.ReactNode
}

export const Avatar = ({ className = "", children }: AvatarProps) => {
  return <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>{children}</div>
}

export const AvatarImage = ({ src, alt }: AvatarImageProps) => {
  const [imageLoaded, setImageLoaded] = React.useState(false)
  const [imageError, setImageError] = React.useState(false)

  if (imageError || !src) {
    return null
  }

  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className={`aspect-square h-full w-full ${imageLoaded ? "block" : "hidden"}`}
      onLoad={() => setImageLoaded(true)}
      onError={() => setImageError(true)}
    />
  )
}

export const AvatarFallback = ({ className = "", children }: AvatarFallbackProps) => {
  return (
    <div className={`flex h-full w-full items-center justify-center rounded-full bg-gray-100 ${className}`}>
      {children}
    </div>
  )
}
