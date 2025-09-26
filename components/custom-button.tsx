"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "default" | "outline"
  size?: "sm" | "md" | "lg"
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, children, variant = "default", size = "md", ...props }, ref) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"

    const variantStyles = {
      default:
        "bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 text-black border-2 border-dashed border-blue-500 hover:from-gray-400 hover:via-gray-300 hover:to-gray-500 active:scale-95",
      outline: "bg-transparent border-2 border-dashed border-blue-500 text-blue-600 hover:bg-blue-50",
    }

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm min-w-[80px] h-[32px]",
      md: "px-4 py-2 text-base min-w-[121px] h-[46px]",
      lg: "px-6 py-3 text-lg min-w-[140px] h-[52px]",
    }

    return (
      <button ref={ref} className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)} {...props}>
        <span className="relative z-10 font-semibold tracking-wide">{children}</span>
        {/* Subtle inner shadow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
      </button>
    )
  },
)

CustomButton.displayName = "CustomButton"

export { CustomButton }
