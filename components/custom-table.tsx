"use client"

import type React from "react"
import { Pagination } from "./pagination"

interface TableColumn {
  key: string
  title: string
  width?: string
  align?: "left" | "center" | "right"
  render?: (value: any, row: any) => React.ReactNode
}

interface TableProps {
  title?: string
  columns: TableColumn[]
  data: any[]
  className?: string
  striped?: boolean
  hoverable?: boolean
  // Pagination props
  pagination?: {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    pageSize?: number
    totalItems?: number
  }
}

export const CustomTable = ({
  title,
  columns,
  data,
  className = "",
  striped = true,
  hoverable = true,
  pagination,
}: TableProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      {/* Table Title */}
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
      )}

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-200">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-left text-sm font-semibold text-gray-700 ${
                    column.width ? column.width : ""
                  } ${
                    column.align === "center" ? "text-center" : column.align === "right" ? "text-right" : "text-left"
                  }`}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`border-b border-gray-100 ${
                  striped && rowIndex % 2 === 1 ? "bg-gray-50" : "bg-white"
                } ${hoverable ? "hover:bg-blue-50 transition-colors" : ""}`}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-6 py-4 text-sm text-gray-900 ${
                      column.align === "center" ? "text-center" : column.align === "right" ? "text-right" : "text-left"
                    }`}
                  >
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {data.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">Маълумот топилмади</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            {/* Items info */}
            <div className="text-sm text-gray-700">
              {pagination.totalItems && pagination.pageSize && (
                <span>
                  Показано {Math.min((pagination.currentPage - 1) * pagination.pageSize + 1, pagination.totalItems)} -{" "}
                  {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)} из{" "}
                  {pagination.totalItems} записей
                </span>
              )}
            </div>

            {/* Pagination component */}
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={pagination.onPageChange}
            />
          </div>
        </div>
      )}
    </div>
  )
}
