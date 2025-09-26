"use client"

interface DetailsButtonProps {
  flags?: string[]
  text?: string
  onClick?: () => void
  className?: string
}

export default function DetailsButton({
  flags = ["🇺🇿", "🇰🇿", "🇰🇬", "🇹🇯", "🇨🇳"],
  text = "Подробнее",
  onClick,
  className = "",
}: DetailsButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center bg-blue-500 hover:bg-blue-600 
        rounded-full px-4 py-3 transition-colors duration-200 
        shadow-lg hover:shadow-xl transform hover:scale-105
        ${className}
      `}
    >
      {/* Flags section */}
      <div className="flex items-center space-x-1 mr-4">
        {flags.map((flag, index) => (
          <div
            key={index}
            className="w-6 h-4 flex items-center justify-center text-sm bg-white rounded-sm overflow-hidden"
          >
            <span className="text-xs">{flag}</span>
          </div>
        ))}
      </div>

      {/* Text section */}
      <span className="text-white font-medium text-lg whitespace-nowrap">{text}</span>
    </button>
  )
}
