"use client"

import React, { useState, useEffect } from "react"
import { CoverLetterGenerator } from "./cover-letter-generator"
import { FallbackGenerator } from "./fallback-page"
import { Card } from "@/components/ui/card"

export default function DashboardPage() {
  const [hasError, setHasError] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="container mx-auto">
        <h1 className="mb-6 text-2xl font-bold">Generate Your Cover Letter</h1>
        <Card className="p-6 flex items-center justify-center min-h-[400px]">
          <p>Loading...</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Generate Your Cover Letter</h1>
      {hasError ? (
        <>
          <p className="mb-4 text-red-500">
            We encountered an issue with the advanced editor. Using simplified version instead.
          </p>
          <FallbackGenerator />
        </>
      ) : (
        <ErrorBoundary onError={() => setHasError(true)}>
          <CoverLetterGenerator />
        </ErrorBoundary>
      )}
    </div>
  )
}

class ErrorBoundary extends React.Component<{
  children: React.ReactNode
  onError?: () => void
}> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error in component:", error, errorInfo)
    if (this.props.onError) {
      this.props.onError()
    }
  }

  render() {
    if (this.state.hasError) {
      return null // Parent will handle rendering fallback
    }
    return this.props.children
  }
}
