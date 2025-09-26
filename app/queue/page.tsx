"use client"

import { useState, useEffect } from "react"
import QueueDisplay from "@/components/queue-display"
import { useRouter } from "next/navigation"

interface QueueData {
  queue: number
  operatorIndex: number
  prefix: string
  operatorName: string
  timestamp: string
  duration: string
  status: "active" | "waiting" | "completed"
}

export default function QueuePage() {
  const router = useRouter()
  const [queueData, setQueueData] = useState<QueueData | undefined>()

  // Simulate real-time data updates
  useEffect(() => {
    const mockData: QueueData = {
      queue: 247,
      operatorIndex: 3,
      prefix: "A",
      operatorName: "Рафихон Гаилов Д.Д.",
      timestamp: "25.10.2025",
      duration: "00:12",
      status: "active",
    }

    // Simulate loading delay
    const timer = setTimeout(() => {
      setQueueData(mockData)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleNavigateToLogin = () => {
    router.push("/login")
  }

  return <QueueDisplay data={queueData} onNavigateToLogin={handleNavigateToLogin} />
}
