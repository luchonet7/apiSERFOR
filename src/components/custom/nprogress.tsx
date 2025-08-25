"use client"

import { useEffect, useState, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

interface NProgressProps {
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

function NProgressContent({
  color = "blue",
  height = "md",
  showSpinner = true,
  className
}: NProgressProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Reset progress when route changes
    setIsLoading(true)
    setProgress(0)

    // Simulate progress with realistic timing
    const timer1 = setTimeout(() => setProgress(20), 50)
    const timer2 = setTimeout(() => setProgress(40), 150)
    const timer3 = setTimeout(() => setProgress(60), 300)
    const timer4 = setTimeout(() => setProgress(80), 500)
    const timer5 = setTimeout(() => {
      setProgress(90)
      setTimeout(() => {
        setProgress(100)
        setTimeout(() => {
          setIsLoading(false)
          setProgress(0)
        }, 150)
      }, 100)
    }, 700)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
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
      {/* Main Progress Bar */}
      <div
        className={cn(
          "transition-all duration-200 ease-out",
          heights[height],
          colors[color],
          "shadow-lg"
        )}
        style={{
          width: `${progress}%`,
          transition: progress === 100 ? "width 0.15s ease-out" : "width 0.2s ease-out"
        }}
      />

      {/* Glow Effect */}
      <div
        className={cn(
          "absolute top-0 h-full opacity-30 blur-sm transition-all duration-200",
          colors[color]
        )}
        style={{
          width: `${progress}%`,
          transition: progress === 100 ? "width 0.15s ease-out" : "width 0.2s ease-out"
        }}
      />

      {/* Spinner */}
      {showSpinner && progress > 0 && progress < 100 && (
        <div className="absolute top-2 right-4">
          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}

export function NProgress(props: NProgressProps) {
  return (
    <Suspense fallback={null}>
      <NProgressContent {...props} />
    </Suspense>
  )
}

// Hook para control manual del progreso
export function useNProgress() {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const start = () => {
    setIsLoading(true)
    setProgress(0)
  }

  const set = (value: number | ((prev: number) => number)) => {
    if (typeof value === 'function') {
      setProgress(prev => Math.min(100, Math.max(0, value(prev))))
    } else {
      setProgress(Math.min(100, Math.max(0, value)))
    }
  }

  const done = () => {
    setProgress(100)
    setTimeout(() => {
      setIsLoading(false)
      setProgress(0)
    }, 150)
  }

  const stop = () => {
    setIsLoading(false)
    setProgress(0)
  }

  return {
    isLoading,
    progress,
    start,
    set,
    done,
    stop
  }
}

// Componente de ejemplo para mostrar el uso manual
export function NProgressExample() {
  const { isLoading, progress, start, set, done } = useNProgress()

  const handleManualProgress = () => {
    start()
    
    // Simular progreso manual
    const interval = setInterval(() => {
      set((prev: number) => {
        if (prev >= 90) {
          clearInterval(interval)
          done()
          return 90
        }
        return prev + 10
      })
    }, 100)
  }

  return (
    <div className="space-y-4 p-4">
      <NProgress 
        color="purple"
        height="lg"
        showSpinner
      />
      
      <div className="flex gap-2">
        <button
          onClick={handleManualProgress}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Progreso Manual
        </button>
        
        <button
          onClick={() => {
            start()
            setTimeout(() => set(50), 200)
            setTimeout(() => done(), 1000)
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Progreso Rápido
        </button>
      </div>
    </div>
  )
} 