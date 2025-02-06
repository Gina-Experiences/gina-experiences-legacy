"use client"

import { RefreshCw } from "lucide-react"
import { useState } from "react"

export function RefreshButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = async () => {
    setIsLoading(true)
    await refreshAnalytics()
    setIsLoading(false)
  }

  return (
    <button
      onClick={handleRefresh}
      disabled={isLoading}
      className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
    >
      <RefreshCw className="w-4 h-4 mr-2" />
      Refresh Data
    </button>
  )
}

