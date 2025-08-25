"use client"

import { useEffect, useState, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

interface TopProgressBarProps {
  color?: "blue" | "green" | "purple" | "orange" | "red"
  height?: "sm" | "md" | "lg"
  showSpinner?: boolean
  className?: string
}

const colors = {
  blue: "bg-gradient-to-r from-blue-500 to-cyan-500",
  green: "bg-gradient-to-r from-green-500 to-emerald-500",
  purple: "bg-gradient-to-r from-purple-500 to-pink-500",
  orange: "bg-gradient-to-r from-orange-500 to-red-500",
  red: "bg-gradient-to-r from-red-500 to-pink-500"
}

const heights = {
  sm: "h-0.5",
  md: "h-1",
  lg: "h-1.5"
}

function TopProgressBarContent({
  color = "blue",
  height = "md",
  showSpinner = true,
  className
}: TopProgressBarProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Reset progress when route changes
    setIsLoading(true)
    setProgress(0)

    // Simulate progress
    const timer1 = setTimeout(() => setProgress(30), 100)
    const timer2 = setTimeout(() => setProgress(60), 300)
    const timer3 = setTimeout(() => setProgress(80), 600)
    const timer4 = setTimeout(() => {
      setProgress(100)
      setTimeout(() => {
        setIsLoading(false)
        setProgress(0)
      }, 200)
    }, 800)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [pathname, searchParams])

  if (!isLoading) return null

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-[9999] pointer-events-none",
        className
      )}
    >
      {/* Progress Bar */}
      <div
        className={cn(
          "transition-all duration-300 ease-out",
          heights[height],
          colors[color],
          "shadow-lg"
        )}
        style={{
          width: `${progress}%`,
          transition: progress === 100 ? "width 0.2s ease-out" : "width 0.3s ease-out"
        }}
      />

      {/* Spinner */}
      {showSpinner && progress > 0 && progress < 100 && (
        <div className="absolute top-2 right-4">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Glow Effect */}
      <div
        className={cn(
          "absolute top-0 h-full opacity-20 blur-sm transition-all duration-300",
          colors[color]
        )}
        style={{
          width: `${progress}%`,
          transition: progress === 100 ? "width 0.2s ease-out" : "width 0.3s ease-out"
        }}
      />
    </div>
  )
}

export function TopProgressBar(props: TopProgressBarProps) {
  return (
    <Suspense fallback={null}>
      <TopProgressBarContent {...props} />
    </Suspense>
  )
}

// Hook personalizado para controlar la barra de progreso
export function useTopProgress() {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const startLoading = () => {
    setIsLoading(true)
    setProgress(0)
  }

  const setProgressValue = (value: number | ((prev: number) => number)) => {
    if (typeof value === 'function') {
      setProgress(prev => Math.min(100, Math.max(0, value(prev))))
    } else {
      setProgress(Math.min(100, Math.max(0, value)))
    }
  }

  const completeLoading = () => {
    setProgress(100)
    setTimeout(() => {
      setIsLoading(false)
      setProgress(0)
    }, 200)
  }

  const stopLoading = () => {
    setIsLoading(false)
    setProgress(0)
  }

  return {
    isLoading,
    progress,
    startLoading,
    setProgressValue,
    completeLoading,
    stopLoading
  }
}

// Componente de ejemplo con control manual
export function TopProgressBarManual() {
  const { isLoading, progress, startLoading, setProgressValue, completeLoading } = useTopProgress()

  const handleStartLoading = () => {
    startLoading()
    
    // Simular progreso
    const interval = setInterval(() => {
      setProgressValue((prev: number) => {
        if (prev >= 90) {
          clearInterval(interval)
          completeLoading()
          return 90
        }
        return prev + 10
      })
    }, 100)
  }

  return (
    <div className="space-y-4">
      <TopProgressBar 
        color="purple"
        height="lg"
        showSpinner
      />
      
      <button
        onClick={handleStartLoading}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Iniciar Carga Manual
      </button>
    </div>
  )
} 