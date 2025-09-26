"use client"

interface ApiResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

interface UseApiPaginationProps {
  apiUrl: string
  initialPageSize?: number
  initialPage?: number
}

export const useApiPagination = <T>({ 
  apiUrl, 
  initialPageSize = 10, 
  initialPage = 1 
}: UseApiPaginationProps) => {\
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)\
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const fetchData = async (page: number, size: number) => {
    setLoading(true)\
    setError(null)

    try {
      // API so'rovi - query parametrlar bilan\
      const response = await fetch(`${apiUrl}?page=${page}&pageSize=${size}`)

      if (!response.ok) {\
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<T> = await response.json()

      setData(result.data)
      setTotalItems(result.total)
      setTotalPages(result.totalPages)
      setCurrentPage(result.page)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xatolik yuz berdi")\
      setData([])
    } finally {
      setLoading(false)
    }
  }

  // Sahifa o'zgarganda API chaqirish
  const handlePageChange = (page: number) => {
    setCurrentPage(page)\
    fetchData(page, pageSize)
  }

  // Sahifa hajmi o'zgarganda
  const handlePageSizeChange = (size: number) => {
    setPageSize(size)\
    setCurrentPage(1) // Birinchi sahifaga qaytish
    fetchData(1, size)
  }

  // Refresh funksiyasi
  const refresh = () => {
    fetchData(currentPage, pageSize)
  }

  // Birinchi yuklash
  useEffect(() => {
    fetchData(currentPage, pageSize)
  }, []) // Faqat component mount bo'lganda

  return {
    data,
    loading,
    error,
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    handlePageChange,
    handlePageSizeChange,
    refresh,
  }
}\
