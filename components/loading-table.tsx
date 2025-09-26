"use client"

interface LoadingTableProps {
  columns: number
  rows?: number
}

export const LoadingTable = ({ columns, rows = 5 }: LoadingTableProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Loading Header */}
          <thead>
            <tr className="bg-gray-200">
              {Array.from({ length: columns }).map((_, index) => (
                <th key={index} className="px-6 py-4">
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Loading Body */}
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 1 ? "bg-gray-50" : "bg-white"}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
