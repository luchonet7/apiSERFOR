"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import type { ReactNode } from "react"

interface LoadingButtonProps {
  isLoading: boolean
  loadingText?: string
  children: ReactNode
  className?: string
  type?: "button" | "submit" | "reset"
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  onClick?: () => void
}

export function LoadingButton({
  isLoading,
  loadingText = "Cargando...",
  children,
  className,
  type = "button",
  variant = "default",
  onClick,
}: LoadingButtonProps) {
  return (
    <Button type={type} variant={variant} className={className} disabled={isLoading} onClick={onClick}>
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  )
}
