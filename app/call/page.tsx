"use client"

import { useRouter } from "next/navigation"
import CallInterface from "@/components/call-interface"

export default function CallPage() {
  const router = useRouter()

  const handleEndCall = () => {
    // Handle call end logic here
    console.log("Call ended")
    router.push("/")
  }

  const handleToggleMic = (enabled: boolean) => {
    // Handle microphone toggle logic here
    console.log("Microphone", enabled ? "enabled" : "disabled")
  }

  return (
    <CallInterface
      contactName="Александра Ниязова"
      contactId="00000001"
      profileImage="/placeholder.svg?height=200&width=200&text=Alexandra"
      onEndCall={handleEndCall}
      onToggleMic={handleToggleMic}
    />
  )
}
